package com.demo.Springdemo.dto;

import java.util.ArrayList;
import java.util.List;

public class DashboardSummaryResponse {
    private Double totalPool;
    private Double totalAllocated;
    private Double totalDisbursed;
    private Double totalCommitted;
    private Integer applicantCount;
    private Integer approvedCount;
    private Integer rejectedCount;
    private Integer inReviewCount;
    private Integer successRate;
    private List<StageBreakdownItem> stageBreakdown = new ArrayList<>();

    public DashboardSummaryResponse() {}

    public DashboardSummaryResponse(Double totalPool, Double totalAllocated, Double totalDisbursed,
                                    Double totalCommitted, Integer applicantCount, Integer approvedCount,
                                    Integer rejectedCount, Integer inReviewCount, Integer successRate,
                                    List<StageBreakdownItem> stageBreakdown) {
        this.totalPool = totalPool;
        this.totalAllocated = totalAllocated;
        this.totalDisbursed = totalDisbursed;
        this.totalCommitted = totalCommitted;
        this.applicantCount = applicantCount;
        this.approvedCount = approvedCount;
        this.rejectedCount = rejectedCount;
        this.inReviewCount = inReviewCount;
        this.successRate = successRate;
        this.stageBreakdown = stageBreakdown != null ? stageBreakdown : new ArrayList<>();
    }

    public Double getTotalPool() { return totalPool; }
    public void setTotalPool(Double totalPool) { this.totalPool = totalPool; }

    public Double getTotalAllocated() { return totalAllocated; }
    public void setTotalAllocated(Double totalAllocated) { this.totalAllocated = totalAllocated; }

    public Double getTotalDisbursed() { return totalDisbursed; }
    public void setTotalDisbursed(Double totalDisbursed) { this.totalDisbursed = totalDisbursed; }

    public Double getTotalCommitted() { return totalCommitted; }
    public void setTotalCommitted(Double totalCommitted) { this.totalCommitted = totalCommitted; }

    public Integer getApplicantCount() { return applicantCount; }
    public void setApplicantCount(Integer applicantCount) { this.applicantCount = applicantCount; }

    public Integer getApprovedCount() { return approvedCount; }
    public void setApprovedCount(Integer approvedCount) { this.approvedCount = approvedCount; }

    public Integer getRejectedCount() { return rejectedCount; }
    public void setRejectedCount(Integer rejectedCount) { this.rejectedCount = rejectedCount; }

    public Integer getInReviewCount() { return inReviewCount; }
    public void setInReviewCount(Integer inReviewCount) { this.inReviewCount = inReviewCount; }

    public Integer getSuccessRate() { return successRate; }
    public void setSuccessRate(Integer successRate) { this.successRate = successRate; }

    public List<StageBreakdownItem> getStageBreakdown() { return stageBreakdown; }
    public void setStageBreakdown(List<StageBreakdownItem> stageBreakdown) { this.stageBreakdown = stageBreakdown; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Double totalPool;
        private Double totalAllocated;
        private Double totalDisbursed;
        private Double totalCommitted;
        private Integer applicantCount;
        private Integer approvedCount;
        private Integer rejectedCount;
        private Integer inReviewCount;
        private Integer successRate;
        private List<StageBreakdownItem> stageBreakdown = new ArrayList<>();

        public Builder totalPool(Double val) { this.totalPool = val; return this; }
        public Builder totalAllocated(Double val) { this.totalAllocated = val; return this; }
        public Builder totalDisbursed(Double val) { this.totalDisbursed = val; return this; }
        public Builder totalCommitted(Double val) { this.totalCommitted = val; return this; }
        public Builder applicantCount(Integer val) { this.applicantCount = val; return this; }
        public Builder approvedCount(Integer val) { this.approvedCount = val; return this; }
        public Builder rejectedCount(Integer val) { this.rejectedCount = val; return this; }
        public Builder inReviewCount(Integer val) { this.inReviewCount = val; return this; }
        public Builder successRate(Integer val) { this.successRate = val; return this; }
        public Builder stageBreakdown(List<StageBreakdownItem> val) { this.stageBreakdown = val; return this; }

        public DashboardSummaryResponse build() {
            return new DashboardSummaryResponse(totalPool, totalAllocated, totalDisbursed, totalCommitted,
                    applicantCount, approvedCount, rejectedCount, inReviewCount, successRate, stageBreakdown);
        }
    }

    public static class StageBreakdownItem {
        private String name;
        private Long count;
        private String color;

        public StageBreakdownItem() {}

        public StageBreakdownItem(String name, Long count, String color) {
            this.name = name;
            this.count = count;
            this.color = color;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public Long getCount() { return count; }
        public void setCount(Long count) { this.count = count; }

        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String name;
            private Long count;
            private String color;

            public Builder name(String name) { this.name = name; return this; }
            public Builder count(Long count) { this.count = count; return this; }
            public Builder color(String color) { this.color = color; return this; }

            public StageBreakdownItem build() {
                return new StageBreakdownItem(name, count, color);
            }
        }
    }
}
