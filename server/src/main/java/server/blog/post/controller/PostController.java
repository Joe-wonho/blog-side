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
import server.blog.awsS3.StorageService;
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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.io.IOException;
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
    private final StorageService storageService;



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
        Users users = new Users(); // 새로운 Users 객체 생성
        users.setUserId(currentUser.getUserId());
        post.setUsers(users); // 생성한 Users 객체를 post에 설정
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
    // 1. content 수정후 다시 요청시 이미지만 변경하면 기존 내용 그대로 에러( 추후 수정)
    // 2. 이미지 두번 요청시 전부 수정됨(추후 수정)
    @PatchMapping("/{postId}")
    public ResponseEntity patchPost(@PathVariable("postId") @Positive long postId,
                                    @RequestParam("userId") Long userId,
                                    @RequestParam(value = "content", required = false) String content, // 선택적으로 받을 수 있도록
                                    @RequestParam(value = "img", required = false) List<MultipartFile> files) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 사용자의 이메일

        Users currentUser = userRepository.findByEmail(email).orElse(null);
        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
        }

        Post findPost = service.findPost(postId);

        try {
            Post updatedPost = new Post();
            Users users = new Users(); // 새로운 Users 객체 생성
            users.setUserId(currentUser.getUserId());
            updatedPost.setUsers(users);
            updatedPost.setCreatedAt(findPost.getCreatedAt());
            updatedPost.setImg(findPost.getImg());
            updatedPost.setPostId(findPost.getPostId());
//            updatedPost.setContent(findPost.getContent());
            updatedPost.setNickname(findPost.getNickname());


            if (content != null && files != null && !files.isEmpty()) {
                // 내용과 사진 모두 수정하는 경우
                updatedPost.setContent(content);
                // 프로필 파일 저장 및 파일 경로 설정
                Post savedPost = service.updatePost(updatedPost, files);
            } else if (content != null) {
                // 내용만 수정하는 경우
                updatedPost.setContent(content);
                updatedPost.setImg(findPost.getImg());
                Post savedPost =  service.updatePost(updatedPost, null);
            } else if (files != null && !files.isEmpty()) {
                // 사진만 수정하는 경우
                updatedPost.setContent(findPost.getContent());
                // 프로필 파일 저장 및 파일 경로 설정
                Post savedPost = service.updatePost(updatedPost, files);
            } else {
                // 수정할 내용이 없는 경우, BadRequest 응답
                return new ResponseEntity<>("수정할 내용이 없습니다.", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(mapper.postToPostResponseDto(updatedPost), HttpStatus.OK);
        } catch (IOException e) {
            // 파일 저장 오류 처리
            return new ResponseEntity<>("오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




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



    // 포스트 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity deleteFeedPost(@PathVariable("postId") @Positive long postId,
                                         @Valid @RequestBody PostDto.Post requestBody) {

        // 액세스 토큰을 사용하여 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 사용자의 이메일

        // 사용자 정보 확인
        Users currentUser = userRepository.findByEmail(email).orElse(null);
        if (currentUser == null || !currentUser.getUserId().equals(requestBody.getUserId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
        }

        Post findPost = service.findPost(postId);

        // 글 삭제 처리
        service.deletePost(requestBody.getUserId(), findPost);

        // 작성된 글의 응답 생성
        return ResponseEntity.ok("게시글 삭제 성공");
    }





    // 포스트 태그 조회








}
