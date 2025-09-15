package dev.yk.movies;

import ch.qos.logback.core.net.SyslogOutputStream;
import dev.yk.movies.dtos.ReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;


    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewDto payload){
        System.out.println(payload);
        return new ResponseEntity<>(reviewService.creareReview(payload.reviewBody(),payload.imdbId()), HttpStatus.CREATED);

    }
}
