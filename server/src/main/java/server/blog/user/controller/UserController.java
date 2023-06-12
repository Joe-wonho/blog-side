package server.blog.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.blog.auth.userdetails.PrincipalDetails;
import server.blog.user.dto.UserDto;
import server.blog.user.entity.Users;
import server.blog.user.mapper.UserMapper;
import server.blog.user.repository.UserRepository;
import server.blog.user.service.UserService;

import javax.validation.Valid;
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


    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) throws Exception {
        Users users = mapper.userPostDtoToUser(requestBody);
        Users createdUsers = userService.createUser(users);

        return new ResponseEntity<>((mapper.userToLoginResponseDto(createdUsers)), HttpStatus.CREATED);
    }

    // 회원 정보 수정
    @PatchMapping("/user/{userId}")
    public ResponseEntity patchUser(@Valid @RequestBody UserDto.Patch requestBody,
                                    @PathVariable("userId") Long userId) {
        Users users = mapper.userPatchDtoToUser(requestBody);
        users.setUserId(userId);

        Users findedUsers = userService.updateUser(users);

        return new ResponseEntity<>((mapper.userToUserResponseDto(findedUsers)),HttpStatus.OK);
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


    // 회원 탈퇴 (토큰 이용 -> 일단 보류)
    @DeleteMapping("/user/{userId}")
    public ResponseEntity deleteUsers(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
