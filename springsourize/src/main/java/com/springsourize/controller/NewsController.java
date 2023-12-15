package com.springsourize.controller;


import com.springsourize.dto.NewsDto.Article;
import com.springsourize.dto.NewsDto.NewsApiResponse;
import com.springsourize.model.TopicEntity;
import com.springsourize.service.NewsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/getAll")
    public NewsApiResponse getNewsAll(){

        return newsService.getTopHeadlines();
    }
    @GetMapping("/top-headlines")
    public List<TopicEntity> getTopHeadlines() throws IOException {
        NewsApiResponse newsApiResponse = newsService.getTopHeadlines();
        List<Article> articles = newsApiResponse.getArticles();

        // Convert articles to TopicEntity and save
        List<TopicEntity> topicEntities = newsService.convertToTopicEntities(articles);

        // Assuming you have a method to save the entities to your repository
        // Implement this method based on your data model and requirements
        // Example: topicEntityRepository.saveAll(topicEntities);

        return topicEntities;
    }

}
