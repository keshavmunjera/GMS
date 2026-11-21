import { useState } from 'react';
import { useGrants } from '../../context/GrantsContext';
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Users,
  ArrowRight
} from 'lucide-react';
import { ProgramDetailModal } from './ProgramDetailModal';
import { CreateProgramModal } from './CreateProgramModal';

export const ProgramsList = () => {
  const {
    programs,
    currentRole,
    setIsCreateProgramOpen,
    setSelectedProgram,
    selectedProgram,
    startApplicationForProgram
  } = useGrants();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const categories = ['All', 'Climate & Sustainability', 'Healthcare & Public Health', 'Education & Workforce', 'Infrastructure & Water', 'Technology & Security'];
  const statuses = ['All', 'Open', 'Under Review', 'Draft'];

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Epic Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Grant Programs & Schemes
            </h1>
            <span className="text-xs font-bold font-mono bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
              J18-E02
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Program setup, fund configuration, eligibility rules, and evaluation rubrics
          </p>
        </div>

        {currentRole === 'admin' && (
          <button
            onClick={() => setIsCreateProgramOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Grant Scheme</span>
          </button>
        )}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, grant code (e.g. TECH-2026-01), or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Status selector */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* View mode toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-end md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Table
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrograms.map((prog) => {
            const pct = Math.round((prog.allocatedBudget / (prog.totalBudget || 1)) * 100);
            const isOpen = prog.status === 'Open';
            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  {/* Top Bar: Code & Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                      {prog.code}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        isOpen
                          ? 'bg-emerald-100 text-emerald-700'
                          : prog.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {prog.status}
                    </span>
                  </div>

                  {/* Title & Department */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {prog.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {prog.department}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Category Pill */}
                  <div>
                    <span className="inline-block text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {prog.category}
                    </span>
                  </div>

                  {/* Budget Allocation Progress */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Committed / Budget:</span>
                      <span className="font-semibold text-slate-900 font-mono">
                        ${(prog.allocatedBudget / 1000).toFixed(0)}K / ${(prog.totalBudget / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{pct}% Allocated</span>
                      <span>Award: ${(prog.minAward / 1000).toFixed(0)}K - ${(prog.maxAward / 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  {/* Meta Details */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-1">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Closes: {prog.endDate}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 justify-end">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prog.applicantCount || 0} Submissions</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProgram(prog)}
                    className="flex-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors text-center"
                  >
                    View Guidelines
                  </button>

                  {isOpen && (
                    <button
                      onClick={() => startApplicationForProgram(prog)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Grant Code & Title</th>
                  <th className="py-3 px-4">Department / Category</th>
                  <th className="py-3 px-4">Budget Pool</th>
                  <th className="py-3 px-4">Award Limits</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrograms.map((prog) => (
                  <tr key={prog.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-[11px] font-bold text-indigo-600">
                        {prog.code}
                      </div>
                      <div className="font-semibold text-slate-900 mt-0.5 line-clamp-1 max-w-xs">
                        {prog.title}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{prog.department}</div>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {prog.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-semibold text-slate-900">
                        ${(prog.totalBudget).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ${(prog.allocatedBudget).toLocaleString()} committed
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      ${(prog.minAward / 1000).toFixed(0)}K - ${(prog.maxAward / 1000).toFixed(0)}K
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {prog.endDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          prog.status === 'Open'
                            ? 'bg-emerald-100 text-emerald-700'
                            : prog.status === 'Under Review'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {prog.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedProgram(prog)}
                        className="px-2.5 py-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onApply={() => {
            const p = selectedProgram;
            setSelectedProgram(null);
            startApplicationForProgram(p);
          }}
        />
      )}

      {/* Create Program Modal */}
      <CreateProgramModal />
    </div>
  );
};
