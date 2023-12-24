package com.springsourize.service;

import com.springsourize.dto.MessageDTO;
import com.springsourize.model.SupportMessageEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.repository.SupportMessageRepository;
import com.springsourize.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {


    private final SupportMessageRepository supportMessageRepository;

    private final UserRepository userRepository;

    public MessageService(SupportMessageRepository supportMessageRepository, UserRepository userRepository) {
        this.supportMessageRepository = supportMessageRepository;
        this.userRepository = userRepository;
    }


    public List<MessageDTO> getMessagesByRecipientId(Long recipientId) {
        List<SupportMessageEntity> messages = supportMessageRepository.findByRecipientId(recipientId);
        return messages.stream()
                .map(MessageDTO::fromEntity) // Kısa bir dönüşüm
                .collect(Collectors.toList());
    }


    public void sendMessage(MessageDTO messageDTO) {
        SupportMessageEntity messageEntity = convertToEntity(messageDTO);
        LocalDateTime now = LocalDateTime.now();
        messageEntity.setTimestamp(now);
        supportMessageRepository.save(messageEntity);
    }


    public void markMessageAsRead(Long messageId) {
        SupportMessageEntity messageEntity = supportMessageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        // İlgili okunma durumu güncellemesi yapılabilir
        messageEntity.setRead(true);
        supportMessageRepository.save(messageEntity);
    }

    private SupportMessageEntity convertToEntity(MessageDTO messageDTO) {
        SupportMessageEntity messageEntity = new SupportMessageEntity();
        messageEntity.setSubject(messageDTO.subject());
        messageEntity.setContent(messageDTO.content());

        UserEntity sender = userRepository.findById(messageDTO.senderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        UserEntity recipient = userRepository.findById(messageDTO.recipientId())
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        messageEntity.setSender(sender);
        messageEntity.setRecipient(recipient);

        return messageEntity;
    }
}
