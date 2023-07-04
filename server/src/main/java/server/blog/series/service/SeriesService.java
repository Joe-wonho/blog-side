package server.blog.series.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

        Pageable pageable = PageRequest.of(page, size);
        return seriesRepository.findAllByPostsUsersNickname(nickname, pageable);
    }
}
