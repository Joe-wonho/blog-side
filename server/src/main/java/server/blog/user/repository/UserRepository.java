package server.blog.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.blog.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(Long userId);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
