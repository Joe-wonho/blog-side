package server.blog.series.mapper;

import org.mapstruct.Mapper;
import server.blog.post.entity.Post;
import server.blog.series.dto.SeriesDto;
import server.blog.series.entity.Series;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

}
