package com.demo.Springdemo.service;

import com.demo.Springdemo.dto.MilestoneApprovalRequest;
import com.demo.Springdemo.model.MilestoneReport;
import com.demo.Springdemo.repository.MilestoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final AuditLogService auditLogService;

    @Autowired
    public MilestoneService(MilestoneRepository milestoneRepository, AuditLogService auditLogService) {
        this.milestoneRepository = milestoneRepository;
        this.auditLogService = auditLogService;
    }

    public List<MilestoneReport> getAllMilestones(String applicationId, String status) {
        if (applicationId != null && !applicationId.trim().isEmpty()) {
            return milestoneRepository.findByApplicationId(applicationId);
        }
        if (status != null && !status.trim().isEmpty()) {
            return milestoneRepository.findByStatus(status);
        }
        return milestoneRepository.findAll();
    }

    public Optional<MilestoneReport> getMilestoneById(String id) {
        return milestoneRepository.findById(id);
    }

    @Transactional
    public MilestoneReport submitMilestone(MilestoneReport report, String role) {
        if (report.getId() == null || report.getId().trim().isEmpty()) {
            report.setId("milestone-" + System.currentTimeMillis());
        }
        report.setStatus("Submitted");
        report.setSubmittedAt(Instant.now().toString());
        report.setApprovedAt(null);
        report.setReviewerNotes(null);

        MilestoneReport saved = milestoneRepository.save(report);

        auditLogService.logAction(
                "Submitted Milestone Report",
                String.format("Grantee %s submitted report for Milestone: \"%s\" (%d%% complete).",
                        saved.getGranteeOrg(),
                        saved.getTitle(),
                        saved.getCompletionPercentage() != null ? saved.getCompletionPercentage() : 0),
                role
        );

        return saved;
    }

    @Transactional
    public MilestoneReport approveMilestone(String id, MilestoneApprovalRequest request, String role) {
        MilestoneReport target = milestoneRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Milestone report not found with id: " + id));

        String notes = (request != null && request.getNotes() != null && !request.getNotes().trim().isEmpty())
                ? request.getNotes()
                : "Verified deliverable receipts. Milestone cleared.";

        target.setStatus("Approved");
        target.setApprovedAt(Instant.now().toString());
        target.setReviewerNotes(notes);

        MilestoneReport saved = milestoneRepository.save(target);

        String actorRole = role != null ? role : (request != null ? request.getRole() : "finance");

        auditLogService.logAction(
                "Approved Milestone Report",
                String.format("Approved milestone report \"%s\" for %s. Tranche unlock authorization generated.",
                        saved.getTitle(),
                        saved.getGranteeOrg()),
                actorRole
        );

        return saved;
    }
}
