package server.blog.search.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;
import server.blog.post.repository.PostRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final PostRepository postRepository;

    @PersistenceContext
    private EntityManager entityManager;


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

    // 사용자 선택한 태그를 가진 post 조회
    public Page<PostDto.Response> findPostByTags(List<String> tags, Pageable pageable) {
        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("SELECT p FROM Post p WHERE ");
        for (int i = 0; i < tags.size(); i++) {
            queryBuilder.append("EXISTS (SELECT 1 FROM Post p2 JOIN p2.postTag pt JOIN pt.tag t WHERE t.tagName = :tag")
                    .append(i)
                    .append(" AND p.postId = p2.postId)");
            if (i < tags.size() - 1) {
                queryBuilder.append(" AND ");
            }
        }

        TypedQuery<Post> query = entityManager.createQuery(queryBuilder.toString(), Post.class);
        for (int i = 0; i < tags.size(); i++) {
            query.setParameter("tag" + i, tags.get(i));
        }

        query.setFirstResult((pageable.getPageNumber()) * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        List<Post> posts = query.getResultList();

        StringBuilder countQueryBuilder = new StringBuilder();
        countQueryBuilder.append("SELECT COUNT(p) FROM Post p WHERE ");
        for (int i = 0; i < tags.size(); i++) {
            countQueryBuilder.append("EXISTS (SELECT 1 FROM Post p2 JOIN p2.postTag pt JOIN pt.tag t WHERE t.tagName = :tag")
                    .append(i)
                    .append(" AND p.postId = p2.postId)");
            if (i < tags.size() - 1) {
                countQueryBuilder.append(" AND ");
            }
        }

        TypedQuery<Long> countQuery = entityManager.createQuery(countQueryBuilder.toString(), Long.class);
        for (int i = 0; i < tags.size(); i++) {
            countQuery.setParameter("tag" + i, tags.get(i));
        }

        long total = countQuery.getSingleResult();

        List<PostDto.Response> content = posts.stream()
                .map(post -> new PostDto.Response(post))
                .collect(Collectors.toList());

        return new PageImpl<>(content, pageable, total);
    }
}
