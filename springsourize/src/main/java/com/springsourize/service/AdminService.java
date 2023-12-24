package com.springsourize.service;


import com.springsourize.dto.CommentDto;
import com.springsourize.dto.MessageDTO;
import com.springsourize.dto.PostsDto;
import com.springsourize.dto.TopicDto;
import com.springsourize.model.*;
import com.springsourize.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {


    private final UserRepository userRepository;
    public final LikeRepository likeRepository;

    private final PostRepository postRepository;


    private final CommentRepository commentRepository;


    private final TopicRepository topicRepository;

    private final SupportMessageRepository supportMessageRepository;


    public AdminService(UserRepository userRepository, LikeRepository likeRepository, PostRepository postRepository, CommentRepository commentRepository, TopicRepository topicRepository, SupportMessageRepository supportMessageRepository) {
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.topicRepository = topicRepository;
        this.supportMessageRepository = supportMessageRepository;
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserEntity> getUserById(Long userId) {
        return userRepository.findById(userId);
    }


    public UserEntity updateUserEnabledStatusByEmail(String email, boolean isEnabled) {
        Optional<UserEntity> user = getUserByEmail(email);

        if (user.isPresent()) {
            user.get().setEnabled(isEnabled);
            return userRepository.save(user.get());
        } else {
            throw new EntityNotFoundException("User not found with email: " + email);
        }
    }

    private Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findByUsername(email);
    }

    public UserEntity updateUserEnabledStatus(Long userId, boolean isEnabled) {
        Optional<UserEntity> user = getUserById(userId);
        user.get().setEnabled(isEnabled);
        return userRepository.save(user.get());
    }
    public List<CommentDto> getAllCommentsWithDetails() {
        List<CommentEntity> comments = commentRepository.findAll();
        return comments.stream()
                .map(CommentDto::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<CommentEntity> getCommentsById(Long commentId) {
        return commentRepository.findById(commentId);
    }
    public void deleteComment(long commentId) {

        Optional<CommentEntity> commentOptional = commentRepository.findById(commentId);

        // Comment varsa sil
        commentOptional.ifPresent(commentRepository::delete);
    }


    public List<PostsDto> getAllPostsForAdmin() {
        List<PostEntity> posts = postRepository.findAll();
        return posts.stream()
                .map(PostsDto::fromEntity)
                .collect(Collectors.toList());
    }
    public List<TopicDto> getAllTopicForAdmin() {
        List<TopicEntity> topics = topicRepository.findAll();
        return topics.stream()
                .map(TopicDto::fromEntity)
                .collect(Collectors.toList());
    }

    public void deleteTopicWithPosts(long topicId) {
        Optional<TopicEntity> topicEntity = topicRepository.findById(topicId);
        if (topicEntity.isPresent()) {
            topicRepository.deleteById(topicId);
        }
    }

    public List<MessageDTO> getSupportMessage() {
        List<SupportMessageEntity> messages = supportMessageRepository.findAllOrderByIsReadAndTimestampDesc();
        return messages.stream()
                .map(MessageDTO::fromEntity)
                .collect(Collectors.toList());
    }

}
