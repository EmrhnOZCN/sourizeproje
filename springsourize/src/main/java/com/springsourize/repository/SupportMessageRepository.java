package com.springsourize.repository;

import com.springsourize.model.SupportMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupportMessageRepository extends JpaRepository<SupportMessageEntity,Long> {

    @Query("SELECT sm FROM SupportMessageEntity sm ORDER BY sm.isRead, sm.timestamp DESC")
    List<SupportMessageEntity> findAllOrderByIsReadAndTimestampDesc();

    List<SupportMessageEntity> findByRecipientId(Long recipientId);
}
