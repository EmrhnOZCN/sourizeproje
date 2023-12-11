package com.springsourize.controller;

import com.springsourize.dto.AuthResponse;
import com.springsourize.dto.CreateUserRequest;
import com.springsourize.dto.LoginUserRequest;
import com.springsourize.dto.UserResponse;
import com.springsourize.model.TopicEntity;
import com.springsourize.model.UserEntity;

import com.springsourize.repository.UserRepository;
import com.springsourize.service.UserService;
import com.springsourize.service.WebScraperService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/public")
@Slf4j
@CrossOrigin
public class PublicController {

    private final UserService userService ;

    private final UserRepository userRepository;

    private final WebScraperService webScraperService;


    public PublicController(UserService userService, UserRepository userRepository, WebScraperService webScraperService) {
        this.userService = userService;


        this.userRepository = userRepository;
        this.webScraperService = webScraperService;
    }



    @PostMapping("/register")
    public ResponseEntity<UserEntity> register(@RequestBody CreateUserRequest createUserRequest){

        return ResponseEntity.ok(userService.createUser(createUserRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginUserRequest loginUserRequest) {
        try {
            System.out.println("burda");
            String url = "http://www.bbc.com";
            TopicEntity latestTopic = webScraperService.findTopByOrderByUpdatedTimeDesc();
            System.out.println("findTopByOrderByUpdatedTimeDesc() çalıştı. Sonuç: " + latestTopic);


            // Eğer en son kaydedilen konu son 6 saat içinde güncellendiyse tekrar scrape işlemi yapma

            if (latestTopic != null) {
                LocalDateTime latestTopicTime = latestTopic.getUpdatedTime();
                LocalDateTime now = LocalDateTime.now();

                // En son post'un kayıt tarihi ile şu andaki zaman arasındaki farkı kontrol et
                long hoursSinceLastPost = java.time.Duration.between(latestTopicTime, now).toHours();

                System.out.println(hoursSinceLastPost);
                // Eğer 6 saatten fazla bir süre geçtiyse işlemi yap
                if (hoursSinceLastPost > 6) {
                    // İşlemlerinizi burada gerçekleştirin
                    // Örneğin, en son post'u sistemden çıkarabilirsiniz
                    System.out.println("burda1");
                    webScraperService.scrapeWebsite(url);
                }
            }
            else {
                webScraperService.scrapeWebsite(url);

                System.err.println("latestTopic null. İşlem yapılamıyor.");
            }


            UserEntity user = userService.loginUser(loginUserRequest);

            AuthResponse authResponse = new AuthResponse();

            authResponse.setUserId(user.getId());
            authResponse.setFirstName(user.getFirstName());
            authResponse.setLastName(user.getLastName());

            // Kullanıcının premium olup olmadığını kontrol et
            if ("ROLE_PREMIUM".equals(user.getRolesEntity().getRole())) {
                LocalDateTime lastUpdated = user.getRolesEntity().getLastUpdated();
                LocalDateTime now = LocalDateTime.now();

                // Premium olduğu tarihten sonraki 1 ay geçmişse rolü "ROLE_USER" olarak güncelle
                // lastUpdated.plusMinutes(1).isBefore(now)
                if (lastUpdated != null && lastUpdated.plusMinutes(1).isBefore(now)) {
                    user.getRolesEntity().setRole("ROLE_USER");
                    user.getRolesEntity().setLastUpdated(now);
                    // Burada UserRepository veya RoleRepository kullanarak rol güncellemesini kaydedin
                    userRepository.save(user);
                }
            }

            authResponse.setRole(user.getRolesEntity().getRole());

            return ResponseEntity.ok(authResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @GetMapping("/getUser/{userId}")
    public ResponseEntity<Object> getUserData(@PathVariable long userId) {
        Optional<UserEntity> user = userService.findUserNameById(userId);

        if (user.isPresent()) {
            UserResponse userResponse = new UserResponse();
            userResponse.setFirstName(user.get().getFirstName());
            userResponse.setLastName(user.get().getLastName());
            return ResponseEntity.ok(userResponse);
        } else {
            return ResponseEntity.notFound().build(); // User not found
        }
    }





}

