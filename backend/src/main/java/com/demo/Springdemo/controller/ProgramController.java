package com.demo.Springdemo.controller;

import com.demo.Springdemo.model.Program;
import com.demo.Springdemo.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = "*")
public class ProgramController {

    private final ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<Program> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Program> getProgramById(@PathVariable String id) {
        return programService.getProgramById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Program> createProgram(
            @RequestBody Program program,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "admin") String role) {
        Program created = programService.createProgram(program, role);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Program> updateProgram(
            @PathVariable String id,
            @RequestBody Program program,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "admin") String role) {
        try {
            Program updated = programService.updateProgram(id, program, role);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(
            @PathVariable String id,
            @RequestHeader(value = "X-Current-Role", required = false, defaultValue = "admin") String role) {
        try {
            programService.deleteProgram(id, role);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
