package server.blog.auth.refresh;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.blog.auth.jwt.JwtTokenizer;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class RefreshTokenController {
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;

    // refresh 토큰이 쿠키에 담아서 들어왔을 시, 서버에서 새로운 엑세스 토큰 발급
    @PostMapping("/refresh")
    public ResponseEntity<String> refreshAccessToken(@CookieValue(value = "Refresh", required = false) String refreshToken) {
        if (refreshToken != null) {
            try {
                Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey())); // 토큰의 클레임 정보 가져옴

                String email = claims.getBody().getSubject(); // 클레임 정보에서 이메일 추출하여 email 변수에 저장
                Optional<Users> optionalUsers = userRepository.findByEmail(email); // 해당 이메일 가진 사용자 검색

                if (optionalUsers.isPresent()) { // 사용자 존재하면
                    Users users = optionalUsers.get();
                    String accessToken = delegateAccessToken(users); // 새로운 엑세스 토큰

                    return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken).body("Access token refreshed");
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid member email");
                }
            } catch (JwtException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Missing refresh token");
        }
    }

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

}
