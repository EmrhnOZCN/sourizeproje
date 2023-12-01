package com.springsourize.service;

import com.springsourize.model.LikeEntity;
import com.springsourize.model.PostEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.repository.LikeRepository;
import com.springsourize.repository.PostRepository;
import com.springsourize.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

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
            likeRepository.save(like);
        }
    }


}
