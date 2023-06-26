package server.blog.post.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import server.blog.audit.Auditable;
import server.blog.user.entity.Users;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false)
    private String content;

    @Column
    private String nickname;

    @Column
    private List<String> img;
//    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
//    private List<Post_Tag> postTags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private Users users;

//    @ManyToOne
//    @JoinColumn(name = "SERIES_ID")
//    private String series;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Post(Long postId, String content, List<String> img, Users users) {
        this.postId = postId;
        this.content = content;
        this.img = img;
        this.users = users;
    }

    public Post(String content, List<String> img, Users users) {
        this.content = content;
        this.img = img;
        this.users = users;
    }
}
