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
    // PatchDto -> Post
    default Post patchDtoToPost(Post post, PostDto.Patch requestBody){
        Post newPost = new Post(requestBody.getContent(), requestBody.getImg());
        newPost.getUsers().setUserId(requestBody.getUserId());
        newPost.setPostId(post.getPostId());
        newPost.setCreatedAt(post.getCreatedAt());
        newPost.setNickname(post.getNickname());
        return newPost;
    }



    // Post -> PostResponseDto
//     PostDto.Response postToPostResponseDto(Post post);
    default PostDto.Response postToPostResponseDto(Post post){
        PostDto.Response newPost = new PostDto.Response();
        newPost.setUserId(post.getUsers().getUserId());
        newPost.setNickname(post.getNickname());
        newPost.setCreatedAt(post.getCreatedAt());
        newPost.setImg(post.getImg());
        newPost.setContent(post.getContent());
        newPost.setPostId(post.getPostId());

        return newPost;
    }


//    default PostDto.Response postToPostResponseDto(Post post){
//        if(post == null){
//            return null;
//        }
//
//        PostDto.Response postResponseDto = new PostDto.Response();
//        Users users = post.getUsers();
//        UserDto.UserResponse userDto = new UserDto.UserResponse();
//        userDto.setUserId(users.getUserId());
//        userDto.setNickname(users.getNickname());
//        userDto.setProfile(users.getProfile());
//        userDto.setEmail(users.getEmail());
//        userDto.setName(users.getName());
//
//        postResponseDto.setPostId(post.getPostId());
//        postResponseDto.setContent(post.getContent());
//        postResponseDto.setUserId(post.getUsers().getUserId());
//        postResponseDto.setCreatedAt(post.getCreatedAt());
//        postResponseDto.setImg(post.getImg());
//        postResponseDto.setNickname(post.getNickname());
//
//
////        PostDto.Response newPost = new PostDto.Response();
////        newPost.setNickname(post.getNickname());
////        newPost.setCreatedAt(post.getCreatedAt());
////        newPost.setImg(post.getImg());
////        newPost.setContent(post.getContent());
////        newPost.setPostId(post.getPostId());
//
//        return postResponseDto;
//    }



    // List<Post> -> List<PostResponseDto>
    List<PostDto.Response> PostsToResponseDtos(List<Post> post);
}
