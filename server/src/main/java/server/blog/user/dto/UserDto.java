package server.blog.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        private String name;

        private String nickname;

        @NotBlank
        @Email
        private String email;

        @NotBlank
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
        private String userId;
        private String nickName;

    }

    @Getter
    @AllArgsConstructor
    public static class UserResponse{
        private Long userId;
        private String nickname;
        private String name;
        private String email;
        private String profile;
    }
}
