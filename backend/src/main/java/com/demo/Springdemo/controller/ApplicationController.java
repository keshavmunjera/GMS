package com.demo.Springdemo.controller;

import com.demo.Springdemo.dto.ReviewRequest;
import com.demo.Springdemo.dto.StageAdvanceRequest;
import com.demo.Springdemo.model.GrantApplication;
import com.demo.Springdemo.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<GrantApplication> getAllApplications(
            @RequestParam(required = false) String programId,
            @RequestParam(required = false) String stage,
            @RequestParam(required = false) String status) {
        return applicationService.getAllApplications(programId, stage, status);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrantApplication> getApplicationById(@PathVariable String id) {
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GrantApplication> submitApplication(
            @RequestBody GrantApplication application,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "applicant") String role) {
        GrantApplication submitted = applicationService.submitApplication(application, role);
        return ResponseEntity.status(HttpStatus.CREATED).body(submitted);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrantApplication> updateApplication(
            @PathVariable String id,
            @RequestBody GrantApplication application) {
        try {
            GrantApplication updated = applicationService.updateApplication(id, application);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<GrantApplication> submitReview(
            @PathVariable String id,
            @RequestBody ReviewRequest request,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "reviewer") String role) {
        try {
            GrantApplication updated = applicationService.submitReview(id, request, role);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/stage")
    public ResponseEntity<GrantApplication> advanceStage(
            @PathVariable String id,
            @RequestBody StageAdvanceRequest request,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "admin") String role) {
        try {
            GrantApplication updated = applicationService.advanceStage(id, request, role);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable String id) {
        try {
            applicationService.deleteApplication(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
