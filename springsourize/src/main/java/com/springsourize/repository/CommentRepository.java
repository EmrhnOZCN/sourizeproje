package com.springsourize.repository;

import com.springsourize.model.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

public interface CommentRepository extends JpaRepository<CommentEntity,Long> {

    @Procedure(procedureName = "add_comment")
    Long addCommentT(
            @Param("p_post_id") Long postId,
            @Param("p_user_id") Long userId,
            @Param("p_content") String content,
            @Param("p_created_at") Timestamp createdAt
    );



}
