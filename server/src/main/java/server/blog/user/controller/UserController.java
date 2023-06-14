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
import server.blog.auth.userdetails.PrincipalDetails;
import server.blog.user.entity.Users;
import server.blog.user.mapper.UserMapper;
import server.blog.user.repository.UserRepository;
import server.blog.user.service.UserService;

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
            @RequestParam("name") String name,
            @RequestParam("nickname") String nickname,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
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



    // 회원 정보 수정 (폼 데이터 형식 / 토큰 이용 -> 회원 확인)
    @PatchMapping("/user/{userId}")
    public ResponseEntity patchUser(@RequestParam(value = "nickname", required = false) String nickname,
                                    @RequestParam(value = "profile", required = false) MultipartFile file,
                                    @PathVariable("userId") Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 사용자의 이메일

        Users currentUser = userRepository.findByEmail(email).orElse(null);
        if (currentUser == null || !currentUser.getUserId().equals(userId)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try {
            Users updatedUser = new Users();
            if (nickname != null) {
                updatedUser.setNickname(nickname);
                updatedUser.setProfile(currentUser.getProfile());
                updatedUser.setUserId(userId);
                updatedUser.setEmail(currentUser.getEmail());
                updatedUser.setName(currentUser.getName());
                updatedUser.setPassword(currentUser.getPassword());
            }
            if (file != null && !file.isEmpty()) {
                // 프로필 파일 저장 및 파일 경로 설정
                Users savedUser = userService.updateUser(updatedUser, file);
            } else if (file == null && nickname == null) {
                // nickname과 profile 모두 수정할 값이 없는 경우, BadRequest 응답
                return new ResponseEntity<>("수정할 내용이 없습니다.", HttpStatus.BAD_REQUEST);
            }
//            updatedUser.setUserId(currentUser.getUserId());
            return new ResponseEntity<>(mapper.userToUserResponseDto(updatedUser), HttpStatus.OK);
        } catch (IOException e) {
            // 파일 저장 오류 처리
            return new ResponseEntity<>("프로필 이미지 저장 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
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
                    return new ResponseEntity<>((mapper.userToUserCheckResponseDto(users)), HttpStatus.OK);
                }
            }
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    // 회원 탈퇴 (토큰 이용 -> 회원 확인)
    @DeleteMapping("/user/{userId}")
    public ResponseEntity deleteUsers(@PathVariable("userId") Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal(); // 인증된 사용자 주체

        if (principal instanceof String) {
            String email = (String) principal;
            Users currentUser = userRepository.findByEmail(email).orElse(null);

            if (currentUser != null && currentUser.getUserId().equals(userId)) {
                userService.deleteUser(userId);
                return ResponseEntity.ok("회원 탈퇴 성공");
            }
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }



}