package com.demo.Springdemo.model;

import java.io.Serializable;

public class RubricCriterion implements Serializable {
    private String id;
    private String name;
    private Integer weight;
    private Integer maxScore;
    private String description;

    public RubricCriterion() {}

    public RubricCriterion(String id, String name, Integer weight, Integer maxScore, String description) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.maxScore = maxScore;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getWeight() { return weight; }
    public void setWeight(Integer weight) { this.weight = weight; }

    public Integer getMaxScore() { return maxScore; }
    public void setMaxScore(Integer maxScore) { this.maxScore = maxScore; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String name;
        private Integer weight;
        private Integer maxScore;
        private String description;

        public Builder id(String id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder weight(Integer weight) { this.weight = weight; return this; }
        public Builder maxScore(Integer maxScore) { this.maxScore = maxScore; return this; }
        public Builder description(String description) { this.description = description; return this; }

        public RubricCriterion build() {
            return new RubricCriterion(id, name, weight, maxScore, description);
        }
    }
}
