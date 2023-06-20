package server.blog.auth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import server.blog.auth.jwt.JwtTokenizer;
import server.blog.auth.userdetails.MemberDetailsService;
import server.blog.auth.utils.UserAuthorityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;

import javax.servlet.http.Cookie;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer; // JWT 토큰 관련 도구 제공
    private final UserAuthorityUtils authorityUtils; // 사용자 권한 관련 유틸리티
    private final MemberDetailsService memberDetailsService;
    private final RedisTemplate<String, String> redisTemplate;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, UserAuthorityUtils authorityUtils, MemberDetailsService memberDetailsService, RedisTemplate<String, String> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberDetailsService = memberDetailsService;
        this.redisTemplate = redisTemplate;
    }

    // 실제 필터링 작업 수행
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            isLogout(request); // 로그아웃된 토큰으로 접근 시 401, Unauthorized
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims, request);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }


    // 필터 적용할지 여부 결정
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        String cookie = request.getHeader("Cookie");


        return authorization == null || !authorization.startsWith("Bearer") || (cookie == null);
    }


    // JWT 검증하는 메서드 (HTTP 요청의 헤더에서 JWT 획득 후 -> 클레임 정보 추출)
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        // request의 Header에서 JWT 획득 후 Bearer 부분제거(실제 토큰 값과 구분 위해)
        String jws = request.getHeader("Authorization").replace("Bearer ","");
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    // Authentication 객체를 SecurityContext에 저장하는 메서드
    private void setAuthenticationToContext(Map<String, Object> claims, HttpServletRequest request) {
        // authentication 객체를 securityContext에 저장
        String email = (String)claims.get("email");

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,
                null, authorities);

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String extractAccessTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Authorization".equals(cookie.getName())) {
                    return cookie.getValue().replace("Bearer_", "");
                }
            }
        }
        return null;
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.split(" ")[1];
        }
        return null;
    }

    private void isLogout(HttpServletRequest request) {
        String jwt = resolveToken(request);

        if (!ObjectUtils.isEmpty(redisTemplate.opsForValue().get(jwt))) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
    }

}
