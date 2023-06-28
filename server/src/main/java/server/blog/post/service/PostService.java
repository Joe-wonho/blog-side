package server.blog.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import server.blog.awsS3.StorageService;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.post.repository.PostRepository;
import server.blog.post.entity.Post;
import server.blog.user.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class PostService {
    private final UserService userService;
    private final PostRepository repository;
    private final StorageService storageService;

    public PostService(UserService userService, PostRepository repository, StorageService storageService){
        this.userService = userService;
        this.repository = repository;
        this.storageService = storageService;
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

    public Post updatePost(Post post) {
        Post findPost = findPost(post.getPostId());

        if (post.getUsers().getUserId() != findPost.getUsers().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.POST_AUTHOR_NOT_MATCH);
        } else {
            Optional.ofNullable(post.getContent()).ifPresent(content -> post.setContent(content));
            Optional.ofNullable(post.getImg()).ifPresent(img -> post.setImg(img));
            findPost.setCreatedAt(LocalDateTime.now());

            return repository.save(findPost);
        }
    }




    public void deletePost(long userId, Post post){
        Post findPost = findPost(post.getPostId());
        if(userId != findPost.getUsers().getUserId()) { //  userId와 findPost의 작성자 ID를 비교하여 일치하지 않으면
            throw new BusinessLogicException(ExceptionCode.POST_AUTHOR_NOT_MATCH);
        }
        repository.delete(findPost);
    }


    @Transactional(readOnly = true)
    public Page<Post> findPosts(int page, int size) {
        return repository.findAll(PageRequest.of(page, size,Sort.by("postId").descending()));
    }

}
