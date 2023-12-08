package com.springsourize.service;

import com.springsourize.dto.PopularPostResultDTO;
import com.springsourize.model.LikeEntity;
import com.springsourize.model.PostEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.repository.LikeRepository;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    public LikeService(PostRepository postRepository, LikeRepository likeRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
    }

    public void likePost(Long postId, Long userId) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Optional<LikeEntity> existingLike = likeRepository.findByPostAndUser(post, user);

        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
        } else {
            LikeEntity like = new LikeEntity();
            like.setPost(post);
            like.setUser(user);
            like.setLikeDate(new Date());
            likeRepository.save(like);
        }
    }

    public void unlikePost(Long postId, Long userId) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Optional<LikeEntity> existingLike = likeRepository.findByPostAndUser(post, user);

        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
        } else {
            // Like nesnesi zaten silinmiş veya hiç eklenmemiş
            // Burada bir log veya başka bir işlem ekleyebilirsiniz.
            // throw new EntityNotFoundException("Like not found");
        }
    }
    public boolean checkLikeStatus(Long postId, Long userId) {
        // Check if the user has liked the post
        return likeRepository.existsByPostIdAndUserId(postId, userId);
    }






}
