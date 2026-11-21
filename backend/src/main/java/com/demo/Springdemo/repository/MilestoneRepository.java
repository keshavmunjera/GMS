package com.demo.Springdemo.repository;

import com.demo.Springdemo.model.MilestoneReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MilestoneRepository extends JpaRepository<MilestoneReport, String> {
    List<MilestoneReport> findByApplicationId(String applicationId);
    List<MilestoneReport> findByStatus(String status);
}
