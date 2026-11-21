package com.demo.Springdemo.model;

import java.io.Serializable;

public class CommitteeDecision implements Serializable {
    private String status;
    private Double approvedAmount;
    private String approvedDate;
    private String decisionNotes;
    private String signedBy;

    public CommitteeDecision() {}

    public CommitteeDecision(String status, Double approvedAmount, String approvedDate, String decisionNotes, String signedBy) {
        this.status = status;
        this.approvedAmount = approvedAmount;
        this.approvedDate = approvedDate;
        this.decisionNotes = decisionNotes;
        this.signedBy = signedBy;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getApprovedAmount() { return approvedAmount; }
    public void setApprovedAmount(Double approvedAmount) { this.approvedAmount = approvedAmount; }

    public String getApprovedDate() { return approvedDate; }
    public void setApprovedDate(String approvedDate) { this.approvedDate = approvedDate; }

    public String getDecisionNotes() { return decisionNotes; }
    public void setDecisionNotes(String decisionNotes) { this.decisionNotes = decisionNotes; }

    public String getSignedBy() { return signedBy; }
    public void setSignedBy(String signedBy) { this.signedBy = signedBy; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String status;
        private Double approvedAmount;
        private String approvedDate;
        private String decisionNotes;
        private String signedBy;

        public Builder status(String status) { this.status = status; return this; }
        public Builder approvedAmount(Double approvedAmount) { this.approvedAmount = approvedAmount; return this; }
        public Builder approvedDate(String approvedDate) { this.approvedDate = approvedDate; return this; }
        public Builder decisionNotes(String decisionNotes) { this.decisionNotes = decisionNotes; return this; }
        public Builder signedBy(String signedBy) { this.signedBy = signedBy; return this; }

        public CommitteeDecision build() {
            return new CommitteeDecision(status, approvedAmount, approvedDate, decisionNotes, signedBy);
        }
    }
}
