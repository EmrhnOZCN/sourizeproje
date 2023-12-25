package com.springsourize.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user_summary_clicks")
@AllArgsConstructor
@NoArgsConstructor
public class UserSummaryClickEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "summary_id")
    private SummariesEntity summary;


    @Column(name = "click_date")
    private LocalDateTime clickDate;

    @Column(name = "click_count")  // Bu satır eklenmiştir
    private int clickCount;          // Bu satır eklenmiştir
}