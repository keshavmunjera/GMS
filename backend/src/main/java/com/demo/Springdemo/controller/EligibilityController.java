package com.demo.Springdemo.controller;

import com.demo.Springdemo.dto.EligibilityCheckRequest;
import com.demo.Springdemo.dto.EligibilityCheckResponse;
import com.demo.Springdemo.service.EligibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eligibility")
@CrossOrigin(origins = "*")
public class EligibilityController {

    private final EligibilityService eligibilityService;

    @Autowired
    public EligibilityController(EligibilityService eligibilityService) {
        this.eligibilityService = eligibilityService;
    }

    @PostMapping("/check")
    public ResponseEntity<EligibilityCheckResponse> checkEligibility(@RequestBody EligibilityCheckRequest request) {
        try {
            EligibilityCheckResponse response = eligibilityService.checkEligibility(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
