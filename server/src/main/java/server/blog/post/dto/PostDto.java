package server.blog.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import server.blog.post.entity.Post;
import server.blog.tag.dto.TagDto;
import server.blog.tag.entity.Tag;

@Getter
public class PostDto {
    @Getter
    @Setter
    public static class post{
        public Long userId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private Long userId;
        private String nickname;
        private String profile;
        private Long postId;
        private String content;
        private List<String> tag;
        private String series;
        private String thumbnail;
        private String title;
        private LocalDateTime createdAt;


        public Response(Post post) {
            this.userId = post.getUsers().getUserId();
            this.nickname = post.getUsers().getNickname();
            this.profile = post.getUsers().getProfile();
            this.postId = post.getPostId();
            this.content = post.getContent();
            this.series = post.getSeries().getSeriesName();
            this.thumbnail = post.getThumbnail();
            this.title = post.getTitle();
            this.createdAt = post.getCreatedAt();

            this.tag = post.getPostTag().stream()
                    .map(postTag -> {
                        TagDto.Response tagResponse = new TagDto.Response();
                        Tag tag = postTag.getTag();
                        if (tag != null) {
                            tagResponse.setTagId(tag.getTagId());
                            tagResponse.setTagName(tag.getTagName());
                        }
                        return tagResponse;
                    })
                    .filter(tagResponse -> tagResponse.getTagId() != null)
                    .map(TagDto.Response::getTagName)
                    .collect(Collectors.toList());
        }

    }
}
