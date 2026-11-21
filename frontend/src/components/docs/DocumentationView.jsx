import {
  CheckCircle2,
  Layers,
  ShieldCheck,
  Award,
  DollarSign,
  Users,
  Code2,
  Terminal,
  Database
} from 'lucide-react';

export const DocumentationView = () => {
  const epics = [
    {
      id: 'J18-E01',
      title: 'Project Setup, Git Workflow and Design',
      description: 'Create the repository, branching model, database/data design, wireframes and project skeleton.',
      status: 'Completed',
      color: 'border-blue-500 text-blue-700 bg-blue-50',
      features: [
        'React 19 + Tailwind CSS v4 + Vite modern application skeleton.',
        'Responsive layout with modular navigation, header status strip, and role switcher.',
        'Unified mock database architecture with bidirectional relational integrity.',
        'Full LocalStorage data synchronization with demo state reset capabilities.'
      ]
    },
    {
      id: 'J18-E02',
      title: 'Grant Program Setup and Configuration',
      description: 'Deliver the Grant program setup and configuration functionality end to end: data, business logic, user interface and tests.',
      status: 'Completed',
      color: 'border-indigo-500 text-indigo-700 bg-indigo-50',
      features: [
        'Comprehensive Grant Program creation wizard with live budget allocation validation.',
        'Configurable eligibility rules: min operational seniority, org structures, matching thresholds.',
        'Multi-criteria scoring rubric configuration (custom weighted criteria totaling 100 pts).',
        'Category tagging, application window date constraints, and real-time funding pool tracking.'
      ]
    },
    {
      id: 'J18-E03',
      title: 'Application Submission and Eligibility Check',
      description: 'Deliver the Application submission and eligibility check functionality end to end: data, business logic, user interface and tests.',
      status: 'Completed',
      color: 'border-cyan-500 text-cyan-700 bg-cyan-50',
      features: [
        'Interactive self-service Eligibility Pre-Screener with instant audit determinations.',
        '5-step comprehensive grant submission wizard with auto-generated tracking codes (APP-2026-XXXX).',
        'Itemized budget calculator with live category aggregation and matching fund percentage calculations.',
        'Supporting documents attachment manager with file size, metadata, and preview tags.'
      ]
    },
    {
      id: 'J18-E04',
      title: 'Review and Approval Workflow',
      description: 'Deliver the Review and approval workflow functionality end to end: data, business logic, user interface and tests.',
      status: 'Completed',
      color: 'border-purple-500 text-purple-700 bg-purple-50',
      features: [
        'Reviewer command hub with live candidate queue and evaluation status pills.',
        'Interactive 100-point quantitative rubric with real-time tier classification (A+ to D).',
        'Qualitative evaluation dossier recording key strengths, identified risks, and recommendations.',
        'Multi-stage administrative stage-gate engine: Screening → Technical Review → Committee Review → Award.'
      ]
    },
    {
      id: 'J18-E05',
      title: 'Grant Disbursement and Reporting',
      description: 'Deliver the Grant disbursement and reporting functionality end to end: data, business logic, user interface and tests.',
      status: 'Completed',
      color: 'border-emerald-500 text-emerald-700 bg-emerald-50',
      features: [
        'Tranche payment milestone scheduling (Tranche 1 Mobilization, Tranche 2 Midterm, Tranche 3 Closeout).',
        'Financial disbursement authorization modal with Federal Wire ACH and Treasury Voucher tracking.',
        'Grantee milestone progress reporting with deliverables verification and spend-to-date tracking.',
        'Compliance sign-off unlocking subsequent tranche disbursement vouchers.'
      ]
    },
    {
      id: 'J18-E06',
      title: 'Testing, Documentation and Release',
      description: 'Integration testing, bug fixing, API/user documentation, demo and the v1.0.0 release.',
      status: 'Completed',
      color: 'border-amber-500 text-amber-700 bg-amber-50',
      features: [
        'Interactive 4-Persona Role Switcher: Administrator, Applicant, Reviewer, and Finance Officer.',
        'Comprehensive scenario mock data pre-populated with realistic end-to-end proposals.',
        'Embedded system documentation and Jira Epics traceability matrix.',
        'Ready for production deployment and demonstration (v1.0.0).'
      ]
    }
  ];

  const roles = [
    {
      name: 'Grant Administrator',
      scope: 'Full administrative control over grant programs, funding pool budgets, committee sign-offs, and system audits.',
      icon: ShieldCheck
    },
    {
      name: 'Grantee / Applicant',
      scope: 'Check eligibility pre-qualification, submit multi-step proposals, monitor application stages, and report project milestones.',
      icon: Users
    },
    {
      name: 'Peer Reviewer / Evaluator',
      scope: 'Access assigned proposals, execute quantitative 100-point rubric scoring, and submit official recommendations.',
      icon: Award
    },
    {
      name: 'Finance & Compliance Officer',
      scope: 'Audit grantee spend receipts, authorize and disburse milestone tranches, and track fiscal allocations.',
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              System Architecture & Jira Epics Map
            </h1>
            <span className="text-xs font-bold font-mono bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
              J18-E06 Release
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete traceability matrix mapping user stories and functional modules to project epics
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>v1.0.0 Production Release</span>
        </div>
      </div>

      {/* Epics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {epics.map((epic) => (
          <div
            key={epic.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-indigo-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${epic.color}`}>
                  {epic.id}
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{epic.status}</span>
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {epic.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {epic.description}
                </p>
              </div>

              {/* Delivered Features List */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Implemented Capabilities:
                </span>
                <ul className="space-y-1">
                  {epic.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5 text-xs text-slate-600">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role-Based Access Control Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">
            Persona & Role Security Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.name} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{r.name}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {r.scope}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack & Design Architecture */}
      <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-bold text-white">
              Frontend Architecture & Technical Implementation
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">React 19 • Tailwind v4 • Vite</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-white flex items-center space-x-1.5">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>State & Persistence</span>
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Centralized React Context (`GrantsContext`) with automated dual synchronization to browser LocalStorage, preventing state loss on reloads and enabling realistic testing.
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-white flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Component Modularity</span>
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Isolated modular components for Program Setup, Eligibility Screening, Proposal Submission, Rubric Scoring, and Tranche Disbursements adhering to clean code best practices.
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-white flex items-center space-x-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Audit Logging Engine</span>
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Immutable activity logging with timestamps, actor roles, and detailed payload changes tracking every transaction and status shift across the entire grant lifecycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
