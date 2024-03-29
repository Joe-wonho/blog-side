package server.blog.series.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.series.entity.Series;
import server.blog.series.repository.SeriesRepository;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;

import java.util.Optional;

@Service
@Transactional
@Slf4j
public class SeriesService {
    private SeriesRepository seriesRepository;
    private UserRepository userRepository;
    public SeriesService(SeriesRepository seriesRepository, UserRepository userRepository){
        this.seriesRepository = seriesRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<Series> findNicknameSeries(String nickname, int page, int size) {
        Optional<Users> user = userRepository.findByNickname(nickname);
        if (!user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "posts.createdAt")); // 게시글 작성일자를 기준으로 내림차순 정렬
        return seriesRepository.findAllByPostsUsersNickname(nickname, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Series> findNicknameAndSeries(String nickname, String seriesName, int page, int size) {
        Users user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        Pageable pageable = PageRequest.of(page, size);
        return seriesRepository.findAllByPostsUsersNicknameAndSeriesName(nickname, seriesName, pageable);
    }
}
