package com.demo.Springdemo.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Review implements Serializable {
    private String reviewerId;
    private String reviewerName;
    private String reviewerRole;
    private Integer scoreTotal;
    private Map<String, Integer> scores = new HashMap<>();
    private String strengths;
    private String concerns;
    private String recommendation;
    private String reviewedAt;

    public Review() {}

    public Review(String reviewerId, String reviewerName, String reviewerRole, Integer scoreTotal,
                  Map<String, Integer> scores, String strengths, String concerns,
                  String recommendation, String reviewedAt) {
        this.reviewerId = reviewerId;
        this.reviewerName = reviewerName;
        this.reviewerRole = reviewerRole;
        this.scoreTotal = scoreTotal;
        this.scores = scores != null ? scores : new HashMap<>();
        this.strengths = strengths;
        this.concerns = concerns;
        this.recommendation = recommendation;
        this.reviewedAt = reviewedAt;
    }

    public String getReviewerId() { return reviewerId; }
    public void setReviewerId(String reviewerId) { this.reviewerId = reviewerId; }

    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }

    public String getReviewerRole() { return reviewerRole; }
    public void setReviewerRole(String reviewerRole) { this.reviewerRole = reviewerRole; }

    public Integer getScoreTotal() { return scoreTotal; }
    public void setScoreTotal(Integer scoreTotal) { this.scoreTotal = scoreTotal; }

    public Map<String, Integer> getScores() { return scores; }
    public void setScores(Map<String, Integer> scores) { this.scores = scores; }

    public String getStrengths() { return strengths; }
    public void setStrengths(String strengths) { this.strengths = strengths; }

    public String getConcerns() { return concerns; }
    public void setConcerns(String concerns) { this.concerns = concerns; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

    public String getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(String reviewedAt) { this.reviewedAt = reviewedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String reviewerId;
        private String reviewerName;
        private String reviewerRole;
        private Integer scoreTotal;
        private Map<String, Integer> scores = new HashMap<>();
        private String strengths;
        private String concerns;
        private String recommendation;
        private String reviewedAt;

        public Builder reviewerId(String reviewerId) { this.reviewerId = reviewerId; return this; }
        public Builder reviewerName(String reviewerName) { this.reviewerName = reviewerName; return this; }
        public Builder reviewerRole(String reviewerRole) { this.reviewerRole = reviewerRole; return this; }
        public Builder scoreTotal(Integer scoreTotal) { this.scoreTotal = scoreTotal; return this; }
        public Builder scores(Map<String, Integer> scores) { this.scores = scores; return this; }
        public Builder strengths(String strengths) { this.strengths = strengths; return this; }
        public Builder concerns(String concerns) { this.concerns = concerns; return this; }
        public Builder recommendation(String recommendation) { this.recommendation = recommendation; return this; }
        public Builder reviewedAt(String reviewedAt) { this.reviewedAt = reviewedAt; return this; }

        public Review build() {
            return new Review(reviewerId, reviewerName, reviewerRole, scoreTotal, scores, strengths, concerns, recommendation, reviewedAt);
        }
    }
}
