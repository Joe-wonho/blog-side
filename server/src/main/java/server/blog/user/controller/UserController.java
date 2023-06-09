package server.blog.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.blog.response.SingleResponse;
import server.blog.user.dto.UserDto;
import server.blog.user.entity.Users;
import server.blog.user.mapper.UserMapper;
import server.blog.user.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping
@Validated
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;


    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {
        Users users = mapper.userPostDtoToUser(requestBody);
        Users createdUsers = userService.createUser(users);

        return new ResponseEntity<>(
                new SingleResponse<>(mapper.userToLoginResponseDto(createdUsers)), HttpStatus.CREATED);
    }

    // 회원 정보 수정
    @PatchMapping("/user/{userId}")
    public ResponseEntity patchUser(@Valid @RequestBody UserDto.Patch requestBody,
                                    @PathVariable("userId") Long userId) {
        Users users = mapper.userPatchDtoToUser(requestBody);
        users.setUserId(userId);

        Users findedUsers = userService.updateUser(users);

        return new ResponseEntity<>(
                new SingleResponse<>(mapper.userToUserResponseDto(findedUsers)),HttpStatus.OK);
    }

    // 회원 확인 (토큰 이용 확인 -> 일단 보류)
//    @GetMapping("/user")
//    public ResponseEntity getUser(){
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//
//    }


    // 회원 탈퇴 (토큰 이용 -> 일단 보류)
    @DeleteMapping("/user/{userId}")
    public ResponseEntity deleteUsers(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
