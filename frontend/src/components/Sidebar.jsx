import { useGrants } from '../context/GrantsContext';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  FileText,
  FileCheck2,
  DollarSign,
  BookOpen,
  Shield
} from 'lucide-react';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    programs,
    applications,
    disbursements
  } = useGrants();

  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      epic: 'E01/Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'programs',
      label: 'Grant Programs',
      epic: 'J18-E02',
      icon: FolderKanban,
      badge: programs.length
    },
    {
      id: 'eligibility',
      label: 'Eligibility Checker',
      epic: 'J18-E03',
      icon: CheckSquare,
      badge: 'Interactive'
    },
    {
      id: 'applications',
      label: 'Applications & Submissions',
      epic: 'J18-E03',
      icon: FileText,
      badge: applications.length
    },
    {
      id: 'reviews',
      label: 'Review & Approvals',
      epic: 'J18-E04',
      icon: FileCheck2,
      badge: applications.filter(a => a.stage === 'Technical Review' || a.stage === 'Committee Review').length
    },
    {
      id: 'disbursements',
      label: 'Disbursements & Milestones',
      epic: 'J18-E05',
      icon: DollarSign,
      badge: disbursements.filter(d => d.status === 'Pending Approval' || d.status === 'Scheduled').length
    },
    {
      id: 'docs',
      label: 'Jira Epics & Docs',
      epic: 'J18-E06',
      icon: BookOpen,
      badge: 'v1.0'
    }
  ];

  const roleNameMap = {
    admin: { label: 'Administrator', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    applicant: { label: 'Applicant / Grantee', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    reviewer: { label: 'Technical Reviewer', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    finance: { label: 'Finance & Compliance', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800">
      {/* Current Persona Badge */}
      <div className="p-4 border-b border-slate-800">
        <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5 flex items-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <span>Active Persona</span>
        </div>
        <div className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold flex items-center justify-between ${roleNameMap[currentRole]?.color || 'bg-slate-800 text-slate-200 border-slate-700'}`}>
          <span>{roleNameMap[currentRole]?.label}</span>
          <span className="w-2 h-2 rounded-full bg-current"></span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Modules & Workflows
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-700/50'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`}
                />
                <div className="text-left truncate">
                  <span className="block truncate font-medium">{item.label}</span>
                  <span className={`text-[10px] block ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {item.epic}
                  </span>
                </div>
              </div>

              {item.badge !== null && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-1 ${
                    isActive
                      ? 'bg-indigo-700 text-indigo-100'
                      : typeof item.badge === 'number'
                      ? 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Summary Box */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-xs space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>Grant Capital</span>
            <span className="text-white font-medium">$17.5M</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full w-3/5"></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>60% Committed</span>
            <span className="text-emerald-400 font-semibold">$10.5M</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Sprint: J18-SP-04</span>
          <span className="text-indigo-400 hover:underline cursor-pointer" onClick={() => setActiveTab('docs')}>
            Release v1.0.0
          </span>
        </div>
      </div>
    </aside>
  );
};
