package server.blog.series.controller;


import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.blog.post.entity.Post;
import server.blog.response.MultiResponse;
import server.blog.series.dto.SeriesDto;
import server.blog.series.entity.Series;
import server.blog.series.mapper.SeriesMapper;
import server.blog.series.repository.SeriesRepository;
import server.blog.series.service.SeriesService;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;
import server.blog.user.service.UserService;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequestMapping
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SeriesController {
    private UserRepository userRepository;
    private SeriesService service;
    private SeriesMapper mapper;
    private SeriesRepository seriesRepository;
    private UserService userService;

    public SeriesController(UserRepository userRepository, SeriesService service, SeriesMapper mapper,
                            SeriesRepository seriesRepository, UserService userService) {
        this.userRepository = userRepository;
        this.service = service;
        this.mapper = mapper;
        this.seriesRepository = seriesRepository;
        this.userService = userService;
    }


    // 포스트 시리즈 전체 조회
    @GetMapping("/{nickname}/series")
    public ResponseEntity allSeries(@PathVariable("nickname") String nickname,
                                    @Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {

        Page<Series> pageSeries = service.findNicknameSeries(nickname, page - 1, size);
        List<Series> list = pageSeries.getContent();

        return new ResponseEntity<>(
                new MultiResponse<>(
                        mapper.seriesToSeriesResponseDto(list), pageSeries), HttpStatus.OK);

    }


    // 포스트 시리즈 상세 조회
    @GetMapping("/{nickname}/series/{seriesName}")
    public ResponseEntity<Map<String, Object>> detailSeries(@PathVariable("nickname") String nickname,
                                                            @PathVariable("seriesName") String encodedSeriesName,
                                                            @Positive @RequestParam int page,
                                                            @Positive @RequestParam int size) {
        try {
            String decodedSeriesName = URLDecoder.decode(encodedSeriesName, StandardCharsets.UTF_8.toString());

            Page<Series> pageSeries = service.findNicknameAndSeries(nickname, decodedSeriesName, page - 1, size);
            List<Series> list = pageSeries.getContent();

            List<SeriesDto.detailResponse> responseList = mapper.seriesToSeriesDetailResponseDto(list);

            Map<String, Object> responseData = new LinkedHashMap<>();
            responseData.put("seriesName", decodedSeriesName);
            responseData.put("post", responseList);

            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "오류가 발생했습니다."));
        }
    }


//
//    // 시리즈 추가 (시리즈 생성 / 이미 해당 존재하면 기존 시리즈 반환)
//    @PostMapping("/{nickname}/series")
//    public ResponseEntity createSeries(@PathVariable("nickname") String nickname,
//                                       @RequestParam("userId") Long userId,
//                                       @RequestParam("series") String seriesName) {
//        // 필수 필드 누락 검사
//        if (StringUtils.isEmpty(userId) || StringUtils.isEmpty(seriesName)) {
//            return ResponseEntity.badRequest().body("필수 필드를 입력하세요.");
//        }
//
//        // 액세스 토큰을 사용하여 사용자 정보 가져오기
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String email = authentication.getName(); // 현재 사용자의 이메일
//
//        // 사용자 정보 확인
//        Users currentUser = userRepository.findByEmail(email).orElse(null);
//        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
//        }
//
//        // 닉네임으로 사용자 정보 가져오기
//        Users user = userService.findUserByNickname(nickname);
//
//        // 시리즈 생성 또는 기존 시리즈 조회
//        Optional<Series> existingSeries = seriesRepository.findByUsersAndSeriesName(user, seriesName);
//        Series series;
//        if (existingSeries.isPresent()) {
//            series = existingSeries.get();
//        } else {
//            series = new Series();
//            series.setSeriesName(seriesName);
//            series.setUsers(user);
//            seriesRepository.save(series);
//        }
//
//        // 시리즈 생성 응답 생성
//        SeriesDto.Response seriesResponse = new SeriesDto.Response(series.getSeriesId(), series.getSeriesName());
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(seriesResponse);
//    }



//    // 시리즈 추가
//    @PostMapping("/{nickname}/series")
//    public ResponseEntity createSeries(@PathVariable("nickname") String nickname,
//                                       @RequestParam("userId") Long userId,
//                                       @RequestParam("series") String seriesName) {
//        // 필수 필드 누락 검사
//        if (StringUtils.isEmpty(userId) || StringUtils.isEmpty(seriesName)) {
//            return ResponseEntity.badRequest().body("필수 필드를 입력하세요.");
//        }
//
//        // 액세스 토큰을 사용하여 사용자 정보 가져오기
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String email = authentication.getName(); // 현재 사용자의 이메일
//
//        // 사용자 정보 확인
//        Users currentUser = userRepository.findByEmail(email).orElse(null);
//        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
//        }
//
//        // 닉네임으로 사용자 정보 가져오기
//        Users user = userService.findUserByNickname(nickname);
//
//        // 시리즈 생성
//        Series series = new Series();
//        series.setSeriesName(seriesName);
//        series.setUsers(user);
//        seriesRepository.save(series); // Series 저장
//
//        // 시리즈 생성 응답 생성
//        SeriesDto.Response seriesResponse = new SeriesDto.Response(series.getSeriesId(), series.getSeriesName());
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(seriesResponse);
//    }
}
