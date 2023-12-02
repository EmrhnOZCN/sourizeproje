package com.springsourize.service;

import com.springsourize.exception.CustomException;
import com.springsourize.model.PostEntity;
import com.springsourize.model.TopicEntity;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.TopicRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class WebScraperService {

    private final TopicRepository topicRepository;

    private final PostRepository postRepository;

    public WebScraperService(TopicRepository topicRepository, PostRepository postRepository) {
        this.topicRepository = topicRepository;
        this.postRepository = postRepository;
    }

    public void scrapeWebsite(String url) {
        try {
            Document document = Jsoup.connect(url).get();

            // ".hbBoxText p" sınıfına sahip olan <p> etiketlerini seç
            Elements paragraphs = document.select(".hbBoxText").select("p");

            // ".hbBoxMainText a" sınıfına sahip olan <a> etiketlerini seç
            Elements links = document.select(".hbBoxMainText").select("a");

            // <p> etiketleri için ayrı bir liste
            List<String> paragraphList = new ArrayList<>();
            for (Element paragraph : paragraphs) {

                paragraphList.add(paragraph.text());
            }

            // <a> etiketleri için ayrı bir liste
            List<String> linkList = new ArrayList<>();
            List<String> linkParagraphList = new ArrayList<>();

            for (Element link : links) {



                linkList.add(link.attr("href"));
                Document documentLink = Jsoup.connect("http://www.haberler.com"+link.attr("href")).get();
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
                PostEntity postEntity = new PostEntity();
                postEntity.setTextParagraph(linkParagraphList.get(i));
                postEntity.setCreatedAt(LocalDateTime.now());
                postEntity.setTopic(topicEntity);

                topicEntity.setPosts(Collections.singletonList(postEntity));


                try {
                    topicRepository.save(topicEntity);
                } catch (Exception e) {
                    throw new CustomException("Bu konu zaten ekli!");
                }

            }




        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    public List<TopicEntity> getTopicsByDate(LocalDateTime date) {
        LocalDateTime startDate = date.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endDate = date.withHour(23).withMinute(59).withSecond(59);
        return topicRepository.findByUpdatedTimeBetween(startDate, endDate);
    }

    public List<PostEntity> getPosts() {

        return postRepository.findAll();
    }

    public List<TopicEntity> getBestTopic(){

        return topicRepository.findRandomTopic();
    }

    public Optional<PostEntity> getPostById(Long postId) {
        return postRepository.findById(postId);
    }

}
