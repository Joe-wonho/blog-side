package server.blog.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {
    @Getter
    @Value("${jwt.key}")
    private String secretKey; // JWT 생성 & 검증에 사용되는 Secret Key

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes; // AccessToken 만료 시간

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes; // RefreshToken 만료 시간

    // Plain text 형태의 secretKey를 Base64 형식의 문자열로 인코딩
    public String encodedBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Access Token 발급
    public String generateAccessToken(Map<String, Object> claims, // 토큰에 포함되는 페이로드(사용자 정보)
                                      String subject, // 토큰 주제(사용자 식별자 포함)
                                      Date expiration, // 토큰 만료일시
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey); // 비밀키 -> 디코딩 : 실제 key 값

        return Jwts.builder()
                .setClaims(claims) // 인증된 사용자 관련 정보가 들어있는 claims 추가
                .setSubject(subject) // JWT 제목(토큰 주제, 사용자 식별자 포함)
                .setIssuedAt(Calendar.getInstance().getTime()) // JWT 발행일자 -> 현재시간으로 설정
                .setExpiration(expiration) // JWT 만료일시
                .signWith(key) // 서명을 위한 Key 객체 설정 -> 토큰의 무결성 보장
                .compact(); // JWT 생성 & 직렬화
    }

    // Refresh Token 발급
    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey); // 실제 key 값 -> 토큰 서명에 사용

        return Jwts.builder()
                .setSubject(subject) // 토큰 주제 설정
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    // JWT 서명에 사용될 SecretKey 생성
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] bytes = Decoders.BASE64.decode(base64EncodedSecretKey); // 인코딩된 문자열을 디코딩 -> 바이트 배열로 변환(실제 비밀 키)
        Key key = Keys.hmacShaKeyFor(bytes); // HMAC-SHA 알고리즘을 사용하는 Key 객체를 생성

        return key;
    }

    // 비밀키 -> 토큰 클래임 추출
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey); // 토큰 서명 검증 사용

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key) // 토큰 서명 검증에 사용할 key 객체 설정
                .build()
                .parseClaimsJws(jws); // jws 파싱, 토큰 클레임 추출(이때 서명의 유효성도 함께 검증됨)

        return claims;
    }

    // JWT 검증 메서드(서명의 유효성 검증)
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey); // 디코딩 -> 실제 key 값

        Jwts.parserBuilder()
                .setSigningKey(key) // 서명에 사용된 SecretKey 설정
                .build()
                .parseClaimsJws(jws);
    }

    // JWT 만료 일시 설정 메서드
    public Date getTokenExpiration(int expirationMinutes) { // expirationMinutes : 만료까지 분 단위 시간
        Calendar calendar = Calendar.getInstance(); // 현재 캘린더 인스턴스
        calendar.add(Calendar.MINUTE, expirationMinutes); // 캘린더 시간을 expirationMinutes 만큼 추가(jwt 만료 시간 계산)
        Date expiration = calendar.getTime(); // 만료시간 -> Date 객체로 변환

        return expiration;
    }
}
