package com.demo.Springdemo.service;

import com.demo.Springdemo.model.*;
import com.demo.Springdemo.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SeedService {

    private static final Logger log = LoggerFactory.getLogger(SeedService.class);

    private final ProgramRepository programRepository;
    private final ApplicationRepository applicationRepository;
    private final DisbursementRepository disbursementRepository;
    private final MilestoneRepository milestoneRepository;
    private final AuditLogRepository auditLogRepository;

    @Autowired
    public SeedService(ProgramRepository programRepository,
                       ApplicationRepository applicationRepository,
                       DisbursementRepository disbursementRepository,
                       MilestoneRepository milestoneRepository,
                       AuditLogRepository auditLogRepository) {
        this.programRepository = programRepository;
        this.applicationRepository = applicationRepository;
        this.disbursementRepository = disbursementRepository;
        this.milestoneRepository = milestoneRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public void seedInitialData(boolean forceReset) {
        if (!forceReset && programRepository.count() > 0) {
            log.info("Database already contains data. Skipping initial seeding.");
            return;
        }

        log.info("Seeding initial data into Grants Management System...");

        if (forceReset) {
            milestoneRepository.deleteAll();
            disbursementRepository.deleteAll();
            applicationRepository.deleteAll();
            programRepository.deleteAll();
            auditLogRepository.deleteAll();
        }

        seedPrograms();
        seedApplications();
        seedDisbursements();
        seedMilestones();
        seedAuditLogs();

        log.info("Initial data successfully seeded.");
    }

    private void seedPrograms() {
        List<Program> list = new ArrayList<>();

        list.add(Program.builder()
                .id("prog-001")
                .code("TECH-2026-01")
                .title("CleanTech Innovation & Climate Resilience Grant")
                .category("Climate & Sustainability")
                .department("Department of Energy & Environment")
                .description("Funding breakthrough technological interventions targeting zero-emission municipal transport, renewable energy storage, and industrial carbon capture.")
                .totalBudget(5000000.0)
                .allocatedBudget(3200000.0)
                .minAward(100000.0)
                .maxAward(750000.0)
                .startDate("2026-01-15")
                .endDate("2026-12-31")
                .status("Open")
                .applicantCount(18)
                .eligibilityCriteria(EligibilityCriteria.builder()
                        .minYearsOperational(2)
                        .eligibleOrgTypes(List.of("Non-Profit", "Higher Education", "Startup / SME"))
                        .requireMatchingFunds(true)
                        .minMatchingPercentage(20.0)
                        .requiresTaxExemptCert(true)
                        .geographicScope("National")
                        .build())
                .requiredDocuments(List.of(
                        "Detailed Project Proposal (PDF)",
                        "Itemized 3-Year Budget Schedule",
                        "Audited Financial Statements (Last 2 Years)",
                        "Environmental Impact Assessment",
                        "Key Personnel CVs"
                ))
                .rubricCriteria(List.of(
                        RubricCriterion.builder().id("crit-1").name("Technical Merit & Innovation").weight(30).maxScore(30).description("Novelty of approach, scientific validity, and intellectual property viability.").build(),
                        RubricCriterion.builder().id("crit-2").name("Implementation Feasibility & Milestones").weight(25).maxScore(25).description("Realistic project timeline, team capacity, and risk mitigation plan.").build(),
                        RubricCriterion.builder().id("crit-3").name("Measurable Environmental Impact").weight(25).maxScore(25).description("Quantifiable CO2 emissions reduction and community resilience metrics.").build(),
                        RubricCriterion.builder().id("crit-4").name("Budget Reasonableness & Value for Money").weight(20).maxScore(20).description("Clear cost justification, prudent resource allocation, and matching funds.").build()
                ))
                .build());

        list.add(Program.builder()
                .id("prog-002")
                .code("HEALTH-2026-04")
                .title("Rural Healthcare Equity & Telemedicine Acceleration")
                .category("Healthcare & Public Health")
                .department("Ministry of Health & Human Services")
                .description("Equipping underserved rural primary care centers with high-speed diagnostic telemetry, remote ultrasound devices, and trained community nurse navigators.")
                .totalBudget(3500000.0)
                .allocatedBudget(2100000.0)
                .minAward(50000.0)
                .maxAward(500000.0)
                .startDate("2026-02-01")
                .endDate("2026-11-30")
                .status("Open")
                .applicantCount(24)
                .eligibilityCriteria(EligibilityCriteria.builder()
                        .minYearsOperational(1)
                        .eligibleOrgTypes(List.of("Non-Profit", "Healthcare Institution", "Higher Education"))
                        .requireMatchingFunds(false)
                        .minMatchingPercentage(0.0)
                        .requiresTaxExemptCert(true)
                        .geographicScope("Rural Districts")
                        .build())
                .requiredDocuments(List.of(
                        "Clinical Protocol & Security Plan",
                        "Itemized Equipment Budget",
                        "Institutional Ethics / HIPAA Compliance Letter",
                        "Local Community Partner Support Letters"
                ))
                .rubricCriteria(List.of(
                        RubricCriterion.builder().id("crit-1").name("Clinical Efficacy & Protocol").weight(30).maxScore(30).description("Standard of care alignment and patient safety safeguards.").build(),
                        RubricCriterion.builder().id("crit-2").name("Target Beneficiary Reach").weight(30).maxScore(30).description("Demonstrated penetration in historically underserved populations.").build(),
                        RubricCriterion.builder().id("crit-3").name("Sustainability Post-Grant").weight(20).maxScore(20).description("Ability of clinics to maintain equipment and staffing beyond grant term.").build(),
                        RubricCriterion.builder().id("crit-4").name("Budget & Procurement Integrity").weight(20).maxScore(20).description("Vendor quotes and clear breakdown of hardware vs training costs.").build()
                ))
                .build());

        list.add(Program.builder()
                .id("prog-003")
                .code("EDU-2026-09")
                .title("Next-Gen STEM & AI Literacy for Secondary Schools")
                .category("Education & Workforce")
                .department("National Science and Education Directorate")
                .description("Empowering secondary public schools with interactive AI learning labs, robotics kits, and certified teacher development fellowships.")
                .totalBudget(2000000.0)
                .allocatedBudget(1800000.0)
                .minAward(25000.0)
                .maxAward(200000.0)
                .startDate("2026-03-01")
                .endDate("2026-08-31")
                .status("Under Review")
                .applicantCount(36)
                .eligibilityCriteria(EligibilityCriteria.builder()
                        .minYearsOperational(3)
                        .eligibleOrgTypes(List.of("Non-Profit", "School District", "Higher Education"))
                        .requireMatchingFunds(true)
                        .minMatchingPercentage(10.0)
                        .requiresTaxExemptCert(true)
                        .geographicScope("State / Regional")
                        .build())
                .requiredDocuments(List.of(
                        "Curriculum Framework Outline",
                        "School Principal Consent Letters",
                        "Budget & Kit Procurement Breakdown",
                        "Child Safeguarding Policy"
                ))
                .rubricCriteria(List.of(
                        RubricCriterion.builder().id("crit-1").name("Pedagogical Quality").weight(35).maxScore(35).description("Instructional design rigor and interactive hands-on component.").build(),
                        RubricCriterion.builder().id("crit-2").name("Diversity & Inclusion Index").weight(25).maxScore(25).description("Targeting female students and underrepresented groups in tech.").build(),
                        RubricCriterion.builder().id("crit-3").name("Educator Upskilling Strategy").weight(20).maxScore(20).description("Robust train-the-trainer methodology.").build(),
                        RubricCriterion.builder().id("crit-4").name("Financial Prudence").weight(20).maxScore(20).description("Economies of scale on robotics hardware and software licenses.").build()
                ))
                .build());

        list.add(Program.builder()
                .id("prog-004")
                .code("INFRA-2026-02")
                .title("Decentralized Clean Water & Watershed Reclamation")
                .category("Infrastructure & Water")
                .department("Water Resources Bureau")
                .description("Deploying solar-powered atmospheric water generators and biological filtration swales for drought-affected agrarian communities.")
                .totalBudget(4000000.0)
                .allocatedBudget(850000.0)
                .minAward(150000.0)
                .maxAward(600000.0)
                .startDate("2026-04-01")
                .endDate("2027-03-31")
                .status("Open")
                .applicantCount(9)
                .eligibilityCriteria(EligibilityCriteria.builder()
                        .minYearsOperational(2)
                        .eligibleOrgTypes(List.of("Non-Profit", "Research Institution", "Social Enterprise"))
                        .requireMatchingFunds(true)
                        .minMatchingPercentage(25.0)
                        .requiresTaxExemptCert(false)
                        .geographicScope("Designated Drought Zones")
                        .build())
                .requiredDocuments(List.of(
                        "Hydrological Engineering Survey",
                        "Water Rights & Regulatory Permits",
                        "Operations & Maintenance 5-Year Plan",
                        "Community Governance Model"
                ))
                .rubricCriteria(List.of(
                        RubricCriterion.builder().id("crit-1").name("Engineering Robustness").weight(35).maxScore(35).description("Durability of filtration equipment under extreme climate stress.").build(),
                        RubricCriterion.builder().id("crit-2").name("Volume of Potable Water Delivered").weight(25).maxScore(25).description("Liters/day per dollar invested.").build(),
                        RubricCriterion.builder().id("crit-3").name("Community Ownership Model").weight(20).maxScore(20).description("Local training of water caretakers.").build(),
                        RubricCriterion.builder().id("crit-4").name("Budget Transparency").weight(20).maxScore(20).description("Audited contractor estimates and spare parts allocation.").build()
                ))
                .build());

        list.add(Program.builder()
                .id("prog-005")
                .code("CYBER-2026-08")
                .title("Cybersecurity Shield for Critical Civil Infrastructure")
                .category("Technology & Security")
                .department("Cyber Protection Agency")
                .description("Providing threat detection, incident response readiness, and automated backup infrastructure for community utilities and hospitals.")
                .totalBudget(3000000.0)
                .allocatedBudget(0.0)
                .minAward(80000.0)
                .maxAward(400000.0)
                .startDate("2026-05-01")
                .endDate("2026-10-31")
                .status("Draft")
                .applicantCount(0)
                .eligibilityCriteria(EligibilityCriteria.builder()
                        .minYearsOperational(3)
                        .eligibleOrgTypes(List.of("Non-Profit", "Public Utility", "Higher Education"))
                        .requireMatchingFunds(false)
                        .minMatchingPercentage(0.0)
                        .requiresTaxExemptCert(true)
                        .geographicScope("National")
                        .build())
                .requiredDocuments(List.of(
                        "Current Vulnerability Assessment",
                        "Architecture Hardening Roadmap",
                        "Personnel Security Clearances"
                ))
                .rubricCriteria(List.of(
                        RubricCriterion.builder().id("crit-1").name("Threat Risk Reduction").weight(40).maxScore(40).description("Targeting high-impact vulnerabilities in SCADA and patient data.").build(),
                        RubricCriterion.builder().id("crit-2").name("Rapid Incident Response SLA").weight(30).maxScore(30).description("Proven 24/7 monitoring capabilities.").build(),
                        RubricCriterion.builder().id("crit-3").name("Cost Effectiveness").weight(30).maxScore(30).description("Open-source tooling utilization and licensing efficiency.").build()
                ))
                .build());

        programRepository.saveAll(list);
    }

    private void seedApplications() {
        List<GrantApplication> list = new ArrayList<>();

        list.add(GrantApplication.builder()
                .id("app-101")
                .trackingNumber("APP-2026-8941")
                .programId("prog-001")
                .programTitle("CleanTech Innovation & Climate Resilience Grant")
                .programCode("TECH-2026-01")
                .applicantOrg("Solaria Biofuels & Microgrids Ltd")
                .orgType("Startup / SME")
                .ein("XX-9821445")
                .contactPerson("Dr. Aris Vance")
                .contactEmail("a.vance@solariagrid.org")
                .contactPhone("+1 (555) 349-1102")
                .address("450 Innovation Way, Suite 300, Denver, CO")
                .yearsOperational(4)
                .projectTitle("Grid-Independent Solar Microgrid with Flow Battery for Agricultural Cooperatives")
                .requestedAmount(520000.0)
                .projectDurationMonths(18)
                .executiveSummary("Deployment of an advanced iron-flow redox battery microgrid coupled with 1.2MW bifacial solar arrays to provide continuous 24/7 zero-emission refrigeration and irrigation for 120 organic smallholder farmers.")
                .objectives(List.of(
                        "Eliminate 450 metric tons of diesel CO2 emissions in year 1.",
                        "Deploy 1.2MW solar capacity with 4MWh energy storage buffer.",
                        "Conduct 12 community operator training workshops."
                ))
                .budgetBreakdown(List.of(
                        BudgetItem.builder().category("Hardware & Equipment (Flow Batteries & Panels)").amount(310000.0).build(),
                        BudgetItem.builder().category("Installation Engineering & Site Prep").amount(95000.0).build(),
                        BudgetItem.builder().category("Personnel & Technical Project Lead").amount(75000.0).build(),
                        BudgetItem.builder().category("Monitoring, Testing & Compliance").amount(40000.0).build()
                ))
                .matchingFunds(130000.0)
                .matchingPercent(25.0)
                .eligibilityAnswers(Map.of(
                        "registeredEntity", true,
                        "orgTypeMatch", true,
                        "hasTaxExemption", true,
                        "yearsMet", true,
                        "matchingAvailable", true
                ))
                .attachedFiles(List.of(
                        AttachedFile.builder().name("Solaria_Engineering_Proposal_v2.pdf").size("4.2 MB").uploadedAt("2026-02-10").build(),
                        AttachedFile.builder().name("Itemized_BOM_and_Vendor_Quotes.xlsx").size("1.1 MB").uploadedAt("2026-02-10").build(),
                        AttachedFile.builder().name("Audited_Financials_2024_2025.pdf").size("3.6 MB").uploadedAt("2026-02-10").build()
                ))
                .status("Approved")
                .stage("Approved")
                .submittedAt("2026-02-10T14:30:00Z")
                .score(92)
                .reviews(List.of(
                        Review.builder()
                                .reviewerId("rev-01")
                                .reviewerName("Prof. Helen Diaz")
                                .reviewerRole("Senior CleanTech Evaluator")
                                .scoreTotal(92)
                                .scores(Map.of("crit-1", 28, "crit-2", 23, "crit-3", 24, "crit-4", 17))
                                .strengths("Exceptionally well-engineered flow battery architecture. High social impact for agricultural co-ops and solid matching fund commitment.")
                                .concerns("Slight risk in supply chain timeline for membrane components; recommend milestone gating.")
                                .recommendation("Recommend Approval")
                                .reviewedAt("2026-02-28T09:15:00Z")
                                .build()
                ))
                .committeeDecision(CommitteeDecision.builder()
                        .status("Approved")
                        .approvedAmount(520000.0)
                        .approvedDate("2026-03-05")
                        .decisionNotes("Unanimously approved by the Green Energy Council. Disbursement authorized in 3 tranches linked to hardware delivery milestones.")
                        .signedBy("Hon. Director Marcus Sterling")
                        .build())
                .build());

        list.add(GrantApplication.builder()
                .id("app-102")
                .trackingNumber("APP-2026-8942")
                .programId("prog-002")
                .programTitle("Rural Healthcare Equity & Telemedicine Acceleration")
                .programCode("HEALTH-2026-04")
                .applicantOrg("Appalachian Health Outreach Network")
                .orgType("Non-Profit")
                .ein("XX-4329001")
                .contactPerson("Maria Rodriguez, RN")
                .contactEmail("maria@appalachianhealth.org")
                .contactPhone("+1 (555) 782-9904")
                .address("120 Mountain Vista Rd, Charleston, WV")
                .yearsOperational(7)
                .projectTitle("Mobile Tele-Ultrasound & AI Diagnostic Van for Remote Mountain Communities")
                .requestedAmount(380000.0)
                .projectDurationMonths(12)
                .executiveSummary("Deploying two all-terrain mobile clinic vans outfitted with handheld point-of-care ultrasound (POCUS), encrypted satellite broadband, and AI cardiac screening software to reach 8,000 isolated residents annually.")
                .objectives(List.of(
                        "Screen 3,500 high-risk cardiovascular and prenatal patients.",
                        "Reduce average emergency travel times from 90 mins to on-site diagnosis.",
                        "Train 25 community health volunteers."
                ))
                .budgetBreakdown(List.of(
                        BudgetItem.builder().category("Outfitted Clinic Vehicles & Maintenance").amount(160000.0).build(),
                        BudgetItem.builder().category("Portable Ultrasound & AI Telemetry Hardware").amount(110000.0).build(),
                        BudgetItem.builder().category("Nurse Navigators & Sonographer Stipends").amount(80000.0).build(),
                        BudgetItem.builder().category("Satellite Connectivity & HIPAA Cloud Platform").amount(30000.0).build()
                ))
                .matchingFunds(40000.0)
                .matchingPercent(10.5)
                .eligibilityAnswers(Map.of(
                        "registeredEntity", true,
                        "orgTypeMatch", true,
                        "hasTaxExemption", true,
                        "yearsMet", true,
                        "matchingAvailable", true
                ))
                .attachedFiles(List.of(
                        AttachedFile.builder().name("Appalachian_Health_Master_Plan.pdf").size("5.8 MB").uploadedAt("2026-02-18").build(),
                        AttachedFile.builder().name("Clinic_Vehicle_Specifications.pdf").size("2.1 MB").uploadedAt("2026-02-18").build()
                ))
                .status("In Review")
                .stage("Committee Review")
                .submittedAt("2026-02-18T10:20:00Z")
                .score(88)
                .reviews(List.of(
                        Review.builder()
                                .reviewerId("rev-02")
                                .reviewerName("Dr. Kevin Thorne, MD")
                                .reviewerRole("Clinical Advisory Chair")
                                .scoreTotal(88)
                                .scores(Map.of("crit-1", 27, "crit-2", 28, "crit-3", 16, "crit-4", 17))
                                .strengths("High-leverage clinical intervention with direct life-saving prenatal and cardiovascular benefits.")
                                .concerns("Vehicle fuel and maintenance beyond year 1 requires local county subsidy confirmation.")
                                .recommendation("Recommend Approval")
                                .reviewedAt("2026-03-01T16:45:00Z")
                                .build()
                ))
                .build());

        list.add(GrantApplication.builder()
                .id("app-103")
                .trackingNumber("APP-2026-8943")
                .programId("prog-003")
                .programTitle("Next-Gen STEM & AI Literacy for Secondary Schools")
                .programCode("EDU-2026-09")
                .applicantOrg("FutureMinds Tech Foundation")
                .orgType("Non-Profit")
                .ein("XX-7761099")
                .contactPerson("David Chen")
                .contactEmail("dchen@futuremindstech.org")
                .contactPhone("+1 (555) 901-4433")
                .address("88 Cyber Gateway, Austin, TX")
                .yearsOperational(5)
                .projectTitle("RoboQuest: Hands-on Robotics & Machine Learning Kits for 40 Title-I High Schools")
                .requestedAmount(180000.0)
                .projectDurationMonths(10)
                .executiveSummary("Supplying open-hardware robotics platforms and micro-controller vision kits paired with a peer-reviewed high school syllabus to teach foundational computer vision and robotics.")
                .objectives(List.of(
                        "Equip 40 public school laboratories with modular robotics toolkits.",
                        "Certify 80 STEM high school educators in applied machine learning basics.",
                        "Host a regional student hackathon with 400+ participants."
                ))
                .budgetBreakdown(List.of(
                        BudgetItem.builder().category("Robotics Hardware Kits & Micro-Controllers").amount(95000.0).build(),
                        BudgetItem.builder().category("Teacher Professional Development Fellowships").amount(45000.0).build(),
                        BudgetItem.builder().category("Curriculum Licensing & LMS Server Hosting").amount(25000.0).build(),
                        BudgetItem.builder().category("Regional Showcase Event & Student Awards").amount(15000.0).build()
                ))
                .matchingFunds(25000.0)
                .matchingPercent(13.8)
                .eligibilityAnswers(Map.of(
                        "registeredEntity", true,
                        "orgTypeMatch", true,
                        "hasTaxExemption", true,
                        "yearsMet", true,
                        "matchingAvailable", true
                ))
                .attachedFiles(List.of(
                        AttachedFile.builder().name("FutureMinds_RoboQuest_Curriculum.pdf").size("8.4 MB").uploadedAt("2026-03-02").build(),
                        AttachedFile.builder().name("District_Partnership_Letters.pdf").size("1.9 MB").uploadedAt("2026-03-02").build()
                ))
                .status("In Review")
                .stage("Technical Review")
                .submittedAt("2026-03-02T11:00:00Z")
                .score(null)
                .reviews(new ArrayList<>())
                .build());

        list.add(GrantApplication.builder()
                .id("app-104")
                .trackingNumber("APP-2026-8944")
                .programId("prog-001")
                .programTitle("CleanTech Innovation & Climate Resilience Grant")
                .programCode("TECH-2026-01")
                .applicantOrg("Verdant Carbon Capture Labs")
                .orgType("Startup / SME")
                .ein("XX-1198302")
                .contactPerson("Sonia Patel")
                .contactEmail("spatel@verdantlabs.io")
                .contactPhone("+1 (555) 662-7711")
                .address("14 BioPark Blvd, Seattle, WA")
                .yearsOperational(2)
                .projectTitle("Direct-Air Solid-State Algae Bioreactor Columns for Urban Rooftops")
                .requestedAmount(640000.0)
                .projectDurationMonths(24)
                .executiveSummary("Modular photobioreactors that utilize genetically optimized microalgae strains to capture urban CO2 at 10x the efficiency of mature trees, generating harvestable biomass for bio-plastics.")
                .objectives(List.of(
                        "Construct and install 20 pilot rooftop bioreactor columns in downtown Seattle.",
                        "Achieve 15 tons annual CO2 sequestration per rooftop installation.",
                        "Establish certified supply chain for secondary bioplastic pellets."
                ))
                .budgetBreakdown(List.of(
                        BudgetItem.builder().category("Bioreactor Column Fabrications & Sensors").amount(340000.0).build(),
                        BudgetItem.builder().category("Lab Culture Development & Strain Licensing").amount(120000.0).build(),
                        BudgetItem.builder().category("Pilot Deployment & City Permitting").amount(110000.0).build(),
                        BudgetItem.builder().category("Life Cycle Assessment (LCA) Audit").amount(70000.0).build()
                ))
                .matchingFunds(160000.0)
                .matchingPercent(25.0)
                .eligibilityAnswers(Map.of(
                        "registeredEntity", true,
                        "orgTypeMatch", true,
                        "hasTaxExemption", true,
                        "yearsMet", true,
                        "matchingAvailable", true
                ))
                .attachedFiles(List.of(
                        AttachedFile.builder().name("Verdant_Algae_Tech_Spec.pdf").size("6.7 MB").uploadedAt("2026-03-08").build()
                ))
                .status("Submitted")
                .stage("Eligibility Screening")
                .submittedAt("2026-03-08T15:45:00Z")
                .score(null)
                .reviews(new ArrayList<>())
                .build());

        list.add(GrantApplication.builder()
                .id("app-105")
                .trackingNumber("APP-2026-8945")
                .programId("prog-004")
                .programTitle("Decentralized Clean Water & Watershed Reclamation")
                .programCode("INFRA-2026-02")
                .applicantOrg("Aquifer Rebirth Initiative")
                .orgType("Research Institution")
                .ein("XX-5544332")
                .contactPerson("Dr. Tariq Mansoor")
                .contactEmail("tmansoor@aquiferrebirth.org")
                .contactPhone("+1 (555) 883-2219")
                .address("300 Desert Research Way, Phoenix, AZ")
                .yearsOperational(6)
                .projectTitle("Subsurface Bio-Sand & Zeolite Water Reclamation Trenching for Arid Farmland")
                .requestedAmount(450000.0)
                .projectDurationMonths(18)
                .executiveSummary("High-capacity passive natural filtration trenches capable of filtering agricultural runoff from pesticide residues and brackish salinity, recharging groundwater aquifers cleanly.")
                .objectives(List.of(
                        "Construct 3km of subsurface bio-sand filtration corridors.",
                        "Filter and return 1.8 million gallons of reclaimed irrigation runoff per month.",
                        "Publish open-source hydrological design guides for regional farming co-ops."
                ))
                .budgetBreakdown(List.of(
                        BudgetItem.builder().category("Earthmoving & Trench Construction Subcontractors").amount(210000.0).build(),
                        BudgetItem.builder().category("Zeolite & Bio-Sand Media Sourcing").amount(120000.0).build(),
                        BudgetItem.builder().category("Hydrological Sensor Telemetry Array").amount(70000.0).build(),
                        BudgetItem.builder().category("Project Management & Community Liaison").amount(50000.0).build()
                ))
                .matchingFunds(120000.0)
                .matchingPercent(26.6)
                .eligibilityAnswers(Map.of(
                        "registeredEntity", true,
                        "orgTypeMatch", true,
                        "hasTaxExemption", true,
                        "yearsMet", true,
                        "matchingAvailable", true
                ))
                .attachedFiles(List.of(
                        AttachedFile.builder().name("Aquifer_Rebirth_Hydro_Assessment.pdf").size("11.2 MB").uploadedAt("2026-01-28").build()
                ))
                .status("Approved")
                .stage("Approved")
                .submittedAt("2026-01-28T08:30:00Z")
                .score(95)
                .reviews(List.of(
                        Review.builder()
                                .reviewerId("rev-03")
                                .reviewerName("Dr. Sarah Jenkins")
                                .reviewerRole("Chief Hydrologist")
                                .scoreTotal(95)
                                .scores(Map.of("crit-1", 33, "crit-2", 24, "crit-3", 19, "crit-4", 19))
                                .strengths("Outstanding water science backing, great cost per gallon filtered, highly responsive to regional aquifer depletion.")
                                .concerns("Ensure local tribal council consultation is completed during month 1.")
                                .recommendation("Recommend Approval")
                                .reviewedAt("2026-02-12T13:00:00Z")
                                .build()
                ))
                .committeeDecision(CommitteeDecision.builder()
                        .status("Approved")
                        .approvedAmount(450000.0)
                        .approvedDate("2026-02-20")
                        .decisionNotes("Approved with full backing by the Water Sustainability Taskforce.")
                        .signedBy("Chairwoman Clara Evans")
                        .build())
                .build());

        list.add(GrantApplication.builder()
                .id("app-106")
                .trackingNumber("APP-2026-8946")
                .programId("prog-001")
                .programTitle("CleanTech Innovation & Climate Resilience Grant")
                .programCode("TECH-2026-01")
                .applicantOrg("OmniVenture Energy Labs")
                .orgType("Startup / SME")
                .ein("XX-9021882")
                .contactPerson("Jason Miller")
                .contactEmail("jmiller@omnivend.com")
                .contactPhone("+1 (555) 431-7722")
                .address("99 Frontier Blvd, Reno, NV")
                .yearsOperational(1)
                .projectTitle("Proprietary Magneto-Thermal High Density Storage")
                .requestedAmount(700000.0)
                .projectDurationMonths(24)
                .executiveSummary("Unverified thermal storage claims lacking independent laboratory peer-review.")
                .objectives(List.of("Build massive magnetic heat sinks."))
                .budgetBreakdown(List.of(
                        BudgetItem.builder().category("Unitemized Consulting & Salaries").amount(500000.0).build(),
                        BudgetItem.builder().category("Hardware").amount(200000.0).build()
                ))
                .matchingFunds(10000.0)
                .matchingPercent(1.4)
                .eligibilityAnswers(Map.of(
                        "registeredEntity", true,
                        "orgTypeMatch", true,
                        "hasTaxExemption", false,
                        "yearsMet", false,
                        "matchingAvailable", false
                ))
                .attachedFiles(new ArrayList<>())
                .status("Rejected")
                .stage("Rejected")
                .submittedAt("2026-02-05T09:00:00Z")
                .score(41)
                .reviews(List.of(
                        Review.builder()
                                .reviewerId("rev-01")
                                .reviewerName("Prof. Helen Diaz")
                                .reviewerRole("Senior CleanTech Evaluator")
                                .scoreTotal(41)
                                .scores(Map.of("crit-1", 12, "crit-2", 10, "crit-3", 11, "crit-4", 8))
                                .strengths("Ambitious conceptual idea.")
                                .concerns("Failed minimum matching funds threshold (provided 1.4% vs 20% required). Failed 2 years operational rule. Budget heavily skewed to unitemized consulting.")
                                .recommendation("Recommend Rejection")
                                .reviewedAt("2026-02-14T11:00:00Z")
                                .build()
                ))
                .committeeDecision(CommitteeDecision.builder()
                        .status("Rejected")
                        .approvedAmount(0.0)
                        .approvedDate("2026-02-18")
                        .decisionNotes("Formal rejection due to failure to meet core eligibility threshold and scientific verification.")
                        .signedBy("Hon. Director Marcus Sterling")
                        .build())
                .build());

        applicationRepository.saveAll(list);
    }

    private void seedDisbursements() {
        List<Disbursement> list = new ArrayList<>();

        list.add(Disbursement.builder()
                .id("disb-001")
                .applicationId("app-101")
                .programId("prog-001")
                .trackingNumber("APP-2026-8941")
                .granteeOrg("Solaria Biofuels & Microgrids Ltd")
                .projectTitle("Grid-Independent Solar Microgrid with Flow Battery for Agricultural Cooperatives")
                .trancheNumber(1)
                .totalTranches(3)
                .percentage(40.0)
                .amount(208000.0)
                .milestoneRequirement("Initial Project Mobilization & Flow Battery Core Procurement Contract")
                .scheduledDate("2026-03-15")
                .disbursedDate("2026-03-15T10:14:00Z")
                .status("Disbursed")
                .paymentMethod("Federal Wire ACH")
                .referenceCode("FED-ACH-2026-904128")
                .notes("Tranche 1 released upon execution of Grant Agreement and vendor downpayment lock.")
                .build());

        list.add(Disbursement.builder()
                .id("disb-002")
                .applicationId("app-101")
                .programId("prog-001")
                .trackingNumber("APP-2026-8941")
                .granteeOrg("Solaria Biofuels & Microgrids Ltd")
                .projectTitle("Grid-Independent Solar Microgrid with Flow Battery for Agricultural Cooperatives")
                .trancheNumber(2)
                .totalTranches(3)
                .percentage(35.0)
                .amount(182000.0)
                .milestoneRequirement("On-site Delivery of Solar Arrays & Inverter Interconnects (Midterm Report Approval)")
                .scheduledDate("2026-07-30")
                .disbursedDate(null)
                .status("Scheduled")
                .paymentMethod("Federal Wire ACH")
                .referenceCode(null)
                .notes("Awaiting submission and engineering approval of Milestone #2 Progress Report.")
                .build());

        list.add(Disbursement.builder()
                .id("disb-003")
                .applicationId("app-101")
                .programId("prog-001")
                .trackingNumber("APP-2026-8941")
                .granteeOrg("Solaria Biofuels & Microgrids Ltd")
                .projectTitle("Grid-Independent Solar Microgrid with Flow Battery for Agricultural Cooperatives")
                .trancheNumber(3)
                .totalTranches(3)
                .percentage(25.0)
                .amount(130000.0)
                .milestoneRequirement("Grid Commissioning, Certified Grid-Tied Testing, Final Independent Financial Audit")
                .scheduledDate("2026-12-15")
                .disbursedDate(null)
                .status("Scheduled")
                .paymentMethod("Federal Wire ACH")
                .referenceCode(null)
                .notes("Final retention release upon independent project audit closure.")
                .build());

        list.add(Disbursement.builder()
                .id("disb-004")
                .applicationId("app-105")
                .programId("prog-004")
                .trackingNumber("APP-2026-8945")
                .granteeOrg("Aquifer Rebirth Initiative")
                .projectTitle("Subsurface Bio-Sand & Zeolite Water Reclamation Trenching for Arid Farmland")
                .trancheNumber(1)
                .totalTranches(3)
                .percentage(50.0)
                .amount(225000.0)
                .milestoneRequirement("Hydrological Permitting Clearance & Bio-Sand Media Quarry Agreements")
                .scheduledDate("2026-03-01")
                .disbursedDate("2026-03-02T14:40:00Z")
                .status("Disbursed")
                .paymentMethod("Direct Treasury Transfer")
                .referenceCode("DTT-USW-884129")
                .notes("Mobilization advance disbursed. Permits on file in state registry.")
                .build());

        list.add(Disbursement.builder()
                .id("disb-005")
                .applicationId("app-105")
                .programId("prog-004")
                .trackingNumber("APP-2026-8945")
                .granteeOrg("Aquifer Rebirth Initiative")
                .projectTitle("Subsurface Bio-Sand & Zeolite Water Reclamation Trenching for Arid Farmland")
                .trancheNumber(2)
                .totalTranches(3)
                .percentage(30.0)
                .amount(135000.0)
                .milestoneRequirement("Completion of 1.5km Trench Excavation and Zeolite Layering")
                .scheduledDate("2026-08-01")
                .disbursedDate(null)
                .status("Pending Approval")
                .paymentMethod("Direct Treasury Transfer")
                .referenceCode(null)
                .notes("Milestone report received; awaiting Finance Officer signoff.")
                .build());

        disbursementRepository.saveAll(list);
    }

    private void seedMilestones() {
        List<MilestoneReport> list = new ArrayList<>();

        list.add(MilestoneReport.builder()
                .id("milestone-101")
                .applicationId("app-101")
                .trackingNumber("APP-2026-8941")
                .granteeOrg("Solaria Biofuels & Microgrids Ltd")
                .trancheNumber(1)
                .title("Mobilization & Equipment Supply Contracts Lock")
                .completionPercentage(100)
                .spendToDate(198500.0)
                .deliverablesCompleted(List.of(
                        "Executed iron-flow battery module purchase order with ESS Tech Inc.",
                        "Completed site civil survey for 120 agricultural co-op parcels.",
                        "Installed local weather telemetry station."
                ))
                .challengesFaced("Minor 2-week transport bottleneck on high-voltage inverters, successfully resolved with secondary regional distributor.")
                .status("Approved")
                .submittedAt("2026-03-12T16:00:00Z")
                .approvedAt("2026-03-14T11:20:00Z")
                .reviewerNotes("All procurement proof slips validated. Tranche 1 condition satisfied.")
                .build());

        list.add(MilestoneReport.builder()
                .id("milestone-102")
                .applicationId("app-105")
                .trackingNumber("APP-2026-8945")
                .granteeOrg("Aquifer Rebirth Initiative")
                .trancheNumber(2)
                .title("Phase 1 Trench Excavation & Zeolite Bed Layering (1.5km)")
                .completionPercentage(85)
                .spendToDate(124000.0)
                .deliverablesCompleted(List.of(
                        "Excavated 1.6km linear filtration trenches to depth of 2.2 meters.",
                        "Installed 180 metric tons of certified washed agricultural zeolite substrate.",
                        "Positioned groundwater quality sampling piezometers."
                ))
                .challengesFaced("Encountered unexpected caliche rock stratum at sector 4; rented heavy hydraulic breaker with zero safety incidents.")
                .status("Submitted")
                .submittedAt("2026-03-16T18:30:00Z")
                .approvedAt(null)
                .reviewerNotes("Under financial audit review by Finance Officer.")
                .build());

        milestoneRepository.saveAll(list);
    }

    private void seedAuditLogs() {
        List<AuditLog> list = new ArrayList<>();

        list.add(AuditLog.builder()
                .id("audit-001")
                .timestamp("2026-03-16T18:30:00Z")
                .actor("Dr. Tariq Mansoor")
                .role("Applicant")
                .action("Submitted Milestone Report")
                .details("Milestone #2 Report submitted for Aquifer Rebirth Initiative (APP-2026-8945).")
                .build());

        list.add(AuditLog.builder()
                .id("audit-002")
                .timestamp("2026-03-15T10:14:00Z")
                .actor("Evelyn Reed")
                .role("Finance Officer")
                .action("Disbursed Tranche 1")
                .details("Released $208,000 via Federal Wire ACH (FED-ACH-2026-904128) to Solaria Biofuels & Microgrids Ltd.")
                .build());

        list.add(AuditLog.builder()
                .id("audit-003")
                .timestamp("2026-03-08T15:45:00Z")
                .actor("Sonia Patel")
                .role("Applicant")
                .action("Submitted Application")
                .details("New application submitted for CleanTech Innovation (APP-2026-8944).")
                .build());

        list.add(AuditLog.builder()
                .id("audit-004")
                .timestamp("2026-03-05T14:00:00Z")
                .actor("Hon. Director Marcus Sterling")
                .role("Admin")
                .action("Committee Approved Application")
                .details("Approved $520,000 award for Solaria Biofuels (APP-2026-8941).")
                .build());

        list.add(AuditLog.builder()
                .id("audit-005")
                .timestamp("2026-03-01T16:45:00Z")
                .actor("Dr. Kevin Thorne, MD")
                .role("Reviewer")
                .action("Completed Technical Review")
                .details("Submitted evaluation score 88/100 for Appalachian Health Outreach Network (APP-2026-8942).")
                .build());

        auditLogRepository.saveAll(list);
    }
}
