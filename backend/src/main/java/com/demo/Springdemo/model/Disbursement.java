package com.demo.Springdemo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "grant_disbursements")
public class Disbursement {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "application_id", length = 64, nullable = false)
    private String applicationId;

    @Column(name = "program_id", length = 64)
    private String programId;

    @Column(name = "tracking_number", length = 64)
    private String trackingNumber;

    @Column(name = "grantee_org", length = 255)
    private String granteeOrg;

    @Column(name = "project_title", length = 255)
    private String projectTitle;

    @Column(name = "tranche_number")
    private Integer trancheNumber;

    @Column(name = "total_tranches")
    private Integer totalTranches;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "milestone_requirement", length = 500)
    private String milestoneRequirement;

    @Column(name = "scheduled_date", length = 32)
    private String scheduledDate;

    @Column(name = "disbursed_date", length = 64)
    private String disbursedDate;

    @Column(name = "status", length = 64)
    private String status;

    @Column(name = "payment_method", length = 128)
    private String paymentMethod;

    @Column(name = "reference_code", length = 128)
    private String referenceCode;

    @Lob
    @Column(name = "notes", columnDefinition = "LONGTEXT")
    private String notes;

    public Disbursement() {}

    public Disbursement(String id, String applicationId, String programId, String trackingNumber,
                        String granteeOrg, String projectTitle, Integer trancheNumber, Integer totalTranches,
                        Double percentage, Double amount, String milestoneRequirement, String scheduledDate,
                        String disbursedDate, String status, String paymentMethod, String referenceCode, String notes) {
        this.id = id;
        this.applicationId = applicationId;
        this.programId = programId;
        this.trackingNumber = trackingNumber;
        this.granteeOrg = granteeOrg;
        this.projectTitle = projectTitle;
        this.trancheNumber = trancheNumber;
        this.totalTranches = totalTranches;
        this.percentage = percentage;
        this.amount = amount;
        this.milestoneRequirement = milestoneRequirement;
        this.scheduledDate = scheduledDate;
        this.disbursedDate = disbursedDate;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.referenceCode = referenceCode;
        this.notes = notes;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }

    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getGranteeOrg() { return granteeOrg; }
    public void setGranteeOrg(String granteeOrg) { this.granteeOrg = granteeOrg; }

    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }

    public Integer getTrancheNumber() { return trancheNumber; }
    public void setTrancheNumber(Integer trancheNumber) { this.trancheNumber = trancheNumber; }

    public Integer getTotalTranches() { return totalTranches; }
    public void setTotalTranches(Integer totalTranches) { this.totalTranches = totalTranches; }

    public Double getPercentage() { return percentage; }
    public void setPercentage(Double percentage) { this.percentage = percentage; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getMilestoneRequirement() { return milestoneRequirement; }
    public void setMilestoneRequirement(String milestoneRequirement) { this.milestoneRequirement = milestoneRequirement; }

    public String getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }

    public String getDisbursedDate() { return disbursedDate; }
    public void setDisbursedDate(String disbursedDate) { this.disbursedDate = disbursedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getReferenceCode() { return referenceCode; }
    public void setReferenceCode(String referenceCode) { this.referenceCode = referenceCode; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String applicationId;
        private String programId;
        private String trackingNumber;
        private String granteeOrg;
        private String projectTitle;
        private Integer trancheNumber;
        private Integer totalTranches;
        private Double percentage;
        private Double amount;
        private String milestoneRequirement;
        private String scheduledDate;
        private String disbursedDate;
        private String status;
        private String paymentMethod;
        private String referenceCode;
        private String notes;

        public Builder id(String id) { this.id = id; return this; }
        public Builder applicationId(String applicationId) { this.applicationId = applicationId; return this; }
        public Builder programId(String programId) { this.programId = programId; return this; }
        public Builder trackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; return this; }
        public Builder granteeOrg(String granteeOrg) { this.granteeOrg = granteeOrg; return this; }
        public Builder projectTitle(String projectTitle) { this.projectTitle = projectTitle; return this; }
        public Builder trancheNumber(Integer trancheNumber) { this.trancheNumber = trancheNumber; return this; }
        public Builder totalTranches(Integer totalTranches) { this.totalTranches = totalTranches; return this; }
        public Builder percentage(Double percentage) { this.percentage = percentage; return this; }
        public Builder amount(Double amount) { this.amount = amount; return this; }
        public Builder milestoneRequirement(String milestoneRequirement) { this.milestoneRequirement = milestoneRequirement; return this; }
        public Builder scheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; return this; }
        public Builder disbursedDate(String disbursedDate) { this.disbursedDate = disbursedDate; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public Builder referenceCode(String referenceCode) { this.referenceCode = referenceCode; return this; }
        public Builder notes(String notes) { this.notes = notes; return this; }

        public Disbursement build() {
            return new Disbursement(id, applicationId, programId, trackingNumber, granteeOrg, projectTitle,
                    trancheNumber, totalTranches, percentage, amount, milestoneRequirement, scheduledDate,
                    disbursedDate, status, paymentMethod, referenceCode, notes);
        }
    }
}
