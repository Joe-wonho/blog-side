package server.blog.series.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class SeriesDto {
    @Data
    @NoArgsConstructor
    public static class allResponse {
        private String seriesName;
        private String banner; // 해당 시리즈에 있는 첫번째 게시글의 thumbnail
        private Long count; // 게시글 갯수

    }

    @Data
    @NoArgsConstructor
    public static class detailResponse {
        private Long userId;
        private String nickname;
        private Long postId;
        private String content;
        private List<String> img;
        private List<String> tag;
        private String series;
        private String thumbnail;
        private LocalDateTime createdAt;

    }
}
