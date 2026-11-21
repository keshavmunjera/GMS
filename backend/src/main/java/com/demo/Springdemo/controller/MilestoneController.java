package com.demo.Springdemo.controller;

import com.demo.Springdemo.dto.MilestoneApprovalRequest;
import com.demo.Springdemo.model.MilestoneReport;
import com.demo.Springdemo.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
@CrossOrigin(origins = "*")
public class MilestoneController {

    private final MilestoneService milestoneService;

    @Autowired
    public MilestoneController(MilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    @GetMapping
    public List<MilestoneReport> getAllMilestones(
            @RequestParam(required = false) String applicationId,
            @RequestParam(required = false) String status) {
        return milestoneService.getAllMilestones(applicationId, status);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MilestoneReport> getMilestoneById(@PathVariable String id) {
        return milestoneService.getMilestoneById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MilestoneReport> submitMilestone(
            @RequestBody MilestoneReport report,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "applicant") String role) {
        MilestoneReport submitted = milestoneService.submitMilestone(report, role);
        return ResponseEntity.status(HttpStatus.CREATED).body(submitted);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<MilestoneReport> approveMilestone(
            @PathVariable String id,
            @RequestBody(required = false) MilestoneApprovalRequest request,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "finance") String role) {
        if (request == null) {
            request = new MilestoneApprovalRequest();
        }
        try {
            MilestoneReport approved = milestoneService.approveMilestone(id, request, role);
            return ResponseEntity.ok(approved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
