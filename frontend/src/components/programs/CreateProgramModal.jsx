import React, { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import { X, Plus, Trash2, FolderPlus, DollarSign, Calendar, Layers, ShieldCheck } from 'lucide-react';

export const CreateProgramModal = () => {
  const { isCreateProgramOpen, setIsCreateProgramOpen, createProgram } = useGrants();

  const [form, setForm] = useState({
    title: '',
    code: '',
    category: 'Climate & Sustainability',
    department: '',
    description: '',
    totalBudget: 1000000,
    minAward: 50000,
    maxAward: 250000,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    status: 'Open',
    minYearsOperational: 2,
    eligibleOrgTypes: ['Non-Profit', 'Startup / SME'],
    requireMatchingFunds: true,
    minMatchingPercentage: 20,
    geographicScope: 'National'
  });

  const [requiredDocuments, setRequiredDocuments] = useState([
    'Detailed Project Technical Proposal (PDF)',
    'Audited Financial Statements (Last 2 Years)',
    'Itemized Budget Schedule & Quotes'
  ]);
  const [newDocName, setNewDocName] = useState('');

  if (!isCreateProgramOpen) return null;

  const handleOrgTypeToggle = (type) => {
    setForm((prev) => {
      const exists = prev.eligibleOrgTypes.includes(type);
      return {
        ...prev,
        eligibleOrgTypes: exists
          ? prev.eligibleOrgTypes.filter((t) => t !== type)
          : [...prev.eligibleOrgTypes, type]
      };
    });
  };

  const handleAddDoc = () => {
    if (newDocName.trim()) {
      setRequiredDocuments((prev) => [...prev, newDocName.trim()]);
      setNewDocName('');
    }
  };

  const handleRemoveDoc = (index) => {
    setRequiredDocuments((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.code || !form.department) {
      alert('Please fill out Program Title, Code, and Department.');
      return;
    }

    const payload = {
      title: form.title,
      code: form.code.toUpperCase(),
      category: form.category,
      department: form.department,
      description: form.description,
      totalBudget: Number(form.totalBudget),
      allocatedBudget: 0,
      minAward: Number(form.minAward),
      maxAward: Number(form.maxAward),
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.status,
      eligibilityCriteria: {
        minYearsOperational: Number(form.minYearsOperational),
        eligibleOrgTypes: form.eligibleOrgTypes,
        requireMatchingFunds: form.requireMatchingFunds,
        minMatchingPercentage: Number(form.minMatchingPercentage),
        requiresTaxExemptCert: true,
        geographicScope: form.geographicScope
      },
      requiredDocuments,
      rubricCriteria: [
        { id: 'crit-1', name: 'Technical Quality & Innovation', weight: 30, maxScore: 30, description: 'Rigor of methodology and originality.' },
        { id: 'crit-2', name: 'Project Feasibility & Capability', weight: 25, maxScore: 25, description: 'Work plan realism and key personnel qualifications.' },
        { id: 'crit-3', name: 'Demonstrated Impact & Outreach', weight: 25, maxScore: 25, description: 'Direct beneficiary outcomes and sustainability.' },
        { id: 'crit-4', name: 'Cost Reasonableness & Budget', weight: 20, maxScore: 20, description: 'Prudent cost justification and value.' }
      ]
    };

    createProgram(payload);
    setIsCreateProgramOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderPlus className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                Configure New Grant Program (J18-E02)
              </h2>
              <p className="text-xs text-slate-300">
                Define funding pool, application window, and eligibility parameters
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateProgramOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 flex-1">
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Program Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NextGen Urban Energy Grant"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Grant Code / Reference *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ENRG-2026-05"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-xs uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Managing Department / Bureau *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Directorate of Scientific Affairs"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Focus Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
              >
                <option value="Climate & Sustainability">Climate & Sustainability</option>
                <option value="Healthcare & Public Health">Healthcare & Public Health</option>
                <option value="Education & Workforce">Education & Workforce</option>
                <option value="Infrastructure & Water">Infrastructure & Water</option>
                <option value="Technology & Security">Technology & Security</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Program Description & Mission Statement
            </label>
            <textarea
              rows={2}
              placeholder="Outline the funding scope, core objectives, and target beneficiaries..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
            ></textarea>
          </div>

          {/* Section 2: Budget and Award Bounds */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
              <span>Fiscal Allocation & Award Bounds</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Total Budget Pool ($)
                </label>
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  value={form.totalBudget}
                  onChange={(e) => setForm({ ...form, totalBudget: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Minimum Award ($)
                </label>
                <input
                  type="number"
                  min="5000"
                  step="5000"
                  value={form.minAward}
                  onChange={(e) => setForm({ ...form, minAward: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Maximum Award ($)
                </label>
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  value={form.maxAward}
                  onChange={(e) => setForm({ ...form, maxAward: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Dates & Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Application Start Date
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Application Close Date
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Section 4: Eligibility Rules */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Eligibility Configuration</span>
            </h4>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                Eligible Organization Types:
              </label>
              <div className="flex flex-wrap gap-2">
                {['Non-Profit', 'Startup / SME', 'Higher Education', 'Research Institution', 'Community Co-op'].map((type) => {
                  const selected = form.eligibleOrgTypes.includes(type);
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handleOrgTypeToggle(type)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                        selected
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Min. Years Operational
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={form.minYearsOperational}
                  onChange={(e) => setForm({ ...form, minYearsOperational: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Require Matching Funds?
                </label>
                <div className="flex items-center space-x-3 pt-1">
                  <label className="flex items-center space-x-1 text-xs">
                    <input
                      type="radio"
                      name="matching"
                      checked={form.requireMatchingFunds}
                      onChange={() => setForm({ ...form, requireMatchingFunds: true })}
                    />
                    <span>Yes (Min {form.minMatchingPercentage}%)</span>
                  </label>
                  <label className="flex items-center space-x-1 text-xs">
                    <input
                      type="radio"
                      name="matching"
                      checked={!form.requireMatchingFunds}
                      onChange={() => setForm({ ...form, requireMatchingFunds: false })}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Required Documents */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-800">
              Required Submission Documents
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add document title (e.g. Tax Returns, Technical Specs)..."
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddDoc}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Add
              </button>
            </div>
            <div className="space-y-1.5 pt-1">
              {requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span>{doc}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc(idx)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsCreateProgramOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Publish Grant Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
