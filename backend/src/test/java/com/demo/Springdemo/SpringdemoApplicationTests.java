package com.demo.Springdemo;

import com.demo.Springdemo.dto.EligibilityCheckRequest;
import com.demo.Springdemo.dto.EligibilityCheckResponse;
import com.demo.Springdemo.dto.PaymentProcessRequest;
import com.demo.Springdemo.dto.ReviewRequest;
import com.demo.Springdemo.dto.StageAdvanceRequest;
import com.demo.Springdemo.model.Disbursement;
import com.demo.Springdemo.model.GrantApplication;
import com.demo.Springdemo.model.MilestoneReport;
import com.demo.Springdemo.model.Program;
import com.demo.Springdemo.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SpringdemoApplicationTests {

    @Autowired
    private ProgramService programService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private DisbursementService disbursementService;

    @Autowired
    private MilestoneService milestoneService;

    @Autowired
    private EligibilityService eligibilityService;

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private SeedService seedService;

    @Test
    void testContextLoadsAndDataSeeded() {
        assertNotNull(programService);
        assertNotNull(applicationService);

        List<Program> programs = programService.getAllPrograms();
        assertFalse(programs.isEmpty(), "Programs should not be empty after seeding");

        List<GrantApplication> apps = applicationService.getAllApplications(null, null, null);
        assertFalse(apps.isEmpty(), "Applications should not be empty after seeding");
    }

    @Test
    void testEligibilityCheck() {
        List<Program> programs = programService.getAllPrograms();
        assertFalse(programs.isEmpty());
        Program prog = programs.get(0);

        EligibilityCheckRequest req = new EligibilityCheckRequest(
                prog.getId(),
                "Startup / SME",
                3,
                true,
                25.0,
                "National",
                true
        );

        EligibilityCheckResponse resp = eligibilityService.checkEligibility(req);
        assertNotNull(resp);
        assertEquals(prog.getId(), resp.getProgramId());
        assertTrue(resp.getPassedCount() > 0);
    }

    @Test
    void testApplicationWorkflow() {
        List<Program> programs = programService.getAllPrograms();
        Program prog = programs.get(0);

        // Submit new application
        GrantApplication app = GrantApplication.builder()
                .programId(prog.getId())
                .programTitle(prog.getTitle())
                .programCode(prog.getCode())
                .applicantOrg("Test Labs Inc")
                .projectTitle("Autonomous Sensor Array")
                .requestedAmount(150000.0)
                .build();

        GrantApplication submitted = applicationService.submitApplication(app, "applicant");
        assertNotNull(submitted.getId());
        assertNotNull(submitted.getTrackingNumber());
        assertEquals("Submitted", submitted.getStatus());

        // Submit review
        ReviewRequest revReq = new ReviewRequest(
                "rev-test",
                "Dr. Test Evaluator",
                "Specialist",
                85,
                Map.of("crit-1", 25, "crit-2", 20),
                "Strong technical plan",
                "None",
                "Recommend Approval",
                null,
                "reviewer"
        );

        GrantApplication reviewed = applicationService.submitReview(submitted.getId(), revReq, "reviewer");
        assertEquals("In Review", reviewed.getStatus());
        assertEquals(85, reviewed.getScore());

        // Advance to Approved
        StageAdvanceRequest advReq = new StageAdvanceRequest("Approved", "Unanimous committee signoff", "admin");
        GrantApplication approved = applicationService.advanceStage(reviewed.getId(), advReq, "admin");
        assertEquals("Approved", approved.getStatus());
        assertEquals("Approved", approved.getStage());

        // Verify Disbursements created automatically
        List<Disbursement> disbs = disbursementService.getAllDisbursements(approved.getId(), null, null);
        assertEquals(3, disbs.size(), "Approved application should have 3 tranches generated");

        // Process Tranche 1 payment
        Disbursement tranche1 = disbs.get(0);
        PaymentProcessRequest payReq = new PaymentProcessRequest("Federal Wire ACH", "TEST-ACH-123456", "Initial release", "finance");
        Disbursement processed = disbursementService.processDisbursement(tranche1.getId(), payReq, "finance");
        assertEquals("Disbursed", processed.getStatus());
        assertEquals("TEST-ACH-123456", processed.getReferenceCode());
    }

    @Test
    void testMilestoneWorkflow() {
        MilestoneReport report = MilestoneReport.builder()
                .applicationId("app-101")
                .trackingNumber("APP-2026-8941")
                .granteeOrg("Solaria Biofuels & Microgrids Ltd")
                .trancheNumber(1)
                .title("Initial System Deployment")
                .completionPercentage(100)
                .spendToDate(50000.0)
                .deliverablesCompleted(List.of("Hardware purchased", "Site cleared"))
                .build();

        MilestoneReport submitted = milestoneService.submitMilestone(report, "applicant");
        assertEquals("Submitted", submitted.getStatus());

        MilestoneReport approved = milestoneService.approveMilestone(submitted.getId(), null, "finance");
        assertEquals("Approved", approved.getStatus());
    }

    @Test
    void testDashboardSummary() {
        var summary = dashboardService.getSummary();
        assertNotNull(summary);
        assertTrue(summary.getTotalPool() > 0);
        assertTrue(summary.getApplicantCount() > 0);
    }
}
