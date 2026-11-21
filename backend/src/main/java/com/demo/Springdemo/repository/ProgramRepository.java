package com.demo.Springdemo.repository;

import com.demo.Springdemo.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, String> {
    List<Program> findByStatus(String status);
    List<Program> findByCategory(String category);
    long countByStatus(String status);
}
