package com.springsourize.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @OneToOne()
    @JoinColumn(name = "topic_id")
    private TopicEntity topic;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<CommentEntity> comments;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<LikeEntity> likes;

    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "post", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    private SummariesEntity summary;

    public void setTextParagraphs(List<String> paragraphs) {
        this.textParagraph = String.join(" ", paragraphs);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostEntity that = (PostEntity) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Long.hashCode(id);
    }

    @Override
    public String toString() {
        return "PostEntity{" +
                "id=" + id +
                ", textParagraph='" + textParagraph + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
