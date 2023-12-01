package com.springsourize.service;


import com.springsourize.dto.PostCommentsDto;
import com.springsourize.model.CommentEntity;
import com.springsourize.model.PostEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.repository.CommentRepository;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }



    public CommentEntity addComment(Long postId, Long userId, String content) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        UserEntity author = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        CommentEntity comment = new CommentEntity();
        comment.setContent(content);
        comment.setPost(post);
        comment.setAuthor(author);
        comment.setCreatedAt(new Date());

        return commentRepository.save(comment);
    }

    public PostCommentsDto getCommentsByPostId(Long postId) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        return PostCommentsDto.fromEntity(post);
    }

    public void removeComment(Long commentId, Long userId) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        // Yorumu atan kişiyle, yorumun sahibinin aynı kişi olduğunu kontrol et
        if (!comment.getAuthor().getId().equals(userId)) {
            throw new IllegalArgumentException("Bu yorumu kaldırma izniniz yok.");
        }

        // Yorumu kaldır
        commentRepository.delete(comment);
    }



}
