package com.demo.Springdemo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class EligibilityCriteria implements Serializable {
    private Integer minYearsOperational;
    private List<String> eligibleOrgTypes = new ArrayList<>();
    private Boolean requireMatchingFunds;
    private Double minMatchingPercentage;
    private Boolean requiresTaxExemptCert;
    private String geographicScope;

    public EligibilityCriteria() {}

    public EligibilityCriteria(Integer minYearsOperational, List<String> eligibleOrgTypes,
                               Boolean requireMatchingFunds, Double minMatchingPercentage,
                               Boolean requiresTaxExemptCert, String geographicScope) {
        this.minYearsOperational = minYearsOperational;
        this.eligibleOrgTypes = eligibleOrgTypes != null ? eligibleOrgTypes : new ArrayList<>();
        this.requireMatchingFunds = requireMatchingFunds;
        this.minMatchingPercentage = minMatchingPercentage;
        this.requiresTaxExemptCert = requiresTaxExemptCert;
        this.geographicScope = geographicScope;
    }

    public Integer getMinYearsOperational() { return minYearsOperational; }
    public void setMinYearsOperational(Integer minYearsOperational) { this.minYearsOperational = minYearsOperational; }

    public List<String> getEligibleOrgTypes() { return eligibleOrgTypes; }
    public void setEligibleOrgTypes(List<String> eligibleOrgTypes) { this.eligibleOrgTypes = eligibleOrgTypes; }

    public Boolean getRequireMatchingFunds() { return requireMatchingFunds; }
    public void setRequireMatchingFunds(Boolean requireMatchingFunds) { this.requireMatchingFunds = requireMatchingFunds; }

    public Double getMinMatchingPercentage() { return minMatchingPercentage; }
    public void setMinMatchingPercentage(Double minMatchingPercentage) { this.minMatchingPercentage = minMatchingPercentage; }

    public Boolean getRequiresTaxExemptCert() { return requiresTaxExemptCert; }
    public void setRequiresTaxExemptCert(Boolean requiresTaxExemptCert) { this.requiresTaxExemptCert = requiresTaxExemptCert; }

    public String getGeographicScope() { return geographicScope; }
    public void setGeographicScope(String geographicScope) { this.geographicScope = geographicScope; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Integer minYearsOperational;
        private List<String> eligibleOrgTypes = new ArrayList<>();
        private Boolean requireMatchingFunds;
        private Double minMatchingPercentage;
        private Boolean requiresTaxExemptCert;
        private String geographicScope;

        public Builder minYearsOperational(Integer val) { this.minYearsOperational = val; return this; }
        public Builder eligibleOrgTypes(List<String> val) { this.eligibleOrgTypes = val; return this; }
        public Builder requireMatchingFunds(Boolean val) { this.requireMatchingFunds = val; return this; }
        public Builder minMatchingPercentage(Double val) { this.minMatchingPercentage = val; return this; }
        public Builder requiresTaxExemptCert(Boolean val) { this.requiresTaxExemptCert = val; return this; }
        public Builder geographicScope(String val) { this.geographicScope = val; return this; }

        public EligibilityCriteria build() {
            return new EligibilityCriteria(minYearsOperational, eligibleOrgTypes, requireMatchingFunds,
                    minMatchingPercentage, requiresTaxExemptCert, geographicScope);
        }
    }
}
