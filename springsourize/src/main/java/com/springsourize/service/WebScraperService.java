package com.springsourize.service;

import com.springsourize.model.TopicEntity;
import com.springsourize.repository.TopicRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class WebScraperService {

    private final TopicRepository topicRepository;

    public WebScraperService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
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
            for (Element link : links) {

                linkList.add(link.attr("href"));
            }
            List<TopicEntity> topicsToSave = new ArrayList<>();
            // Her iki listeyi aynı anda kullanarak TopicEntity'yi oluştur ve kaydet
            for (int i = 0; i < Math.min(paragraphList.size(), linkList.size()); i++) {
                TopicEntity topicEntity = new TopicEntity();
                topicEntity.setTitle(paragraphList.get(i));
                topicEntity.setLink(linkList.get(i));
                topicEntity.setUpdatedTime(LocalDateTime.now());


                topicRepository.save(topicEntity);
            }




        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    public List<TopicEntity> getTopics() {
        return topicRepository.findAll();
    }
}
