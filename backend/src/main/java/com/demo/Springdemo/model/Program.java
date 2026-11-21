package com.demo.Springdemo.model;

import com.demo.Springdemo.converter.EligibilityCriteriaConverter;
import com.demo.Springdemo.converter.RubricCriteriaListConverter;
import com.demo.Springdemo.converter.StringListConverter;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "grant_programs")
public class Program {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "code", length = 64, nullable = false)
    private String code;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "category", length = 128)
    private String category;

    @Column(name = "department", length = 255)
    private String department;

    @Lob
    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "total_budget")
    private Double totalBudget;

    @Column(name = "allocated_budget")
    private Double allocatedBudget;

    @Column(name = "min_award")
    private Double minAward;

    @Column(name = "max_award")
    private Double maxAward;

    @Column(name = "start_date", length = 32)
    private String startDate;

    @Column(name = "end_date", length = 32)
    private String endDate;

    @Column(name = "status", length = 64)
    private String status;

    @Column(name = "applicant_count")
    private Integer applicantCount;

    @Convert(converter = EligibilityCriteriaConverter.class)
    @Lob
    @Column(name = "eligibility_criteria", columnDefinition = "LONGTEXT")
    private EligibilityCriteria eligibilityCriteria;

    @Convert(converter = StringListConverter.class)
    @Lob
    @Column(name = "required_documents", columnDefinition = "LONGTEXT")
    private List<String> requiredDocuments = new ArrayList<>();

    @Convert(converter = RubricCriteriaListConverter.class)
    @Lob
    @Column(name = "rubric_criteria", columnDefinition = "LONGTEXT")
    private List<RubricCriterion> rubricCriteria = new ArrayList<>();

    public Program() {}

    public Program(String id, String code, String title, String category, String department,
                   String description, Double totalBudget, Double allocatedBudget, Double minAward,
                   Double maxAward, String startDate, String endDate, String status,
                   Integer applicantCount, EligibilityCriteria eligibilityCriteria,
                   List<String> requiredDocuments, List<RubricCriterion> rubricCriteria) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.category = category;
        this.department = department;
        this.description = description;
        this.totalBudget = totalBudget;
        this.allocatedBudget = allocatedBudget;
        this.minAward = minAward;
        this.maxAward = maxAward;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.applicantCount = applicantCount;
        this.eligibilityCriteria = eligibilityCriteria;
        this.requiredDocuments = requiredDocuments != null ? requiredDocuments : new ArrayList<>();
        this.rubricCriteria = rubricCriteria != null ? rubricCriteria : new ArrayList<>();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getTotalBudget() { return totalBudget; }
    public void setTotalBudget(Double totalBudget) { this.totalBudget = totalBudget; }

    public Double getAllocatedBudget() { return allocatedBudget; }
    public void setAllocatedBudget(Double allocatedBudget) { this.allocatedBudget = allocatedBudget; }

    public Double getMinAward() { return minAward; }
    public void setMinAward(Double minAward) { this.minAward = minAward; }

    public Double getMaxAward() { return maxAward; }
    public void setMaxAward(Double maxAward) { this.maxAward = maxAward; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getApplicantCount() { return applicantCount; }
    public void setApplicantCount(Integer applicantCount) { this.applicantCount = applicantCount; }

    public EligibilityCriteria getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(EligibilityCriteria eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }

    public List<String> getRequiredDocuments() { return requiredDocuments; }
    public void setRequiredDocuments(List<String> requiredDocuments) { this.requiredDocuments = requiredDocuments; }

    public List<RubricCriterion> getRubricCriteria() { return rubricCriteria; }
    public void setRubricCriteria(List<RubricCriterion> rubricCriteria) { this.rubricCriteria = rubricCriteria; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String code;
        private String title;
        private String category;
        private String department;
        private String description;
        private Double totalBudget;
        private Double allocatedBudget;
        private Double minAward;
        private Double maxAward;
        private String startDate;
        private String endDate;
        private String status;
        private Integer applicantCount;
        private EligibilityCriteria eligibilityCriteria;
        private List<String> requiredDocuments = new ArrayList<>();
        private List<RubricCriterion> rubricCriteria = new ArrayList<>();

        public Builder id(String id) { this.id = id; return this; }
        public Builder code(String code) { this.code = code; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder department(String department) { this.department = department; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder totalBudget(Double totalBudget) { this.totalBudget = totalBudget; return this; }
        public Builder allocatedBudget(Double allocatedBudget) { this.allocatedBudget = allocatedBudget; return this; }
        public Builder minAward(Double minAward) { this.minAward = minAward; return this; }
        public Builder maxAward(Double maxAward) { this.maxAward = maxAward; return this; }
        public Builder startDate(String startDate) { this.startDate = startDate; return this; }
        public Builder endDate(String endDate) { this.endDate = endDate; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder applicantCount(Integer applicantCount) { this.applicantCount = applicantCount; return this; }
        public Builder eligibilityCriteria(EligibilityCriteria eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; return this; }
        public Builder requiredDocuments(List<String> requiredDocuments) { this.requiredDocuments = requiredDocuments; return this; }
        public Builder rubricCriteria(List<RubricCriterion> rubricCriteria) { this.rubricCriteria = rubricCriteria; return this; }

        public Program build() {
            return new Program(id, code, title, category, department, description, totalBudget, allocatedBudget,
                    minAward, maxAward, startDate, endDate, status, applicantCount, eligibilityCriteria, requiredDocuments, rubricCriteria);
        }
    }
}
