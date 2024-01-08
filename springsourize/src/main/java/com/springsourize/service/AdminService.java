package com.springsourize.service;


import com.springsourize.dto.CommentDto;
import com.springsourize.dto.MessageDTO;
import com.springsourize.dto.PostsDto;
import com.springsourize.dto.TopicDto;
import com.springsourize.model.*;
import com.springsourize.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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


    private final SummariesRepository summariesRepository;

    private final UserSummaryClickRepository userSummaryClickRepository;
    public AdminService(UserRepository userRepository, LikeRepository likeRepository, PostRepository postRepository, CommentRepository commentRepository, TopicRepository topicRepository, SupportMessageRepository supportMessageRepository, SummariesRepository summariesRepository, UserSummaryClickRepository userSummaryClickRepository) {
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.topicRepository = topicRepository;
        this.supportMessageRepository = supportMessageRepository;
        this.summariesRepository = summariesRepository;
        this.userSummaryClickRepository = userSummaryClickRepository;
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

    public Optional<UserEntity> getUserByEmail(String email) {
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
        List<TopicEntity> topics = topicRepository.findTop25ByOrderByUpdatedTimeDesc();

        return topics.stream()
                .map(TopicDto::fromEntity)
                .collect(Collectors.toList());
    }

    public void deleteTopicWithPosts(long topicId) {
        Optional<TopicEntity> topicEntityOptional = topicRepository.findById(topicId);
        if (topicEntityOptional.isPresent()) {
            TopicEntity topicEntity = topicEntityOptional.get();

            // topic'e ait post kayıtlarını sil
            for (PostEntity post : topicEntity.getPosts()) {


                // post'e ait summary kaydını sil
                deletePostWithSummary(post.getId());
            }

            // topic'i sil
            topicRepository.deleteById(topicId);
        }
    }

    public void deletePostWithSummary(long postId) {
        Optional<PostEntity> postEntityOptional = postRepository.findById(postId);
        if (postEntityOptional.isPresent()) {
            PostEntity postEntity = postEntityOptional.get();

            // post'a ait summary kaydını sil
            deleteSummary(postEntity.getSummary());

            // post'u sil
            postRepository.deleteById(postId);
        }
    }

    public void deleteSummary(SummariesEntity summariesEntity) {


        if (summariesEntity != null) {

            // Önce user_summary_clicks tablosundan referansları sil
            deleteSummaryReferencesFromUserSummaryClicks(summariesEntity);

            // summary'yi sil
            summariesRepository.deleteById(summariesEntity.getId());
        }
    }

    private void deleteSummaryReferencesFromUserSummaryClicks(SummariesEntity summariesEntity) {
        try {
            // Burada summariesEntity ile ilişkili user_summary_clicks referanslarını sil
            // Örneğin:
            System.out.println(summariesEntity.getId());
            userSummaryClickRepository.deleteBySummaryId(summariesEntity.getId());

        } catch (Exception e) {
            // Hata durumunda logla veya ekrana yaz
            e.printStackTrace();
        }
    }


    public List<MessageDTO> getSupportMessage() {
        List<SupportMessageEntity> messages = supportMessageRepository.findAllOrderByIsReadAndTimestampDesc();
        return messages.stream()
                .map(MessageDTO::fromEntity)
                .collect(Collectors.toList());
    }

}
