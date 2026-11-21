package com.demo.Springdemo.model;

import com.demo.Springdemo.converter.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "grant_applications")
public class GrantApplication {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "tracking_number", length = 64, unique = true, nullable = false)
    private String trackingNumber;

    @Column(name = "program_id", length = 64)
    private String programId;

    @Column(name = "program_title", length = 255)
    private String programTitle;

    @Column(name = "program_code", length = 64)
    private String programCode;

    @Column(name = "applicant_org", length = 255)
    private String applicantOrg;

    @Column(name = "org_type", length = 128)
    private String orgType;

    @Column(name = "ein", length = 64)
    private String ein;

    @Column(name = "contact_person", length = 128)
    private String contactPerson;

    @Column(name = "contact_email", length = 128)
    private String contactEmail;

    @Column(name = "contact_phone", length = 64)
    private String contactPhone;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "years_operational")
    private Integer yearsOperational;

    @Column(name = "project_title", length = 255)
    private String projectTitle;

    @Column(name = "requested_amount")
    private Double requestedAmount;

    @Column(name = "project_duration_months")
    private Integer projectDurationMonths;

    @Lob
    @Column(name = "executive_summary", columnDefinition = "LONGTEXT")
    private String executiveSummary;

    @Convert(converter = StringListConverter.class)
    @Lob
    @Column(name = "objectives", columnDefinition = "LONGTEXT")
    private List<String> objectives = new ArrayList<>();

    @Convert(converter = BudgetItemListConverter.class)
    @Lob
    @Column(name = "budget_breakdown", columnDefinition = "LONGTEXT")
    private List<BudgetItem> budgetBreakdown = new ArrayList<>();

    @Column(name = "matching_funds")
    private Double matchingFunds;

    @Column(name = "matching_percent")
    private Double matchingPercent;

    @Convert(converter = MapConverter.class)
    @Lob
    @Column(name = "eligibility_answers", columnDefinition = "LONGTEXT")
    private Map<String, Object> eligibilityAnswers = new HashMap<>();

    @Convert(converter = AttachedFileListConverter.class)
    @Lob
    @Column(name = "attached_files", columnDefinition = "LONGTEXT")
    private List<AttachedFile> attachedFiles = new ArrayList<>();

    @Column(name = "status", length = 64)
    private String status;

    @Column(name = "stage", length = 64)
    private String stage;

    @Column(name = "submitted_at", length = 64)
    private String submittedAt;

    @Column(name = "score")
    private Integer score;

    @Convert(converter = ReviewListConverter.class)
    @Lob
    @Column(name = "reviews", columnDefinition = "LONGTEXT")
    private List<Review> reviews = new ArrayList<>();

    @Convert(converter = CommitteeDecisionConverter.class)
    @Lob
    @Column(name = "committee_decision", columnDefinition = "LONGTEXT")
    private CommitteeDecision committeeDecision;

    public GrantApplication() {}

    public GrantApplication(String id, String trackingNumber, String programId, String programTitle,
                            String programCode, String applicantOrg, String orgType, String ein,
                            String contactPerson, String contactEmail, String contactPhone, String address,
                            Integer yearsOperational, String projectTitle, Double requestedAmount,
                            Integer projectDurationMonths, String executiveSummary, List<String> objectives,
                            List<BudgetItem> budgetBreakdown, Double matchingFunds, Double matchingPercent,
                            Map<String, Object> eligibilityAnswers, List<AttachedFile> attachedFiles,
                            String status, String stage, String submittedAt, Integer score,
                            List<Review> reviews, CommitteeDecision committeeDecision) {
        this.id = id;
        this.trackingNumber = trackingNumber;
        this.programId = programId;
        this.programTitle = programTitle;
        this.programCode = programCode;
        this.applicantOrg = applicantOrg;
        this.orgType = orgType;
        this.ein = ein;
        this.contactPerson = contactPerson;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;
        this.address = address;
        this.yearsOperational = yearsOperational;
        this.projectTitle = projectTitle;
        this.requestedAmount = requestedAmount;
        this.projectDurationMonths = projectDurationMonths;
        this.executiveSummary = executiveSummary;
        this.objectives = objectives != null ? objectives : new ArrayList<>();
        this.budgetBreakdown = budgetBreakdown != null ? budgetBreakdown : new ArrayList<>();
        this.matchingFunds = matchingFunds;
        this.matchingPercent = matchingPercent;
        this.eligibilityAnswers = eligibilityAnswers != null ? eligibilityAnswers : new HashMap<>();
        this.attachedFiles = attachedFiles != null ? attachedFiles : new ArrayList<>();
        this.status = status;
        this.stage = stage;
        this.submittedAt = submittedAt;
        this.score = score;
        this.reviews = reviews != null ? reviews : new ArrayList<>();
        this.committeeDecision = committeeDecision;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }

    public String getProgramTitle() { return programTitle; }
    public void setProgramTitle(String programTitle) { this.programTitle = programTitle; }

    public String getProgramCode() { return programCode; }
    public void setProgramCode(String programCode) { this.programCode = programCode; }

    public String getApplicantOrg() { return applicantOrg; }
    public void setApplicantOrg(String applicantOrg) { this.applicantOrg = applicantOrg; }

    public String getOrgType() { return orgType; }
    public void setOrgType(String orgType) { this.orgType = orgType; }

    public String getEin() { return ein; }
    public void setEin(String ein) { this.ein = ein; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Integer getYearsOperational() { return yearsOperational; }
    public void setYearsOperational(Integer yearsOperational) { this.yearsOperational = yearsOperational; }

    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }

    public Double getRequestedAmount() { return requestedAmount; }
    public void setRequestedAmount(Double requestedAmount) { this.requestedAmount = requestedAmount; }

    public Integer getProjectDurationMonths() { return projectDurationMonths; }
    public void setProjectDurationMonths(Integer projectDurationMonths) { this.projectDurationMonths = projectDurationMonths; }

    public String getExecutiveSummary() { return executiveSummary; }
    public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }

    public List<String> getObjectives() { return objectives; }
    public void setObjectives(List<String> objectives) { this.objectives = objectives; }

    public List<BudgetItem> getBudgetBreakdown() { return budgetBreakdown; }
    public void setBudgetBreakdown(List<BudgetItem> budgetBreakdown) { this.budgetBreakdown = budgetBreakdown; }

    public Double getMatchingFunds() { return matchingFunds; }
    public void setMatchingFunds(Double matchingFunds) { this.matchingFunds = matchingFunds; }

    public Double getMatchingPercent() { return matchingPercent; }
    public void setMatchingPercent(Double matchingPercent) { this.matchingPercent = matchingPercent; }

    public Map<String, Object> getEligibilityAnswers() { return eligibilityAnswers; }
    public void setEligibilityAnswers(Map<String, Object> eligibilityAnswers) { this.eligibilityAnswers = eligibilityAnswers; }

    public List<AttachedFile> getAttachedFiles() { return attachedFiles; }
    public void setAttachedFiles(List<AttachedFile> attachedFiles) { this.attachedFiles = attachedFiles; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public String getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(String submittedAt) { this.submittedAt = submittedAt; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    public CommitteeDecision getCommitteeDecision() { return committeeDecision; }
    public void setCommitteeDecision(CommitteeDecision committeeDecision) { this.committeeDecision = committeeDecision; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String trackingNumber;
        private String programId;
        private String programTitle;
        private String programCode;
        private String applicantOrg;
        private String orgType;
        private String ein;
        private String contactPerson;
        private String contactEmail;
        private String contactPhone;
        private String address;
        private Integer yearsOperational;
        private String projectTitle;
        private Double requestedAmount;
        private Integer projectDurationMonths;
        private String executiveSummary;
        private List<String> objectives = new ArrayList<>();
        private List<BudgetItem> budgetBreakdown = new ArrayList<>();
        private Double matchingFunds;
        private Double matchingPercent;
        private Map<String, Object> eligibilityAnswers = new HashMap<>();
        private List<AttachedFile> attachedFiles = new ArrayList<>();
        private String status;
        private String stage;
        private String submittedAt;
        private Integer score;
        private List<Review> reviews = new ArrayList<>();
        private CommitteeDecision committeeDecision;

        public Builder id(String id) { this.id = id; return this; }
        public Builder trackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; return this; }
        public Builder programId(String programId) { this.programId = programId; return this; }
        public Builder programTitle(String programTitle) { this.programTitle = programTitle; return this; }
        public Builder programCode(String programCode) { this.programCode = programCode; return this; }
        public Builder applicantOrg(String applicantOrg) { this.applicantOrg = applicantOrg; return this; }
        public Builder orgType(String orgType) { this.orgType = orgType; return this; }
        public Builder ein(String ein) { this.ein = ein; return this; }
        public Builder contactPerson(String contactPerson) { this.contactPerson = contactPerson; return this; }
        public Builder contactEmail(String contactEmail) { this.contactEmail = contactEmail; return this; }
        public Builder contactPhone(String contactPhone) { this.contactPhone = contactPhone; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder yearsOperational(Integer yearsOperational) { this.yearsOperational = yearsOperational; return this; }
        public Builder projectTitle(String projectTitle) { this.projectTitle = projectTitle; return this; }
        public Builder requestedAmount(Double requestedAmount) { this.requestedAmount = requestedAmount; return this; }
        public Builder projectDurationMonths(Integer projectDurationMonths) { this.projectDurationMonths = projectDurationMonths; return this; }
        public Builder executiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; return this; }
        public Builder objectives(List<String> objectives) { this.objectives = objectives; return this; }
        public Builder budgetBreakdown(List<BudgetItem> budgetBreakdown) { this.budgetBreakdown = budgetBreakdown; return this; }
        public Builder matchingFunds(Double matchingFunds) { this.matchingFunds = matchingFunds; return this; }
        public Builder matchingPercent(Double matchingPercent) { this.matchingPercent = matchingPercent; return this; }
        public Builder eligibilityAnswers(Map<String, Object> eligibilityAnswers) { this.eligibilityAnswers = eligibilityAnswers; return this; }
        public Builder attachedFiles(List<AttachedFile> attachedFiles) { this.attachedFiles = attachedFiles; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder stage(String stage) { this.stage = stage; return this; }
        public Builder submittedAt(String submittedAt) { this.submittedAt = submittedAt; return this; }
        public Builder score(Integer score) { this.score = score; return this; }
        public Builder reviews(List<Review> reviews) { this.reviews = reviews; return this; }
        public Builder committeeDecision(CommitteeDecision committeeDecision) { this.committeeDecision = committeeDecision; return this; }

        public GrantApplication build() {
            return new GrantApplication(id, trackingNumber, programId, programTitle, programCode, applicantOrg,
                    orgType, ein, contactPerson, contactEmail, contactPhone, address, yearsOperational, projectTitle,
                    requestedAmount, projectDurationMonths, executiveSummary, objectives, budgetBreakdown, matchingFunds,
                    matchingPercent, eligibilityAnswers, attachedFiles, status, stage, submittedAt, score, reviews, committeeDecision);
        }
    }
}
