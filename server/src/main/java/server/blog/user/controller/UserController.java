package server.blog.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.blog.auth.dto.AuthLoginDto;
import server.blog.auth.userdetails.PrincipalDetails;
import server.blog.exception.BusinessLogicException;
import server.blog.user.dto.UserDto;
import server.blog.user.entity.Users;
import server.blog.user.mapper.UserMapper;
import server.blog.user.repository.UserRepository;
import server.blog.user.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.IOException;
import java.util.Collection;

@RestController
@RequestMapping
@Validated
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;
    private final UserRepository userRepository;



    // 회원 가입 (폼 데이터 형식)
    @PostMapping("/signup")
    public ResponseEntity<?> postUser(
            @RequestParam("name") @NotBlank(message = "이름을 입력하세요.") String name,
            @RequestParam("nickname") @NotBlank(message = "닉네임을 입력하세요.") String nickname,
            @RequestParam("email") @NotBlank(message = "이메일을 입력하세요.") @Email(message = "올바른 이메일 형식이 아닙니다.") String email,
            @RequestParam("password") @NotBlank(message = "패스워드를 입력하세요.") @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-zA-Z\\d!@#$%^&*()]{8,}$", message = "비밀번호는 최소 8자리이며, 영문, 숫자, 특수문자를 포함해야 합니다.") String password,
            @RequestParam(value = "profile", required = false) MultipartFile file
    ) throws Exception {
        if (StringUtils.isEmpty(name) || StringUtils.isEmpty(nickname) || StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
            // 필수 필드가 누락된 경우, 적절한 응답 처리
            return new ResponseEntity<>("필수 필드를 입력하세요.", HttpStatus.BAD_REQUEST);
        }

        Users users = new Users();
        users.setName(name);
        users.setNickname(nickname);
        users.setEmail(email);
        users.setPassword(password);


        Users createdUsers = userService.createUser(users, file);

        return new ResponseEntity<>(mapper.userToLoginResponseDto(createdUsers), HttpStatus.CREATED);
    }



    //  # 프론트엔드에서 카카오유저의 정보를 알려주면 그걸 이용해 회원가입 -> 엑세스, 리프래시 토큰 발급
    @PostMapping("/oauth/signup")
    public ResponseEntity oAuth2LoginKakao(HttpServletResponse response,
                                           @RequestBody @Valid AuthLoginDto requestBody) throws Exception{

        Users users = mapper.AuthLoginDtoUser(requestBody);

        // 오어스 가입시 이메일 수정 (.com -> .kakao)
        String email = users.getEmail(); // 이메일 가져옴
        String modifiedEmail = email.replace(".com", ".kakao");

        users.setEmail(modifiedEmail);
        users.setPassword(users.getName()+"123dssfv#42");

        // 이메일이 이미 존재하는지 확인
        if(!userService.existsByEmail(users.getEmail())) {
            Users createdUser = userService.createUserOAuth2(users);

            // 엑세스 토큰 생성
            String accessToken = userService.delegateAccessToken(createdUser);
            String refreshToken = userService.delegateRefreshToken(createdUser);

            // 엑세스 토큰을 응답 헤더에 설정
            response.setHeader("Authorization", "Bearer " + accessToken);

            // 리프래쉬 쿠키 설정
            Cookie cookie1 = new Cookie("Refresh", refreshToken);
            cookie1.setHttpOnly(true);
            cookie1.setPath("/");
            cookie1.setMaxAge(3600); // 쿠키 만료 시간 설정 (초 단위)
            cookie1.setDomain("localhost");
            response.addCookie(cookie1);

            return new ResponseEntity<>("OAuth 가입 성공", HttpStatus.CREATED);
        } else {
            // 이메일이 이미 존재하는 경우 해당 사용자 정보 찾기
            Users existingUser = userService.getUserByEmail(users.getEmail());

            // 엑세스 토큰 생성
            String accessToken = userService.delegateAccessToken(existingUser);
            String refreshToken = userService.delegateAccessToken(existingUser);

            // 엑세스 토큰을 응답 헤더에 설정
            response.setHeader("Authorization", "Bearer " + accessToken);

            // 리프래쉬 쿠키 설정
            Cookie cookie1 = new Cookie("Refresh", refreshToken);
            cookie1.setHttpOnly(true);
            cookie1.setPath("/");
            cookie1.setMaxAge(3600); // 쿠키 만료 시간 설정 (초 단위)
            cookie1.setDomain("localhost");
            response.addCookie(cookie1);

            return new ResponseEntity<>("이미 가입되어 있음", HttpStatus.OK);
        }
    }



    // 회원 정보 수정 (폼 데이터 형식 / 토큰 이용 -> 회원 확인)

    @PatchMapping("/user/{userId}")
    public ResponseEntity patchUser(@RequestParam(value = "nickname", required = false) String nickname,
                                    @RequestParam(value = "profile", required = false) MultipartFile file,
                                    @PathVariable("userId") Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 사용자의 이메일

        Users currentUser = userRepository.findByEmail(email).orElse(null);
        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
        }

        try {
            Users updatedUser = new Users();
            updatedUser.setUserId(userId);
            updatedUser.setEmail(currentUser.getEmail());
            updatedUser.setName(currentUser.getName());
            updatedUser.setProfile(currentUser.getProfile());
            updatedUser.setPassword(currentUser.getPassword());

            if (nickname != null && file != null && !file.isEmpty()) {
                // 닉네임과 프로필 사진 모두 수정하는 경우
                if (!nickname.equals(currentUser.getNickname())) {
                    userService.verifyExistsNickname(nickname); // 닉네임 중복 검증
                }
                updatedUser.setNickname(nickname);
                // 프로필 파일 저장 및 파일 경로 설정
                Users savedUser = userService.updateUser(updatedUser, file);
            } else if (nickname != null) {
                // 닉네임만 수정하는 경우
                if (!nickname.equals(currentUser.getNickname())) {
                    userService.verifyExistsNickname(nickname); // 닉네임 중복 검증
                }
                updatedUser.setNickname(nickname);
                updatedUser.setProfile(currentUser.getProfile());
                Users savedUser = userService.updateUser(updatedUser, null);
            } else if (file != null && !file.isEmpty()) {
                // 프로필 사진만 수정하는 경우
                updatedUser.setNickname(currentUser.getNickname());
                // 프로필 파일 저장 및 파일 경로 설정
                Users savedUser = userService.updateUser(updatedUser, file);
            } else {
                // 수정할 내용이 없는 경우, BadRequest 응답
                return new ResponseEntity<>("수정할 내용이 없습니다.", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(mapper.userToUserResponseDto(updatedUser), HttpStatus.OK);
        } catch (IOException e) {
            // 파일 저장 오류 처리
            return new ResponseEntity<>("프로필 이미지 저장 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (BusinessLogicException e) {
            // 닉네임 중복 예외 처리
            return new ResponseEntity<>("같은 이름의 닉네임이 존재합니다. ", HttpStatus.BAD_REQUEST);
        }
    }


    // 회원 확인 (토큰 이용 확인)
    @GetMapping("/user")
    public ResponseEntity getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal(); // 인증된 사용자 주체

        if (principal instanceof String) {
            String email = (String) principal;
            Users users = userRepository.findByEmail(email).orElse(null);

            if (users != null) {
                PrincipalDetails principalDetails = new PrincipalDetails(users);
                Collection<? extends GrantedAuthority> authorities = principalDetails.getAuthorities();

                // authorities를 활용하여 역할 확인
                boolean hasUserRole = authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .anyMatch(authority -> authority.equals("ROLE_USER"));

                if (hasUserRole) {
                    return new ResponseEntity<>((mapper.userToUserResponseDto(users)), HttpStatus.OK);
                }
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
    }


    // 회원 탈퇴 (토큰 이용 -> 회원 확인)
    @DeleteMapping("/user/{userId}")
    public ResponseEntity deleteUsers(HttpServletRequest request, HttpServletResponse response,
                                      @PathVariable("userId") Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal(); // 인증된 사용자 주체

        if (principal instanceof String) {
            String email = (String) principal;
            Users currentUser = userRepository.findByEmail(email).orElse(null);

            if (currentUser != null && currentUser.getUserId().equals(userId)) {
                userService.deleteUser(request, response, userId);
                return ResponseEntity.ok("회원 탈퇴 성공");
            }
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // 이메일 중복 확인
    @PostMapping("/email")
    public ResponseEntity postEmail(@Valid @RequestBody UserDto.Post requestBody) {
        if(userRepository.existsByEmail(requestBody.getEmail())){
            return ResponseEntity.badRequest().body("이미 존재하는 이메일 입니다.");
        }

        return ResponseEntity.ok("사용할 수 있는 이메일 입니다.");
    }

    //로그아웃
    @PostMapping("/signout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            userService.logout(request, response);
            return ResponseEntity.ok("로그아웃 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그아웃 실패");
        }
    }

    // 닉네임 회원 정보 확인
    @GetMapping("/check/{nickname}")
    public ResponseEntity<UserDto.UserNicknameResponse> nicknameUser(@PathVariable("nickname") String nickname) {
        Users user = userService.findUserByNickname(nickname);

        if (user != null) {
            return new ResponseEntity<>((mapper.userToUserNicknameResponseDto(user)), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
