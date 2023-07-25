package server.blog.auth.userdetails;
import server.blog.auth.utils.UserAuthorityUtils;
import server.blog.user.entity.Users;
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
        Optional<Users> optionalUser = userRepository.findByEmail(username);
        Users findUsers = optionalUser.orElseThrow(() -> new UsernameNotFoundException(username));

        return new MemberDetails(findUsers);
    }

    private final class MemberDetails extends Users implements UserDetails {
        public MemberDetails(Users users) {
            setUserId(users.getUserId());
            setNickname(users.getNickname());
            setName(users.getName());
            setEmail(users.getEmail());
            setPassword(users.getPassword());
            setRoles(users.getRoles());
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