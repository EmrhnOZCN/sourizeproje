package com.springsourize.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "support_message")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SupportMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime timestamp;

    @ManyToOne
    private UserEntity sender;

    @ManyToOne
    private UserEntity recipient;

    private boolean isRead;
}
