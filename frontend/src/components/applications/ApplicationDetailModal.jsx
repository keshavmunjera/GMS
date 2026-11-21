import { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  X,
  Building,
  CheckCircle2,
  DollarSign,
  Paperclip,
  FileText,
  Award,
  ShieldCheck
} from 'lucide-react';

export const ApplicationDetailModal = ({ application, onClose }) => {
  const { currentRole, advanceApplicationStage, setActiveTab } = useGrants();
  const [stageNotes, setStageNotes] = useState('');

  if (!application) return null;

  const isApproved = application.status === 'Approved';
  const isRejected = application.status === 'Rejected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded">
                {application.trackingNumber}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  isApproved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                    : isRejected
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                }`}
              >
                {application.stage}
              </span>
              <span className="text-xs text-slate-400">• Scheme: {application.programCode}</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {application.projectTitle}
            </h2>
            <div className="text-xs text-slate-300 flex items-center space-x-3 pt-0.5">
              <span className="font-semibold text-white">{application.applicantOrg}</span>
              <span>•</span>
              <span>Submitted: {new Date(application.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700">
          {/* Top Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Requested Amount</span>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                ${(application.requestedAmount).toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Matching Funds</span>
              <div className="text-base font-bold text-emerald-600 font-mono mt-0.5">
                ${(application.matchingFunds || 0).toLocaleString()} ({application.matchingPercent || 0}%)
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Duration</span>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {application.projectDurationMonths || 12} Months
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Peer Review Score</span>
              <div className="text-base font-bold text-purple-700 font-mono mt-0.5">
                {application.score ? `${application.score} / 100` : 'Pending'}
              </div>
            </div>
          </div>

          {/* Section: Applicant & Contact */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              <span>Organization & Contact Authority</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-slate-400">Organization:</span>
                <div className="font-bold text-slate-900">{application.applicantOrg}</div>
                <div className="text-[11px] text-slate-500">{application.orgType} • EIN: {application.ein}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Primary Contact:</span>
                <div className="font-bold text-slate-900">{application.contactPerson}</div>
                <div className="text-[11px] text-slate-500">{application.contactEmail}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Headquarters Address:</span>
                <div className="text-slate-700">{application.address || 'Denver, CO'}</div>
                <div className="text-[11px] text-slate-500">{application.contactPhone}</div>
              </div>
            </div>
          </div>

          {/* Section: Project Abstract */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
              Executive Abstract & Project Problem Statement
            </h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {application.executiveSummary}
            </p>
          </div>

          {/* Section: Project Objectives */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Deliverables & Core Objectives
            </h4>
            <div className="space-y-1.5">
              {application.objectives?.map((obj, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 p-2.5 bg-white border border-slate-200 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Budget Breakdown */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
              <span>Itemized Budget Breakdown</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Expense Category</th>
                    <th className="py-2.5 px-3 text-right">Amount ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {application.budgetBreakdown?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{item.category}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        ${(item.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td className="py-2.5 px-3">Total Requested Funding</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-600 text-sm">
                      ${(application.requestedAmount).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Attached Documents */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Paperclip className="w-3.5 h-3.5 text-slate-500" />
              <span>Attached Documents Dossier</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {application.attachedFiles?.map((f, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center space-x-2 truncate">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{f.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{f.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Peer Reviews & Evaluation History */}
          {application.reviews && application.reviews.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Peer Review Evaluation Log</span>
              </h4>

              {application.reviews.map((rev, idx) => (
                <div key={idx} className="p-4 bg-purple-50/50 rounded-xl border border-purple-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{rev.reviewerName}</span>
                      <span className="text-[11px] text-slate-500 ml-2">({rev.reviewerRole})</span>
                    </div>
                    <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                      Score: {rev.scoreTotal} / 100
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    <strong>Strengths:</strong> {rev.strengths}
                  </p>
                  {rev.concerns && (
                    <p className="text-slate-600 text-xs">
                      <strong>Concerns / Mitigations:</strong> {rev.concerns}
                    </p>
                  )}
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-purple-100 flex justify-between">
                    <span>Recommendation: <strong className="text-purple-800">{rev.recommendation}</strong></span>
                    <span>Reviewed: {new Date(rev.reviewedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Committee Final Decision */}
          {application.committeeDecision && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Executive Committee Formal Sign-off</span>
                </span>
                <span className="font-mono text-emerald-700 font-bold">
                  {application.committeeDecision.signedBy}
                </span>
              </div>
              <p className="text-emerald-800 text-xs">
                {application.committeeDecision.decisionNotes}
              </p>
            </div>
          )}

          {/* Stage Progression Controls for Administrator */}
          {currentRole === 'admin' && !isApproved && !isRejected && (
            <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-300">
                  Administrative Workflow Stage Gate Action
                </h4>
                <span className="text-[10px] text-slate-400">Current: {application.stage}</span>
              </div>

              <input
                type="text"
                placeholder="Optional decision notes / remarks for audit log..."
                value={stageNotes}
                onChange={(e) => setStageNotes(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                {application.stage === 'Eligibility Screening' && (
                  <button
                    onClick={() => {
                      advanceApplicationStage(application.id, 'Technical Review', stageNotes);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors"
                  >
                    Pass Screening → Advance to Technical Review
                  </button>
                )}

                {application.stage === 'Technical Review' && (
                  <button
                    onClick={() => {
                      advanceApplicationStage(application.id, 'Committee Review', stageNotes);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold text-xs transition-colors"
                  >
                    Submit to Executive Committee Review
                  </button>
                )}

                <button
                  onClick={() => {
                    advanceApplicationStage(application.id, 'Approved', stageNotes);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs transition-colors"
                >
                  Approve & Authorize Award
                </button>

                <button
                  onClick={() => {
                    advanceApplicationStage(application.id, 'Rejected', stageNotes);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-xs transition-colors"
                >
                  Formal Rejection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          {/* Quick jump to review if reviewer */}
          {currentRole === 'reviewer' && (
            <button
              onClick={() => {
                onClose();
                setActiveTab('reviews');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Evaluate in Review Hub
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
