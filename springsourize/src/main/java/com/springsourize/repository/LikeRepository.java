package com.springsourize.repository;

import com.springsourize.dto.PopularPostResultDTO;
import com.springsourize.model.LikeEntity;
import com.springsourize.model.PostEntity;
import com.springsourize.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity,Long> {

    Optional<LikeEntity> findByPostAndUser(PostEntity post, UserEntity user);




    boolean existsByPostIdAndUserId(Long postId, Long userId);
}
