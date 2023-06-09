package server.blog.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 비활성화
                .formLogin().disable() // 폼 기반 로그인 비활성화
                .httpBasic().disable() // HTTP Basic 인증 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/user/**").hasRole("USER") //"/user/**" 패턴에 대한 요청은 "USER" 권한 사용자만 허용
                        .antMatchers("/**").permitAll()); // 그 외 모든 요청: 모든 사용자에게 허용
        return http.build();
    }

    // 패스워드 암호화
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
