package server.blog.search.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;
import server.blog.post.repository.PostRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final PostRepository postRepository;

    // title 검색어와 일치하는 post를 조회
    public Page<PostDto.Response> findPostByTitle(String title, Pageable pageable) {
        Page<Post> posts = postRepository.findByTitleContaining(title, pageable);

        return posts.map(PostDto.Response::new);
    }


    // content 검색어와 일치하는 post를 조회
    public Page<PostDto.Response> findPostByContent(String content, Pageable pageable) {
        Page<Post> posts = postRepository.findByContentContaining(content, pageable);

        return posts.map(PostDto.Response::new);
    }
}
