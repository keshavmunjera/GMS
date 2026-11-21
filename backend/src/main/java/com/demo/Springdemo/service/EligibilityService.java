package com.demo.Springdemo.service;

import com.demo.Springdemo.dto.EligibilityCheckRequest;
import com.demo.Springdemo.dto.EligibilityCheckResponse;
import com.demo.Springdemo.model.EligibilityCriteria;
import com.demo.Springdemo.model.Program;
import com.demo.Springdemo.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EligibilityService {

    private final ProgramRepository programRepository;

    @Autowired
    public EligibilityService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public EligibilityCheckResponse checkEligibility(EligibilityCheckRequest request) {
        Program program = programRepository.findById(request.getProgramId())
                .orElseGet(() -> programRepository.findAll().stream().findFirst().orElse(null));

        if (program == null) {
            throw new IllegalArgumentException("No grant program available for eligibility check.");
        }

        EligibilityCriteria criteria = program.getEligibilityCriteria();
        if (criteria == null) {
            criteria = EligibilityCriteria.builder()
                    .minYearsOperational(1)
                    .requireMatchingFunds(false)
                    .minMatchingPercentage(0.0)
                    .requiresTaxExemptCert(false)
                    .build();
        }

        List<EligibilityCheckResponse.CriterionCheckResult> checks = new ArrayList<>();

        // 1. Entity Type
        List<String> eligibleTypes = criteria.getEligibleOrgTypes() != null ? criteria.getEligibleOrgTypes() : List.of();
        String providedType = request.getOrgType() != null ? request.getOrgType() : "Unknown";
        boolean typePassed = eligibleTypes.isEmpty() || eligibleTypes.contains(providedType);
        checks.add(EligibilityCheckResponse.CriterionCheckResult.builder()
                .id("orgType")
                .label("Legal Entity Type Alignment")
                .required(!eligibleTypes.isEmpty() ? String.join(", ", eligibleTypes) : "Any non-profit or SME")
                .provided(providedType)
                .passed(typePassed)
                .explanation(typePassed
                        ? String.format("\"%s\" is an authorized applicant category for this scheme.", providedType)
                        : String.format("This program restricts applicants to: %s.", String.join(", ", eligibleTypes)))
                .build());

        // 2. Operational Seniority
        int minYears = criteria.getMinYearsOperational() != null ? criteria.getMinYearsOperational() : 1;
        int providedYears = request.getYearsOperational() != null ? request.getYearsOperational() : 0;
        boolean yearsPassed = providedYears >= minYears;
        checks.add(EligibilityCheckResponse.CriterionCheckResult.builder()
                .id("years")
                .label("Minimum Operational History")
                .required(String.format("%d year(s) active registration", minYears))
                .provided(String.format("%d years", providedYears))
                .passed(yearsPassed)
                .explanation(yearsPassed
                        ? String.format("Organization exceeds the minimum operational threshold of %d years.", minYears)
                        : String.format("Applicant organization has only been active for %d years; minimum required is %d years.", providedYears, minYears))
                .build());

        // 3. Matching Funds
        boolean requireMatching = Boolean.TRUE.equals(criteria.getRequireMatchingFunds());
        double minMatchPct = criteria.getMinMatchingPercentage() != null ? criteria.getMinMatchingPercentage() : 0.0;
        double providedMatchPct = request.getMatchingFundsPercent() != null ? request.getMatchingFundsPercent() : 0.0;
        boolean matchingPassed = !requireMatching || (providedMatchPct >= minMatchPct);
        checks.add(EligibilityCheckResponse.CriterionCheckResult.builder()
                .id("matching")
                .label("Matching Funds Commitment")
                .required(requireMatching ? String.format("Min %.0f%% matching commitment", minMatchPct) : "Not required (0%)")
                .provided(String.format("%.1f%% committed", providedMatchPct))
                .passed(matchingPassed)
                .explanation(!requireMatching
                        ? "No matching funds are required for this grant program."
                        : matchingPassed
                        ? String.format("Applicant matching commitment (%.1f%%) satisfies the program mandate (%.0f%%).", providedMatchPct, minMatchPct)
                        : String.format("Program requires at least %.0f%% matching funds; provided %.1f%%.", minMatchPct, providedMatchPct))
                .build());

        // 4. Regulatory & Tax Compliance
        boolean requireTaxExempt = Boolean.TRUE.equals(criteria.getRequiresTaxExemptCert());
        boolean hasTaxExempt = Boolean.TRUE.equals(request.getHasTaxExempt());
        boolean taxPassed = !requireTaxExempt || hasTaxExempt;
        checks.add(EligibilityCheckResponse.CriterionCheckResult.builder()
                .id("compliance")
                .label("Regulatory & Tax Compliance")
                .required(requireTaxExempt ? "Valid Tax Exemption / Good Standing Certificate" : "Standard business registration")
                .provided(hasTaxExempt ? "Verified & On File" : "Not Available")
                .passed(taxPassed)
                .explanation(hasTaxExempt
                        ? "Applicant confirms verified compliance and tax documentation."
                        : "Program requires formal tax registration or good standing documentation.")
                .build());

        // 5. Audited Financial Statements
        boolean hasAudit = Boolean.TRUE.equals(request.getHasAuditedFinancials());
        checks.add(EligibilityCheckResponse.CriterionCheckResult.builder()
                .id("audit")
                .label("Audited Financial Statements")
                .required("Audited statements or independent review")
                .provided(hasAudit ? "Statements Ready" : "Pending")
                .passed(hasAudit)
                .explanation(hasAudit
                        ? "Financial transparency documentation ready for upload."
                        : "Applicants must furnish at least one year of audited or CPA-reviewed financials.")
                .build());

        int passedCount = (int) checks.stream().filter(EligibilityCheckResponse.CriterionCheckResult::getPassed).count();
        int totalCount = checks.size();
        boolean isFullyEligible = passedCount == totalCount;
        boolean isPartiallyEligible = passedCount >= 3 && !isFullyEligible;

        return EligibilityCheckResponse.builder()
                .programId(program.getId())
                .programTitle(program.getTitle())
                .passedCount(passedCount)
                .totalCount(totalCount)
                .isFullyEligible(isFullyEligible)
                .isPartiallyEligible(isPartiallyEligible)
                .checks(checks)
                .build();
    }
}
