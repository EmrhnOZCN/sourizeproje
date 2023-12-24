package com.springsourize.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.springsourize.model.SupportMessageEntity;
import com.springsourize.model.TopicEntity;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


public record MessageDTO(
        Long id,
        String subject,
        String content,
        Long senderId,
        Long recipientId,
        String firstName, String lastName,
        boolean isRead,
        @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
        LocalDateTime timeStamp
){


    public static MessageDTO fromEntity(SupportMessageEntity entity) {
        return new MessageDTO(
                entity.getId(),
                entity.getSubject(),
                entity.getContent(),
                entity.getSender().getId(),
                entity.getRecipient().getId(),
                entity.getSender().getFirstName(),
                entity.getSender().getLastName(),
                entity.isRead(),
                entity.getTimestamp()
        );

    }

}
