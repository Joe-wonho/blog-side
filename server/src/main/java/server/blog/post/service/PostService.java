package server.blog.post.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.post.dto.PostDto;
import server.blog.post.repository.PostRepository;
import server.blog.user.entity.Users;
import server.blog.post.entity.Post;
import server.blog.user.service.UserService;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor // 필드 기반으로 자동으로 생성자 생성
public class PostService {

    private final UserService userService;
    private final PostRepository repository;


    public Post savedPost(Post requestBody) {

        Post savePost = repository.save(requestBody);

        return savePost;
    }


    public Post findPost(long postId){
        return repository.findById(postId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }






    public void deletePost(long userId, Post Post){
        Post findPost = findPost(Post.getPostId());
        if(userId != findPost.getUsers().getUserId()) { //  userId와 findPost의 작성자 ID를 비교하여 일치하지 않으면
            throw new BusinessLogicException(ExceptionCode.POST_AUTHOR_NOT_MATCH);
        }
        repository.delete(findPost);
    }


    @Transactional(readOnly = true)
    public Page<Post> findPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return repository.findAll(pageable);
    }


}
