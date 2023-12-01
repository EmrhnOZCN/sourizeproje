package com.springsourize.repository;

import com.springsourize.model.LikeEntity;
import com.springsourize.model.PostEntity;
import com.springsourize.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity,Long> {

    Optional<LikeEntity> findByPostAndUser(PostEntity post, UserEntity user);

    boolean existsByPostAndUser(PostEntity post, UserEntity user);
}
