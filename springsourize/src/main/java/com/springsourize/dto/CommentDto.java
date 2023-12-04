package com.springsourize.dto;

import com.springsourize.model.CommentEntity;
import lombok.Data;

import java.util.Date;


public record CommentDto(String content,Long postId, Long userId) {

    public static CommentDto fromEntity(CommentEntity comment) {
        return new CommentDto(

                comment.getContent(),
                comment.getPost().getId(),
                comment.getAuthor().getId()

        );
    }
}
