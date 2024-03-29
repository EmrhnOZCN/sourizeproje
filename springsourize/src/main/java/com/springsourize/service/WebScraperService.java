package com.springsourize.service;

import com.springsourize.dto.PopularPostResultDTO;
import com.springsourize.dto.TopicDto;
import com.springsourize.exception.CustomException;
import com.springsourize.model.LikeEntity;
import com.springsourize.model.PostEntity;
import com.springsourize.model.TopicEntity;
import com.springsourize.repository.LikeRepository;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.TopicRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.IOException;
import javax.sql.DataSource;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class WebScraperService {

    private final TopicRepository topicRepository;

    private final PostRepository postRepository;

    private final LikeRepository likeRepository;

    private final DataSource dataSource;
    public WebScraperService(TopicRepository topicRepository, PostRepository postRepository, LikeRepository likeRepository, DataSource dataSource) {
        this.topicRepository = topicRepository;
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
        this.dataSource = dataSource;
    }

    public void scrapeWebsite(String url) {
        try {
            Document document = Jsoup.connect(url).get();

            // ".hbBoxText p" sınıfına sahip olan <p> etiketlerini seç
            Elements paragraphs = document.select(".nw-o-link-split__text").select("h3");

            // ".hbBoxMainText a" sınıfına sahip olan <a> etiketlerini seç
            Elements links = document.select(".gs-c-promo-heading").select("a");




            // <p> etiketleri için ayrı bir liste
            List<String> paragraphList = new ArrayList<>();
            for (Element paragraph : paragraphs) {
                paragraphList.add(paragraph.text());
            }

            // <a> etiketleri için ayrı bir liste
            List<String> linkList = new ArrayList<>();
            List<String> linkParagraphList = new ArrayList<>();

            for (Element link : links) {

                String href = link.attr("href");

                // Başında "https" yoksa veya link boşsa atla
                if (href.startsWith("https")) {
                    continue;
                }



                linkList.add(href);

                Document documentLink = Jsoup.connect("http://www.bbc.com"+link.attr("href")).get();
                Elements icerikAlaniDiv = documentLink.select("p");



                StringBuilder linkParagraphBuilder = new StringBuilder();

                // Her bir <p> etiketini döngü ile işle
                for (Element element : icerikAlaniDiv) {

                    linkParagraphBuilder.append(element.text()).append("\n");
                }
                linkParagraphList.add(linkParagraphBuilder.toString());




            }
            List<TopicEntity> topicsToSave = new ArrayList<>();

            // Her iki listeyi aynı anda kullanarak TopicEntity'yi oluştur ve kaydet
            for (int i = 0; i < Math.min(paragraphList.size(), linkList.size()); i++) {
                TopicEntity topicEntity = new TopicEntity();
                topicEntity.setTitle(paragraphList.get(i));
                topicEntity.setLink(linkList.get(i));
                topicEntity.setUpdatedTime(LocalDateTime.now());

                try {
                    // Veritabanında bu başlıkla ilişkili bir konu var mı kontrol et
                    Optional<TopicEntity> existingTopic = topicRepository.findByTitle(paragraphList.get(i));
                    if (existingTopic.isPresent()) {
                        // Eğer varsa, var olan konuya yeni bir post ekle
                        PostEntity postEntity = new PostEntity();
                        postEntity.setTextParagraph(linkParagraphList.get(i));
                        postEntity.setCreatedAt(LocalDateTime.now());
                        postEntity.setTopic(existingTopic.get());
                        existingTopic.get().getPosts().add(postEntity);

                        topicRepository.save(existingTopic.get());
                    } else {
                        // Eğer yoksa, yeni bir konu oluştur ve kaydet
                        PostEntity postEntity = new PostEntity();
                        postEntity.setTextParagraph(linkParagraphList.get(i));
                        postEntity.setCreatedAt(LocalDateTime.now());
                        postEntity.setTopic(topicEntity);
                        topicEntity.setPosts(Collections.singletonList(postEntity));

                        topicRepository.save(topicEntity);
                    }
                } catch (Exception e) {
                    // Hata durumunda uygun şekilde işlem yapın
                    e.printStackTrace();
                }


            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public List<TopicEntity> getTopicsByDate(LocalDateTime date) {
        LocalDateTime startDate = date.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endDate = date.withHour(23).withMinute(59).withSecond(59);
        return topicRepository.findByUpdatedTimeBetween(startDate, endDate);
    }

    public List<PostEntity> getPosts() {
        List<TopicEntity> distinctTopics = topicRepository.findAll()
                .stream()
                .collect(
                        Collectors.toMap(TopicEntity::getTitle, Function.identity(), (existing, replacement) -> existing)
                )
                .values()
                .stream()
                .collect(Collectors.toList());

        List<PostEntity> posts = new ArrayList<>();

        for (TopicEntity topic : distinctTopics) {
            posts.addAll(topic.getPosts());
        }

        return posts;
    }

    public List<TopicEntity> getBestTopics() {
        List<LikeEntity> likes = likeRepository.findAll();

        // Her bir postun beğeni sayısını toplamak için bir Map oluştur
        Map<PostEntity, Long> postLikeCountMap = likes.stream()
                .collect(Collectors.groupingBy(LikeEntity::getPost, Collectors.counting()));

        // En fazla beğeni alan 6 postu bul
        List<PostEntity> maxLikedPosts = postLikeCountMap.entrySet().stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .limit(6)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // En fazla beğeni alan postların ait olduğu topic'leri çek
        return maxLikedPosts.stream()
                .map(PostEntity::getTopic)
                .collect(Collectors.toList());
    }
    public Optional<PostEntity> getPostById(Long postId) {
        return postRepository.findById(postId);
    }


    public List<PopularPostResultDTO> getPopularPostsFromProcedure() {
        List<PopularPostResultDTO> result = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            try (CallableStatement statement = connection.prepareCall("{call get_most_liked_posts_in_last_24_hours()}")) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        result.add(PopularPostResultDTO.fromResultSet(resultSet));
                    }
                }
            }
        } catch (SQLException e) {
            // Handle exception
        }
        return result;
    }
    public List<TopicEntity> findLast30Topics() {

        return topicRepository.findTop30ByOrderByUpdatedTimeDesc();
    }

    public TopicEntity findTopByOrderByUpdatedTimeDesc(){
        return topicRepository.findFirstByOrderByUpdatedTimeDesc();
    }



}