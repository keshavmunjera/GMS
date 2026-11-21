import { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  FileCheck2,
  Award,
  CheckCircle2,
  Scale,
  Paperclip
} from 'lucide-react';

export const ReviewWorkflow = () => {
  const {
    applications,
    submitReview,
    advanceApplicationStage
  } = useGrants();

  // Review candidates (applications in screening, technical review, or committee)
  const pendingApps = applications.filter(
    (a) => a.stage === 'Technical Review' || a.stage === 'Eligibility Screening' || a.stage === 'Committee Review'
  );

  const [selectedAppId, setSelectedAppId] = useState(
    pendingApps[0]?.id || applications[0]?.id || ''
  );

  const activeApp = applications.find((a) => a.id === selectedAppId) || pendingApps[0] || applications[0];

  // Scoring rubric form state
  const [rubricScores, setRubricScores] = useState({
    'crit-1': 26,
    'crit-2': 22,
    'crit-3': 22,
    'crit-4': 18
  });

  const [reviewerName, setReviewerName] = useState('Dr. Kevin Thorne, MD');
  const [reviewerRole, setReviewerRole] = useState('Senior Evaluation Fellow');
  const [strengths, setStrengths] = useState(
    'Strong scientific methodology, verified community partner relationships, realistic milestone phasing.'
  );
  const [concerns, setConcerns] = useState(
    'Ensure subcontracts comply with standard wage provisions during equipment assembly.'
  );
  const [recommendation, setRecommendation] = useState('Recommend Approval');
  const [committeeNotes, setCommitteeNotes] = useState('');

  if (!activeApp) {
    return (
      <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800">No Applications Awaiting Review</h3>
        <p className="text-xs text-slate-500 mt-1">
          All submitted applications have completed evaluation or have been approved.
        </p>
      </div>
    );
  }

  // Calculate live total score
  const totalScore = Object.values(rubricScores).reduce((sum, val) => sum + Number(val), 0);

  const getScoreRating = (score) => {
    if (score >= 90) return { label: 'A+ (Exceptional Priority)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 80) return { label: 'A (Strongly Recommended)', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    if (score >= 70) return { label: 'B (Satisfactory Standard)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (score >= 60) return { label: 'C (Conditional / Borderline)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'D (Below Funding Threshold)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const ratingTier = getScoreRating(totalScore);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const reviewData = {
      reviewerId: 'rev-' + Date.now(),
      reviewerName,
      reviewerRole,
      scoreTotal: totalScore,
      scores: rubricScores,
      strengths,
      concerns,
      recommendation,
      reviewedAt: new Date().toISOString()
    };

    submitReview(activeApp.id, reviewData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Peer Review & Approval Engine
            </h1>
            <span className="text-xs font-bold font-mono bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200">
              J18-E04
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized multi-criteria evaluation rubrics, reviewer deliberations, and stage-gate approvals
          </p>
        </div>

        {/* Live Active Queue Count */}
        <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs">
          <span className="text-slate-500">In Active Pipeline:</span>
          <span className="font-bold font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
            {pendingApps.length} Proposals
          </span>
        </div>
      </div>

      {/* Main Review Workspace: Master-Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Applications Queue (3 cols) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Evaluation Queue
            </span>
            <span className="text-[11px] text-slate-400">Select to score</span>
          </div>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {applications.map((app) => {
              const isSelected = app.id === activeApp.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-400 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-[10px] text-indigo-700">
                      {app.trackingNumber}
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                        app.stage === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.stage === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.stage}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 line-clamp-1">
                    {app.projectTitle}
                  </h4>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                    <span className="truncate max-w-[120px]">{app.applicantOrg}</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ${(Number(app.requestedAmount || 0) / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center / Right Columns: Split Dossier vs Rubric Scoring (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Proposal Quick Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                    {activeApp.trackingNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Scheme: {activeApp.programCode}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {activeApp.projectTitle}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Applicant: <strong className="text-slate-800">{activeApp.applicantOrg}</strong> ({activeApp.orgType})
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-bold font-mono text-emerald-600">
                  ${Number(activeApp.requestedAmount || 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">
                  +${(activeApp.matchingFunds || 0).toLocaleString()} match ({activeApp.matchingPercent || 0}%)
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              {activeApp.executiveSummary}
            </p>

            {/* Attached Documents Quick Chips */}
            {activeApp.attachedFiles && activeApp.attachedFiles.length > 0 && (
              <div className="flex items-center space-x-2 text-xs pt-1">
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-medium">Supporting Dossier:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeApp.attachedFiles.map((f, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-medium">
                      {f.name} ({f.size})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive 100-Point Evaluation Rubric */}
          <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Quantitative 100-Point Scoring Rubric
                </h3>
              </div>

              {/* Total Score Live Badge */}
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-lg border font-bold text-xs flex items-center space-x-2 ${ratingTier.color}`}>
                  <span>{ratingTier.label}</span>
                  <span className="font-mono font-black text-sm">[{totalScore} / 100]</span>
                </div>
              </div>
            </div>

            {/* Rubric Criteria Sliders */}
            <div className="space-y-4">
              {/* Criterion 1 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900">1. Technical Merit & Scientific Innovation</span>
                    <p className="text-[11px] text-slate-500">Novelty of technological approach, intellectual property validity.</p>
                  </div>
                  <span className="font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                    {rubricScores['crit-1']} / 30 Pts
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={rubricScores['crit-1']}
                  onChange={(e) => setRubricScores({ ...rubricScores, 'crit-1': Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Criterion 2 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900">2. Implementation Feasibility & Milestones</span>
                    <p className="text-[11px] text-slate-500">Work plan realism, resource sufficiency, risk mitigation strategy.</p>
                  </div>
                  <span className="font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                    {rubricScores['crit-2']} / 25 Pts
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={rubricScores['crit-2']}
                  onChange={(e) => setRubricScores({ ...rubricScores, 'crit-2': Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Criterion 3 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900">3. Measurable Social & Environmental Impact</span>
                    <p className="text-[11px] text-slate-500">Quantifiable beneficiary outcomes, carbon reduction, or public reach.</p>
                  </div>
                  <span className="font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                    {rubricScores['crit-3']} / 25 Pts
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={rubricScores['crit-3']}
                  onChange={(e) => setRubricScores({ ...rubricScores, 'crit-3': Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Criterion 4 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900">4. Budget Reasonableness & Fiscal Integrity</span>
                    <p className="text-[11px] text-slate-500">Cost justification, value for public capital, matching commitments.</p>
                  </div>
                  <span className="font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                    {rubricScores['crit-4']} / 20 Pts
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={rubricScores['crit-4']}
                  onChange={(e) => setRubricScores({ ...rubricScores, 'crit-4': Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Qualitative Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Key Strengths & Differentiators *
                </label>
                <textarea
                  rows={2}
                  required
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Identified Risks & Suggested Mitigations
                </label>
                <textarea
                  rows={2}
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
            </div>

            {/* Reviewer Details & Recommendation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Evaluation Role
                </label>
                <input
                  type="text"
                  value={reviewerRole}
                  onChange={(e) => setReviewerRole(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Final Recommendation
                </label>
                <select
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-lg text-xs font-semibold"
                >
                  <option value="Recommend Approval">Recommend Approval</option>
                  <option value="Recommend Conditional Approval">Recommend Conditional Approval</option>
                  <option value="Recommend Revisions">Recommend Revisions</option>
                  <option value="Recommend Rejection">Recommend Rejection</option>
                </select>
              </div>
            </div>

            {/* Submit Review Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Submit Evaluation Score ({totalScore}/100)</span>
              </button>
            </div>
          </form>

          {/* Committee / Stage Gate Actions */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Executive Committee Approval Sign-off (J18-E04)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Formal stage-gate transitions and award authorization
                </p>
              </div>
              <span className="text-[11px] font-mono bg-slate-800 px-2.5 py-1 rounded text-slate-300">
                Current: {activeApp.stage}
              </span>
            </div>

            <input
              type="text"
              placeholder="Enter official committee decision notes or rationale..."
              value={committeeNotes}
              onChange={(e) => setCommitteeNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400"
            />

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={() => advanceApplicationStage(activeApp.id, 'Approved', committeeNotes)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Proposal & Authorize Tranche Disbursement</span>
              </button>

              <button
                onClick={() => advanceApplicationStage(activeApp.id, 'Committee Review', committeeNotes)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Advance to Committee Deliberation
              </button>

              <button
                onClick={() => advanceApplicationStage(activeApp.id, 'Rejected', committeeNotes)}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Decline / Reject Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
