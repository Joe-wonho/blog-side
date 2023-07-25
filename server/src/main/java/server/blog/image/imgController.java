package server.blog.image;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.blog.awsS3.StorageService;
import server.blog.post.entity.Post;
import server.blog.user.entity.Users;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class imgController {
    private final StorageService storageService;
    public imgController(StorageService storageService){
        this.storageService = storageService;
    }


    // 이미지 업로드
    @PostMapping("/uploadImg")
    public ResponseEntity<List<String>> saveImg(@RequestParam(value = "img", required = false) List<MultipartFile> files) throws Exception {
        if (StringUtils.isEmpty(files)) {
            // 이미지 누락된 경우
            return new ResponseEntity<>(Collections.singletonList("이미지 값을 입력하세요."), HttpStatus.BAD_REQUEST);
        }

        List<String> imageUrl = new ArrayList<>();

        if (files != null && !files.isEmpty()) {
            imageUrl = storageService.uploadFiles(files);
        }

        return new ResponseEntity<>(imageUrl, HttpStatus.CREATED);
    }


}
