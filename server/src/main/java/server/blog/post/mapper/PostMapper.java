package server.blog.post.mapper;

import org.mapstruct.Mapper;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;


@Mapper(componentModel = "spring")
public interface PostMapper {
    // PostDto -> Post
    Post postDtoToPost(PostDto.Post requestBody);



    // PatchDto -> Post
    Post patchDtoToPost(PostDto.Patch requestBody);



    // Post -> PostResponseDto
    PostDto.Response postToPostResponseDto(Post post);
}
