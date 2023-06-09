package server.blog.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public Users createUser(Users users){
        if(userRepository.findByUserId(users.getUserId()).getEmail().equals(users.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
        }
        return userRepository.save(users);
    }

    public Users updateUser(Users users){
        Users findUsers = userRepository.findByUserId(users.getUserId());

        Optional.ofNullable(users.getNickname()).ifPresent(findUsers::setNickname);
        Optional.ofNullable(users.getProfile()).ifPresent(findUsers::setProfile);

        return userRepository.save(findUsers);
    }


    public Users findUser(long userId){
        Users findUsers = userRepository.findByUserId(userId);

        return findUsers;
    }

    public List<Users> findUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(long userId){
        userRepository.deleteById(userId);
    }
}
