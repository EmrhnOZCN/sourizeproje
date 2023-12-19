package com.springsourize.service;

import com.springsourize.model.PostEntity;
import com.springsourize.model.SummariesEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.model.UserSummaryClickEntity;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.UserRepository;
import com.springsourize.repository.UserSummaryClickRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserSummaryClickService {

    private final UserSummaryClickRepository userSummaryClickRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public UserSummaryClickService(UserSummaryClickRepository userSummaryClickRepository, UserRepository userRepository, PostRepository postRepository) {
        this.userSummaryClickRepository = userSummaryClickRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public void addUserSummaryClick(Long userId, Long postId) {
        Optional<UserEntity> currentUser = userRepository.findById(userId);
        if (currentUser.isPresent()) {
            UserEntity userEntity = currentUser.get();
            if ("ROLE_USER".equals(userEntity.getRolesEntity().getRole())) {
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime oneDayAgo = now.minusDays(1);

                long clickCount = userSummaryClickRepository.countByUserAndClickDateAfter(userEntity, oneDayAgo);

                if (clickCount < 5) {
                    Optional<PostEntity> postEntityOptional = postRepository.findById(postId);
                    if (postEntityOptional.isPresent()) {
                        PostEntity postEntity = postEntityOptional.get();
                        SummariesEntity summariesEntity = postEntity.getSummary();

                        if (summariesEntity != null) {
                            UserSummaryClickEntity userSummaryClick = new UserSummaryClickEntity();
                            userSummaryClick.setUser(currentUser.get());
                            userSummaryClick.setSummary(summariesEntity);
                            userSummaryClick.setClickDate(now);

                            // click_count'u güncelle
                            userSummaryClick.setClickCount((int) (clickCount + 1));

                            // Burada user_summary_clicks tablosuna yeni bir kayıt ekleyin
                            userSummaryClickRepository.save(userSummaryClick);
                        } else {
                            System.out.println("Post'a ait özet bulunmuyor!");
                        }
                    } else {
                        System.out.println("Post ID'ye ait post bulunamadı!");
                    }
                } else {
                    System.out.println("Günlük tıklama limitine ulaşıldı!");
                    throw new RuntimeException("Günlük tıklama limitine ulaşıldı!");
                }
            } else {
                System.out.println("Kullanıcının rolü ROLE_USER değil!");
            }
        } else {
            System.out.println("Kullanıcı ID'ye ait kullanıcı bulunamadı!");
        }
    }


    public long getTotalClickCount() {
        // Son 24 saat içindeki verileri almak için
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        return userSummaryClickRepository.countByClickDateAfter(twentyFourHoursAgo);
    }
}
