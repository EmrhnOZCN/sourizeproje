package com.springsourize.controller;


import com.springsourize.dto.PostsDto;
import com.springsourize.dto.TopicDto;
import com.springsourize.model.PostEntity;
import com.springsourize.model.TopicEntity;
import com.springsourize.service.WebScraperService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class WebScraperController {

    private final WebScraperService webScraperService ;

    public WebScraperController(WebScraperService webScraperService) {
        this.webScraperService = webScraperService;
    }


    @GetMapping("/scrape")
    public void scrapeWebsite() {

        String url = "https://www.haberler.com/guncel/";
        webScraperService.scrapeWebsite(url);
    }

    @GetMapping("/getTopics")
    public ResponseEntity<List<TopicDto>> getTopics() {
        LocalDateTime today = LocalDateTime.now();
        List<TopicEntity> topics = webScraperService.getTopicsByDate(today);
        List<TopicDto> topicDtos = topics.stream()
                .map(TopicDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(topicDtos);
    }

    @GetMapping("/getPosts")
    public ResponseEntity<List<PostsDto>> getPosts() {
        List<PostEntity> posts = webScraperService.getPosts();
        List<PostsDto> postDtos = posts.stream()
                .map(PostsDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(postDtos);
    }

    @GetMapping("/getBestTopics")
    public ResponseEntity<List<TopicDto>> getBestTopics(){

        List<TopicEntity> bessTopics = webScraperService.getBestTopic();

        List<TopicDto> bestTopicDtos = bessTopics.stream()
                .map(TopicDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bestTopicDtos);

    }

    @GetMapping("/getPosts/{postId}")
    public ResponseEntity<PostsDto> getPostById(@PathVariable Long postId) {
        Optional<PostEntity> postOptional = webScraperService.getPostById(postId);

        if (postOptional.isPresent()) {
            PostEntity post = postOptional.get();
            PostsDto postDto = PostsDto.fromEntity(post);
            return ResponseEntity.ok(postDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
