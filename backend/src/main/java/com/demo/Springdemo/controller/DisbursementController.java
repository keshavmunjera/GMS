package com.demo.Springdemo.controller;

import com.demo.Springdemo.dto.PaymentProcessRequest;
import com.demo.Springdemo.model.Disbursement;
import com.demo.Springdemo.service.DisbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disbursements")
@CrossOrigin(origins = "*")
public class DisbursementController {

    private final DisbursementService disbursementService;

    @Autowired
    public DisbursementController(DisbursementService disbursementService) {
        this.disbursementService = disbursementService;
    }

    @GetMapping
    public List<Disbursement> getAllDisbursements(
            @RequestParam(required = false) String applicationId,
            @RequestParam(required = false) String programId,
            @RequestParam(required = false) String status) {
        return disbursementService.getAllDisbursements(applicationId, programId, status);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disbursement> getDisbursementById(@PathVariable String id) {
        return disbursementService.getDisbursementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Disbursement> createDisbursement(@RequestBody Disbursement disbursement) {
        Disbursement created = disbursementService.createDisbursement(disbursement);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/{id}/process")
    public ResponseEntity<Disbursement> processDisbursement(
            @PathVariable String id,
            @RequestBody PaymentProcessRequest request,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "finance") String role) {
        try {
            Disbursement processed = disbursementService.processDisbursement(id, request, role);
            return ResponseEntity.ok(processed);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
