package server.blog.post.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.blog.exception.BusinessLogicException;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;
import server.blog.post.mapper.PostMapper;
import server.blog.post.repository.PostRepository;
import server.blog.post.service.PostService;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;

import javax.validation.Valid;


// todo : 회원이 탈퇴되도 글 유지
@RestController
@RequestMapping
@Validated
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {
    private final PostService service;
    private final PostMapper mapper;
    private final PostRepository repository;
    private final UserRepository userRepository;



    // 포스트 작성(토큰 인증)
    @PostMapping("/post")
    public ResponseEntity postPost(@RequestHeader("Authorization") String accessToken, @RequestBody @Valid PostDto.Post requestBody) {
        try {
            // 액세스 토큰을 사용하여 사용자 정보 가져오기
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName(); // 현재 사용자의 이메일

            // 사용자 정보 확인
            Users currentUser = userRepository.findByEmail(email).orElse(null);
            if (currentUser == null || !currentUser.getUserId().equals(requestBody.userId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
            }

            // 글 작성 처리
            Post post = mapper.postDtoToPost(requestBody);
            Post create = service.savedPost(post);

            // 작성된 글의 응답 생성
            return new ResponseEntity<>(mapper.postToPostResponseDto(create), HttpStatus.OK);
        } catch (BusinessLogicException e) {
            return new ResponseEntity<>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }
    }




    // 포스트 수정





    // 포스트 전체 조회(엑세스 토큰 x)





    // 포스트 상세 조회(엑세스 토큰 x)




    // 포스트 삭제





    // 포스트 태그 조회








}
