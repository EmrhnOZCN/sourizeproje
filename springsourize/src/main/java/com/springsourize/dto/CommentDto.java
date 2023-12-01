package com.springsourize.dto;

import com.springsourize.model.CommentEntity;
import lombok.Data;

import java.util.Date;


public record CommentDto(Long id, String content, Long authorId, Date createdAt) {

    public static CommentDto fromEntity(CommentEntity comment) {
        return new CommentDto(
                comment.getId(),
                comment.getContent(),
                comment.getAuthor().getId(),
                comment.getCreatedAt()
        );
    }
}
