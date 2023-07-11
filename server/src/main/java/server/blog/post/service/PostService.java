package server.blog.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import server.blog.awsS3.StorageService;
import server.blog.exception.BusinessLogicException;
import server.blog.exception.ExceptionCode;
import server.blog.post.entity.PostTag;
import server.blog.post.repository.PostRepository;
import server.blog.post.entity.Post;
import server.blog.post.repository.PostTagRepository;
import server.blog.series.entity.Series;
import server.blog.series.repository.SeriesRepository;
import server.blog.tag.dto.TagDto;
import server.blog.tag.entity.Tag;
import server.blog.tag.repository.TagRepository;
import server.blog.user.entity.Users;
import server.blog.user.repository.UserRepository;
import server.blog.user.service.UserService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class PostService {
    private final UserService userService;
    private final PostRepository repository;
    private final StorageService storageService;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;
    private final SeriesRepository seriesRepository;

    public PostService(UserService userService, PostRepository repository, StorageService storageService,
                       UserRepository userRepository, TagRepository tagRepository, PostTagRepository postTagRepository,
                       SeriesRepository seriesRepository){
        this.userService = userService;
        this.repository = repository;
        this.storageService = storageService;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.postTagRepository = postTagRepository;
        this.seriesRepository = seriesRepository;
    }


    public Post savedPost(Post post, List<String> tags, String seriesName) {


        if (seriesName != null && !seriesName.isEmpty()) {
            Optional<Series> existingSeries = seriesRepository.findBySeriesName(seriesName);
            Series series;
            if (existingSeries.isPresent()) {
                series = existingSeries.get();
            } else {
                series = new Series();
                series.setSeriesName(seriesName);
                series.setUsers(post.getUsers());
                seriesRepository.save(series);
            }
            post.setSeries(series);
        } else {
            post.setSeries(null);
        }


        Post savePost = repository.save(post);

        // 태그 처리
        if (tags != null && !tags.isEmpty()) {
            List<PostTag> postTags = tags.stream()
                    .map(tagName -> {
                        Tag tag = tagRepository.findByTagName(tagName)
                                .orElseGet(() -> {
                                    Tag newTag = new Tag();
                                    newTag.setTagName(tagName);
                                    return tagRepository.save(newTag);
                                });

                        PostTag postTag = new PostTag();
                        postTag.setTag(tag);
                        postTag.setPost(savePost);
                        return postTag;
                    })
                    .collect(Collectors.toList());

            savePost.setPostTags(postTags);

            // 포스트 태그 저장
            postTagRepository.saveAll(postTags);

        }


            return savePost;
    }



    public Post findPost(long postId){
        return repository.findById(postId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }


//    @Transactional // 업데이트와 파일 업로드가 하나의 트랜잭션으로 처리되므로, 어느 한 곳에서라도 실패할 경우 롤백
    public Post updatePost(Post post) throws IOException {
        Post findPost = findPost(post.getPostId());

//        // 기존 이미지 삭제 및 새로운 이미지 업로드
//        if (files != null && !files.isEmpty()) {
//            List<String> imageUrls = storageService.uploadFiles(findPost, files);
//            findPost.setImg(imageUrls);
//        }

        return repository.save(findPost);
    }




// 해당 userId가 작성한 게시글을 삭제할 수 있음
    public void deletePost(long userId, Post findPost){
        if(userId != findPost.getUsers().getUserId()) { //  userId와 findPost의 작성자 ID를 비교하여 일치하지 않으면
            throw new BusinessLogicException(ExceptionCode.POST_AUTHOR_NOT_MATCH);
        }
        repository.delete(findPost);
    }


    @Transactional(readOnly = true)
    public Page<Post> findPosts(int page, int size) {
        return repository.findAll(PageRequest.of(page, size,Sort.by("postId").descending()));
    }


    @Transactional(readOnly = true)
    public Page<Post> findUserPosts(String nickname, int page, int size) {
        Users user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        String currentNickname = user.getNickname();

        Pageable pageable = PageRequest.of(page, size);
        return repository.findAllByUsersNickname(currentNickname, pageable);
    }


    @Transactional(readOnly = true)
    public Page<Post> findTagPosts(String nickname, String tagName, int page, int size) {
        Users user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        String currentNickname = user.getNickname();

        Pageable pageable = PageRequest.of(page, size);
        return repository.findAllByUsersNicknameAndPostTag_Tag_TagName(currentNickname, tagName, pageable);
    }



    public List<TagDto.tagResponse> getTagInfoByNickname(String nickname) {
        Optional<Users> user = userRepository.findByNickname(nickname);
        List<Tag> tags = tagRepository.findDistinctByPostTagsPostUsers(user);

        List<TagDto.tagResponse> responseList = new ArrayList<>();

        for (Tag tag : tags) {
            Long count = (long) tag.getPostTags().size();
            TagDto.tagResponse response = new TagDto.tagResponse(tag.getTagName(), count);
            responseList.add(response);
        }

        return responseList;
    }

}
