package server.blog.post.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.web.multipart.MultipartFile;
import server.blog.audit.Auditable;
import server.blog.user.entity.Users;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false)
    private String content;


    @ElementCollection
    private List<String> img;

    @Column
    private String thumbnail;


    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostTag> postTag = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY) // 필요할 때까지 로딩x.(Post 엔티티의 users 속성에 접근할 때 해당 Users 엔티티가 로딩됩니다.
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

    public Post(String content, List<String> img) {
        this.content = content;
        this.img = img;
    }

    public void setPostTags(List<PostTag> postTags) {
        this.postTag = postTags;
        for (PostTag postTag : postTags) {
            postTag.setPost(this);
        }
    }
}
