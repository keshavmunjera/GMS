package com.demo.Springdemo.dto;

public class StageAdvanceRequest {
    private String stage;
    private String decisionNotes;
    private String role;

    public StageAdvanceRequest() {}

    public StageAdvanceRequest(String stage, String decisionNotes, String role) {
        this.stage = stage;
        this.decisionNotes = decisionNotes;
        this.role = role;
    }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public String getDecisionNotes() { return decisionNotes; }
    public void setDecisionNotes(String decisionNotes) { this.decisionNotes = decisionNotes; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
