package server.blog.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import server.blog.auth.utils.UserAuthorityUtils;

@Configuration
public class SecurityConfiguration {
    private final UserAuthorityUtils authorityUtils;

    public SecurityConfiguration(UserAuthorityUtils authorityUtils) {
        this.authorityUtils = authorityUtils;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable() // CSRF 비활성화
                .formLogin().disable() // 폼 기반 로그인 비활성화
                .httpBasic().disable() // HTTP Basic 인증 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()); // 모든 사용자에게 접근 권한 부여
        return http.build();
    }

    // 패스워드 암호화
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
