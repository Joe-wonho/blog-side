package server.blog.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.blog.tag.entity.Tag;
import server.blog.user.entity.Users;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);

    List<Tag> findDistinctByPostTagsPostUsers(Optional<Users> user);
}
