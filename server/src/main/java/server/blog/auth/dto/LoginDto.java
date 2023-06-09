package server.blog.auth;

import lombok.Getter;

@Getter
public class LoginDto {
    private String email;
    private String password;
}
