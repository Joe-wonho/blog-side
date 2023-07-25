package server.blog.series.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.blog.series.entity.Series;
import server.blog.user.entity.Users;

import java.util.Optional;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {
    Page<Series> findAllByPostsUsersNickname(String nickname, Pageable pageable);

    Page<Series> findAllByPostsUsersNicknameAndSeriesName(String nickname, String seriesName, Pageable pageable);


}
