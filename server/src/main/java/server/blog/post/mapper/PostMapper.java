package server.blog.post.mapper;

import org.mapstruct.Mapper;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;

import java.util.List;


@Mapper(componentModel = "spring")
public interface PostMapper {
    // PostDto -> Post
    default Post postDtoToPost(PostDto.Post requestBody){
        Post post = new Post(requestBody.getUserId(), requestBody.getContent(), requestBody.getImg(),  requestBody.getTags());

        return post;
    }



    // PatchDto -> Post
    Post patchDtoToPost(PostDto.Patch requestBody);



    // Post -> PostResponseDto
    PostDto.Response postToPostResponseDto(Post post);



    // List<Post> -> List<PostResponseDto>
    List<PostDto.Response> PostsToResponseDtos(List<Post> post);
}
