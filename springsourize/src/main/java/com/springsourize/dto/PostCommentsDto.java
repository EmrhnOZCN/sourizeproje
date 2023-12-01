package com.springsourize.dto;

import com.springsourize.model.PostEntity;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;


public record PostCommentsDto(Long postId, List<CommentDto> comments) {

    public static PostCommentsDto fromEntity(PostEntity post) {
        return new PostCommentsDto(
                post.getId(),
                post.getComments().stream()
                        .map(CommentDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}