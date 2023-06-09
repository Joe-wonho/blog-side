package server.blog.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import server.blog.auth.filter.JwtAuthenticationFilter;
import server.blog.auth.filter.JwtVerificationFilter;
import server.blog.auth.handler.UserAuthenticationFailureHandler;
import server.blog.auth.handler.UserAuthenticationSuccessHandler;
import server.blog.auth.jwt.JwtTokenizer;
import server.blog.auth.utils.UserAuthorityUtils;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.*;

@Configuration
public class SecurityConfiguration {
    private final UserAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;

    public SecurityConfiguration(UserAuthorityUtils authorityUtils,  JwtTokenizer jwtTokenizer) {
        this.authorityUtils = authorityUtils;
        this.jwtTokenizer = jwtTokenizer;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable() // CSRF 비활성화
                .cors(withDefaults()) // corsConfigurationSource라는 이름의 Bean 사용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 생성하지 않음
                .and()
                .formLogin().disable() // 폼 기반 로그인 비활성화
                .httpBasic().disable() // HTTP Basic 인증 비활성화
                .apply(new CustomFilterConfigurer()) // CustomFilterConfigurer() 추가
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()); // 모든 사용자에게 접근 권한 부여
        return http.build();
    }

    // 패스워드 암호화
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // CORS 정책 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 출처에 대해 HTTP 통신 허용
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PATCH","DELETE")); // 해당 HTTP 메서드에 대한 통신 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 URL에 CORS 정책 적용

        return source;
    }

    // Spring Security의 필터 체인에 JwtAuthenticationFilter를 추가하여 JWT 인증을 처리하도록 구성하는 역할
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            // getSharedObject()로 SecurityConfigurer 간 공유되는 객체 획득
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler()); // 로그인 인증 성공 시 처리
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler()); // 로그인 인증 실패 시 처리

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter) // JwtAuthenticationFilter를 Spring Security Filter Chain에 추가
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

}
