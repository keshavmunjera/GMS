package com.demo.Springdemo.service;

import com.demo.Springdemo.dto.DashboardSummaryResponse;
import com.demo.Springdemo.model.Disbursement;
import com.demo.Springdemo.model.GrantApplication;
import com.demo.Springdemo.model.Program;
import com.demo.Springdemo.repository.ApplicationRepository;
import com.demo.Springdemo.repository.DisbursementRepository;
import com.demo.Springdemo.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    private final ProgramRepository programRepository;
    private final ApplicationRepository applicationRepository;
    private final DisbursementRepository disbursementRepository;

    @Autowired
    public DashboardService(ProgramRepository programRepository,
                            ApplicationRepository applicationRepository,
                            DisbursementRepository disbursementRepository) {
        this.programRepository = programRepository;
        this.applicationRepository = applicationRepository;
        this.disbursementRepository = disbursementRepository;
    }

    public DashboardSummaryResponse getSummary() {
        List<Program> programs = programRepository.findAll();
        List<GrantApplication> applications = applicationRepository.findAll();
        List<Disbursement> disbursements = disbursementRepository.findAll();

        double totalPool = programs.stream()
                .mapToDouble(p -> p.getTotalBudget() != null ? p.getTotalBudget() : 0.0)
                .sum();

        double totalAllocated = programs.stream()
                .mapToDouble(p -> p.getAllocatedBudget() != null ? p.getAllocatedBudget() : 0.0)
                .sum();

        double totalDisbursed = disbursements.stream()
                .filter(d -> "Disbursed".equalsIgnoreCase(d.getStatus()))
                .mapToDouble(d -> d.getAmount() != null ? d.getAmount() : 0.0)
                .sum();

        double totalCommitted = applications.stream()
                .filter(a -> "Approved".equalsIgnoreCase(a.getStatus()))
                .mapToDouble(a -> a.getRequestedAmount() != null ? a.getRequestedAmount() : 0.0)
                .sum();

        long approvedCount = applications.stream()
                .filter(a -> "Approved".equalsIgnoreCase(a.getStatus()))
                .count();

        long rejectedCount = applications.stream()
                .filter(a -> "Rejected".equalsIgnoreCase(a.getStatus()))
                .count();

        long inReviewCount = applications.stream()
                .filter(a -> "In Review".equalsIgnoreCase(a.getStatus()) || "Submitted".equalsIgnoreCase(a.getStatus()))
                .count();

        int successRate = 0;
        if (approvedCount + rejectedCount > 0) {
            successRate = (int) Math.round(((double) approvedCount / (approvedCount + rejectedCount)) * 100);
        }

        List<DashboardSummaryResponse.StageBreakdownItem> stages = new ArrayList<>();
        stages.add(DashboardSummaryResponse.StageBreakdownItem.builder()
                .name("Eligibility Screening")
                .count(applications.stream().filter(a -> "Eligibility Screening".equalsIgnoreCase(a.getStage())).count())
                .color("bg-blue-500")
                .build());
        stages.add(DashboardSummaryResponse.StageBreakdownItem.builder()
                .name("Technical Review")
                .count(applications.stream().filter(a -> "Technical Review".equalsIgnoreCase(a.getStage())).count())
                .color("bg-amber-500")
                .build());
        stages.add(DashboardSummaryResponse.StageBreakdownItem.builder()
                .name("Committee Review")
                .count(applications.stream().filter(a -> "Committee Review".equalsIgnoreCase(a.getStage())).count())
                .color("bg-purple-500")
                .build());
        stages.add(DashboardSummaryResponse.StageBreakdownItem.builder()
                .name("Approved & Active")
                .count(applications.stream().filter(a -> "Approved".equalsIgnoreCase(a.getStage())).count())
                .color("bg-emerald-500")
                .build());
        stages.add(DashboardSummaryResponse.StageBreakdownItem.builder()
                .name("Rejected / Ineligible")
                .count(applications.stream().filter(a -> "Rejected".equalsIgnoreCase(a.getStage())).count())
                .color("bg-rose-500")
                .build());

        return DashboardSummaryResponse.builder()
                .totalPool(totalPool)
                .totalAllocated(totalAllocated)
                .totalDisbursed(totalDisbursed)
                .totalCommitted(totalCommitted)
                .applicantCount(applications.size())
                .approvedCount((int) approvedCount)
                .rejectedCount((int) rejectedCount)
                .inReviewCount((int) inReviewCount)
                .successRate(successRate)
                .stageBreakdown(stages)
                .build();
    }
}
