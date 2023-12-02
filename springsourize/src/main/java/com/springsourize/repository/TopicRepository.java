package com.springsourize.repository;

import com.springsourize.model.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TopicRepository extends JpaRepository<TopicEntity,Long> {

    TopicEntity findFirstByOrderByUpdatedTimeDesc();

    @Query(value = "SELECT * FROM topic ORDER BY RANDOM() LIMIT 5", nativeQuery = true)
    List<TopicEntity> findRandomTopic();

    @Query("SELECT t FROM TopicEntity t WHERE t.updatedTime >= :startDate AND t.updatedTime < :endDate")
    List<TopicEntity> findByUpdatedTimeBetween(@Param("startDate") LocalDateTime startDate,
                                               @Param("endDate") LocalDateTime endDate);

}
