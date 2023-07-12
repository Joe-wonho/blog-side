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
import server.blog.post.entity.PostTag;
import server.blog.post.mapper.PostMapper;
import server.blog.post.repository.PostRepository;
import server.blog.post.repository.PostTagRepository;
import server.blog.post.service.PostService;
import server.blog.response.MultiResponse;
import server.blog.series.entity.Series;
import server.blog.series.repository.SeriesRepository;
import server.blog.tag.dto.TagDto;
import server.blog.tag.entity.Tag;
import server.blog.tag.repository.TagRepository;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


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
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;
    private final SeriesRepository seriesRepository;


    // 포스트 작성(토큰 인증)
    @PostMapping("/post")
    public ResponseEntity postPost(@RequestParam("userId") Long userId,
                                   @RequestParam(value = "content") @NotBlank(message = "내용을 입력하세요.") String content,
                                   @RequestParam(value = "series", required = false) String seriesName,
                                   @RequestParam(value = "title") String title,
                                   @RequestParam(value = "tag", required = false) List<String> tags,
                                   @RequestParam(value = "thumbnail") MultipartFile thumbnail
    ) throws Exception {
        if (StringUtils.isEmpty(userId) || StringUtils.isEmpty(content) || StringUtils.isEmpty(thumbnail) || StringUtils.isEmpty(title)) {
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
        users.setNickname(currentUser.getNickname());
        users.setProfile(currentUser.getProfile());
        post.setUsers(users); // 생성한 Users 객체를 post에 설정
        post.setContent(content);
        post.setTitle(title);

        if (thumbnail != null) {
            // thumbnail 업로드
            String thumbnailUrl = storageService.uploadFile(thumbnail);
            post.setThumbnail(thumbnailUrl);
        }


        Post create = service.savedPost(post, tags , seriesName);

        // 작성된 글의 응답 생성
        return new ResponseEntity<>(mapper.postToPostResponseDto(create), HttpStatus.CREATED);
    }




    // 포스트 수정(토큰 인증)(태그/ 시리즈 또한 수정 가능)
    @PatchMapping("/{postId}")
    public ResponseEntity patchPost(@PathVariable("postId") @Positive long postId,
                                    @RequestParam("userId") @Positive @NotNull Long userId,
                                    @RequestParam(value = "content", required = false) String content, // 선택적으로 받을 수 있도록
                                    @RequestParam(value = "series", required = false) String seriesName,
                                    @RequestParam(value = "title", required = false) String title,
                                    @RequestParam(value = "tag", required = false) List<String> tags,
                                    @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 사용자의 이메일

        Users currentUser = userRepository.findByEmail(email).orElse(null);
        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
        }

        Post findPost = service.findPost(postId);

        try {
            if (findPost.getUsers().getUserId().equals(currentUser.getUserId())) {
                if (content != null) {
                    findPost.setContent(content);
                }
                if (seriesName != null) {
                    findPost.getSeries().setSeriesName(seriesName);
                }
                if (title != null) {
                    findPost.setTitle(title);
                }
                if (tags != null) {
                    // 기존 태그 삭제
                    findPost.getPostTag().forEach(postTag -> {
                        postTag.getTag().getPostTags().remove(postTag);
                        postTag.setPost(null);
                        postTag.setTag(null);
                    });
                    findPost.getPostTag().clear();

                    // 새로운 태그 추가
                    List<PostTag> postTags = tags.stream()
                            .distinct()
                            .map(tagName -> {
                                Tag tag = tagRepository.findByTagName(tagName)
                                        .orElseGet(() -> {
                                            Tag newTag = new Tag();
                                            newTag.setTagName(tagName);
                                            return tagRepository.save(newTag);
                                        });

                                PostTag postTag = new PostTag();
                                postTag.setTag(tag);
                                postTag.setPost(findPost);
                                return postTag;
                            })
                            .collect(Collectors.toList());

                    findPost.setPostTags(postTags);

                    // 포스트 태그 저장
                    postTagRepository.saveAll(postTags);
                }
                if (thumbnail != null) {
                    // thumbnail 업로드
                    String thumbnailUrl = storageService.uploadFile(thumbnail);
                    findPost.setThumbnail(thumbnailUrl);
                }
                Post updatedPost = service.updatePost(findPost);
                return new ResponseEntity<>(mapper.postToPostResponseDto(updatedPost), HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
            }
        } catch (IOException e) {
            // 파일 저장 오류 처리
            return new ResponseEntity<>("오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PatchMapping("/{postId}") -> 기존 코드
//    public ResponseEntity patchPost(@PathVariable("postId") @Positive long postId,
//                                    @RequestParam("userId") @Positive @NotNull Long userId,
//                                    @RequestParam(value = "content", required = false) String content, // 선택적으로 받을 수 있도록
//                                    @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) {
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String email = authentication.getName(); // 현재 사용자의 이메일
//
//        Users currentUser = userRepository.findByEmail(email).orElse(null);
//        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
//        }
//
//        Post findPost = service.findPost(postId);
//
//        try {
//            if (findPost.getUsers().getUserId().equals(currentUser.getUserId())) {
//                if (content != null) {
//                    findPost.setContent(content);
//                }
////                if (files != null && !files.isEmpty()) {
////                    // 새로운 이미지 업로드
////                    List<String> imageUrls = storageService.uploadFiles(findPost, files);
////                    findPost.setImg(imageUrls);
////                }
//                if (thumbnail != null) {
//                    // thumbnail 업로드
//                    String thumbnailUrl = storageService.uploadFile(thumbnail);
//                    findPost.setThumbnail(thumbnailUrl);
//                }
//                Post updatedPost = service.updatePost(findPost);
//                return new ResponseEntity<>(mapper.postToPostResponseDto(updatedPost), HttpStatus.OK);
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
//            }
//        } catch (IOException e) {
//            // 파일 저장 오류 처리
//            return new ResponseEntity<>("오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }




    // 포스트 전체 조회(엑세스 토큰 x)
    @GetMapping("/")
    public ResponseEntity getPosts(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
        Page<Post> pagePosts = service.findPosts(page -1, size);
        List<Post> list = pagePosts.getContent();

        return new ResponseEntity<>(
                new MultiResponse<>(
                        mapper.PostsToResponseDtos(list), pagePosts), HttpStatus.OK);
    }




    // 포스트 상세 조회(엑세스 토큰 x)
    @GetMapping("/{nickname}/{postId}") // 경로 변수 안에는 entity 클래스의 식별자 들어감
    public ResponseEntity getPost(@PathVariable("nickname") String nickname,
                                  @PathVariable("postId") @Positive long postId) {
        Post post = repository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));


        Post findPost = service.findPost(postId);

        if (!findPost.getUsers().getNickname().equals(nickname)) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }

        return new ResponseEntity<>(mapper.postToPostResponseDto(findPost),
                HttpStatus.OK);
    }



    // 회원 포스트 전체 조회(엑세스 토큰 x)
    @GetMapping("/{nickname}") // 경로 변수 안에는 entity 클래스의 식별자 들어감
    public ResponseEntity getUserPosts(@PathVariable("nickname") String nickname,
                                       @Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        Page<Post> pagePosts = service.findUserPosts(nickname,page -1, size);
        List<Post> list = pagePosts.getContent();

        return new ResponseEntity<>(
                new MultiResponse<>(
                        mapper.PostsToResponseDtos(list), pagePosts), HttpStatus.OK);
    }




    // 포스트 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity deleteFeedPost(@PathVariable("postId") @Positive long postId,
                                         @Valid @RequestBody PostDto.post requestBody) {

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
    @GetMapping("/tag/{nickname}/{tagName}") // 경로 변수 안에는 entity 클래스의 식별자 들어감
    public ResponseEntity getTagPosts(@PathVariable("nickname") String nickname,
                                      @PathVariable("tagName") String tagName,
                                       @Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        Page<Post> pagePosts = service.findTagPosts(nickname,tagName, page -1, size);
        List<Post> list = pagePosts.getContent();

        return new ResponseEntity<>(
                new MultiResponse<>(
                        mapper.PostsToResponseDtos(list), pagePosts), HttpStatus.OK);
    }




    // 태그 목록 조회
    @GetMapping("/tag/{nickname}")
    public ResponseEntity<List<TagDto.tagResponse>> getTag(@PathVariable("nickname") String nickname) {
        List<TagDto.tagResponse> responseList = service.getTagInfoByNickname(nickname);
        return ResponseEntity.ok(responseList);
    }


}
