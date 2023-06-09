package server.blog.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.blog.auth.jwt.JwtTokenizer;
import server.blog.auth.utils.UserAuthorityUtils;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;

    public UserService(UserRepository userRepository,
                         PasswordEncoder passwordEncoder,
                         UserAuthorityUtils authorityUtils,
                         JwtTokenizer jwtTokenizer) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.jwtTokenizer = jwtTokenizer;
    }

    /*
    <회원 등록>
    1. 중복 이메일 검증
    2. 패스워드 암호화
    3. Role -> db에 저장
    4. 등록
     */
    public Users createUser(Users users) throws Exception {
        // 중복 이메일 검증
        verifyExistsEmail(users.getEmail());

        // 중복 닉네임 검증
        verifyExistsNickname(users.getNickname());

        // 패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(users.getPassword());
        users.setPassword(encryptedPassword);

        // Role -> db에 저장
        List<String> roles = authorityUtils.createRoles(users.getEmail());
        users.setRoles(roles);

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

    private void verifyExistsEmail(String email) throws Exception {
        Optional<Users> optionalMember = userRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
        }
    }


    // 중복 닉네임 검증 메서드
    private void verifyExistsNickname(String nickname) {
        Optional<Users> optionalMember = userRepository.findByNickname(nickname);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        }
    }
}
