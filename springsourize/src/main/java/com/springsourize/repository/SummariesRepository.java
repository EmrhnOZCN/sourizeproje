package com.springsourize.repository;

import com.springsourize.model.SummariesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface SummariesRepository extends JpaRepository<SummariesEntity,Long> {

}
