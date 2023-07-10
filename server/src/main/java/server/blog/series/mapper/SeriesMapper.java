package server.blog.series.mapper;

import org.mapstruct.Mapper;
import server.blog.post.entity.Post;
import server.blog.series.dto.SeriesDto;
import server.blog.series.entity.Series;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SeriesMapper {

    default List<SeriesDto.allResponse> seriesToSeriesResponseDto(List<Series> seriesList) {
        Map<String, SeriesDto.allResponse> seriesMap = new HashMap<>();

        for (Series series : seriesList) {
            String seriesName = series.getSeriesName();
            SeriesDto.allResponse response = seriesMap.getOrDefault(seriesName, new SeriesDto.allResponse());
            response.setSeriesName(seriesName);

            List<Post> posts = series.getPosts();
            if (!posts.isEmpty()) {
                Post oldestPost = null;

                for (Post post : posts) {
                    if (oldestPost == null || post.getCreatedAt().isBefore(oldestPost.getCreatedAt())) {
                        oldestPost = post;
                    }
                }

                if (oldestPost != null) {
                    response.setBanner(oldestPost.getThumbnail());
                }
            }

            response.setCount((response.getCount() != null ? response.getCount() : 0) + posts.size());
            seriesMap.put(seriesName, response);
        }

        return new ArrayList<>(seriesMap.values());
    }




    default List<SeriesDto.detailResponse> seriesToSeriesDetailResponseDto(List<Series> list) {
        List<SeriesDto.detailResponse> responseList = new ArrayList<>();

        for (Series series : list) {
            List<Post> posts = series.getPosts(); // 시리즈에 속한 포스트들

            for (Post post : posts) {
                SeriesDto.detailResponse response = new SeriesDto.detailResponse();

                // 포스트 정보 매핑
                response.setUserId(post.getUsers().getUserId());
                response.setNickname(post.getUsers().getNickname());
                response.setPostId(post.getPostId());
                response.setTitle(post.getTitle());
                response.setContent(post.getContent());
                response.setTag(post.getPostTag().stream()
                        .map(postTag -> postTag.getTag().getTagName())
                        .collect(Collectors.toList()));
                response.setSeries(series.getSeriesName());
                response.setThumbnail(post.getThumbnail());
                response.setCreatedAt(post.getCreatedAt());

                responseList.add(response);
            }
        }

        return responseList;
    }

}
