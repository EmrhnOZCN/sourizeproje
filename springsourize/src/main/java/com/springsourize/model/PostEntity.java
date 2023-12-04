package com.springsourize.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post")
@Data
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "TEXT")
    @JsonIgnore
    private String textParagraph;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private TopicEntity topic;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CommentEntity> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LikeEntity> likes;

    private LocalDateTime createdAt;

    // Sadece bu satırı tutun
    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL)
    private SummariesEntity summary;

    @Override
    public String toString() {
        return "PostEntity{" +
                "id=" + id +
                ", textParagraph='" + textParagraph + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
