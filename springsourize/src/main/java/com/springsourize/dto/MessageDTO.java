package com.springsourize.dto;

import com.springsourize.model.SupportMessageEntity;
import com.springsourize.model.TopicEntity;
import lombok.Data;


public record MessageDTO(
        String subject,
        String content,
        Long senderId,
        Long recipientId
){
    public static MessageDTO fromEntity(SupportMessageEntity entity) {
        return new MessageDTO(
                entity.getSubject(),
                entity.getContent(),
                entity.getSender().getId(),
                entity.getRecipient().getId()
        );

    }

}
