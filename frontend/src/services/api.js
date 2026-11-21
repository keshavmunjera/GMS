const API_BASE_URL = 'http://localhost:8080/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn(`Request failed for ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Health
  checkHealth: () => request('/health'),
  getSystemInfo: () => request('/system/info'),
  resetSystemData: () => request('/system/reset', { method: 'POST' }),

  // Programs
  getPrograms: () => request('/programs'),
  getProgram: (id) => request(`/programs/${id}`),
  createProgram: (program, role) => request('/programs', {
    method: 'POST',
    headers: { 'X-Current-Role': role || 'admin' },
    body: JSON.stringify(program)
  }),
  updateProgram: (id, updates, role) => request(`/programs/${id}`, {
    method: 'PUT',
    headers: { 'X-Current-Role': role || 'admin' },
    body: JSON.stringify(updates)
  }),
  deleteProgram: (id, role) => request(`/programs/${id}`, {
    method: 'DELETE',
    headers: { 'X-Current-Role': role || 'admin' }
  }),

  // Applications
  getApplications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/applications${query ? `?${query}` : ''}`);
  },
  getApplication: (id) => request(`/applications/${id}`),
  submitApplication: (application, role) => request('/applications', {
    method: 'POST',
    headers: { 'X-Current-Role': role || 'applicant' },
    body: JSON.stringify(application)
  }),
  updateApplication: (id, updates) => request(`/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  }),
  submitReview: (id, reviewData, role) => request(`/applications/${id}/reviews`, {
    method: 'POST',
    headers: { 'X-Current-Role': role || 'reviewer' },
    body: JSON.stringify(reviewData)
  }),
  advanceStage: (id, stage, decisionNotes, role) => request(`/applications/${id}/stage`, {
    method: 'POST',
    headers: { 'X-Current-Role': role || 'admin' },
    body: JSON.stringify({ stage, decisionNotes, role })
  }),
  deleteApplication: (id) => request(`/applications/${id}`, {
    method: 'DELETE'
  }),

  // Disbursements
  getDisbursements: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/disbursements${query ? `?${query}` : ''}`);
  },
  processDisbursement: (id, paymentDetails, role) => request(`/disbursements/${id}/process`, {
    method: 'POST',
    headers: { 'X-Current-Role': role || 'finance' },
    body: JSON.stringify({ ...paymentDetails, role })
  }),

  // Milestones
  getMilestones: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/milestones${query ? `?${query}` : ''}`);
  },
  submitMilestone: (report, role) => request('/milestones', {
    method: 'POST',
    headers: { 'X-Current-Role': role || 'applicant' },
    body: JSON.stringify(report)
  }),
  approveMilestone: (id, notes, role) => request(`/milestones/${id}/approve`, {
    method: 'POST',
    headers: { 'X-Current-Role': role || 'finance' },
    body: JSON.stringify({ notes, role })
  }),

  // Audit Logs
  getAuditLogs: () => request('/audit-logs'),

  // Eligibility
  checkEligibility: (payload) => request('/eligibility/check', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Dashboard
  getDashboardSummary: () => request('/dashboard/summary')
};
