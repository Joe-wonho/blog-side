package server.blog.post.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import server.blog.tag.entity.Tag;

import javax.persistence.*;


@Data // getter, setter, equals, hashCode, toString, 필드 생성자
@NoArgsConstructor
@Entity
public class PostTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postTagId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;


    // PostTag에 태그 추가
    public void addTag(Tag tag) {
        this.tag = tag;
        if (!this.tag.getPostTags().contains(this)) {
            this.tag.getPostTags().add(this);
        }
    }

    // PostTag에 게시글 추가
    public void addPost(Post post) {
        this.post = post;
        if (!this.post.getPostTag().contains(this)) {
            this.post.getPostTag().add(this);
        }
    }
}
