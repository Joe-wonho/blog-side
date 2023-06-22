package server.blog.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import server.blog.auth.jwt.JwtTokenizer;
import server.blog.auth.utils.UserAuthorityUtils;
import server.blog.awsS3.StorageService;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import server.blog.auth.utils.RedisUtils;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthorityUtils authorityUtils;
    private final StorageService storageService;
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtils redisUtils;

    public UserService(UserRepository userRepository,
                         PasswordEncoder passwordEncoder,
                         UserAuthorityUtils authorityUtils,
                         StorageService storageService,
                         JwtTokenizer jwtTokenizer,
                         RedisUtils redisUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.storageService = storageService;
        this.jwtTokenizer = jwtTokenizer;
        this.redisUtils = redisUtils;
    }

    /*
    <회원 등록>
    1. 중복 이메일 검증
    2. 중복 닉네임 검증
    3. 패스워드 암호화
    4. Role -> db에 저장
    5. 이미지 -> s3에 저장
    4. 등록
     */
    public Users createUser(Users users, MultipartFile file) throws Exception {


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

        String imageUrl = storageService.uploadFile(file);

        users.setProfile(imageUrl);

        return userRepository.save(users);
    }

    public Users createUserOAuth2(Users users) throws Exception {

        String nickname = users.getNickname();
        if (isNicknameExists(nickname)) {
            nickname = generateUniqueNickname(nickname);
        }
        users.setNickname(nickname);

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
      회원 정보는 닉네임, 이미지 변경 가능
     */
    public Users updateUser(Users users, MultipartFile file) throws IOException{


        if (file != null) {

            // 프로필 수정
            String imageUrl = storageService.uploadFile(file, users);
            users.setProfile(imageUrl);
        }

        // 저장
        return userRepository.save(users);
    }

        /*
       <회원 정보 삭제>
       1. 회원 검증(존재O or 존재X)
       2. 회원 삭제
       3. 리프래시 토큰 삭제
        */
    public void deleteUser(HttpServletRequest request , HttpServletResponse response, long userId) {
            // 회원 검증(존재O or 존재X)
        Users findUser = checkUser(userId);

        userRepository.delete(findUser);

        Cookie[] cookies = request.getCookies();

        String refreshToken = "";

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Refresh")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        // 리프래시 토큰 삭제
        if (refreshToken != null) {
            ResponseCookie removeRefreshCookie = ResponseCookie.from("Refresh", refreshToken)
                    .domain("localhost")
                    .path("/")
                    .sameSite("None")
                    .secure(true)
                    .httpOnly(false)
                    .maxAge(0)
                    .build();
            response.addHeader("Set-Cookie", removeRefreshCookie.toString());
        }
    }



    private void verifyExistsEmail(String email) throws Exception {
        Optional<Users> optionalMember = userRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
        }
    }

    // 이메일 존재 여부
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // 닉네임 존재 여부
    private boolean isNicknameExists(String nickname) {
        return userRepository.existsByNickname(nickname);
    }


    private String generateUniqueNickname(String nickname) {
        String modifiedNickname = nickname;
        int suffix = 2;
        while (isNicknameExists(modifiedNickname)) {
            modifiedNickname = nickname + suffix;
            suffix++;
        }
        return modifiedNickname;
    }

    // 회원 검증 메서드
    private Users checkUser(long userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }


    // 중복 닉네임 검증 메서드
    public void verifyExistsNickname(String nickname) {
        Optional<Users> optionalMember = userRepository.findByNickname(nickname);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        }
    }

    @Transactional
    public void logout(HttpServletRequest request , HttpServletResponse response) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.split(" ")[1]; //  " " (공백)을 기준으로 분리된 단어 중에서 두 번째 단어 추출

        String ATKemail = jwtTokenizer.getATKemail(accessToken);
        redisUtils.deleteData(ATKemail);

        Long expiration = jwtTokenizer.getATKExpiration(accessToken);
        redisUtils.setData(accessToken, "blackList", expiration);

        Cookie[] cookies = request.getCookies();

        String refreshToken = "";

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Refresh")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        // 리프래시 토큰 삭제
        if (refreshToken != null) {
            ResponseCookie removeRefreshCookie = ResponseCookie.from("Refresh", refreshToken)
                    .domain("localhost")
                    .path("/")
                    .sameSite("None")
                    .secure(true)
                    .httpOnly(false)
                    .maxAge(0)
                    .build();
            response.addHeader("Set-Cookie", removeRefreshCookie.toString());
        }
    }
}
