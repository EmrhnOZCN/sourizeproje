package com.springsourize.controller;


import com.springsourize.service.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

}
