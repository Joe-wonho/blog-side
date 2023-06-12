package server.blog.auth.refresh;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.blog.auth.jwt.JwtTokenizer;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping
public class ExpiredTokenController {
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;

    public ExpiredTokenController(JwtTokenizer jwtTokenizer, UserRepository userRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.userRepository = userRepository;
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> expiredAccessToken(HttpServletRequest request) {
        String expiredToken = request.getHeader("Authorization");
        if (expiredToken != null && expiredToken.startsWith("Bearer ")) {
            String refreshToken = extractRefreshToken(expiredToken);

            if (refreshToken != null) {
                try {
                    Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey()));

                    String email = claims.getBody().getSubject();
                    Optional<Users> optionalUsers = userRepository.findByEmail(email);

                    if (optionalUsers.isPresent()) {
                        Users users = optionalUsers.get();
                        String accessToken = delegateAccessToken(users);

                        return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken).body("Access token refreshed");
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid member email");
                    }
                } catch (JwtException e) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expired token format");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing expired token");
        }
    }

    private String extractRefreshToken(String expiredToken) {
        if (expiredToken.startsWith("Bearer ")) {
            return expiredToken.substring(7);
        } else {
            return null;
        }
    }



    private String delegateAccessToken(Users users) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", users.getEmail());
        claims.put("roles", users.getRoles());
        claims.put("userName", users.getName());

        String subject = users.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }
}