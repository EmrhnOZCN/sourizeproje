package com.springsourize.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.springsourize.model.CommentEntity;


public record CommentDto(long id, String content, Long postId, Long userId, String firstName, String lastName, String title,
                         @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss") java.util.Date createdAt) {

    public static CommentDto fromEntity(CommentEntity comment) {
        return new CommentDto(
                comment.getId(),
                comment.getContent(),
                comment.getPost().getId(),
                comment.getAuthor().getId(),
                comment.getAuthor().getFirstName(),
                comment.getAuthor().getLastName(),
                comment.getPost().getTopic().getTitle(),
                comment.getCreatedAt()

        );
    }
}
