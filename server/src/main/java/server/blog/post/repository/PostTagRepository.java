package server.blog.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.blog.post.entity.Post;
import server.blog.post.entity.PostTag;

import java.util.List;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {
    List<PostTag> findByPost(Post post);
}
