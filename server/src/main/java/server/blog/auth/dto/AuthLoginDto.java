package server.blog.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Email;

@Getter
@Setter
@AllArgsConstructor
public class AuthLoginDto {

    @Valid
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;
    private String name;
    private String nickname;
    private String profile;
}
