import React from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  DollarSign,
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  FolderPlus,
  FileSpreadsheet,
  CheckSquare,
  Activity
} from 'lucide-react';

export const DashboardOverview = () => {
  const {
    programs,
    applications,
    disbursements,
    milestones,
    auditLogs,
    currentRole,
    setActiveTab,
    setIsSubmitAppOpen,
    setIsCreateProgramOpen,
    setSelectedApplication
  } = useGrants();

  // Financial calculations
  const totalPool = programs.reduce((sum, p) => sum + (Number(p.totalBudget) || 0), 0);
  const totalAllocated = programs.reduce((sum, p) => sum + (Number(p.allocatedBudget) || 0), 0);
  const totalDisbursed = disbursements
    .filter((d) => d.status === 'Disbursed')
    .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalCommitted = applications
    .filter((a) => a.status === 'Approved')
    .reduce((sum, a) => sum + (Number(a.requestedAmount) || 0), 0);

  const approvedApps = applications.filter((a) => a.status === 'Approved');
  const rejectedApps = applications.filter((a) => a.status === 'Rejected');
  const inReviewApps = applications.filter((a) => a.status === 'In Review' || a.status === 'Submitted');

  const successRate = applications.length > 0
    ? Math.round((approvedApps.length / (approvedApps.length + rejectedApps.length || 1)) * 100)
    : 0;

  // Status breakdown
  const stages = [
    { name: 'Eligibility Screening', count: applications.filter(a => a.stage === 'Eligibility Screening').length, color: 'bg-blue-500' },
    { name: 'Technical Review', count: applications.filter(a => a.stage === 'Technical Review').length, color: 'bg-amber-500' },
    { name: 'Committee Review', count: applications.filter(a => a.stage === 'Committee Review').length, color: 'bg-purple-500' },
    { name: 'Approved & Active', count: applications.filter(a => a.stage === 'Approved').length, color: 'bg-emerald-500' },
    { name: 'Rejected / Ineligible', count: applications.filter(a => a.stage === 'Rejected').length, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-indigo-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grants Management System • Sprint Release J18</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Grant Lifecycle & Disbursement Command Center
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              End-to-end management covering grant setup, pre-qualification eligibility checks, peer review scoring, committee approvals, and tranche-based fund disbursement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {currentRole === 'admin' && (
              <button
                onClick={() => setIsCreateProgramOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Configure Program</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('eligibility')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 backdrop-blur-xs transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>Run Eligibility Check</span>
            </button>
            <button
              onClick={() => setIsSubmitAppOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Apply for Grant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Capital Pool
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">
              ${(totalPool / 1000000).toFixed(2)}M
            </span>
            <span className="text-xs font-medium text-emerald-600">
              {programs.length} Active Programs
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Allocated: ${(totalAllocated / 1000000).toFixed(2)}M</span>
            <span className="font-semibold text-slate-700">
              {Math.round((totalAllocated / totalPool) * 100)}% utilized
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalAllocated / totalPool) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Funds Disbursed
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">
              ${(totalDisbursed / 1000).toFixed(0)}K
            </span>
            <span className="text-xs font-medium text-emerald-600">
              {disbursements.filter(d => d.status === 'Disbursed').length} Tranches Paid
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Scheduled: ${((totalCommitted - totalDisbursed) / 1000).toFixed(0)}K</span>
            <span className="font-semibold text-emerald-600">
              {totalCommitted > 0 ? Math.round((totalDisbursed / totalCommitted) * 100) : 0}% of committed
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalCommitted > 0 ? Math.min(100, (totalDisbursed / totalCommitted) * 100) : 0}%` }}
            ></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Applications
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">
              {applications.length}
            </span>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              {inReviewApps.length} In Review
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Approved: {approvedApps.length}</span>
            <span>Rejected: {rejectedApps.length}</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${(approvedApps.length / (applications.length || 1)) * 100}%` }}
            ></div>
            <div
              className="bg-amber-500 h-full"
              style={{ width: `${(inReviewApps.length / (applications.length || 1)) * 100}%` }}
            ></div>
            <div
              className="bg-rose-400 h-full"
              style={{ width: `${(rejectedApps.length / (applications.length || 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Approval Success Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">
              {successRate}%
            </span>
            <span className="text-xs font-medium text-slate-500">
              Peer-Reviewed
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Avg Review Score</span>
            <span className="font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              87 / 100 Pts
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${successRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Middle Row: Workflow Pipeline & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Stage Funnel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Grant Review & Approval Pipeline
              </h2>
              <p className="text-xs text-slate-500">
                Multi-stage lifecycle distribution (J18-E04)
              </p>
            </div>
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>View Review Queue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {stages.map((stg) => {
              const pct = applications.length > 0 ? Math.round((stg.count / applications.length) * 100) : 0;
              return (
                <div key={stg.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${stg.color}`}></span>
                      <span>{stg.name}</span>
                    </span>
                    <span className="text-slate-500">
                      <strong className="text-slate-900">{stg.count}</strong> applications ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`${stg.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(4, pct)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Applications in Pipeline */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-600 mb-3 flex items-center justify-between">
              <span>Active Applications Requiring Attention:</span>
              <span className="text-[11px] text-slate-400">Click to view details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApplication(app)}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {app.trackingNumber}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {app.stage}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 truncate" title={app.projectTitle}>
                    {app.projectTitle}
                  </h4>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
                    <span className="truncate max-w-[140px]">{app.applicantOrg}</span>
                    <span className="font-semibold text-slate-900">${(app.requestedAmount / 1000).toLocaleString()}K</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Funding by Category
                </h2>
                <p className="text-xs text-slate-500">
                  Sector budget allocation (J18-E02)
                </p>
              </div>
              <button
                onClick={() => setActiveTab('programs')}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
              >
                All Grants →
              </button>
            </div>

            <div className="space-y-4">
              {programs.map((prog) => {
                const pct = Math.round((prog.allocatedBudget / (prog.totalBudget || 1)) * 100);
                return (
                  <div key={prog.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800 truncate max-w-[170px]" title={prog.title}>
                        {prog.title}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        ${(prog.allocatedBudget / 1000000).toFixed(2)}M / ${(prog.totalBudget / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{prog.category}</span>
                      <span>{pct}% committed</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Ready to submit a new proposal?</span>
              <button
                onClick={() => setIsSubmitAppOpen(true)}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Start Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Audit Activity Feed & Disbursement Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time System Audit Trail */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                System Audit & Activity Trail
              </h2>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
              Live Feed
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {auditLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {log.details}
                  </p>
                  <div className="flex items-center space-x-2 mt-1 text-[10px] text-slate-400">
                    <span className="font-medium text-slate-600">{log.actor}</span>
                    <span>•</span>
                    <span className="bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                      {log.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Disbursements & Milestones (J18-E05) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Disbursements & Tranches (J18-E05)
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('disbursements')}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
            >
              Full Schedule →
            </button>
          </div>

          <div className="space-y-3">
            {disbursements.slice(0, 4).map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="min-w-0 flex-1 mr-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {d.granteeOrg}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      Tranche {d.trancheNumber}/{d.totalTranches}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5" title={d.milestoneRequirement}>
                    Milestone: {d.milestoneRequirement}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900">
                    ${(d.amount).toLocaleString()}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                      d.status === 'Disbursed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : d.status === 'Pending Approval'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Pending Milestone Approvals: <strong>{milestones.filter(m => m.status === 'Submitted').length}</strong></span>
            <button
              onClick={() => setActiveTab('disbursements')}
              className="font-medium text-indigo-600 hover:underline"
            >
              Review Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
