package server.blog.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import server.blog.auth.dto.LoginDto;
import server.blog.auth.jwt.JwtTokenizer;
import server.blog.auth.utils.RedisUtils;
import server.blog.user.entity.Users;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import server.blog.user.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


// 사용자 인증 처리, 인증 성공 -> JWT 생성하여 응답 헤더에 추가
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager; // 인증 처리
    private final JwtTokenizer jwtTokenizer; // JWT 생성, 토큰 관련 도구 제공
    private final UserRepository userRepository;
    private final RedisUtils redisUtils;



    // 인증 시도
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    // 인증 성공(JWT 토근 생성, 응답 헤더에 토큰 추가)
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Users users = (Users) authResult.getPrincipal();

        String accessToken = delegateAccessToken(users);
        String refreshToken = delegateRefreshToken(users);

        response.setHeader("Authorization", "Bearer " + accessToken);


        Long userId = users.getUserId();

        Users users1 = userRepository.findByUserId(userId);

        String name = users.getName();
        String profile = users1.getProfile();

//        String refresh = "Bearer_" + refreshToken;

        Cookie cookie1 = new Cookie("Refresh", refreshToken);
        cookie1.setHttpOnly(true);
        cookie1.setPath("/");
        cookie1.setMaxAge(3600);
        cookie1.setDomain("localhost");
        response.addCookie(cookie1);

        Long expiration = (long) cookie1.getMaxAge(); // cookie1 만료 시간

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userId", userId);
        jsonObject.put("name", name);
        jsonObject.put("profile", profile);
        jsonObject.put("refreshToken", refreshToken);

        // redis에 이메일,refreshToken,만료시간 전달
        redisUtils.setData(
                users.getEmail(),
                refreshToken,
                expiration
        );


    }


    // AccessToken 생성
    private String delegateAccessToken(Users users) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", users.getEmail());
        claims.put("roles", users.getRoles());

        String subject = users.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    // RefreshToken 생성
    private String delegateRefreshToken(Users users) {
        String subject = users.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}