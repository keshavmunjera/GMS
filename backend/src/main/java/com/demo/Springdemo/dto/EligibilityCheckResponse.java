package com.demo.Springdemo.dto;

import java.util.ArrayList;
import java.util.List;

public class EligibilityCheckResponse {
    private String programId;
    private String programTitle;
    private Integer passedCount;
    private Integer totalCount;
    private Boolean isFullyEligible;
    private Boolean isPartiallyEligible;
    private List<CriterionCheckResult> checks = new ArrayList<>();

    public EligibilityCheckResponse() {}

    public EligibilityCheckResponse(String programId, String programTitle, Integer passedCount,
                                    Integer totalCount, Boolean isFullyEligible, Boolean isPartiallyEligible,
                                    List<CriterionCheckResult> checks) {
        this.programId = programId;
        this.programTitle = programTitle;
        this.passedCount = passedCount;
        this.totalCount = totalCount;
        this.isFullyEligible = isFullyEligible;
        this.isPartiallyEligible = isPartiallyEligible;
        this.checks = checks != null ? checks : new ArrayList<>();
    }

    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }

    public String getProgramTitle() { return programTitle; }
    public void setProgramTitle(String programTitle) { this.programTitle = programTitle; }

    public Integer getPassedCount() { return passedCount; }
    public void setPassedCount(Integer passedCount) { this.passedCount = passedCount; }

    public Integer getTotalCount() { return totalCount; }
    public void setTotalCount(Integer totalCount) { this.totalCount = totalCount; }

    public Boolean getIsFullyEligible() { return isFullyEligible; }
    public void setIsFullyEligible(Boolean isFullyEligible) { this.isFullyEligible = isFullyEligible; }

    public Boolean getIsPartiallyEligible() { return isPartiallyEligible; }
    public void setIsPartiallyEligible(Boolean isPartiallyEligible) { this.isPartiallyEligible = isPartiallyEligible; }

    public List<CriterionCheckResult> getChecks() { return checks; }
    public void setChecks(List<CriterionCheckResult> checks) { this.checks = checks; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String programId;
        private String programTitle;
        private Integer passedCount;
        private Integer totalCount;
        private Boolean isFullyEligible;
        private Boolean isPartiallyEligible;
        private List<CriterionCheckResult> checks = new ArrayList<>();

        public Builder programId(String val) { this.programId = val; return this; }
        public Builder programTitle(String val) { this.programTitle = val; return this; }
        public Builder passedCount(Integer val) { this.passedCount = val; return this; }
        public Builder totalCount(Integer val) { this.totalCount = val; return this; }
        public Builder isFullyEligible(Boolean val) { this.isFullyEligible = val; return this; }
        public Builder isPartiallyEligible(Boolean val) { this.isPartiallyEligible = val; return this; }
        public Builder checks(List<CriterionCheckResult> val) { this.checks = val; return this; }

        public EligibilityCheckResponse build() {
            return new EligibilityCheckResponse(programId, programTitle, passedCount, totalCount, isFullyEligible, isPartiallyEligible, checks);
        }
    }

    public static class CriterionCheckResult {
        private String id;
        private String label;
        private String required;
        private String provided;
        private Boolean passed;
        private String explanation;

        public CriterionCheckResult() {}

        public CriterionCheckResult(String id, String label, String required, String provided, Boolean passed, String explanation) {
            this.id = id;
            this.label = label;
            this.required = required;
            this.provided = provided;
            this.passed = passed;
            this.explanation = explanation;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }

        public String getRequired() { return required; }
        public void setRequired(String required) { this.required = required; }

        public String getProvided() { return provided; }
        public void setProvided(String provided) { this.provided = provided; }

        public Boolean getPassed() { return passed; }
        public void setPassed(Boolean passed) { this.passed = passed; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String id;
            private String label;
            private String required;
            private String provided;
            private Boolean passed;
            private String explanation;

            public Builder id(String id) { this.id = id; return this; }
            public Builder label(String label) { this.label = label; return this; }
            public Builder required(String required) { this.required = required; return this; }
            public Builder provided(String provided) { this.provided = provided; return this; }
            public Builder passed(Boolean passed) { this.passed = passed; return this; }
            public Builder explanation(String explanation) { this.explanation = explanation; return this; }

            public CriterionCheckResult build() {
                return new CriterionCheckResult(id, label, required, provided, passed, explanation);
            }
        }
    }
}
