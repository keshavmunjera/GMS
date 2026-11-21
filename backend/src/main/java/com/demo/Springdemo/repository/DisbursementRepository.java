package com.demo.Springdemo.repository;

import com.demo.Springdemo.model.Disbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisbursementRepository extends JpaRepository<Disbursement, String> {
    List<Disbursement> findByApplicationId(String applicationId);
    List<Disbursement> findByProgramId(String programId);
    List<Disbursement> findByStatus(String status);
    boolean existsByApplicationId(String applicationId);
}
