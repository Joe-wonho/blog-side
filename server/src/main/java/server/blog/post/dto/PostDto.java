package server.blog.post.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class PostDto {
    @Getter
    @Setter
    public static class Post{
        public Long userId;
        private String content;
        private List<String> img;
        private List<String> tags;
//    private String series;
    }

    @Getter
    @Setter
    public static class Patch{
        private String content;
        private List<String> img;
    }

    @Getter
    @Setter
    public static class Response{
        private Long userId;
        private String nickname;
        private Long postId;
        private String content;
        private List<String> img;
        private List<String> tag;
        //        private String series;
        private LocalDateTime createdAt;
    }
}
