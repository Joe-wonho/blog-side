package server.blog.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        private String name;

        private String nickname;

        @Valid
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;

        private String password;


    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        private String nickName;
        private String profile;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class LoginResponse{
        private Long userId;
        private String nickname;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class UserResponse{
        private Long userId;
        private String nickname;
        private String name;
        private String email;
        private String profile;
    }

}
