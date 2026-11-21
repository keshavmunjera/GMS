package com.demo.Springdemo.service;

import com.demo.Springdemo.model.AuditLog;
import com.demo.Springdemo.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Autowired
    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    private static final Map<String, String> ROLE_ACTORS = Map.of(
            "admin", "Administrator (Hon. Director Marcus Sterling)",
            "applicant", "Applicant (Dr. Aris Vance)",
            "reviewer", "Reviewer (Dr. Kevin Thorne, MD)",
            "finance", "Finance Officer (Evelyn Reed)"
    );

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }

    @Transactional
    public AuditLog createLog(AuditLog log) {
        if (log.getId() == null || log.getId().isEmpty()) {
            log.setId("audit-" + System.currentTimeMillis());
        }
        if (log.getTimestamp() == null || log.getTimestamp().isEmpty()) {
            log.setTimestamp(Instant.now().toString());
        }
        return auditLogRepository.save(log);
    }

    @Transactional
    public AuditLog logAction(String action, String details, String roleKey) {
        String normalizedRole = (roleKey != null && !roleKey.trim().isEmpty()) ? roleKey.toLowerCase() : "admin";
        String actor = ROLE_ACTORS.getOrDefault(normalizedRole, "System User");
        String formattedRole = Character.toUpperCase(normalizedRole.charAt(0)) + normalizedRole.substring(1);

        AuditLog log = AuditLog.builder()
                .id("audit-" + System.currentTimeMillis() + "-" + (int)(Math.random() * 1000))
                .timestamp(Instant.now().toString())
                .actor(actor)
                .role(formattedRole)
                .action(action)
                .details(details)
                .build();

        return auditLogRepository.save(log);
    }
}
