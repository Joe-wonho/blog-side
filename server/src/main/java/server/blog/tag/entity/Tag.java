package server.blog.tag.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import server.blog.post.entity.PostTag;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Data
@NoArgsConstructor
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    @Column(nullable = false, unique = true)
    private String tagName;

    @OneToMany(mappedBy = "tag")
    private List<PostTag> postTags = new ArrayList<>();

    public void addBoardTag(PostTag postTag) {
        this.postTags.add(postTag);
        if (postTag.getTag() != this) {
            postTag.addTag(this);
        }
    }

}
