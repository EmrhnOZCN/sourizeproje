package com.springsourize.dto;

import com.springsourize.model.TopicEntity;
import java.time.LocalDateTime;

public record TopicDto(
        long id,
        String title,
        LocalDateTime updatedTime,
        String link
) {

    public static TopicDto fromEntity(TopicEntity entity) {
        return new TopicDto(
                entity.getId(),
                entity.getTitle(),
                entity.getUpdatedTime(),
                entity.getLink()
        );
    }
}
