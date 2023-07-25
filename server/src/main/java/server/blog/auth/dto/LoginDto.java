package server.blog.auth.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class LoginDto {
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @NotBlank(message = "이메일을 입력하세요.")
    private String email;

    @NotBlank(message = "패스워드를 입력하세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-zA-Z\\d!@#$%^&*()]{8,}$", message = "비밀번호는 최소 8자리이며, 영문, 숫자, 특수문자를 포함해야 합니다.")
    private String password;
}
