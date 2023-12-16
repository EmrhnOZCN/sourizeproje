package com.springsourize.service;

import com.springsourize.model.PostEntity;
import com.springsourize.model.SummariesEntity;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.SummariesRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.net.http.HttpClient;  // Eklenmiş import bildirimi
import java.net.http.HttpRequest;  // Eklenmiş import bildirimi
import java.net.http.HttpResponse;
@Service
public class SummaryService {
    private static final String HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/tuner007/pegasus_summarizer";
    private static final String HUGGINGFACE_API_KEY = "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";

    private final SummariesRepository summariesRepository;
    private final PostRepository postRepository;
    private final HttpClient httpClient;

    public SummaryService(SummariesRepository summariesRepository, PostRepository postRepository) {
        this.summariesRepository = summariesRepository;
        this.postRepository = postRepository;
        this.httpClient = HttpClient.newHttpClient();
    }

    public String querydata(Long postId)  {
        // Debug için
        System.out.println(postId);

        PostEntity post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip post bulunamadı."));

        SummariesEntity summary = post.getSummary();
        if (summary != null) {
            return summary.getTextParagraphSummary();
        }

        String data = post.getTextParagraph();
        String response;

        try {
            // Modelin yüklenmesini bekleyen ve belirli bir süre içinde yüklenmezse hata döndüren kısım
            boolean modelLoaded = waitForModelToLoad(Duration.ofMinutes(25));

            if (modelLoaded) {
                // Model yüklendiyse sorgu yapabilirsiniz
                response = query(data).orTimeout(200, TimeUnit.SECONDS).join(); // 10 saniye bekleyecek
            } else {
                // Belirli süre içinde model yüklenmezse hata mesajı döndürün
                response = "Error: Model could not be loaded within the specified time.";
            }
        } catch (Exception e) {
            // Zaman aşımı durumunda hata mesajını yönetin
            response = "Model yüklenirken zaman aşımına uğrandı veya başka bir hata oluştu.";
            e.printStackTrace(); // Hata izleme (isteğe bağlı)
        }

        // Model yüklenmişse ve sorgu başarılıysa özeti kaydedin
        if (!response.startsWith("Error")) {
            SummariesEntity newSummary = new SummariesEntity();
            newSummary.setPost(post);
            newSummary.setTextParagraphSummary(response);
            newSummary.setCreatedAt(LocalDateTime.now());
            summariesRepository.save(newSummary);
        }

        return response;
    }

    public CompletableFuture<String> query(String data) {
        HttpClient httpClient = HttpClient.newHttpClient();  // HttpClient nesnesini oluşturun

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(HUGGINGFACE_API_URL))
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + HUGGINGFACE_API_KEY)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .POST(HttpRequest.BodyPublishers.ofString(data))
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body);
    }

    private boolean waitForModelToLoad(Duration timeout) throws InterruptedException {
        long startTime = System.currentTimeMillis();

        while (System.currentTimeMillis() - startTime < timeout.toMillis()) {
            // Modelin yüklenip yüklenmediğini kontrol etmek için özel bir sorgu yapabilirsiniz
            boolean modelLoaded = isModelLoaded();

            if (modelLoaded) {
                return true; // Model yüklendi
            }

            // Belirli bir aralıkla kontrol yapılması için bekleyin (örneğin, 5 saniye)
            TimeUnit.SECONDS.sleep(5);
        }

        return false; // Belirtilen süre içinde model yüklenmedi
    }

    private boolean isModelLoaded() {
        // Modelin yüklenip yüklenmediğini kontrol etmek için özel bir sorgu yapabilirsiniz
        // Örneğin, Hugging Face API kullanarak modelin durumunu kontrol etmek
        // Bu örnekte, basit bir kontrol gerçekleştiriliyor
        return Math.random() < 0.8; // Rastgele başarı oranı
    }
}
