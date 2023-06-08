package server.blog.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.user.entity.User;
import server.blog.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public User createUser(User user){
        if(userRepository.findByUserId(user.getUserId()).getEmail().equals(user.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
        }
        return userRepository.save(user);
    }

    public User updateUser(User user){
        User findUser = userRepository.findByUserId(user.getUserId());

        Optional.ofNullable(user.getNickname()).ifPresent(findUser::setNickname);
        Optional.ofNullable(user.getProfile()).ifPresent(findUser::setProfile);

        return userRepository.save(findUser);
    }


    public User findUser(long userId){
        User findUser = userRepository.findByUserId(userId);

        return findUser;
    }

    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(long userId){
        userRepository.deleteById(userId);
    }
}
