import { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  X,
  CheckCircle,
  UploadCloud,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Paperclip,
  Check
} from 'lucide-react';

export const ApplicationSubmissionModal = () => {
  const {
    isSubmitAppOpen,
    setIsSubmitAppOpen,
    programs,
    submitApplication,
    prefilledProgramForApp,
    setPrefilledProgramForApp
  } = useGrants();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    programId: '',
    programTitle: '',
    programCode: '',
    applicantOrg: '',
    orgType: 'Startup / SME',
    ein: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    yearsOperational: 3,
    projectTitle: '',
    projectDurationMonths: 12,
    executiveSummary: '',
    objectives: [
      'Deploy pilot infrastructure to validate key performance indicators.',
      'Conduct rigorous field testing with 500+ primary beneficiaries.'
    ],
    budgetItems: [
      { category: 'Hardware & Capital Equipment', amount: 150000 },
      { category: 'Technical Personnel & Engineering Lead', amount: 80000 },
      { category: 'Field Deployment & Subcontracting', amount: 45000 },
      { category: 'Project Auditing & Reporting', amount: 15000 }
    ],
    matchingFunds: 60000,
    agreedToTerms: false
  });

  const [newObjective, setNewObjective] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([
    { name: 'Project_Technical_Proposal_v1.pdf', size: '3.4 MB', uploadedAt: new Date().toISOString().split('T')[0] },
    { name: 'Audited_Financial_Statement_FY25.pdf', size: '2.1 MB', uploadedAt: new Date().toISOString().split('T')[0] }
  ]);
  const [newFileName, setNewFileName] = useState('');

  if (!isSubmitAppOpen) return null;

  const activeProgramId = formData.programId || prefilledProgramForApp?.id || (programs.find((p) => p.status === 'Open') || programs[0])?.id || '';
  const currentProgram = programs.find((p) => p.id === activeProgramId) || programs[0] || {};

  // Budget calculations
  const totalRequested = formData.budgetItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const matchingPct = totalRequested > 0 ? Math.round((formData.matchingFunds / totalRequested) * 100) : 0;

  // Add / Remove budget items
  const handleBudgetItemChange = (index, field, value) => {
    const updated = [...formData.budgetItems];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setFormData({ ...formData, budgetItems: updated });
  };

  const addBudgetItem = () => {
    setFormData({
      ...formData,
      budgetItems: [...formData.budgetItems, { category: 'Direct Operational Expenses', amount: 20000 }]
    });
  };

  const removeBudgetItem = (index) => {
    setFormData({
      ...formData,
      budgetItems: formData.budgetItems.filter((_, idx) => idx !== index)
    });
  };

  // Add objective
  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setFormData({
        ...formData,
        objectives: [...formData.objectives, newObjective.trim()]
      });
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter((_, idx) => idx !== index)
    });
  };

  // Upload file mock
  const handleMockUpload = () => {
    if (newFileName.trim()) {
      setAttachedFiles((prev) => [
        ...prev,
        {
          name: newFileName.trim().endsWith('.pdf') ? newFileName.trim() : newFileName.trim() + '.pdf',
          size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
          uploadedAt: new Date().toISOString().split('T')[0]
        }
      ]);
      setNewFileName('');
    }
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Final submit
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert('You must accept the certification and grant compliance terms.');
      return;
    }

    const payload = {
      programId: formData.programId,
      programTitle: currentProgram.title,
      programCode: currentProgram.code,
      applicantOrg: formData.applicantOrg || 'Applicant Innovation Group',
      orgType: formData.orgType,
      ein: formData.ein || 'XX-8941002',
      contactPerson: formData.contactPerson || 'Lead Investigator',
      contactEmail: formData.contactEmail || 'lead@organization.org',
      contactPhone: formData.contactPhone || '+1 (555) 234-5678',
      address: formData.address || '100 University Ave, Suite 400',
      yearsOperational: Number(formData.yearsOperational),
      projectTitle: formData.projectTitle || 'Autonomous Climate Monitoring Array',
      projectDurationMonths: Number(formData.projectDurationMonths),
      executiveSummary: formData.executiveSummary || 'Targeted project initiative deployed across regional test sites.',
      objectives: formData.objectives,
      budgetBreakdown: formData.budgetItems,
      requestedAmount: totalRequested,
      matchingFunds: Number(formData.matchingFunds),
      matchingPercent: matchingPct,
      attachedFiles,
      eligibilityAnswers: {
        registeredEntity: true,
        orgTypeMatch: true,
        hasTaxExemption: true,
        yearsMet: true,
        matchingAvailable: true
      }
    };

    submitApplication(payload);
    setIsSubmitAppOpen(false);
    setPrefilledProgramForApp(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Wizard Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-1.5">
              <span>Grant Application Submission Dossier</span>
              <span className="text-slate-400">• J18-E03</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Multi-Step Grant Submission Portal
            </h2>
          </div>
          <button
            onClick={() => {
              setIsSubmitAppOpen(false);
              setPrefilledProgramForApp(null);
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            {[
              { num: 1, label: 'Applicant Info' },
              { num: 2, label: 'Project Narrative' },
              { num: 3, label: 'Budget & Match' },
              { num: 4, label: 'Documents' },
              { num: 5, label: 'Review & Sign' }
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center space-x-2 ${
                  step === s.num
                    ? 'text-indigo-600 font-bold'
                    : step > s.num
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step === s.num
                      ? 'bg-indigo-600 text-white'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs text-slate-700">
          {/* STEP 1: Applicant Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                1. Program Selection & Organization Details
              </h3>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Target Grant Scheme *
                </label>
                <select
                  value={activeProgramId}
                  onChange={(e) => {
                    const chosen = programs.find((p) => p.id === e.target.value);
                    setFormData({
                      ...formData,
                      programId: e.target.value,
                      programTitle: chosen?.title || '',
                      programCode: chosen?.code || ''
                    });
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  {programs
                    .filter((p) => p.status === 'Open' || p.id === activeProgramId)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.code}] {p.title} (Max: ${(p.maxAward).toLocaleString()})
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Legal Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TerraTech BioInnovations Corp"
                    value={formData.applicantOrg}
                    onChange={(e) => setFormData({ ...formData, applicantOrg: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Organization Type
                  </label>
                  <select
                    value={formData.orgType}
                    onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Startup / SME">Startup / SME</option>
                    <option value="Non-Profit">Non-Profit (501c3)</option>
                    <option value="Higher Education">Higher Education Institution</option>
                    <option value="Research Institution">Research Institution</option>
                    <option value="Healthcare Institution">Healthcare Institution</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Tax ID / Employer Identification (EIN) *
                  </label>
                  <input
                    type="text"
                    placeholder="XX-XXXXXXX"
                    value={formData.ein}
                    onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Years Active / Operational
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.yearsOperational}
                    onChange={(e) => setFormData({ ...formData, yearsOperational: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Primary Investigator / Authorized Official *
                  </label>
                  <input
                    type="text"
                    placeholder="Full name & title"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Official Contact Email *
                  </label>
                  <input
                    type="email"
                    placeholder="contact@org.org"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Registered Headquarters Address
                </label>
                <input
                  type="text"
                  placeholder="Street Address, City, State, ZIP"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Project Narrative */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                2. Project Proposal Narrative & Objectives
              </h3>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Clear, descriptive title of your grant project"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Proposed Execution Duration (Months)
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="36"
                    value={formData.projectDurationMonths}
                    onChange={(e) => setFormData({ ...formData, projectDurationMonths: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Executive Abstract & Problem Statement *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the challenge being solved, innovative methodology, direct target beneficiaries, and measurable outcomes..."
                  value={formData.executiveSummary}
                  onChange={(e) => setFormData({ ...formData, executiveSummary: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Key Deliverables & Milestone Objectives
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g. Conduct prototype testing with 200 users..."
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    className="flex-1 p-2 border border-slate-200 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleAddObjective}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 pt-2">
                  {formData.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-indigo-600 font-mono">#{idx + 1}</span>
                        <span>{obj}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveObjective(idx)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Itemized Budget */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  3. Itemized Budget & Matching Funds
                </h3>
                <button
                  type="button"
                  onClick={addBudgetItem}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs flex items-center space-x-1"
                >
                  <span>+ Add Line Item</span>
                </button>
              </div>

              <div className="space-y-2">
                {formData.budgetItems.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleBudgetItemChange(idx, 'category', e.target.value)}
                      className="flex-1 p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      placeholder="Expense category / item"
                    />
                    <div className="relative w-36">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={item.amount}
                        onChange={(e) => handleBudgetItemChange(idx, 'amount', e.target.value)}
                        className="w-full pl-6 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>
                    {formData.budgetItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBudgetItem(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Budget Total Summary Card */}
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Total Requested Grant Funding:</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    ${totalRequested.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                  <span>Program Cap Limits:</span>
                  <span>${(currentProgram.minAward).toLocaleString()} – ${(currentProgram.maxAward).toLocaleString()}</span>
                </div>
              </div>

              {/* Matching Funds */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-800 text-xs">
                    Applicant Matching Funds Commitment ($)
                  </label>
                  <span className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                    {matchingPct}% Matching
                  </span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={formData.matchingFunds}
                  onChange={(e) => setFormData({ ...formData, matchingFunds: Number(e.target.value) })}
                  className="w-full p-2 border border-slate-200 rounded-lg font-mono text-xs"
                />
                <p className="text-[11px] text-slate-500">
                  Required by {currentProgram.code}: Min {currentProgram.eligibilityCriteria?.minMatchingPercentage || 0}%
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Supporting Documents */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                4. Supporting Documents & Compliance Uploads
              </h3>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-400 bg-slate-50/50 transition-colors">
                <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-800 text-xs">
                  Upload Required Proposal Dossier
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Attach PDF or XLSX files (Max 25MB each)
                </p>

                <div className="mt-4 flex max-w-sm mx-auto space-x-2">
                  <input
                    type="text"
                    placeholder="File title (e.g. Audited_Report.pdf)"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleMockUpload}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Attach
                  </button>
                </div>
              </div>

              {/* Uploaded Files List */}
              <div className="space-y-2 pt-2">
                <span className="font-semibold text-slate-700 text-xs">
                  Attached Files ({attachedFiles.length}):
                </span>
                {attachedFiles.map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl">
                    <div className="flex items-center space-x-2.5">
                      <Paperclip className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="font-medium text-slate-900">{f.name}</div>
                        <div className="text-[10px] text-slate-400">{f.size} • Uploaded today</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Attestation */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                5. Proposal Review & Legal Attestation
              </h3>

              {/* Review Summary Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Selected Scheme:</span>
                  <div className="font-bold text-slate-900">[{currentProgram.code}] {currentProgram.title}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Applicant Org:</span>
                  <div className="font-bold text-slate-900">{formData.applicantOrg || 'Applicant Innovation Group'}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Requested Funding:</span>
                  <div className="font-mono font-bold text-emerald-600 text-sm">${totalRequested.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Matching Funds:</span>
                  <div className="font-mono font-bold text-slate-900">${formData.matchingFunds.toLocaleString()} ({matchingPct}%)</div>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 font-medium">Project Title:</span>
                  <div className="font-semibold text-slate-800">{formData.projectTitle || 'Autonomous Climate Monitoring Array'}</div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/80 space-y-2">
                <label className="flex items-start space-x-2 text-xs cursor-pointer text-amber-950">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span className="leading-relaxed">
                    I solemnly attest that the technical and financial statements contained in this application dossier are accurate, true, and comply with all regulatory eligibility criteria. I agree to subject all milestone expenditures to independent financial auditing.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Navigation Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center space-x-1 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center space-x-1 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={!formData.agreedToTerms}
              className={`inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all ${
                formData.agreedToTerms
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit Final Application</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
