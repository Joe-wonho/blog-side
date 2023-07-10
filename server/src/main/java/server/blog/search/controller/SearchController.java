package server.blog.search.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.blog.post.dto.PostDto;
import server.blog.response.PageConverter;
import server.blog.search.service.SearchService;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping
@Validated
@Slf4j
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;
    private final PageConverter pageConverter;




    // title 검색어와 일치하는 post 조회
    @GetMapping("/search-by-title")
    public ResponseEntity<PageConverter.PageInfo<PostDto.Response>> findPostByTitle(@RequestParam String title,
                                                                                        @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                                                        @Positive @RequestParam(value = "size", defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<PostDto.Response> posts = searchService.findPostByTitle(title, pageRequest);

        return ResponseEntity.ok(pageConverter.toPageInfo(posts));
    }




    // content 검색어와 일치하는 post 조회
    @GetMapping("/search-by-content")
    public ResponseEntity<PageConverter.PageInfo<PostDto.Response>> findPostByContent(@RequestParam String content,
                                                                                        @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                                                        @Positive @RequestParam(value = "size", defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<PostDto.Response> posts = searchService.findPostByContent(content, pageRequest);

        return ResponseEntity.ok(pageConverter.toPageInfo(posts));
    }

    // tag 검색어와 일치하는 post 조회
    @GetMapping("/search-by-tags")
    public ResponseEntity<PageConverter.PageInfo<PostDto.Response>> findPostByTag(@RequestParam List<String> tags,
                                                                                  @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                                                  @Positive @RequestParam(value = "size", defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<PostDto.Response> posts = searchService.findPostByTags(tags, pageRequest);

        return ResponseEntity.ok(pageConverter.toPageInfo(posts));
    }
}
