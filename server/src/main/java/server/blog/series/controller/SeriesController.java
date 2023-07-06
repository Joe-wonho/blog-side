package server.blog.series.controller;


import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.blog.response.MultiResponse;
import server.blog.series.dto.SeriesDto;
import server.blog.series.entity.Series;
import server.blog.series.mapper.SeriesMapper;
import server.blog.series.service.SeriesService;
import server.blog.user.repository.UserRepository;

import javax.validation.constraints.Positive;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SeriesController {
    private UserRepository userRepository;
    private SeriesService service;
    private SeriesMapper mapper;

    public SeriesController(UserRepository userRepository, SeriesService service, SeriesMapper mapper) {
        this.userRepository = userRepository;
        this.service = service;
        this.mapper = mapper;
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
                                                            @PathVariable("seriesName") String seriesName,
                                                            @Positive @RequestParam int page,
                                                            @Positive @RequestParam int size) {
        Page<Series> pageSeries = service.findNicknameAndSeries(nickname, seriesName, page - 1, size);
        List<Series> list = pageSeries.getContent();

        List<SeriesDto.detailResponse> responseList = mapper.seriesToSeriesDetailResponseDto(list);

        Map<String, Object> responseData = new LinkedHashMap<>();  // LinkedHashMap 사용

        responseData.put("seriesName", seriesName);
        responseData.put("post", responseList);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}