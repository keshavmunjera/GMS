package com.demo.Springdemo.model;

import com.demo.Springdemo.converter.StringListConverter;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "milestone_reports")
public class MilestoneReport {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "application_id", length = 64, nullable = false)
    private String applicationId;

    @Column(name = "tracking_number", length = 64)
    private String trackingNumber;

    @Column(name = "grantee_org", length = 255)
    private String granteeOrg;

    @Column(name = "tranche_number")
    private Integer trancheNumber;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "completion_percentage")
    private Integer completionPercentage;

    @Column(name = "spend_to_date")
    private Double spendToDate;

    @Convert(converter = StringListConverter.class)
    @Lob
    @Column(name = "deliverables_completed", columnDefinition = "LONGTEXT")
    private List<String> deliverablesCompleted = new ArrayList<>();

    @Lob
    @Column(name = "challenges_faced", columnDefinition = "LONGTEXT")
    private String challengesFaced;

    @Column(name = "status", length = 64)
    private String status;

    @Column(name = "submitted_at", length = 64)
    private String submittedAt;

    @Column(name = "approved_at", length = 64)
    private String approvedAt;

    @Lob
    @Column(name = "reviewer_notes", columnDefinition = "LONGTEXT")
    private String reviewerNotes;

    public MilestoneReport() {}

    public MilestoneReport(String id, String applicationId, String trackingNumber, String granteeOrg,
                           Integer trancheNumber, String title, Integer completionPercentage,
                           Double spendToDate, List<String> deliverablesCompleted, String challengesFaced,
                           String status, String submittedAt, String approvedAt, String reviewerNotes) {
        this.id = id;
        this.applicationId = applicationId;
        this.trackingNumber = trackingNumber;
        this.granteeOrg = granteeOrg;
        this.trancheNumber = trancheNumber;
        this.title = title;
        this.completionPercentage = completionPercentage;
        this.spendToDate = spendToDate;
        this.deliverablesCompleted = deliverablesCompleted != null ? deliverablesCompleted : new ArrayList<>();
        this.challengesFaced = challengesFaced;
        this.status = status;
        this.submittedAt = submittedAt;
        this.approvedAt = approvedAt;
        this.reviewerNotes = reviewerNotes;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getGranteeOrg() { return granteeOrg; }
    public void setGranteeOrg(String granteeOrg) { this.granteeOrg = granteeOrg; }

    public Integer getTrancheNumber() { return trancheNumber; }
    public void setTrancheNumber(Integer trancheNumber) { this.trancheNumber = trancheNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(Integer completionPercentage) { this.completionPercentage = completionPercentage; }

    public Double getSpendToDate() { return spendToDate; }
    public void setSpendToDate(Double spendToDate) { this.spendToDate = spendToDate; }

    public List<String> getDeliverablesCompleted() { return deliverablesCompleted; }
    public void setDeliverablesCompleted(List<String> deliverablesCompleted) { this.deliverablesCompleted = deliverablesCompleted; }

    public String getChallengesFaced() { return challengesFaced; }
    public void setChallengesFaced(String challengesFaced) { this.challengesFaced = challengesFaced; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(String submittedAt) { this.submittedAt = submittedAt; }

    public String getApprovedAt() { return approvedAt; }
    public void setApprovedAt(String approvedAt) { this.approvedAt = approvedAt; }

    public String getReviewerNotes() { return reviewerNotes; }
    public void setReviewerNotes(String reviewerNotes) { this.reviewerNotes = reviewerNotes; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String applicationId;
        private String trackingNumber;
        private String granteeOrg;
        private Integer trancheNumber;
        private String title;
        private Integer completionPercentage;
        private Double spendToDate;
        private List<String> deliverablesCompleted = new ArrayList<>();
        private String challengesFaced;
        private String status;
        private String submittedAt;
        private String approvedAt;
        private String reviewerNotes;

        public Builder id(String id) { this.id = id; return this; }
        public Builder applicationId(String applicationId) { this.applicationId = applicationId; return this; }
        public Builder trackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; return this; }
        public Builder granteeOrg(String granteeOrg) { this.granteeOrg = granteeOrg; return this; }
        public Builder trancheNumber(Integer trancheNumber) { this.trancheNumber = trancheNumber; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder completionPercentage(Integer completionPercentage) { this.completionPercentage = completionPercentage; return this; }
        public Builder spendToDate(Double spendToDate) { this.spendToDate = spendToDate; return this; }
        public Builder deliverablesCompleted(List<String> deliverablesCompleted) { this.deliverablesCompleted = deliverablesCompleted; return this; }
        public Builder challengesFaced(String challengesFaced) { this.challengesFaced = challengesFaced; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder submittedAt(String submittedAt) { this.submittedAt = submittedAt; return this; }
        public Builder approvedAt(String approvedAt) { this.approvedAt = approvedAt; return this; }
        public Builder reviewerNotes(String reviewerNotes) { this.reviewerNotes = reviewerNotes; return this; }

        public MilestoneReport build() {
            return new MilestoneReport(id, applicationId, trackingNumber, granteeOrg, trancheNumber,
                    title, completionPercentage, spendToDate, deliverablesCompleted, challengesFaced,
                    status, submittedAt, approvedAt, reviewerNotes);
        }
    }
}
