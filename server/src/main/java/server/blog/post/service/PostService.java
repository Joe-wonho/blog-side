package server.blog.post.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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



}
