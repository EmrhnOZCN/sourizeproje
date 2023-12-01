package com.springsourize.controller;

import com.springsourize.dto.PostCommentsDto;
import com.springsourize.model.CommentEntity;
import com.springsourize.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/add")
    public ResponseEntity<CommentEntity> addComment(@RequestParam Long postId, @RequestParam Long userId, @RequestParam String content) {
        CommentEntity addedComment = commentService.addComment(postId, userId, content);
        return new ResponseEntity<>(addedComment, HttpStatus.CREATED);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostCommentsDto> getCommentsByPostId(@PathVariable Long postId) {
        PostCommentsDto postCommentsDto = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(postCommentsDto, HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> removeComment(@PathVariable Long commentId, @RequestParam Long userId) {
        try {
            commentService.removeComment(commentId, userId);
            return ResponseEntity.ok("Yorum başarıyla kaldırıldı.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bir hata oluştu.");
        }
    }
}

