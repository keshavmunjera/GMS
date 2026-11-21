import { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { ApplicationSubmissionModal } from './ApplicationSubmissionModal';
import { ApplicationDetailModal } from './ApplicationDetailModal';

export const ApplicationsList = () => {
  const {
    applications,
    setIsSubmitAppOpen,
    selectedApplication,
    setSelectedApplication
  } = useGrants();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'

  const stages = ['All', 'Eligibility Screening', 'Technical Review', 'Committee Review', 'Approved', 'Rejected'];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantOrg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.programTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'All' || app.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Grant Applications & Proposals
            </h1>
            <span className="text-xs font-bold font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
              J18-E03
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track submission dossiers, stage-gate evaluations, peer reviews, and approval statuses
          </p>
        </div>

        <button
          onClick={() => setIsSubmitAppOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Tracking Code (e.g. APP-2026-8941), Organization, or Project Title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-end md:self-auto">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Stage Board
            </button>
          </div>
        </div>

        {/* Stage Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Workflow Stage:</span>
          </span>
          {stages.map((stg) => (
            <button
              key={stg}
              onClick={() => setSelectedStage(stg)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedStage === stg
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Tracking ID & Title</th>
                  <th className="py-3 px-4">Applicant Organization</th>
                  <th className="py-3 px-4">Scheme Code</th>
                  <th className="py-3 px-4">Funding Requested</th>
                  <th className="py-3 px-4">Review Score</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedApplication(app)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-[11px] font-bold text-indigo-600">
                        {app.trackingNumber}
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors line-clamp-1 max-w-sm">
                        {app.projectTitle}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      <div className="font-semibold text-slate-800">{app.applicantOrg}</div>
                      <span className="text-[10px] text-slate-400">
                        {app.orgType} • {app.contactPerson}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                        {app.programCode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      ${(app.requestedAmount).toLocaleString()}
                      {app.matchingFunds > 0 && (
                        <div className="text-[10px] text-emerald-600 font-normal">
                          +${(app.matchingFunds).toLocaleString()} match ({app.matchingPercent}%)
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {app.score !== null ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                          app.score >= 80 ? 'bg-purple-100 text-purple-800' :
                          app.score >= 60 ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {app.score} / 100
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Pending Score</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-block ${
                          app.stage === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.stage === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : app.stage === 'Committee Review'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.stage}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApplication(app);
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-slate-700 font-semibold text-xs transition-colors"
                      >
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
          {['Eligibility Screening', 'Technical Review', 'Committee Review', 'Approved'].map((columnStage) => {
            const columnApps = applications.filter((a) => a.stage === columnStage);
            return (
              <div
                key={columnStage}
                className="bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col space-y-3 min-w-[260px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-xs text-slate-800">
                    {columnStage}
                  </span>
                  <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded-full text-slate-600 border border-slate-200">
                    {columnApps.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {columnApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApplication(app)}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {app.trackingNumber}
                        </span>
                        {app.score && (
                          <span className="font-mono text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                            {app.score} pts
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                        {app.projectTitle}
                      </h4>

                      <div className="text-[11px] text-slate-500 truncate">
                        {app.applicantOrg}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-900 font-mono">
                          ${(app.requestedAmount / 1000).toFixed(0)}K
                        </span>
                        <span className="text-[10px] text-indigo-600 hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="p-6 text-center text-slate-400 text-xs italic">
                      No applications currently in {columnStage}.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Submission Wizard Modal */}
      <ApplicationSubmissionModal />

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={applications.find((a) => a.id === selectedApplication.id) || selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};
