package com.demo.Springdemo.controller;

import com.demo.Springdemo.repository.*;
import com.demo.Springdemo.service.SeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/system")
@CrossOrigin(origins = "*")
public class SeedController {

    private final SeedService seedService;
    private final ProgramRepository programRepository;
    private final ApplicationRepository applicationRepository;
    private final DisbursementRepository disbursementRepository;
    private final MilestoneRepository milestoneRepository;
    private final AuditLogRepository auditLogRepository;

    @Autowired
    public SeedController(SeedService seedService,
                          ProgramRepository programRepository,
                          ApplicationRepository applicationRepository,
                          DisbursementRepository disbursementRepository,
                          MilestoneRepository milestoneRepository,
                          AuditLogRepository auditLogRepository) {
        this.seedService = seedService;
        this.programRepository = programRepository;
        this.applicationRepository = applicationRepository;
        this.disbursementRepository = disbursementRepository;
        this.milestoneRepository = milestoneRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @PostMapping("/reset")
    public ResponseEntity<Map<String, Object>> resetData() {
        seedService.seedInitialData(true);
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", "SUCCESS");
        resp.put("message", "System data has been successfully reset to default demo scenario.");
        resp.put("counts", getEntityCounts());
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/seed")
    public ResponseEntity<Map<String, Object>> seedData() {
        seedService.seedInitialData(false);
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", "SUCCESS");
        resp.put("message", "System seeding check completed.");
        resp.put("counts", getEntityCounts());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getSystemInfo() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", "ONLINE");
        resp.put("database", "MySQL (grantsphere)");
        resp.put("counts", getEntityCounts());
        return ResponseEntity.ok(resp);
    }

    private Map<String, Long> getEntityCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("programs", programRepository.count());
        counts.put("applications", applicationRepository.count());
        counts.put("disbursements", disbursementRepository.count());
        counts.put("milestones", milestoneRepository.count());
        counts.put("auditLogs", auditLogRepository.count());
        return counts;
    }
}
