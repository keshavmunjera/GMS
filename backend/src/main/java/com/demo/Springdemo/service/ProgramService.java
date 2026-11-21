package com.demo.Springdemo.service;

import com.demo.Springdemo.model.Program;
import com.demo.Springdemo.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    private final ProgramRepository programRepository;
    private final AuditLogService auditLogService;

    @Autowired
    public ProgramService(ProgramRepository programRepository, AuditLogService auditLogService) {
        this.programRepository = programRepository;
        this.auditLogService = auditLogService;
    }

    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    public Optional<Program> getProgramById(String id) {
        return programRepository.findById(id);
    }

    @Transactional
    public Program createProgram(Program program, String role) {
        if (program.getId() == null || program.getId().trim().isEmpty()) {
            long count = programRepository.count() + 1;
            program.setId(String.format("prog-%03d", count));
        }
        if (program.getApplicantCount() == null) {
            program.setApplicantCount(0);
        }
        if (program.getAllocatedBudget() == null) {
            program.setAllocatedBudget(0.0);
        }
        if (program.getStatus() == null || program.getStatus().trim().isEmpty()) {
            program.setStatus("Open");
        }

        Program saved = programRepository.save(program);
        auditLogService.logAction(
                "Created Grant Program",
                String.format("Created new grant program: %s (%s) with pool of $%,.0f",
                        saved.getTitle(), saved.getCode(), saved.getTotalBudget() != null ? saved.getTotalBudget() : 0.0),
                role
        );
        return saved;
    }

    @Transactional
    public Program updateProgram(String id, Program updates, String role) {
        Program existing = programRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Program not found with id: " + id));

        if (updates.getTitle() != null) existing.setTitle(updates.getTitle());
        if (updates.getCode() != null) existing.setCode(updates.getCode());
        if (updates.getCategory() != null) existing.setCategory(updates.getCategory());
        if (updates.getDepartment() != null) existing.setDepartment(updates.getDepartment());
        if (updates.getDescription() != null) existing.setDescription(updates.getDescription());
        if (updates.getTotalBudget() != null) existing.setTotalBudget(updates.getTotalBudget());
        if (updates.getAllocatedBudget() != null) existing.setAllocatedBudget(updates.getAllocatedBudget());
        if (updates.getMinAward() != null) existing.setMinAward(updates.getMinAward());
        if (updates.getMaxAward() != null) existing.setMaxAward(updates.getMaxAward());
        if (updates.getStartDate() != null) existing.setStartDate(updates.getStartDate());
        if (updates.getEndDate() != null) existing.setEndDate(updates.getEndDate());
        if (updates.getStatus() != null) existing.setStatus(updates.getStatus());
        if (updates.getApplicantCount() != null) existing.setApplicantCount(updates.getApplicantCount());
        if (updates.getEligibilityCriteria() != null) existing.setEligibilityCriteria(updates.getEligibilityCriteria());
        if (updates.getRequiredDocuments() != null) existing.setRequiredDocuments(updates.getRequiredDocuments());
        if (updates.getRubricCriteria() != null) existing.setRubricCriteria(updates.getRubricCriteria());

        Program saved = programRepository.save(existing);
        auditLogService.logAction(
                "Updated Grant Program",
                String.format("Modified configuration for %s (%s)", saved.getTitle(), saved.getCode()),
                role
        );
        return saved;
    }

    @Transactional
    public void deleteProgram(String id, String role) {
        Program target = programRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Program not found with id: " + id));

        programRepository.delete(target);
        auditLogService.logAction(
                "Deleted Grant Program",
                String.format("Removed program %s (%s)", target.getTitle(), target.getCode()),
                role
        );
    }
}
