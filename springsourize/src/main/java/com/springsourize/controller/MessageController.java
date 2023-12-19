package com.springsourize.controller;

import com.springsourize.dto.MessageDTO;
import com.springsourize.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/recipient/{recipientId}")
    public ResponseEntity<List<MessageDTO>> getMessagesByRecipientId(@PathVariable Long recipientId) {
        List<MessageDTO> messages = messageService.getMessagesByRecipientId(recipientId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody MessageDTO messageDTO) {
        messageService.sendMessage(messageDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/mark-as-read/{messageId}")
    public ResponseEntity<Void> markMessageAsRead(@PathVariable Long messageId) {
        messageService.markMessageAsRead(messageId);
        return ResponseEntity.ok().build();
    }
}
