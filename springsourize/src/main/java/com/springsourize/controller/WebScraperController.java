package com.springsourize.controller;


import com.springsourize.dto.PostsDto;
import com.springsourize.dto.TopicDto;
import com.springsourize.model.PostEntity;
import com.springsourize.model.TopicEntity;
import com.springsourize.service.WebScraperService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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
        List<TopicEntity> topics = webScraperService.getTopics();
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

}
