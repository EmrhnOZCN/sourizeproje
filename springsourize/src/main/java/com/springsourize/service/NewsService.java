package com.springsourize.service;

import com.springsourize.dto.NewsDto.Article;
import com.springsourize.dto.NewsDto.NewsApiResponse;
import com.springsourize.model.PostEntity;
import com.springsourize.model.TopicEntity;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.TopicRepository;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class NewsService {

    private static final String API_KEY = "fa61ab2fc513443abbca2d9e3920072e";
    private static final String NEWS_API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY;

    private final TopicRepository topicRepository;
    private final PostRepository postRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public NewsService(TopicRepository topicRepository, PostRepository postRepository) {
        this.topicRepository = topicRepository;
        this.postRepository = postRepository;
    }

    public NewsApiResponse getTopHeadlines() {
        return restTemplate.getForObject(NEWS_API_URL, NewsApiResponse.class);
    }

    public List<TopicEntity> convertToTopicEntities(List<Article> articles) throws IOException {
        if (articles == null || articles.isEmpty()) {
            return Collections.emptyList();
        }

        List<TopicEntity> topicEntities = new ArrayList<>();

        for (Article article : articles) {
            // Başlık boş ise bu makaleyi atla
            if (article.getTitle() == null || article.getTitle().trim().isEmpty()) {
                continue;
            }

            TopicEntity topicEntity = new TopicEntity();
            topicEntity.setTitle(article.getTitle());
            topicEntity.setUpdatedTime(LocalDateTime.now());
            topicEntity.setLink(article.getUrl());

            fetchParagraphsFromLink(topicEntity, article.getUrl());
            topicEntities.add(topicEntity);
        }

        return topicEntities;
    }

    private List<PostEntity> convertToPostEntities(Article article) {
        return Collections.emptyList();
    }

    private List<String> fetchParagraphsFromLink(TopicEntity topicEntity, String link) throws IOException {
        try {
            Document documentLink = Jsoup.connect(link)
                    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
                    .header("Accept-Language", "en-US,en;q=0.5")
                    .timeout(20000)
                    .get();

            Elements icerikAlaniDiv = documentLink.select("p");

            StringBuilder linkParagraphBuilder = new StringBuilder();

            for (Element element : icerikAlaniDiv) {
                linkParagraphBuilder.append(element.text()).append("\n");
            }

            PostEntity postEntity = new PostEntity();
            postEntity.setTextParagraph(linkParagraphBuilder.toString());
            postEntity.setCreatedAt(LocalDateTime.now());
            postEntity.setTopic(topicEntity);
            topicEntity.setPosts(Collections.singletonList(postEntity));

            topicRepository.save(topicEntity);

            return null;
        } catch (HttpStatusException e) {
            if (e.getStatusCode() == 403) {
                // 403 hatasını görmezden gelin veya loglayın
                System.out.println("403 Hatası: İstek reddedildi. URL: " + link);
                return Collections.emptyList();
            } else if (e.getStatusCode() == 451 ) {
                System.out.println("451  Hatası: İstek reddedildi. URL: " + link);
                return Collections.emptyList();
            }
            else if (e.getStatusCode() == 406 ) {
                System.out.println("406  Hatası: İstek reddedildi. URL: " + link);
                return Collections.emptyList();
            }
            else if (e.getStatusCode() == 436 ) {
                System.out.println("406  Hatası: İstek reddedildi. URL: " + link);
                return Collections.emptyList();
            }
                else {
                // Diğer HTTP durum kodlarını ele alın
                throw e;
            }
        }
    }

    public long getTotalScrapeCount() {

            // Son 24 saat içindeki verileri almak için
            LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);

            return topicRepository.countByUpdatedTimeAfter(twentyFourHoursAgo);

    }
}
