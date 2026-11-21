import { createContext, useState, useEffect } from 'react';
import {
  INITIAL_PROGRAMS,
  INITIAL_APPLICATIONS,
  INITIAL_DISBURSEMENTS,
  INITIAL_MILESTONE_REPORTS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';
import { api } from '../services/api';

export const GrantsContext = createContext();

const STORAGE_KEYS = {
  PROGRAMS: 'gms_programs_v1',
  APPLICATIONS: 'gms_applications_v1',
  DISBURSEMENTS: 'gms_disbursements_v1',
  MILESTONES: 'gms_milestones_v1',
  AUDIT_LOGS: 'gms_audit_logs_v1',
  CURRENT_ROLE: 'gms_current_role_v1'
};

export const GrantsProvider = ({ children }) => {
  // 1. Roles: 'admin' | 'applicant' | 'reviewer' | 'finance'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'admin';
  });

  // 2. Active Tab: 'overview' | 'programs' | 'eligibility' | 'applications' | 'reviews' | 'disbursements' | 'docs'
  const [activeTab, setActiveTab] = useState('overview');

  // 3. Backend connectivity status
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // 4. Data Collections
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [disbursements, setDisbursements] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DISBURSEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_DISBURSEMENTS;
  });

  const [milestones, setMilestones] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MILESTONES);
    return saved ? JSON.parse(saved) : INITIAL_MILESTONE_REPORTS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // 5. Modal and Selection States
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isSubmitAppOpen, setIsSubmitAppOpen] = useState(false);
  const [prefilledProgramForApp, setPrefilledProgramForApp] = useState(null);
  const [isDisbursementModalOpen, setIsDisbursementModalOpen] = useState(false);
  const [disbursementTarget, setDisbursementTarget] = useState(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Fetch from backend on initial mount
  useEffect(() => {
    let isMounted = true;
    const fetchBackendData = async () => {
      try {
        const [progs, apps, disbs, miles, audits] = await Promise.all([
          api.getPrograms(),
          api.getApplications(),
          api.getDisbursements(),
          api.getMilestones(),
          api.getAuditLogs()
        ]);
        if (isMounted) {
          if (progs && progs.length > 0) setPrograms(progs);
          if (apps && apps.length > 0) setApplications(apps);
          if (disbs && disbs.length > 0) setDisbursements(disbs);
          if (miles && miles.length > 0) setMilestones(miles);
          if (audits && audits.length > 0) setAuditLogs(audits);
          setIsBackendConnected(true);
        }
      } catch (err) {
        if (isMounted) {
          setIsBackendConnected(false);
        }
      }
    };
    fetchBackendData();
    return () => { isMounted = false; };
  }, []);

  // Helper to refresh audit logs from backend if connected
  const refreshAuditLogs = async () => {
    if (isBackendConnected) {
      try {
        const latest = await api.getAuditLogs();
        if (latest) setAuditLogs(latest);
      } catch (e) {
        // ignore
      }
    }
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISBURSEMENTS, JSON.stringify(disbursements));
  }, [disbursements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, currentRole);
  }, [currentRole]);

  // Toast helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit logger helper (local)
  const logAction = (action, details) => {
    const roleActors = {
      admin: 'Administrator (Hon. Director Marcus Sterling)',
      applicant: 'Applicant (Dr. Aris Vance)',
      reviewer: 'Reviewer (Dr. Kevin Thorne, MD)',
      finance: 'Finance Officer (Evelyn Reed)'
    };
    const newLog = {
      id: 'audit-' + Date.now(),
      timestamp: new Date().toISOString(),
      actor: roleActors[currentRole] || 'System User',
      role: currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
      action,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Program Management (J18-E02)
  const createProgram = async (programData) => {
    const newId = 'prog-' + (programs.length + 1).toString().padStart(3, '0');
    const newProgram = {
      ...programData,
      id: newId,
      applicantCount: 0,
      allocatedBudget: 0,
      status: programData.status || 'Open'
    };

    if (isBackendConnected) {
      try {
        const created = await api.createProgram(newProgram, currentRole);
        setPrograms((prev) => [created, ...prev]);
        showToast(`Grant program "${created.title}" created successfully!`, 'success');
        refreshAuditLogs();
        return created;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    setPrograms((prev) => [newProgram, ...prev]);
    logAction('Created Grant Program', `Created new grant program: ${newProgram.title} (${newProgram.code}) with pool of $${Number(newProgram.totalBudget).toLocaleString()}`);
    showToast(`Grant program "${newProgram.title}" created successfully!`, 'success');
    return newProgram;
  };

  const updateProgram = async (id, updates) => {
    if (isBackendConnected) {
      try {
        const updated = await api.updateProgram(id, updates, currentRole);
        setPrograms((prev) => prev.map((p) => (p.id === id ? updated : p)));
        showToast('Program updated successfully', 'success');
        refreshAuditLogs();
        return;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    setPrograms((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          logAction('Updated Grant Program', `Modified configuration for ${updated.title} (${updated.code})`);
          return updated;
        }
        return p;
      })
    );
    showToast('Program updated successfully', 'success');
  };

  const deleteProgram = async (id) => {
    if (isBackendConnected) {
      try {
        await api.deleteProgram(id, currentRole);
        setPrograms((prev) => prev.filter((p) => p.id !== id));
        showToast('Program deleted', 'info');
        refreshAuditLogs();
        return;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    const target = programs.find((p) => p.id === id);
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    if (target) {
      logAction('Deleted Grant Program', `Removed program ${target.title} (${target.code})`);
    }
    showToast('Program deleted', 'info');
  };

  // Application Submission & Eligibility (J18-E03)
  const submitApplication = async (appData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `APP-2026-${randomNum}`;
    const newApp = {
      ...appData,
      id: 'app-' + Date.now(),
      trackingNumber,
      status: 'Submitted',
      stage: 'Eligibility Screening',
      submittedAt: new Date().toISOString(),
      score: null,
      reviews: []
    };

    if (isBackendConnected) {
      try {
        const submitted = await api.submitApplication(newApp, currentRole);
        setApplications((prev) => [submitted, ...prev]);
        // Update program count
        setPrograms((prev) =>
          prev.map((prog) =>
            prog.id === submitted.programId
              ? { ...prog, applicantCount: (prog.applicantCount || 0) + 1 }
              : prog
          )
        );
        showToast(`Application ${submitted.trackingNumber} submitted successfully!`, 'success');
        refreshAuditLogs();
        return submitted;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    setApplications((prev) => [newApp, ...prev]);

    // Increment program applicant count
    setPrograms((prev) =>
      prev.map((prog) =>
        prog.id === newApp.programId
          ? { ...prog, applicantCount: (prog.applicantCount || 0) + 1 }
          : prog
      )
    );

    logAction('Submitted Grant Application', `Received application ${trackingNumber} from ${newApp.applicantOrg} for ${newApp.programTitle}. Requested: $${Number(newApp.requestedAmount).toLocaleString()}`);
    showToast(`Application ${trackingNumber} submitted successfully!`, 'success');
    return newApp;
  };

  // Review & Approval Workflow (J18-E04)
  const submitReview = async (appId, reviewData) => {
    if (isBackendConnected) {
      try {
        const updated = await api.submitReview(appId, reviewData, currentRole);
        setApplications((prev) => prev.map((app) => (app.id === appId ? updated : app)));
        showToast('Evaluation review submitted successfully!', 'success');
        refreshAuditLogs();
        return;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    const targetApp = applications.find((a) => a.id === appId);
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedReviews = [...(app.reviews || []), reviewData];
          const totalScore = updatedReviews.reduce((sum, r) => sum + (r.scoreTotal || 0), 0);
          const avgScore = Math.round(totalScore / updatedReviews.length);

          return {
            ...app,
            reviews: updatedReviews,
            score: avgScore,
            status: 'In Review'
          };
        }
        return app;
      })
    );

    if (targetApp) {
      logAction(
        'Submitted Evaluation Review',
        `Reviewer ${reviewData.reviewerName} scored Application ${targetApp.trackingNumber}: ${reviewData.scoreTotal}/100. Recommendation: ${reviewData.recommendation}`
      );
    }
    showToast('Evaluation review submitted successfully!', 'success');
  };

  const advanceApplicationStage = async (appId, nextStage, decisionNotes = '') => {
    const targetApp = applications.find((a) => a.id === appId);
    if (!targetApp) return;

    if (isBackendConnected) {
      try {
        const updated = await api.advanceStage(appId, nextStage, decisionNotes, currentRole);
        setApplications((prev) => prev.map((app) => (app.id === appId ? updated : app)));

        // If approved, sync disbursements and programs from backend
        if (nextStage === 'Approved') {
          const [latestDisbs, latestProgs] = await Promise.all([
            api.getDisbursements(),
            api.getPrograms()
          ]);
          if (latestDisbs) setDisbursements(latestDisbs);
          if (latestProgs) setPrograms(latestProgs);
        }

        showToast(`Application transitioned to ${nextStage}`, 'success');
        refreshAuditLogs();
        return;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    const newStatus = nextStage === 'Approved' ? 'Approved' : nextStage === 'Rejected' ? 'Rejected' : 'In Review';

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            stage: nextStage,
            status: newStatus,
            committeeDecision: nextStage === 'Approved' ? {
              status: 'Approved',
              approvedAmount: app.requestedAmount,
              approvedDate: new Date().toISOString().split('T')[0],
              decisionNotes: decisionNotes || 'Approved by Executive Grants Committee.',
              signedBy: 'Hon. Director Marcus Sterling'
            } : nextStage === 'Rejected' ? {
              status: 'Rejected',
              approvedAmount: 0,
              approvedDate: new Date().toISOString().split('T')[0],
              decisionNotes: decisionNotes || 'Rejected during review stage.',
              signedBy: 'Hon. Director Marcus Sterling'
            } : app.committeeDecision
          };
        }
        return app;
      })
    );

    // If approved, create default 3-tranche disbursement schedule automatically
    if (nextStage === 'Approved' && !disbursements.some((d) => d.applicationId === targetApp.id)) {
      const amount = Number(targetApp.requestedAmount);
      const tranche1Amount = Math.round(amount * 0.4);
      const tranche2Amount = Math.round(amount * 0.35);
      const tranche3Amount = amount - tranche1Amount - tranche2Amount;
      const now = Date.now();

      const newDisbursements = [
        {
          id: `disb-${now}-1`,
          applicationId: targetApp.id,
          programId: targetApp.programId,
          trackingNumber: targetApp.trackingNumber,
          granteeOrg: targetApp.applicantOrg,
          projectTitle: targetApp.projectTitle,
          trancheNumber: 1,
          totalTranches: 3,
          percentage: 40,
          amount: tranche1Amount,
          milestoneRequirement: 'Initial Execution of Grant Agreement & Mobilization Plan',
          scheduledDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
          disbursedDate: null,
          status: 'Scheduled',
          paymentMethod: 'Federal Wire ACH',
          referenceCode: null,
          notes: 'Tranche 1 Advance upon contract execution.'
        },
        {
          id: `disb-${now}-2`,
          applicationId: targetApp.id,
          programId: targetApp.programId,
          trackingNumber: targetApp.trackingNumber,
          granteeOrg: targetApp.applicantOrg,
          projectTitle: targetApp.projectTitle,
          trancheNumber: 2,
          totalTranches: 3,
          percentage: 35,
          amount: tranche2Amount,
          milestoneRequirement: 'Mid-term Deliverables Completion & Spend Verification',
          scheduledDate: new Date(Date.now() + 120 * 86400000).toISOString().split('T')[0],
          disbursedDate: null,
          status: 'Scheduled',
          paymentMethod: 'Federal Wire ACH',
          referenceCode: null,
          notes: 'Tranche 2 upon submission and approval of Midterm report.'
        },
        {
          id: `disb-${now}-3`,
          applicationId: targetApp.id,
          programId: targetApp.programId,
          trackingNumber: targetApp.trackingNumber,
          granteeOrg: targetApp.applicantOrg,
          projectTitle: targetApp.projectTitle,
          trancheNumber: 3,
          totalTranches: 3,
          percentage: 25,
          amount: tranche3Amount,
          milestoneRequirement: 'Final Project Closeout & Independent Financial Audit Signoff',
          scheduledDate: new Date(Date.now() + 270 * 86400000).toISOString().split('T')[0],
          disbursedDate: null,
          status: 'Scheduled',
          paymentMethod: 'Federal Wire ACH',
          referenceCode: null,
          notes: 'Final retention release.'
        }
      ];

      setDisbursements((dPrev) => [...dPrev, ...newDisbursements]);

      // Update program allocated budget
      setPrograms((pPrev) =>
        pPrev.map((p) =>
          p.id === targetApp.programId
            ? { ...p, allocatedBudget: (p.allocatedBudget || 0) + amount }
            : p
        )
      );
    }

    logAction(
      'Stage Transition',
      `Application ${targetApp.trackingNumber} progressed to: ${nextStage}. Notes: ${decisionNotes || 'Stage advanced'}`
    );

    showToast(`Application transitioned to ${nextStage}`, 'success');
  };

  // Grant Disbursement & Reporting (J18-E05)
  const processDisbursement = async (disbursementId, paymentDetails) => {
    if (isBackendConnected) {
      try {
        const updated = await api.processDisbursement(disbursementId, paymentDetails, currentRole);
        setDisbursements((prev) => prev.map((d) => (d.id === disbursementId ? updated : d)));
        showToast('Disbursement executed and payment receipt issued!', 'success');
        refreshAuditLogs();
        return;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    setDisbursements((prev) =>
      prev.map((d) => {
        if (d.id === disbursementId) {
          const updated = {
            ...d,
            status: 'Disbursed',
            disbursedDate: new Date().toISOString(),
            paymentMethod: paymentDetails.paymentMethod || 'Federal Wire ACH',
            referenceCode: paymentDetails.referenceCode || `TR-WIRE-${Math.floor(100000 + Math.random() * 900000)}`,
            notes: paymentDetails.notes || d.notes
          };

          logAction(
            'Disbursed Grant Funds',
            `Released Tranche ${d.trancheNumber} ($${Number(d.amount).toLocaleString()}) to ${d.granteeOrg} for ${d.projectTitle}. Ref: ${updated.referenceCode}`
          );

          return updated;
        }
        return d;
      })
    );
    showToast('Disbursement executed and payment receipt issued!', 'success');
  };

  const submitMilestoneReport = async (reportData) => {
    const newReport = {
      ...reportData,
      id: 'milestone-' + Date.now(),
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      approvedAt: null,
      reviewerNotes: null
    };

    if (isBackendConnected) {
      try {
        const submitted = await api.submitMilestone(newReport, currentRole);
        setMilestones((prev) => [submitted, ...prev]);
        showToast('Milestone report submitted for review', 'success');
        refreshAuditLogs();
        return submitted;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    setMilestones((prev) => [newReport, ...prev]);

    logAction(
      'Submitted Milestone Report',
      `Grantee ${newReport.granteeOrg} submitted report for Milestone: "${newReport.title}" (${newReport.completionPercentage}% complete).`
    );
    showToast('Milestone report submitted for review', 'success');
  };

  const approveMilestoneReport = async (reportId, notes = '') => {
    if (isBackendConnected) {
      try {
        const updated = await api.approveMilestone(reportId, notes, currentRole);
        setMilestones((prev) => prev.map((m) => (m.id === reportId ? updated : m)));
        showToast('Milestone report approved! Tranche eligible for payment.', 'success');
        refreshAuditLogs();
        return;
      } catch (err) {
        console.warn('Backend call failed, using local state:', err);
      }
    }

    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === reportId) {
          const updated = {
            ...m,
            status: 'Approved',
            approvedAt: new Date().toISOString(),
            reviewerNotes: notes || 'Verified deliverable receipts. Milestone cleared.'
          };

          logAction('Approved Milestone Report', `Approved milestone report "${m.title}" for ${m.granteeOrg}. Tranche unlock authorization generated.`);
          return updated;
        }
        return m;
      })
    );
    showToast('Milestone report approved! Tranche eligible for payment.', 'success');
  };

  // Reset to initial mock data
  const resetToMockData = async () => {
    if (isBackendConnected) {
      try {
        await api.resetSystemData();
        const [progs, apps, disbs, miles, audits] = await Promise.all([
          api.getPrograms(),
          api.getApplications(),
          api.getDisbursements(),
          api.getMilestones(),
          api.getAuditLogs()
        ]);
        if (progs) setPrograms(progs);
        if (apps) setApplications(apps);
        if (disbs) setDisbursements(disbs);
        if (miles) setMilestones(miles);
        if (audits) setAuditLogs(audits);
      } catch (err) {
        console.warn('Backend reset failed, resetting local:', err);
      }
    } else {
      setPrograms(INITIAL_PROGRAMS);
      setApplications(INITIAL_APPLICATIONS);
      setDisbursements(INITIAL_DISBURSEMENTS);
      setMilestones(INITIAL_MILESTONE_REPORTS);
      setAuditLogs(INITIAL_AUDIT_LOGS);
    }
    localStorage.removeItem(STORAGE_KEYS.PROGRAMS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.DISBURSEMENTS);
    localStorage.removeItem(STORAGE_KEYS.MILESTONES);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    showToast('System data reset to default demo scenario!', 'info');
  };

  // Quick navigation helper to apply for a program
  const startApplicationForProgram = (program) => {
    setPrefilledProgramForApp(program);
    setIsSubmitAppOpen(true);
  };

  return (
    <GrantsContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        isBackendConnected,
        programs,
        applications,
        disbursements,
        milestones,
        auditLogs,
        selectedProgram,
        setSelectedProgram,
        selectedApplication,
        setSelectedApplication,
        isCreateProgramOpen,
        setIsCreateProgramOpen,
        isSubmitAppOpen,
        setIsSubmitAppOpen,
        prefilledProgramForApp,
        setPrefilledProgramForApp,
        isDisbursementModalOpen,
        setIsDisbursementModalOpen,
        disbursementTarget,
        setDisbursementTarget,
        isMilestoneModalOpen,
        setIsMilestoneModalOpen,
        toasts,
        showToast,
        removeToast,
        createProgram,
        updateProgram,
        deleteProgram,
        submitApplication,
        submitReview,
        advanceApplicationStage,
        processDisbursement,
        submitMilestoneReport,
        approveMilestoneReport,
        resetToMockData,
        startApplicationForProgram
      }}
    >
      {children}
    </GrantsContext.Provider>
  );
};

export { useGrants } from './useGrants';
