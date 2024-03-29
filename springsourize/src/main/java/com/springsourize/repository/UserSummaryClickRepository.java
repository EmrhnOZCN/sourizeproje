package com.springsourize.repository;

import com.springsourize.model.UserEntity;
import com.springsourize.model.UserSummaryClickEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface UserSummaryClickRepository extends JpaRepository<UserSummaryClickEntity,Long> {
    long countByClickDateAfter(LocalDateTime twentyFourHoursAgo);
    long countByUserAndClickDateAfter(UserEntity user, LocalDateTime date);

    void deleteBySummaryId(Long summaryId);

}
