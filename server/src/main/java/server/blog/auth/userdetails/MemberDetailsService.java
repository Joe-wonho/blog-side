package server.blog.auth.userdetails;
import server.blog.auth.utils.UserAuthorityUtils;
import server.blog.user.entity.User;
import server.blog.user.repository.UserRepository;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

// db에서 조회한 User의 인증 정보를 기반으로 인증 처리하는 클래스
@Component
public class MemberDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserAuthorityUtils authorityUtils;

    public MemberDetailsService(UserRepository userRepository,
                                UserAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
    }

    // 사용자명을 기반으로 실제 사용자 정보 검색 -> UserDetails 인터페이스 구현한 객체 반환
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new UsernameNotFoundException(username));

        return new MemberDetails(findUser);
    }

    private final class MemberDetails extends User implements UserDetails {
        public MemberDetails(User user) {
            setUserId(user.getUserId());
            setNickname(user.getNickname());
            setName(user.getName());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }


}