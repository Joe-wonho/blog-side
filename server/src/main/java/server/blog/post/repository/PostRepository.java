package server.blog.post.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.blog.post.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByUsersNickname(String nickname, Pageable pageable);

    Page<Post> findAllByUsersNicknameAndPostTag_Tag_TagName(String nickname, String tagName, Pageable pageable);
    Page<Post> findByTitleContaining(String title, Pageable pageable);

    Page<Post> findByContentContaining(String content, Pageable pageable);
}
