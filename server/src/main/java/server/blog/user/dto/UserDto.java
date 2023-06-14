package server.blog.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @Valid
        @NotBlank(message = "이름을 입력하세요.")
        private String name;

        @Valid
        @NotBlank(message = "닉네임을 입력하세요.")
        private String nickname;

        @Valid
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        @NotBlank(message = "이메일을 입력하세요.")
        private String email;

        @Valid
        @NotBlank(message = "패스워드를 입력하세요.")
        private String password;

        private String profile;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        private String nickName;
        private String profile;
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponse{
        private Long userId;
        private String nickname;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class UserResponse{
        private Long userId;
        private String nickname;
        private String name;
        private String email;
        private String profile;
    }

    @Getter
    @AllArgsConstructor
    public static class UserCheckResponse{
        private Long userId;
        private String nickname;
        private String name;
        private String profile;
    }
}
