package server.blog.series.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.blog.series.entity.Series;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {
}
