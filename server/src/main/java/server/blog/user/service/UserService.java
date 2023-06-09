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


    /*
      <회원 정보 수정>
      회원 정보는 닉네임, 비밀번호만 변경 가능
      1. 회원 검증(존재O or 존재X)
      2. 수정
     */
    public Users updateUser(Users users){
// 회원 검증
        Users findUser = checkUser(users.getUserId());

        if (users.getUserId() != findUser.getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }

        verifyExistsNickname(users.getNickname());

        // 닉네임 수정
        Optional.ofNullable(users.getNickname())
                .ifPresent(nickname -> findUser.setNickname(nickname));
        // 프로필 수정
        Optional.ofNullable(users.getProfile())
                .ifPresent(profile -> findUser.setProfile(profile));


        System.out.println("userId : " + findUser.getUserId());
        System.out.println("nickname : " + findUser.getNickname());
        System.out.println("name : " + findUser.getName());
        System.out.println("email : " + findUser.getEmail());
        System.out.println("profile : " + findUser.getProfile());

        // 저장
        return userRepository.save(findUser);
    }

        /*
       <회원 정보 삭제>
       1. 회원 검증(존재O or 존재X)
       2. 삭제
        */
    public void deleteUser(long userId) {
            // 회원 검증(존재O or 존재X)
        Users findUser = checkUser(userId);

        userRepository.delete(findUser);
    }



    private void verifyExistsEmail(String email) throws Exception {
        Optional<Users> optionalMember = userRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
        }
    }


    // 회원 검증 메서드
    private Users checkUser(long userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }


    // 중복 닉네임 검증 메서드
    private void verifyExistsNickname(String nickname) {
        Optional<Users> optionalMember = userRepository.findByNickname(nickname);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        }
    }
}
