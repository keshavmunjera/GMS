package com.demo.Springdemo.repository;

import com.demo.Springdemo.model.GrantApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<GrantApplication, String> {
    Optional<GrantApplication> findByTrackingNumber(String trackingNumber);
    List<GrantApplication> findByProgramId(String programId);
    List<GrantApplication> findByStatus(String status);
    List<GrantApplication> findByStage(String stage);
    long countByStatus(String status);
    long countByStage(String stage);
}
