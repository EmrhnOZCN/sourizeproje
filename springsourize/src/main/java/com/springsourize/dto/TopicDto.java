package com.springsourize.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springsourize.model.TopicEntity;
import java.time.LocalDateTime;

public record TopicDto(

        long id,
        String title,
        @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
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
