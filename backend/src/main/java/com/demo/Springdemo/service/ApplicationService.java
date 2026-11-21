package com.demo.Springdemo.service;

import com.demo.Springdemo.dto.ReviewRequest;
import com.demo.Springdemo.dto.StageAdvanceRequest;
import com.demo.Springdemo.model.CommitteeDecision;
import com.demo.Springdemo.model.GrantApplication;
import com.demo.Springdemo.model.Review;
import com.demo.Springdemo.repository.ApplicationRepository;
import com.demo.Springdemo.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ProgramRepository programRepository;
    private final DisbursementService disbursementService;
    private final AuditLogService auditLogService;

    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository,
                              ProgramRepository programRepository,
                              DisbursementService disbursementService,
                              AuditLogService auditLogService) {
        this.applicationRepository = applicationRepository;
        this.programRepository = programRepository;
        this.disbursementService = disbursementService;
        this.auditLogService = auditLogService;
    }

    public List<GrantApplication> getAllApplications(String programId, String stage, String status) {
        if (programId != null && !programId.trim().isEmpty()) {
            return applicationRepository.findByProgramId(programId);
        }
        if (stage != null && !stage.trim().isEmpty()) {
            return applicationRepository.findByStage(stage);
        }
        if (status != null && !status.trim().isEmpty()) {
            return applicationRepository.findByStatus(status);
        }
        return applicationRepository.findAll();
    }

    public Optional<GrantApplication> getApplicationById(String id) {
        return applicationRepository.findById(id);
    }

    @Transactional
    public GrantApplication submitApplication(GrantApplication app, String role) {
        if (app.getId() == null || app.getId().trim().isEmpty()) {
            app.setId("app-" + System.currentTimeMillis());
        }
        if (app.getTrackingNumber() == null || app.getTrackingNumber().trim().isEmpty()) {
            int randomNum = (int) (1000 + Math.random() * 9000);
            app.setTrackingNumber(String.format("APP-2026-%04d", randomNum));
        }
        if (app.getStatus() == null || app.getStatus().trim().isEmpty()) {
            app.setStatus("Submitted");
        }
        if (app.getStage() == null || app.getStage().trim().isEmpty()) {
            app.setStage("Eligibility Screening");
        }
        if (app.getSubmittedAt() == null || app.getSubmittedAt().trim().isEmpty()) {
            app.setSubmittedAt(Instant.now().toString());
        }
        if (app.getReviews() == null) {
            app.setReviews(new ArrayList<>());
        }

        GrantApplication saved = applicationRepository.save(app);

        // Increment program's applicantCount if programId is provided
        if (saved.getProgramId() != null && !saved.getProgramId().trim().isEmpty()) {
            programRepository.findById(saved.getProgramId()).ifPresent(prog -> {
                int count = prog.getApplicantCount() != null ? prog.getApplicantCount() : 0;
                prog.setApplicantCount(count + 1);
                programRepository.save(prog);
            });
        }

        auditLogService.logAction(
                "Submitted Grant Application",
                String.format("Received application %s from %s for %s. Requested: $%,.0f",
                        saved.getTrackingNumber(),
                        saved.getApplicantOrg(),
                        saved.getProgramTitle(),
                        saved.getRequestedAmount() != null ? saved.getRequestedAmount() : 0.0),
                role
        );

        return saved;
    }

    @Transactional
    public GrantApplication updateApplication(String id, GrantApplication updates) {
        GrantApplication existing = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with id: " + id));

        if (updates.getApplicantOrg() != null) existing.setApplicantOrg(updates.getApplicantOrg());
        if (updates.getOrgType() != null) existing.setOrgType(updates.getOrgType());
        if (updates.getEin() != null) existing.setEin(updates.getEin());
        if (updates.getContactPerson() != null) existing.setContactPerson(updates.getContactPerson());
        if (updates.getContactEmail() != null) existing.setContactEmail(updates.getContactEmail());
        if (updates.getContactPhone() != null) existing.setContactPhone(updates.getContactPhone());
        if (updates.getAddress() != null) existing.setAddress(updates.getAddress());
        if (updates.getYearsOperational() != null) existing.setYearsOperational(updates.getYearsOperational());
        if (updates.getProjectTitle() != null) existing.setProjectTitle(updates.getProjectTitle());
        if (updates.getRequestedAmount() != null) existing.setRequestedAmount(updates.getRequestedAmount());
        if (updates.getProjectDurationMonths() != null) existing.setProjectDurationMonths(updates.getProjectDurationMonths());
        if (updates.getExecutiveSummary() != null) existing.setExecutiveSummary(updates.getExecutiveSummary());
        if (updates.getObjectives() != null) existing.setObjectives(updates.getObjectives());
        if (updates.getBudgetBreakdown() != null) existing.setBudgetBreakdown(updates.getBudgetBreakdown());
        if (updates.getMatchingFunds() != null) existing.setMatchingFunds(updates.getMatchingFunds());
        if (updates.getMatchingPercent() != null) existing.setMatchingPercent(updates.getMatchingPercent());
        if (updates.getEligibilityAnswers() != null) existing.setEligibilityAnswers(updates.getEligibilityAnswers());
        if (updates.getAttachedFiles() != null) existing.setAttachedFiles(updates.getAttachedFiles());
        if (updates.getStatus() != null) existing.setStatus(updates.getStatus());
        if (updates.getStage() != null) existing.setStage(updates.getStage());
        if (updates.getScore() != null) existing.setScore(updates.getScore());
        if (updates.getReviews() != null) existing.setReviews(updates.getReviews());
        if (updates.getCommitteeDecision() != null) existing.setCommitteeDecision(updates.getCommitteeDecision());

        return applicationRepository.save(existing);
    }

    @Transactional
    public GrantApplication submitReview(String id, ReviewRequest request, String role) {
        GrantApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with id: " + id));

        Review newReview = Review.builder()
                .reviewerId(request.getReviewerId() != null ? request.getReviewerId() : "rev-" + System.currentTimeMillis())
                .reviewerName(request.getReviewerName())
                .reviewerRole(request.getReviewerRole())
                .scoreTotal(request.getScoreTotal())
                .scores(request.getScores())
                .strengths(request.getStrengths())
                .concerns(request.getConcerns())
                .recommendation(request.getRecommendation())
                .reviewedAt(request.getReviewedAt() != null ? request.getReviewedAt() : Instant.now().toString())
                .build();

        List<Review> currentReviews = app.getReviews() != null ? new ArrayList<>(app.getReviews()) : new ArrayList<>();
        currentReviews.add(newReview);
        app.setReviews(currentReviews);

        // Recalculate average score
        int totalScore = 0;
        for (Review r : currentReviews) {
            totalScore += (r.getScoreTotal() != null ? r.getScoreTotal() : 0);
        }
        int avgScore = Math.round((float) totalScore / currentReviews.size());
        app.setScore(avgScore);
        app.setStatus("In Review");

        GrantApplication saved = applicationRepository.save(app);

        auditLogService.logAction(
                "Submitted Evaluation Review",
                String.format("Reviewer %s scored Application %s: %d/100. Recommendation: %s",
                        newReview.getReviewerName(),
                        saved.getTrackingNumber(),
                        newReview.getScoreTotal(),
                        newReview.getRecommendation()),
                role != null ? role : request.getRole()
        );

        return saved;
    }

    @Transactional
    public GrantApplication advanceStage(String id, StageAdvanceRequest request, String role) {
        GrantApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with id: " + id));

        String nextStage = request.getStage();
        String decisionNotes = request.getDecisionNotes();
        String newStatus;

        if ("Approved".equalsIgnoreCase(nextStage)) {
            newStatus = "Approved";
            nextStage = "Approved";
            app.setCommitteeDecision(CommitteeDecision.builder()
                    .status("Approved")
                    .approvedAmount(app.getRequestedAmount() != null ? app.getRequestedAmount() : 0.0)
                    .approvedDate(LocalDate.now().toString())
                    .decisionNotes((decisionNotes != null && !decisionNotes.trim().isEmpty())
                            ? decisionNotes
                            : "Approved by Executive Grants Committee.")
                    .signedBy("Hon. Director Marcus Sterling")
                    .build());

            // Create default 3-tranche disbursement schedule
            disbursementService.createDefaultScheduleForApplication(app);

            // Update program allocated budget
            if (app.getProgramId() != null && !app.getProgramId().trim().isEmpty()) {
                programRepository.findById(app.getProgramId()).ifPresent(prog -> {
                    double currentAllocated = prog.getAllocatedBudget() != null ? prog.getAllocatedBudget() : 0.0;
                    double addAmount = app.getRequestedAmount() != null ? app.getRequestedAmount() : 0.0;
                    prog.setAllocatedBudget(currentAllocated + addAmount);
                    programRepository.save(prog);
                });
            }
        } else if ("Rejected".equalsIgnoreCase(nextStage)) {
            newStatus = "Rejected";
            nextStage = "Rejected";
            app.setCommitteeDecision(CommitteeDecision.builder()
                    .status("Rejected")
                    .approvedAmount(0.0)
                    .approvedDate(LocalDate.now().toString())
                    .decisionNotes((decisionNotes != null && !decisionNotes.trim().isEmpty())
                            ? decisionNotes
                            : "Rejected during review stage.")
                    .signedBy("Hon. Director Marcus Sterling")
                    .build());
        } else {
            newStatus = "In Review";
        }

        app.setStage(nextStage);
        app.setStatus(newStatus);

        GrantApplication saved = applicationRepository.save(app);

        auditLogService.logAction(
                "Stage Transition",
                String.format("Application %s progressed to: %s. Notes: %s",
                        saved.getTrackingNumber(),
                        nextStage,
                        (decisionNotes != null && !decisionNotes.trim().isEmpty()) ? decisionNotes : "Stage advanced"),
                role != null ? role : request.getRole()
        );

        return saved;
    }

    @Transactional
    public void deleteApplication(String id) {
        GrantApplication target = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with id: " + id));
        applicationRepository.delete(target);
    }
}
