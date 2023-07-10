package server.blog.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import server.blog.post.entity.Post;

@Getter
public class PostDto {
    @Getter
    @Setter
    public static class post{
        public Long userId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private Long userId;
        private String nickname;
        private Long postId;
        private String content;
        private List<String> tag;
        private String series;
        private String thumbnail;
        private String title;
        private LocalDateTime createdAt;


        public Response(Post post) {
            this.userId = post.getUsers().getUserId();
            this.nickname = post.getUsers().getNickname();
            this.postId = post.getPostId();
            this.content = post.getContent();
//            this.tag = post.getPostTag();
            this.series = post.getSeries().getSeriesName();
            this.thumbnail = post.getThumbnail();
            this.title = post.getTitle();
            this.createdAt = post.getCreatedAt();
        }

    }
}
