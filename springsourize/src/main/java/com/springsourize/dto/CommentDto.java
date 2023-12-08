package com.springsourize.dto;

import com.springsourize.model.CommentEntity;
import lombok.Data;

import java.util.Date;


public record CommentDto(String content,Long postId, Long userId,String firstName,String lastName) {

    public static CommentDto fromEntity(CommentEntity comment) {
        return new CommentDto(

                comment.getContent(),
                comment.getPost().getId(),
                comment.getAuthor().getId(),
                comment.getAuthor().getFirstName(),
                comment.getAuthor().getLastName()

        );
    }
}
