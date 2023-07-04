package server.blog.series.mapper;

import org.mapstruct.Mapper;
import server.blog.post.entity.Post;
import server.blog.series.dto.SeriesDto;
import server.blog.series.entity.Series;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SeriesMapper {

    default List<SeriesDto.allResponse> seriesToSeriesResponseDto(List<Series> seriesList){
        List<SeriesDto.allResponse> responseList = new ArrayList<>();

        for (Series series : seriesList) {
            SeriesDto.allResponse newResponse = new SeriesDto.allResponse();
            newResponse.setSeriesName(series.getSeriesName());

            List<Post> posts = series.getPosts();
            if (!posts.isEmpty()) {
                newResponse.setBanner(posts.get(0).getThumbnail());
            }

            newResponse.setCount((long) posts.size());

            responseList.add(newResponse);
        }

        return responseList;
    }

}
