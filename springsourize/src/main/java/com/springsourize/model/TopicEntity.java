package com.springsourize.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "topic")
@Data
public class TopicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private LocalDateTime updatedTime;

    private String link;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PostEntity> posts;

    @Override
    public String toString() {
        return "TopicEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", updatedTime=" + updatedTime +
                ", link='" + link + '\'' +
                '}';
    }

}
