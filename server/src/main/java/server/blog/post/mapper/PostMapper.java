package server.blog.post.mapper;

import org.mapstruct.Mapper;
import server.blog.post.dto.PostDto;
import server.blog.post.entity.Post;
import server.blog.tag.dto.TagDto;
import server.blog.tag.entity.Tag;

import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface PostMapper {


    // Post -> PostResponseDto
    //시리즈, 태그 수정 추가
    default PostDto.Response postToPostResponseDto(Post post){
        PostDto.Response newPost = new PostDto.Response();
        newPost.setUserId(post.getUsers().getUserId());
        newPost.setNickname(post.getUsers().getNickname());
        newPost.setProfile(post.getUsers().getProfile());
        newPost.setCreatedAt(post.getCreatedAt());
        newPost.setContent(post.getContent());
        newPost.setPostId(post.getPostId());
        newPost.setThumbnail(post.getThumbnail());
        newPost.setTitle(post.getTitle());
        if (post.getSeries() != null) {
            newPost.setSeries(post.getSeries().getSeriesName());
        }

        // 태그 정보 추가
        List<TagDto.Response> tagResponses = post.getPostTag().stream()
                .map(postTag -> {
                    TagDto.Response tagResponse = new TagDto.Response();
                    Tag tag = postTag.getTag();
                    if (tag != null) {
                        tagResponse.setTagId(tag.getTagId());
                        tagResponse.setTagName(tag.getTagName());
                    }
                    return tagResponse;
                })
                .filter(tagResponse -> tagResponse.getTagId() != null) // null인 경우 필터링
                .collect(Collectors.toList());
        newPost.setTag(tagResponses.stream().map(TagDto.Response::getTagName).collect(Collectors.toList()));

        return newPost;
    }



    // List<Post> -> List<PostResponseDto>
    List<PostDto.Response> PostsToResponseDtos(List<Post> post);
}
