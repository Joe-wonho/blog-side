package server.blog.series.entity;

import lombok.*;
import server.blog.audit.Auditable;
import server.blog.post.entity.Post;
import server.blog.user.entity.Users;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Series extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "series_id")
    private Long seriesId;

    @Column(name = "series_name", nullable = false)
    private String seriesName;

//    @ManyToOne(fetch = FetchType.LAZY) // 필요할 때까지 로딩x.(Post 엔티티의 users 속성에 접근할 때 해당 Users 엔티티가 로딩됩니다.
//    @JoinColumn(name = "USER_ID")
//    private Users users;

    @OneToMany(mappedBy = "series", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();

    @Builder
    public Series(Long seriesId, String seriesName) {
        this.seriesId = seriesId;
        this.seriesName = seriesName;
    }

}
