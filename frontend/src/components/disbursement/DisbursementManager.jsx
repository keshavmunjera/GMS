import React, { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Send,
  Plus,
  X,
  FileCheck,
  Building,
  ArrowUpRight
} from 'lucide-react';

export const DisbursementManager = () => {
  const {
    disbursements,
    milestones,
    applications,
    currentRole,
    processDisbursement,
    submitMilestoneReport,
    approveMilestoneReport
  } = useGrants();

  const [activeSubTab, setActiveSubTab] = useState('tranches'); // 'tranches' | 'milestones'
  const [selectedDisb, setSelectedDisb] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: 'Federal Wire ACH',
    referenceCode: '',
    notes: 'Tranche release verified and authorized by Finance Division.'
  });

  const [isSubmitMilestoneOpen, setIsSubmitMilestoneOpen] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState({
    applicationId: applications.find(a => a.status === 'Approved')?.id || '',
    trancheNumber: 2,
    title: 'Midterm Hardware Integration & Field Calibration',
    completionPercentage: 100,
    spendToDate: 145000,
    deliverables: 'Completed installation of field telemetry sensors and conducted baseline water sampling across 4 agricultural sites.',
    challengesFaced: 'None encountered. Project remains on schedule.'
  });

  // Financial aggregates
  const totalAwarded = disbursements.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalPaid = disbursements
    .filter((d) => d.status === 'Disbursed')
    .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalPending = disbursements
    .filter((d) => d.status === 'Pending Approval' || d.status === 'Scheduled')
    .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  const handleOpenDisburseModal = (disb) => {
    setSelectedDisb(disb);
    setPaymentForm({
      paymentMethod: disb.paymentMethod || 'Federal Wire ACH',
      referenceCode: `FED-ACH-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      notes: disb.notes || 'Tranche payment released.'
    });
  };

  const handleExecutePayment = (e) => {
    e.preventDefault();
    if (!selectedDisb) return;
    processDisbursement(selectedDisb.id, paymentForm);
    setSelectedDisb(null);
  };

  const handleCreateMilestone = (e) => {
    e.preventDefault();
    const app = applications.find((a) => a.id === milestoneForm.applicationId);
    submitMilestoneReport({
      applicationId: milestoneForm.applicationId,
      trackingNumber: app?.trackingNumber || 'APP-2026-8941',
      granteeOrg: app?.applicantOrg || 'Solaria Biofuels & Microgrids Ltd',
      trancheNumber: Number(milestoneForm.trancheNumber),
      title: milestoneForm.title,
      completionPercentage: Number(milestoneForm.completionPercentage),
      spendToDate: Number(milestoneForm.spendToDate),
      deliverablesCompleted: [milestoneForm.deliverables],
      challengesFaced: milestoneForm.challengesFaced
    });
    setIsSubmitMilestoneOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Grant Disbursements & Milestone Audits
            </h1>
            <span className="text-xs font-bold font-mono bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
              J18-E05
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tranche-based milestone disbursement execution, proof of spend verification, and payment auditing
          </p>
        </div>

        <button
          onClick={() => setIsSubmitMilestoneOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Milestone Progress Report</span>
        </button>
      </div>

      {/* Financial aggregate cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Awarded Tranche Capital
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">
            ${totalAwarded.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {disbursements.length} scheduled payment tranches across approved grants
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            Disbursed to Date
          </span>
          <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">
            ${totalPaid.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {totalAwarded > 0 ? Math.round((totalPaid / totalAwarded) * 100) : 0}% of scheduled tranches released
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
            Pending Milestone Release
          </span>
          <div className="text-2xl font-bold text-amber-600 font-mono mt-1">
            ${totalPending.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Gated behind deliverable verification and milestone approval
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('tranches')}
            className={`py-3.5 border-b-2 transition-colors flex items-center space-x-2 ${
              activeSubTab === 'tranches'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Tranche Payment Schedule ({disbursements.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('milestones')}
            className={`py-3.5 border-b-2 transition-colors flex items-center space-x-2 ${
              activeSubTab === 'milestones'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Milestone Progress Reports ({milestones.length})</span>
          </button>
        </div>

        {/* Tranche Table */}
        {activeSubTab === 'tranches' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Grantee & Project</th>
                  <th className="py-3 px-4">Tranche</th>
                  <th className="py-3 px-4">Milestone Requirement</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Scheduled Date</th>
                  <th className="py-3 px-4">Status & Reference</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {disbursements.map((d) => {
                  const isDisbursed = d.status === 'Disbursed';
                  return (
                    <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{d.granteeOrg}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {d.trackingNumber} • {d.projectTitle}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          #{d.trancheNumber} ({d.percentage}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                        <div className="line-clamp-2 leading-relaxed">{d.milestoneRequirement}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-xs">
                        ${(d.amount).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {d.scheduledDate}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                            isDisbursed
                              ? 'bg-emerald-100 text-emerald-800'
                              : d.status === 'Pending Approval'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {d.status}
                        </span>
                        {d.referenceCode && (
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                            {d.referenceCode}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {!isDisbursed ? (
                          <button
                            onClick={() => handleOpenDisburseModal(d)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-2xs"
                          >
                            Disburse
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-medium flex items-center justify-end space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Paid</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Milestones Reports List */
          <div className="p-6 space-y-4">
            {milestones.map((m) => {
              const isApproved = m.status === 'Approved';
              return (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                          {m.trackingNumber}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{m.title}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Submitted by: <strong className="text-slate-800">{m.granteeOrg}</strong> • Tranche #{m.trancheNumber}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-900 text-xs">
                          Spend: ${(m.spendToDate).toLocaleString()}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {m.completionPercentage}% Milestone Complete
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                      Deliverables Verified:
                    </span>
                    <ul className="space-y-1">
                      {m.deliverablesCompleted?.map((deliv, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {m.challengesFaced && (
                    <p className="text-xs text-slate-500 italic">
                      <strong>Notes / Challenges:</strong> {m.challengesFaced}
                    </p>
                  )}

                  {/* Actions */}
                  {!isApproved && (currentRole === 'admin' || currentRole === 'finance') && (
                    <div className="pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => approveMilestoneReport(m.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                      >
                        Verify & Authorize Tranche Release
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Disburse Modal */}
      {selectedDisb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Authorize Tranche Payment</h3>
              </div>
              <button
                onClick={() => setSelectedDisb(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExecutePayment} className="p-5 space-y-4 text-xs text-slate-700">
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800">Payment Amount</span>
                <div className="text-xl font-bold font-mono text-emerald-700">
                  ${(selectedDisb.amount).toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-900 font-medium">
                  Beneficiary: {selectedDisb.granteeOrg} (Tranche #{selectedDisb.trancheNumber})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Disbursement Method
                </label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                >
                  <option value="Federal Wire ACH">Federal Wire ACH</option>
                  <option value="Direct Treasury Transfer">Direct Treasury Transfer</option>
                  <option value="Escrow Milestone Drawdown">Escrow Milestone Drawdown</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Bank Reference / Voucher Code *
                </label>
                <input
                  type="text"
                  required
                  value={paymentForm.referenceCode}
                  onChange={(e) => setPaymentForm({ ...paymentForm, referenceCode: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Disbursement Authorization Notes
                </label>
                <textarea
                  rows={2}
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedDisb(null)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs"
                >
                  Confirm & Release Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Milestone Modal */}
      {isSubmitMilestoneOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Submit Milestone Progress Report (J18-E05)</h3>
              <button
                onClick={() => setIsSubmitMilestoneOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMilestone} className="p-5 space-y-3.5 text-xs text-slate-700">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Select Active Approved Grant
                </label>
                <select
                  value={milestoneForm.applicationId}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, applicationId: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg font-medium"
                >
                  {applications.filter(a => a.status === 'Approved').map((app) => (
                    <option key={app.id} value={app.id}>
                      [{app.trackingNumber}] {app.applicantOrg} - {app.projectTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Milestone Deliverable Title *
                </label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Tranche Target (#)
                  </label>
                  <select
                    value={milestoneForm.trancheNumber}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, trancheNumber: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  >
                    <option value={1}>Tranche 1 (Mobilization)</option>
                    <option value={2}>Tranche 2 (Mid-term)</option>
                    <option value={3}>Tranche 3 (Closeout)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Verified Spend to Date ($)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="5000"
                    value={milestoneForm.spendToDate}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, spendToDate: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Deliverables Completed & Proof of Output
                </label>
                <textarea
                  rows={3}
                  required
                  value={milestoneForm.deliverables}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, deliverables: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitMilestoneOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-xs"
                >
                  Submit for Compliance Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
