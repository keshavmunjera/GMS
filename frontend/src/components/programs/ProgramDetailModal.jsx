import { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  X,
  Calendar,
  FileText,
  CheckCircle2,
  Building,
  Scale,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ProgramDetailModal = ({ program, onClose, onApply }) => {
  const { applications, setSelectedApplication } = useGrants();
  const [activeTab, setModalTab] = useState('overview'); // 'overview' | 'eligibility' | 'rubric' | 'applications'

  const relatedApplications = applications.filter((a) => a.programId === program.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded">
                {program.code}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                program.status === 'Open' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-slate-700 text-slate-300'
              }`}>
                {program.status}
              </span>
              <span className="text-xs text-slate-400">• {program.category}</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {program.title}
            </h2>
            <p className="text-xs text-slate-300 flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              <span>{program.department}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setModalTab('overview')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview & Scope
          </button>
          <button
            onClick={() => setModalTab('eligibility')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'eligibility'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Eligibility & Docs
          </button>
          <button
            onClick={() => setModalTab('rubric')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'rubric'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Scoring Rubric (100 Pts)
          </button>
          <button
            onClick={() => setModalTab('applications')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'applications'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Applications ({relatedApplications.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Key Financial Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Capital Pool</span>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    ${(program.totalBudget).toLocaleString()}
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Individual Award Bounds</span>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    ${(program.minAward).toLocaleString()} – ${(program.maxAward).toLocaleString()}
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Application Window</span>
                  <div className="text-xs font-semibold text-slate-900 mt-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{program.startDate} to {program.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Program Abstract & Purpose
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {program.description}
                </p>
              </div>

              {/* Budget Allocation Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">Funding Utilization</span>
                  <span className="font-mono text-slate-600">
                    ${(program.allocatedBudget).toLocaleString()} / ${(program.totalBudget).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${Math.min(100, (program.allocatedBudget / program.totalBudget) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mandatory Eligibility Criteria</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Eligible Legal Entities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {program.eligibilityCriteria?.eligibleOrgTypes?.map((t) => (
                        <span key={t} className="bg-white border border-slate-200 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Operational Experience:</span>
                    <div className="font-semibold text-slate-800 text-xs mt-1">
                      Minimum {program.eligibilityCriteria?.minYearsOperational} years active registration
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Matching Funds Condition:</span>
                    <div className="font-semibold text-slate-800 text-xs mt-1">
                      {program.eligibilityCriteria?.requireMatchingFunds
                        ? `Required (Min ${program.eligibilityCriteria?.minMatchingPercentage}%)`
                        : 'No matching funds required'}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Geographic Scope:</span>
                    <div className="font-semibold text-slate-800 text-xs mt-1">
                      {program.eligibilityCriteria?.geographicScope || 'National Jurisdiction'}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Required Supporting Documentation</span>
                </h4>
                <ul className="space-y-2">
                  {program.requiredDocuments?.map((doc, idx) => (
                    <li key={idx} className="flex items-center space-x-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-medium text-slate-800">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <Scale className="w-4 h-4 text-purple-600" />
                  <span>Standardized Evaluation Rubric</span>
                </h4>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Total Weight: 100 Pts
                </span>
              </div>

              <div className="space-y-3">
                {program.rubricCriteria?.map((crit) => (
                  <div key={crit.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 text-xs">{crit.name}</span>
                      <span className="font-mono font-bold text-purple-700 text-xs bg-white px-2 py-0.5 rounded border border-slate-200">
                        {crit.maxScore} Pts ({crit.weight}%)
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">{crit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-3">
              {relatedApplications.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  No applications received yet for this scheme.
                </div>
              ) : (
                relatedApplications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      onClose();
                      setSelectedApplication(app);
                    }}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[11px] text-indigo-600">
                          {app.trackingNumber}
                        </span>
                        <span className="text-xs font-bold text-slate-800">{app.applicantOrg}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate max-w-md">{app.projectTitle}</p>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-slate-900 text-xs font-mono">
                        ${(app.requestedAmount).toLocaleString()}
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {app.stage}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          {program.status === 'Open' && (
            <button
              onClick={onApply}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <span>Submit Proposal for this Grant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
