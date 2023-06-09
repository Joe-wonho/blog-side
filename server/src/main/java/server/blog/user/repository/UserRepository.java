package server.blog.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.blog.user.entity.Users;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUserId(Long userId);
    Optional<Users> findByEmail(String email);
    Optional<Users> findByNickname(String nickname);

    boolean existsByEmail(String email);
}
