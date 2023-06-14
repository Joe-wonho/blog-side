package server.blog.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.blog.post.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
