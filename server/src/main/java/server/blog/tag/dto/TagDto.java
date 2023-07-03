package server.blog.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

public class TagDto {
    @Getter
    public static class Post {
        @Length(max = 10, message = "태그는 10자 이하여야 합니다.")
        private String tagName;
    }

    @Data
    @NoArgsConstructor
    public static class Response {
        private Long tagId;
        private String tagName;

    }

    @Data
    @NoArgsConstructor
    public static class tagResponse {
        private String tagName;

        private Long count;

        public tagResponse (String tagName, Long count) {
            this.tagName = tagName;
            this.count = count;
        }
    }
}
