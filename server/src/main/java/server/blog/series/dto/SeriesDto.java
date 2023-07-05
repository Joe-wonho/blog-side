package server.blog.series.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import server.blog.post.dto.PostDto;

public class SeriesDto {
    @Data
    @NoArgsConstructor
    public static class allResponse {
        private String seriesName;
        private String banner; // 해당 시리즈에 있는 첫번째 게시글의 thmbnail
        private Long count; // 게시글 갯수

    }

    @Data
    @NoArgsConstructor
    public static class detailResponse {
        private PostDto.Response post; // 게시글 정보

    }
}
