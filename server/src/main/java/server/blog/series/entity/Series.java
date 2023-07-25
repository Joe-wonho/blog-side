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


    @OneToMany(mappedBy = "series", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private Users users;

    @Builder
    public Series(Long seriesId, String seriesName) {
        this.seriesId = seriesId;
        this.seriesName = seriesName;
    }

}
