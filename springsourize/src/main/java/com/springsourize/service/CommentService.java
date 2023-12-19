package com.springsourize.service;


import com.springsourize.dto.CommentDto;
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



    public CommentEntity addComment(CommentDto commentDto) {
        PostEntity post = postRepository.findById(commentDto.postId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        UserEntity author = userRepository.findById(commentDto.userId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        CommentEntity comment = new CommentEntity();
        comment.setContent(commentDto.content());
        comment.setPost(post);
        comment.setAuthor(author);
        comment.setCreatedAt(new Date());

        return commentRepository.save(comment);
    }

    public PostCommentsDto getCommentsByPostId(Long postId) {
        System.out.println("burda");
        System.out.println(postId);
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        return PostCommentsDto.fromEntity(post);
    }

    public void removeComment(Long commentId) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        // Yorumu atan kişiyle, yorumun sahibinin aynı kişi olduğunu kontrol et


        // Yorumu kaldır
        commentRepository.delete(comment);
    }


    public long getTotalCommentCount() {
        return commentRepository.count();
    }
}
