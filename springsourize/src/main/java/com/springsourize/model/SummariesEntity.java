package com.springsourize.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "summaries")
public class SummariesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private PostEntity post;
    @Column(columnDefinition = "TEXT")
    private String textParagraphSummary;

    private LocalDateTime createdAt;

    // Getter ve Setter metotları
    @OneToMany(mappedBy = "summary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserSummaryClickEntity> userSummaryClicks;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SummariesEntity that = (SummariesEntity) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Long.hashCode(id);
    }

    @Override
    public String toString() {
        return "SummariesEntity{" +
                "id=" + id +
                ", post=" + (post != null ? post.getId() : null) +
                ", textParagraphSummary='" + textParagraphSummary + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
