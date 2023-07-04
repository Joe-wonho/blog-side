package server.blog.series.controller;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@Validated
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SeriesController {


    // 포스트 시리즈 전체 조회
//    @GetMapping("/{nickname}/series")
//    public ResponseEntity allSeries(@PathVariable("nickname") String nickname){
//
//    }


    // 포스트 시리즈 상세 조회
}
