package com.springsourize.controller;


import com.springsourize.service.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }


    @PostMapping("/like")
    public ResponseEntity<String> likePost(
            @RequestParam Long postId,
            @RequestParam Long userId) {
        likeService.likePost(postId, userId);
        return ResponseEntity.ok("Post liked successfully");
    }

    @DeleteMapping("/unlike")
    public ResponseEntity<String> unlikePost(
            @RequestParam Long postId,
            @RequestParam Long userId) {
        likeService.unlikePost(postId, userId);
        return ResponseEntity.ok("Post unliked successfully");
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkLikeStatus(
            @RequestParam Long postId,
            @RequestParam Long userId) {
        boolean isLiked = likeService.checkLikeStatus(postId, userId);
        Map<String, Boolean> response = Collections.singletonMap("isLiked", isLiked);
        return ResponseEntity.ok(response);
    }
}
