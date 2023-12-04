package com.springsourize.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "summaries")
public class SummariesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "post_id")
    private PostEntity post;

    private String textParagraphSummary;



    private LocalDateTime createdAt;

    // Getter ve Setter metotları

    @Override
    public String toString() {
        return "SummariesEntity{" +
                "id=" + id +
                ", post=" + post +
                ", textParagraphSummary='" + textParagraphSummary + '\'' +

                ", createdAt=" + createdAt +
                '}';
    }
}
