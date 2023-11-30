package com.springsourize.controller;


import com.springsourize.model.TopicEntity;
import com.springsourize.service.WebScraperService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public ResponseEntity<List<TopicEntity>> getTopics() {
        List<TopicEntity> topics = webScraperService.getTopics();
        return ResponseEntity.ok(topics);
    }
}
