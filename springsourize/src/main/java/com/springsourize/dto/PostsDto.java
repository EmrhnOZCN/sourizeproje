package com.springsourize.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.springsourize.model.PostEntity;
import java.time.LocalDateTime;

public record PostsDto(
        long id,
        String textParagraph,
        @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
        LocalDateTime createdAt
) {

    public static PostsDto fromEntity(PostEntity entity) {
        return new PostsDto(
                entity.getId(),
                entity.getTextParagraph(),
                entity.getCreatedAt()
        );
    }
}
