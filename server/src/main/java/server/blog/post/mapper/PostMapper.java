package server.blog.post.mapper;

import org.mapstruct.Mapper;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;

import java.util.List;


@Mapper(componentModel = "spring")
public interface PostMapper {
    // PostDto -> Post
//    default Post postDtoToPost(PostDto.Post requestBody){
//        Post post = new Post(requestBody.getUserId(), requestBody.getContent(), requestBody.getImg(),  requestBody.getTags());
//
//        return post;
//    }
//
//
//
//    // PatchDto -> Post
//    default Post patchDtoToPost(Post post, PostDto.Patch requestBody){
//        Post newPost = new Post(requestBody.getUserId(), requestBody.getContent(), requestBody.getImg());
//        newPost.setPostId(post.getPostId());
//        newPost.setCreatedAt(post.getCreatedAt());
//        newPost.setNickname(post.getNickname());
//        return newPost;
//    }



    // Post -> PostResponseDto
//     PostDto.Response postToPostResponseDto(Post post);


    default PostDto.Response postToPostResponseDto(Post post){
        PostDto.Response newPost = new PostDto.Response();
        newPost.setNickname(post.getNickname());
        newPost.setCreatedAt(post.getCreatedAt());
        newPost.setImg(post.getImg());
        newPost.setContent(post.getContent());
        newPost.setPostId(post.getPostId());

        return newPost;
    }



    // List<Post> -> List<PostResponseDto>
    List<PostDto.Response> PostsToResponseDtos(List<Post> post);
}
