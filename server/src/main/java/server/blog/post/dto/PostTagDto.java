package server.blog.post.dto;

import lombok.Builder;
import lombok.Data;

public class PostTagDto {
    @Data
    public static class Add {
        private String tagName;
    }

    @Data
    @Builder
    public static class Response {
        private long tagId;
        private String tagName;
        private Long count;

        public Response(long tagId, String tagName){
            this.tagId = tagId;
            this.tagName = tagName;
        }
        public Response(long tagId, String tagName, Long count){
            this.tagId = tagId;
            this.tagName = tagName;
            this.count = count;
        }
    }
}
