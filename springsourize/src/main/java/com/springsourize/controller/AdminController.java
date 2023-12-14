package com.springsourize.controller;

import com.springsourize.dto.CommentDto;
import com.springsourize.dto.PostsDto;
import com.springsourize.dto.TopicDto;
import com.springsourize.model.CommentEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.service.AdminService;
import com.springsourize.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;


    private final AdminService adminService;


    public AdminController(UserService userService, AdminService adminService) {
        this.userService = userService;

        this.adminService = adminService;
    }



    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
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
    @PutMapping("/{userId}/disable")
    public ResponseEntity<Object> disableUser(@PathVariable Long userId) {
        try {
            Optional<UserEntity> updatedUser = Optional.ofNullable(adminService.updateUserEnabledStatus(userId, false));
            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PutMapping("/{userId}/enable")
    public ResponseEntity<Object> enableUser(@PathVariable Long userId) {
        try {
            Optional<UserEntity> updatedUser = Optional.ofNullable(adminService.updateUserEnabledStatus(userId, true));
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

    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable long commentId) {
        try {
            // Comment silme işlemini gerçekleştir
            adminService.deleteComment(commentId);
            return ResponseEntity.ok("Comment successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting comment: " + e.getMessage());
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



}
