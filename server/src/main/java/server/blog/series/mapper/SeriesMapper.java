package server.blog.series.mapper;

import org.mapstruct.Mapper;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;
import server.blog.series.dto.SeriesDto;
import server.blog.series.entity.Series;
import server.blog.post.entity.PostTag;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SeriesMapper {

    default List<SeriesDto.allResponse> seriesToSeriesResponseDto(List<Series> seriesList){
        Map<String, SeriesDto.allResponse> seriesMap = new HashMap<>();

        for (Series series : seriesList) {
            String seriesName = series.getSeriesName();
            SeriesDto.allResponse response = seriesMap.getOrDefault(seriesName, new SeriesDto.allResponse());
            response.setSeriesName(seriesName);

            List<Post> posts = series.getPosts();
            if (!posts.isEmpty()) {
                response.setBanner(posts.get(0).getThumbnail());
            }

            response.setCount((response.getCount() != null ? response.getCount() : 0) + posts.size());

            seriesMap.put(seriesName, response);
        }

        return new ArrayList<>(seriesMap.values());
    }




    default List<SeriesDto.detailResponse> seriesToSeriesDetailResponseDto(List<Series> list) {
        List<SeriesDto.detailResponse> responseList = new ArrayList<>();

        for (Series series : list) {
            SeriesDto.detailResponse response = new SeriesDto.detailResponse();

            // 게시글 정보 가져오기
            List<Post> posts = series.getPosts(); // 시리즈에 속한 포스트들

            for (Post post : posts) {
                PostDto.Response postResponse = new PostDto.Response();

                // 포스트 정보를 가져오는 로직을 구현해야 합니다.
                // 예시로 getContent() 메서드를 사용하였습니다.
                postResponse.setContent(post.getContent());
                postResponse.setImg(post.getImg());
                postResponse.setUserId(post.getUsers().getUserId());
                postResponse.setNickname(post.getUsers().getNickname());
                postResponse.setPostId(post.getPostId());

                // 포스트 태그 정보를 가져오기
                List<String> tagList = post.getPostTag().stream()
                        .map(postTag -> postTag.getTag().getTagName())
                        .collect(Collectors.toList());

                postResponse.setTag(tagList);
                postResponse.setSeries(series.getSeriesName());
                postResponse.setThumbnail(post.getThumbnail());
                postResponse.setCreatedAt(post.getCreatedAt());

                response.setPost(postResponse);
                responseList.add(response);
            }
        }

        return responseList;
    }

}
