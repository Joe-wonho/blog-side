package server.blog.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import server.blog.awsS3.StorageService;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.post.repository.PostRepository;
import server.blog.post.entity.Post;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;
import server.blog.user.service.UserService;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@Slf4j
public class PostService {
    private final UserService userService;
    private final PostRepository repository;
    private final StorageService storageService;
    private final UserRepository userRepository;

    public PostService(UserService userService, PostRepository repository, StorageService storageService, UserRepository userRepository){
        this.userService = userService;
        this.repository = repository;
        this.storageService = storageService;
        this.userRepository = userRepository;
    }


    public Post savedPost(Post post, List<MultipartFile> files) {


        List<String> imageUrl = storageService.uploadFiles(files);
        post.setImg(imageUrl);

        Post savePost = repository.save(post);

        return savePost;
    }


    public Post findPost(long postId){
        return repository.findById(postId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }


//    @Transactional // 업데이트와 파일 업로드가 하나의 트랜잭션으로 처리되므로, 어느 한 곳에서라도 실패할 경우 롤백
    public Post updatePost(Post post, List<MultipartFile> files) throws IOException {
        Post findPost = findPost(post.getPostId());

        // 기존 이미지 삭제 및 새로운 이미지 업로드
        if (files != null && !files.isEmpty()) {
            List<String> imageUrls = storageService.uploadFiles(findPost, files);
            findPost.setImg(imageUrls);
        }

        return repository.save(findPost);
    }




// 해당 userId가 작성한 게시글을 삭제할 수 있음
    public void deletePost(long userId, Post findPost){
        if(userId != findPost.getUsers().getUserId()) { //  userId와 findPost의 작성자 ID를 비교하여 일치하지 않으면
            throw new BusinessLogicException(ExceptionCode.POST_AUTHOR_NOT_MATCH);
        }
        repository.delete(findPost);
    }


    @Transactional(readOnly = true)
    public Page<Post> findPosts(int page, int size) {
        return repository.findAll(PageRequest.of(page, size,Sort.by("postId").descending()));
    }


    @Transactional(readOnly = true)
    public Page<Post> findUserPosts(String nickname, int page, int size) {
        Users user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        String currentNickname = user.getNickname();

        Pageable pageable = PageRequest.of(page, size);
        return repository.findAllByUsersNickname(currentNickname, pageable);
    }

}
