package com.demo.Springdemo.service;

import com.demo.Springdemo.dto.PaymentProcessRequest;
import com.demo.Springdemo.model.Disbursement;
import com.demo.Springdemo.model.GrantApplication;
import com.demo.Springdemo.repository.DisbursementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DisbursementService {

    private final DisbursementRepository disbursementRepository;
    private final AuditLogService auditLogService;

    @Autowired
    public DisbursementService(DisbursementRepository disbursementRepository, AuditLogService auditLogService) {
        this.disbursementRepository = disbursementRepository;
        this.auditLogService = auditLogService;
    }

    public List<Disbursement> getAllDisbursements(String applicationId, String programId, String status) {
        if (applicationId != null && !applicationId.trim().isEmpty()) {
            return disbursementRepository.findByApplicationId(applicationId);
        }
        if (programId != null && !programId.trim().isEmpty()) {
            return disbursementRepository.findByProgramId(programId);
        }
        if (status != null && !status.trim().isEmpty()) {
            return disbursementRepository.findByStatus(status);
        }
        return disbursementRepository.findAll();
    }

    public Optional<Disbursement> getDisbursementById(String id) {
        return disbursementRepository.findById(id);
    }

    @Transactional
    public Disbursement createDisbursement(Disbursement disbursement) {
        if (disbursement.getId() == null || disbursement.getId().trim().isEmpty()) {
            disbursement.setId("disb-" + System.currentTimeMillis() + "-" + (int)(Math.random() * 1000));
        }
        return disbursementRepository.save(disbursement);
    }

    @Transactional
    public List<Disbursement> createDefaultScheduleForApplication(GrantApplication app) {
        if (disbursementRepository.existsByApplicationId(app.getId())) {
            return disbursementRepository.findByApplicationId(app.getId());
        }

        double requested = app.getRequestedAmount() != null ? app.getRequestedAmount() : 0.0;
        double tranche1Amount = Math.round(requested * 0.40);
        double tranche2Amount = Math.round(requested * 0.35);
        double tranche3Amount = requested - tranche1Amount - tranche2Amount;

        long now = System.currentTimeMillis();
        LocalDate today = LocalDate.now();

        List<Disbursement> list = new ArrayList<>();

        list.add(Disbursement.builder()
                .id("disb-" + now + "-1")
                .applicationId(app.getId())
                .programId(app.getProgramId())
                .trackingNumber(app.getTrackingNumber())
                .granteeOrg(app.getApplicantOrg())
                .projectTitle(app.getProjectTitle())
                .trancheNumber(1)
                .totalTranches(3)
                .percentage(40.0)
                .amount(tranche1Amount)
                .milestoneRequirement("Initial Execution of Grant Agreement & Mobilization Plan")
                .scheduledDate(today.plusDays(14).toString())
                .disbursedDate(null)
                .status("Scheduled")
                .paymentMethod("Federal Wire ACH")
                .referenceCode(null)
                .notes("Tranche 1 Advance upon contract execution.")
                .build());

        list.add(Disbursement.builder()
                .id("disb-" + now + "-2")
                .applicationId(app.getId())
                .programId(app.getProgramId())
                .trackingNumber(app.getTrackingNumber())
                .granteeOrg(app.getApplicantOrg())
                .projectTitle(app.getProjectTitle())
                .trancheNumber(2)
                .totalTranches(3)
                .percentage(35.0)
                .amount(tranche2Amount)
                .milestoneRequirement("Mid-term Deliverables Completion & Spend Verification")
                .scheduledDate(today.plusDays(120).toString())
                .disbursedDate(null)
                .status("Scheduled")
                .paymentMethod("Federal Wire ACH")
                .referenceCode(null)
                .notes("Tranche 2 upon submission and approval of Midterm report.")
                .build());

        list.add(Disbursement.builder()
                .id("disb-" + now + "-3")
                .applicationId(app.getId())
                .programId(app.getProgramId())
                .trackingNumber(app.getTrackingNumber())
                .granteeOrg(app.getApplicantOrg())
                .projectTitle(app.getProjectTitle())
                .trancheNumber(3)
                .totalTranches(3)
                .percentage(25.0)
                .amount(tranche3Amount)
                .milestoneRequirement("Final Project Closeout & Independent Financial Audit Signoff")
                .scheduledDate(today.plusDays(270).toString())
                .disbursedDate(null)
                .status("Scheduled")
                .paymentMethod("Federal Wire ACH")
                .referenceCode(null)
                .notes("Final retention release.")
                .build());

        return disbursementRepository.saveAll(list);
    }

    @Transactional
    public Disbursement processDisbursement(String id, PaymentProcessRequest request, String role) {
        Disbursement target = disbursementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Disbursement not found with id: " + id));

        String paymentMethod = (request.getPaymentMethod() != null && !request.getPaymentMethod().trim().isEmpty())
                ? request.getPaymentMethod()
                : (target.getPaymentMethod() != null ? target.getPaymentMethod() : "Federal Wire ACH");

        String referenceCode = (request.getReferenceCode() != null && !request.getReferenceCode().trim().isEmpty())
                ? request.getReferenceCode()
                : String.format("TR-WIRE-%06d", (int)(100000 + Math.random() * 900000));

        String notes = (request.getNotes() != null && !request.getNotes().trim().isEmpty())
                ? request.getNotes()
                : target.getNotes();

        target.setStatus("Disbursed");
        target.setDisbursedDate(Instant.now().toString());
        target.setPaymentMethod(paymentMethod);
        target.setReferenceCode(referenceCode);
        target.setNotes(notes);

        Disbursement saved = disbursementRepository.save(target);

        auditLogService.logAction(
                "Disbursed Grant Funds",
                String.format("Released Tranche %d ($%,.0f) to %s for %s. Ref: %s",
                        saved.getTrancheNumber(),
                        saved.getAmount() != null ? saved.getAmount() : 0.0,
                        saved.getGranteeOrg(),
                        saved.getProjectTitle(),
                        saved.getReferenceCode()),
                role != null ? role : request.getRole()
        );

        return saved;
    }
}
