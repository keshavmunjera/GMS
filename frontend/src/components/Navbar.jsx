import { useGrants } from '../context/GrantsContext';
import {
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentRole,
    setCurrentRole,
    programs,
    applications,
    resetToMockData,
    setActiveTab,
    setIsSubmitAppOpen,
    setIsCreateProgramOpen,
    isBackendConnected
  } = useGrants();

  const roleDefinitions = [
    {
      id: 'admin',
      label: 'Grant Administrator',
      badge: 'bg-purple-100 text-purple-700 border-purple-300',
      description: 'Program setup, committee approvals, executive oversight'
    },
    {
      id: 'applicant',
      label: 'Grantee / Applicant',
      badge: 'bg-blue-100 text-blue-700 border-blue-300',
      description: 'Check eligibility, submit applications, report milestones'
    },
    {
      id: 'reviewer',
      label: 'Evaluator / Reviewer',
      badge: 'bg-amber-100 text-amber-700 border-amber-300',
      description: 'Review proposals, scoring rubrics, recommendations'
    },
    {
      id: 'finance',
      label: 'Finance Officer',
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      description: 'Milestone audits, tranche release, disbursement vouchers'
    }
  ];

  const pendingReviewsCount = applications.filter(
    (a) => a.stage === 'Technical Review' || a.stage === 'Eligibility Screening'
  ).length;

  const totalCommitted = applications
    .filter((a) => a.status === 'Approved')
    .reduce((sum, a) => sum + (Number(a.requestedAmount) || 0), 0);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Epic Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 tracking-tight text-lg">
                  GrantSphere
                </span>
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  J18-GMS v1.0
                </span>
                {isBackendConnected ? (
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1" title="Connected to Spring Boot & MySQL">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>API Connected</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 flex items-center space-x-1" title="Operating with browser local storage">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>Local Mode</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Grants Lifecycle & Disbursement Management System
              </p>
            </div>
          </div>

          {/* Center: Live Quick Metrics */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-600 border-x border-slate-100 px-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Open Programs: <strong className="text-slate-800">{programs.filter(p => p.status === 'Open').length}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-300">•</span>
              <span>Pending Review: <strong className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">{pendingReviewsCount}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-300">•</span>
              <span>Committed: <strong className="text-slate-900 font-semibold">${(totalCommitted / 1000000).toFixed(2)}M</strong></span>
            </div>
          </div>

          {/* Right: Role Switcher & Action Controls */}
          <div className="flex items-center space-x-3">
            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-2 hidden md:inline">
                Role:
              </span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {roleDefinitions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick action button depending on role */}
            {currentRole === 'applicant' ? (
              <button
                onClick={() => setIsSubmitAppOpen(true)}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
              >
                <span>Submit Proposal</span>
              </button>
            ) : currentRole === 'admin' ? (
              <button
                onClick={() => setIsCreateProgramOpen(true)}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
              >
                <span>+ New Grant</span>
              </button>
            ) : null}

            {/* Reset Demo Data */}
            <button
              onClick={resetToMockData}
              title="Reset data back to initial demo scenario"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Docs Tab Link */}
            <button
              onClick={() => setActiveTab('docs')}
              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
              title="View Jira Epics & System Documentation"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
