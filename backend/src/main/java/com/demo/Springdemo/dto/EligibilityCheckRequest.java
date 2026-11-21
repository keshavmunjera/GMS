package com.demo.Springdemo.dto;

public class EligibilityCheckRequest {
    private String programId;
    private String orgType;
    private Integer yearsOperational;
    private Boolean hasTaxExempt;
    private Double matchingFundsPercent;
    private String geographicRegion;
    private Boolean hasAuditedFinancials;

    public EligibilityCheckRequest() {}

    public EligibilityCheckRequest(String programId, String orgType, Integer yearsOperational,
                                   Boolean hasTaxExempt, Double matchingFundsPercent,
                                   String geographicRegion, Boolean hasAuditedFinancials) {
        this.programId = programId;
        this.orgType = orgType;
        this.yearsOperational = yearsOperational;
        this.hasTaxExempt = hasTaxExempt;
        this.matchingFundsPercent = matchingFundsPercent;
        this.geographicRegion = geographicRegion;
        this.hasAuditedFinancials = hasAuditedFinancials;
    }

    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }

    public String getOrgType() { return orgType; }
    public void setOrgType(String orgType) { this.orgType = orgType; }

    public Integer getYearsOperational() { return yearsOperational; }
    public void setYearsOperational(Integer yearsOperational) { this.yearsOperational = yearsOperational; }

    public Boolean getHasTaxExempt() { return hasTaxExempt; }
    public void setHasTaxExempt(Boolean hasTaxExempt) { this.hasTaxExempt = hasTaxExempt; }

    public Double getMatchingFundsPercent() { return matchingFundsPercent; }
    public void setMatchingFundsPercent(Double matchingFundsPercent) { this.matchingFundsPercent = matchingFundsPercent; }

    public String getGeographicRegion() { return geographicRegion; }
    public void setGeographicRegion(String geographicRegion) { this.geographicRegion = geographicRegion; }

    public Boolean getHasAuditedFinancials() { return hasAuditedFinancials; }
    public void setHasAuditedFinancials(Boolean hasAuditedFinancials) { this.hasAuditedFinancials = hasAuditedFinancials; }
}
