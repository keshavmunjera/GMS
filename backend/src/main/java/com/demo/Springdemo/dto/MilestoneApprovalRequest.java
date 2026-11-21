package com.demo.Springdemo.dto;

public class MilestoneApprovalRequest {
    private String notes;
    private String role;

    public MilestoneApprovalRequest() {}

    public MilestoneApprovalRequest(String notes, String role) {
        this.notes = notes;
        this.role = role;
    }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
