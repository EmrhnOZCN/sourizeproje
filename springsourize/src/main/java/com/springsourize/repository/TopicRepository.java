package com.springsourize.repository;

import com.springsourize.model.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<TopicEntity,Long> {

    TopicEntity findFirstByOrderByUpdatedTimeDesc();
}
