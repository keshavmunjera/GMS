import React, { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  CheckSquare,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

export const EligibilityChecker = () => {
  const { programs, startApplicationForProgram } = useGrants();

  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?.id || '');
  const [answers, setAnswers] = useState({
    orgType: 'Startup / SME',
    yearsOperational: 3,
    hasTaxExempt: true,
    matchingFundsPercent: 25,
    geographicRegion: 'National',
    hasAuditedFinancials: true
  });

  const selectedProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];
  const criteria = selectedProgram?.eligibilityCriteria || {};

  // Compute criteria checks
  const checks = [
    {
      id: 'orgType',
      label: 'Legal Entity Type Alignment',
      required: criteria.eligibleOrgTypes?.join(', ') || 'Any non-profit or SME',
      provided: answers.orgType,
      passed: criteria.eligibleOrgTypes ? criteria.eligibleOrgTypes.includes(answers.orgType) : true,
      explanation: criteria.eligibleOrgTypes?.includes(answers.orgType)
        ? `"${answers.orgType}" is an authorized applicant category for this scheme.`
        : `This program restricts applicants to: ${criteria.eligibleOrgTypes?.join(', ')}.`
    },
    {
      id: 'years',
      label: 'Minimum Operational History',
      required: `${criteria.minYearsOperational || 1} year(s) active registration`,
      provided: `${answers.yearsOperational} years`,
      passed: answers.yearsOperational >= (criteria.minYearsOperational || 1),
      explanation: answers.yearsOperational >= (criteria.minYearsOperational || 1)
        ? `Organization exceeds the minimum operational threshold of ${criteria.minYearsOperational} years.`
        : `Applicant organization has only been active for ${answers.yearsOperational} years; minimum required is ${criteria.minYearsOperational} years.`
    },
    {
      id: 'matching',
      label: 'Matching Funds Commitment',
      required: criteria.requireMatchingFunds ? `Min ${criteria.minMatchingPercentage}% matching commitment` : 'Not required (0%)',
      provided: `${answers.matchingFundsPercent}% committed`,
      passed: !criteria.requireMatchingFunds || (answers.matchingFundsPercent >= (criteria.minMatchingPercentage || 0)),
      explanation: !criteria.requireMatchingFunds
        ? 'No matching funds are required for this grant program.'
        : answers.matchingFundsPercent >= (criteria.minMatchingPercentage || 0)
        ? `Applicant matching commitment (${answers.matchingFundsPercent}%) satisfies the program mandate (${criteria.minMatchingPercentage}%).`
        : `Program requires at least ${criteria.minMatchingPercentage}% matching funds; provided ${answers.matchingFundsPercent}%.`
    },
    {
      id: 'compliance',
      label: 'Regulatory & Tax Compliance',
      required: criteria.requiresTaxExemptCert ? 'Valid Tax Exemption / Good Standing Certificate' : 'Standard business registration',
      provided: answers.hasTaxExempt ? 'Verified & On File' : 'Not Available',
      passed: !criteria.requiresTaxExemptCert || answers.hasTaxExempt,
      explanation: answers.hasTaxExempt
        ? 'Applicant confirms verified compliance and tax documentation.'
        : 'Program requires formal tax registration or good standing documentation.'
    },
    {
      id: 'audit',
      label: 'Audited Financial Statements',
      required: 'Audited statements or independent review',
      provided: answers.hasAuditedFinancials ? 'Statements Ready' : 'Pending',
      passed: answers.hasAuditedFinancials,
      explanation: answers.hasAuditedFinancials
        ? 'Financial transparency documentation ready for upload.'
        : 'Applicants must furnish at least one year of audited or CPA-reviewed financials.'
    }
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const totalCount = checks.length;
  const isFullyEligible = passedCount === totalCount;
  const isPartiallyEligible = passedCount >= 3 && !isFullyEligible;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Interactive Eligibility Pre-Screener
            </h1>
            <span className="text-xs font-bold font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
              J18-E03
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated eligibility calculator evaluating organizational readiness against grant specifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Questionnaire (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">
              1. Organization & Project Profile
            </h2>
          </div>

          {/* Program Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Select Target Grant Scheme:
            </label>
            <select
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              {programs.map((prog) => (
                <option key={prog.id} value={prog.id}>
                  [{prog.code}] {prog.title}
                </option>
              ))}
            </select>
          </div>

          {/* Org Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Organization Legal Structure:
            </label>
            <select
              value={answers.orgType}
              onChange={(e) => setAnswers({ ...answers, orgType: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Non-Profit">Non-Profit Organization (501c3 or equivalent)</option>
              <option value="Startup / SME">Startup / SME Enterprise</option>
              <option value="Higher Education">Higher Education / University</option>
              <option value="Research Institution">Research Institution / National Lab</option>
              <option value="Healthcare Institution">Healthcare Institution / Clinic</option>
              <option value="Community Co-op">Community Cooperative</option>
              <option value="Individual">Individual Researcher (Unincorporated)</option>
            </select>
          </div>

          {/* Years in Operation */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
              <span>Years of Active Operation:</span>
              <span className="text-indigo-600 font-mono">{answers.yearsOperational} Year(s)</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={answers.yearsOperational}
              onChange={(e) => setAnswers({ ...answers, yearsOperational: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Brand New (0 yrs)</span>
              <span>5 years</span>
              <span>10+ years</span>
            </div>
          </div>

          {/* Matching Funds Available */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
              <span>Matching Funds Available (% of requested):</span>
              <span className="text-indigo-600 font-mono">{answers.matchingFundsPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={answers.matchingFundsPercent}
              onChange={(e) => setAnswers({ ...answers, matchingFundsPercent: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0% (No match)</span>
              <span>20% (Standard)</span>
              <span>50%+ (High)</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={answers.hasTaxExempt}
                onChange={(e) => setAnswers({ ...answers, hasTaxExempt: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span className="text-slate-700 font-medium">Valid Tax ID & Certificate of Good Standing</span>
            </label>

            <label className="flex items-center space-x-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={answers.hasAuditedFinancials}
                onChange={(e) => setAnswers({ ...answers, hasAuditedFinancials: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span className="text-slate-700 font-medium">Audited or CPA-Reviewed Financial Records</span>
            </label>
          </div>
        </div>

        {/* Right Column: Automated Verdict & Criteria Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Verdict Banner Card */}
          <div className={`p-6 rounded-2xl border shadow-xs transition-all ${
            isFullyEligible
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : isPartiallyEligible
              ? 'bg-amber-50/90 border-amber-300 text-amber-950'
              : 'bg-rose-50/90 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  isFullyEligible
                    ? 'bg-emerald-600 text-white'
                    : isPartiallyEligible
                    ? 'bg-amber-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}>
                  {isFullyEligible ? (
                    <ShieldCheck className="w-7 h-7" />
                  ) : isPartiallyEligible ? (
                    <AlertTriangle className="w-7 h-7" />
                  ) : (
                    <ShieldAlert className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                    Pre-Screening Determination
                  </div>
                  <h3 className="text-lg font-bold">
                    {isFullyEligible
                      ? 'Pre-Qualified: Fully Eligible to Apply'
                      : isPartiallyEligible
                      ? 'Conditional Eligibility: Revisions Recommended'
                      : 'Currently Ineligible for this Grant Scheme'}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black font-mono">
                  {passedCount}/{totalCount}
                </div>
                <div className="text-[10px] font-semibold opacity-75">
                  Criteria Cleared
                </div>
              </div>
            </div>

            <p className="text-xs mt-3 leading-relaxed opacity-90">
              {isFullyEligible
                ? `Congratulations! Your organization profile matches all statutory and administrative eligibility standards established for ${selectedProgram.title}.`
                : isPartiallyEligible
                ? 'Your organization satisfies most core criteria, but requires adjustments in matching funds, operational seniority, or documentation.'
                : 'Your profile does not satisfy one or more mandatory eligibility disqualifiers for this scheme.'}
            </p>

            {/* Quick Action Button */}
            {isFullyEligible && (
              <div className="mt-4 pt-4 border-t border-emerald-200/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  Ready to proceed with your proposal submission?
                </span>
                <button
                  onClick={() => startApplicationForProgram(selectedProgram)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <span>Launch Application Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Criteria Checklist Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Detailed Eligibility Audit Trail</span>
              <span className="text-xs font-normal text-slate-500">
                Scheme: {selectedProgram.code}
              </span>
            </h3>

            <div className="space-y-3">
              {checks.map((check) => (
                <div
                  key={check.id}
                  className={`p-3.5 rounded-xl border transition-all text-xs ${
                    check.passed
                      ? 'bg-slate-50/60 border-slate-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      {check.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <span className="font-bold text-slate-900">{check.label}</span>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Mandate: <strong className="text-slate-700">{check.required}</strong>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        check.passed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {check.passed ? 'PASSED' : 'DISQUALIFIED'}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] text-slate-600 pl-6 border-l-2 border-slate-200 ml-2">
                    {check.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
