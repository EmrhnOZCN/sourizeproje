package com.springsourize.controller;

import com.springsourize.dto.*;
import com.springsourize.model.CommentEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;


    private final AdminService adminService;

    private final CommentService commentService;

    private final SummaryService summaryService;

    private final LikeService likeService;

    private final UserSummaryClickService userSummaryClickService;

    private final WebScraperService webScraperService;

    private final NewsService newsService;


    public AdminController(UserService userService, AdminService adminService, CommentService commentService, SummaryService summaryService, LikeService likeService, UserSummaryClickService userSummaryClickService, WebScraperService webScraperService, NewsService newsService) {
        this.userService = userService;

        this.adminService = adminService;
        this.commentService = commentService;
        this.summaryService = summaryService;
        this.likeService = likeService;
        this.userSummaryClickService = userSummaryClickService;
        this.webScraperService = webScraperService;
        this.newsService = newsService;
    }



    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/getTotalUserCount")
    public ResponseEntity<Long> getTotalUserCount() {
        long totalUserCount = userService.getTotalUserCount();
        return ResponseEntity.ok(totalUserCount-2);
    }
    @GetMapping("/getTotalUserRolePremiumCount")
    public ResponseEntity<Long> getTotalUserRolePremiumCount() {
        long totalUserRolePremiumCount = userService.getCountUsersByRole("ROLE_PREMIUM");
        return ResponseEntity.ok(totalUserRolePremiumCount);
    }

    // Belirli bir kullanıcıyı getir
    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long userId) {
        Optional<UserEntity> user = adminService.getUserById(userId);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Kullanıcıyı sil
//    @DeleteMapping("/deleteUserById/{userId}")
//    public ResponseEntity<String> deleteUserById(@PathVariable Long userId) {
//        boolean deleted = adminService.deleteUserById(userId);
//        if (deleted) {
//            return ResponseEntity.ok("Kullanıcı başarıyla silindi.");
//        } else {
//            return ResponseEntity.badRequest().body("Kullanıcı bulunamadı veya silinemedi.");
//        }
//    }
    @PutMapping("/disable")
    public ResponseEntity<Object> disableUser(@RequestParam String email) {
        try {
            Optional<UserEntity> updatedUser = Optional.ofNullable(adminService.updateUserEnabledStatusByEmail(email, false));
            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/enable")
    public ResponseEntity<Object> enableUser(@RequestParam String email) {
        try {
            Optional<UserEntity> updatedUser = Optional.ofNullable(adminService.updateUserEnabledStatusByEmail(email, true));
            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/getAllCommentsWithDetails")
    public ResponseEntity<List<CommentDto>> getAllCommentsWithDetails() {
        try {
            List<CommentDto> commentsWithDetails = adminService.getAllCommentsWithDetails();
            return ResponseEntity.ok(commentsWithDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/getAllComments/{commentId}")
    public ResponseEntity<CommentEntity> getCommentById(@PathVariable Long commentId) {
        Optional<CommentEntity> comments = adminService.getCommentsById(commentId);
        return comments.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getTotalCommentCount")
    public ResponseEntity<Long> getTotalCommentCount() {
        long totalCommentCount = commentService.getTotalCommentCount();
        return ResponseEntity.ok(totalCommentCount);
    }

    @DeleteMapping("deleteComment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable long commentId) {
        try {
            // Comment silme işlemini gerçekleştir
            adminService.deleteComment(commentId);
            return ResponseEntity.ok("Comment successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting comment: " + e.getMessage());
        }
    }

    @GetMapping("/getPosts")
    public ResponseEntity<List<PostsDto>> getPostsForAdmin() {
        try {
            List<PostsDto> posts = adminService.getAllPostsForAdmin();
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        Optional<UserEntity> userOptional = adminService.getUserByEmail(email);
        return userOptional.map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getTopics")
    public ResponseEntity<List<TopicDto>> getTopicsForAdmin() {
        try {
            List<TopicDto> topics = adminService.getAllTopicForAdmin();
            return ResponseEntity.ok(topics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @DeleteMapping("/deleteTopic/{topicId}")
    public ResponseEntity<String> deleteTopic(@PathVariable long topicId) {
        try {
            // Comment silme işlemini gerçekleştir
            adminService.deleteTopicWithPosts(topicId);
            return ResponseEntity.ok("Comment successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting comment: " + e.getMessage());
        }
    }

    @GetMapping("/getTotalLikeCount")
    public ResponseEntity<Long> getTotalLikeCount() {
        long totalLikeCount = likeService.getTotalLikeCount();
        return ResponseEntity.ok(totalLikeCount);
    }

    @GetMapping("/getSummaryClickCount")
    public ResponseEntity<Long> getUserSummaryClickCount() {
        long totalClickCount = userSummaryClickService.getTotalClickCount();
        return ResponseEntity.ok(totalClickCount);
    }

    @GetMapping("/getScrapeCount")
    public ResponseEntity<Long> getScrapeCount() {
        long totalScrapeCount = newsService.getTotalScrapeCount();
        return ResponseEntity.ok(totalScrapeCount);
    }
    @GetMapping("/getSummaryCount")
    public ResponseEntity<Long> getSummaryCount() {
        long totalSummaryCount = summaryService.getSummaryScrapeCount();
        return ResponseEntity.ok(totalSummaryCount);
    }

    @GetMapping("/getSupportMessage")
    public ResponseEntity<List<MessageDTO>> getMessagesByRecipientId() {
        List<MessageDTO> messages = adminService.getSupportMessage();
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginUserRequest loginUserRequest) {
        try {



            UserEntity user = userService.loginUser(loginUserRequest);

            AuthResponse authResponse = new AuthResponse();



            // Kullanıcının premium olup olmadığını kontrol et

            authResponse.setRole(user.getRolesEntity().getRole());



            return ResponseEntity.ok(authResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }



}
