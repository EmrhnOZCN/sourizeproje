package com.springsourize.repository;

import com.springsourize.model.SupportMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportMessageRepository extends JpaRepository<SupportMessageEntity,Long> {


    List<SupportMessageEntity> findByRecipientId(Long recipientId);
}
