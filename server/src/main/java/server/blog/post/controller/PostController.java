package server.blog.post.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;
import server.blog.post.mapper.PostMapper;
import server.blog.post.repository.PostRepository;
import server.blog.post.service.PostService;
import server.blog.response.MultiResponse;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.util.List;


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
    public ResponseEntity postPost(@RequestParam("userId") Long userId,
                                   @RequestParam("content") @NotBlank(message = "내용을 입력하세요.") String content,
//                                   @RequestParam("series") String series,
                                   @RequestParam(value = "img", required = false) List<MultipartFile> files
//                                   @RequestPart(value = "tags", required = false) List<String> tags
    ) throws Exception {
        if (StringUtils.isEmpty(userId) || StringUtils.isEmpty(content)) {
            // 필수 필드가 누락된 경우, 적절한 응답 처리
            return new ResponseEntity<>("필수 필드를 입력하세요.", HttpStatus.BAD_REQUEST);
        }
        // 액세스 토큰을 사용하여 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 사용자의 이메일

        // 사용자 정보 확인
        Users currentUser = userRepository.findByEmail(email).orElse(null);
        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
        }

        // 글 작성 처리
        Post post = new Post();
        post.setContent(content);
        post.setNickname(currentUser.getNickname());
        post.getPostId();
        post.getCreatedAt();

        Post create = service.savedPost(post, files);
//        create.getUsers().setUserId(userId);

        // 작성된 글의 응답 생성
        return new ResponseEntity<>(mapper.postToPostResponseDto(create), HttpStatus.CREATED);
    }




    // 포스트 수정(토큰 인증)
//    @PatchMapping("/{postId}")
//    public ResponseEntity patchPost(@PathVariable("postId") @Positive long postId,
//                                    @RequestBody @Valid PostDto.Patch requestBody) {
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String email = authentication.getName(); // 현재 사용자의 이메일
//
//        Users currentUser = userRepository.findByEmail(email).orElse(null);
//        if (currentUser == null || !currentUser.getUserId().equals(requestBody.userId)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
//        }
//
//        Post findPost = service.findPost(postId);
//
//        Post post = mapper.patchDtoToPost(findPost, requestBody);
//
//        Post updatePost = service.updatePost(post);
//
//        return new ResponseEntity<>(mapper.postToPostResponseDto(updatePost), HttpStatus.OK);
//
//    }




    // 포스트 전체 조회(엑세스 토큰 x)
    @GetMapping("/")
    public ResponseEntity getFeedPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<Post> pagePosts = service.findPosts(page -1, size);
        List<Post> list = pagePosts.getContent();

        return new ResponseEntity<>(
                new MultiResponse<>(
                        mapper.PostsToResponseDtos(list), pagePosts), HttpStatus.OK);
    }




    // 포스트 상세 조회(엑세스 토큰 x)
    @GetMapping("/{nickname}/{postId}") // 경로 변수 안에는 entity 클래스의 식별자 들어감
    public ResponseEntity getFeed(@PathVariable("nickname") String nickname,
                                  @PathVariable("postId") @Positive long postId) {
        Post post = repository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));


        Post findPost = service.findPost(postId);

        if (!findPost.getNickname().equals(nickname)) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }

        return new ResponseEntity<>(mapper.postToPostResponseDto(findPost),
                HttpStatus.OK);
    }


//
//    // 포스트 삭제
//    @DeleteMapping("/{postId}")
//    public ResponseEntity deleteFeedPost(@PathVariable("postId") @Positive long postId,
//                                         @Valid @RequestBody PostDto.Post requestBody) {
//
//        // 액세스 토큰을 사용하여 사용자 정보 가져오기
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String email = authentication.getName(); // 현재 사용자의 이메일
//
//        // 사용자 정보 확인
//        Users currentUser = userRepository.findByEmail(email).orElse(null);
//        if (currentUser == null || !currentUser.getUserId().equals(requestBody.userId)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
//        }
//
//        Post findPost = service.findPost(postId);
//
//        // 글 삭제 처리
//        service.deletePost(requestBody.userId, findPost);
//
//        // 작성된 글의 응답 생성
//        return ResponseEntity.ok("게시글 삭제 성공");
//    }
//
//



    // 포스트 태그 조회








}
