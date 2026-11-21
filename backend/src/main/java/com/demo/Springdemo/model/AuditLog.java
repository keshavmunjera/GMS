package com.demo.Springdemo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "timestamp", length = 64, nullable = false)
    private String timestamp;

    @Column(name = "actor", length = 255)
    private String actor;

    @Column(name = "role", length = 64)
    private String role;

    @Column(name = "action", length = 255)
    private String action;

    @Lob
    @Column(name = "details", columnDefinition = "LONGTEXT")
    private String details;

    public AuditLog() {}

    public AuditLog(String id, String timestamp, String actor, String role, String action, String details) {
        this.id = id;
        this.timestamp = timestamp;
        this.actor = actor;
        this.role = role;
        this.action = action;
        this.details = details;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getActor() { return actor; }
    public void setActor(String actor) { this.actor = actor; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String timestamp;
        private String actor;
        private String role;
        private String action;
        private String details;

        public Builder id(String id) { this.id = id; return this; }
        public Builder timestamp(String timestamp) { this.timestamp = timestamp; return this; }
        public Builder actor(String actor) { this.actor = actor; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public Builder action(String action) { this.action = action; return this; }
        public Builder details(String details) { this.details = details; return this; }

        public AuditLog build() {
            return new AuditLog(id, timestamp, actor, role, action, details);
        }
    }
}
