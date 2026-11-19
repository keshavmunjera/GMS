# GrantSphere — Grants Management System (GMS)
**Sprint Project Code: `J18` | Release Version: `v1.0.0`**

A complete, production-grade frontend portal for managing the end-to-end grant lifecycle from program setup and eligibility pre-screening to multi-step proposal submission, peer review evaluation rubrics, stage-gate approvals, and milestone-based tranche disbursements.

---

## 📋 Epic Coverage Matrix (J18-E01 through J18-E06)

| Epic ID | Epic Name | Functional Scope & Implemented Modules |
| :--- | :--- | :--- |
| **J18-E01** | **Project Setup, Git Workflow and Design** | React 19 + Tailwind CSS v4 + Vite application skeleton, responsive UI layout, navigation sidebar, top metrics bar, 4-persona role switcher, LocalStorage persistence, and design system. |
| **J18-E02** | **Grant Program Setup & Configuration** | Grant schemes management: budget pool configuration, min/max award bounds, start/close application window dates, category tagging, eligibility criteria rules, required submission document checklists, and weighted scoring rubrics. |
| **J18-E03** | **Application Submission & Eligibility Check** | Interactive self-service **Eligibility Pre-Screener** (real-time automated audit determination), **5-Step Application Submission Wizard** (Applicant details, Project narrative & objectives, Itemized budget calculator with matching funds, Document upload simulation, and Attestation). |
| **J18-E04** | **Review and Approval Workflow** | Reviewer and committee command center: queue of proposals in evaluation, **100-Point Quantitative Scoring Rubric** (Technical merit, Feasibility, Impact, and Budget), live rating tiers (A+ to D), qualitative feedback, and administrative stage-gate controls. |
| **J18-E05** | **Grant Disbursement and Reporting** | Multi-tranche payment milestone schedules (Tranches 1, 2, and 3), disbursement execution modal (Federal Wire ACH, Treasury Vouchers), grantee progress & expenditure reporting, and deliverable verification audits. |
| **J18-E06** | **Testing, Documentation and Release** | Embedded system documentation and Jira Epics trace, live activity audit logging feed, demo state reset capability, and support for all 4 primary user roles. |

---

## 👥 Built-In Personas & Role Switcher

You can switch roles anytime using the **Role dropdown in the top navigation bar**:
1. 🏛️ **Grant Administrator**: Full control to create and publish grant schemes, oversee budget allocations, authorize stage transitions, and committee sign-offs.
2. 📝 **Grantee / Applicant**: Browse open grants, test eligibility in the interactive calculator, submit multi-step applications, track submission status, and submit milestone progress reports.
3. 🔍 **Peer Reviewer / Evaluator**: Access assigned proposals, score applications against the 100-point rubric, and submit recommendations.
4. 💼 **Finance & Compliance Officer**: Review milestone spend receipts, execute tranche disbursements, and issue voucher references.

---

## 🚀 How to Run

From the `frontend` directory:

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

The application runs on `http://localhost:5173` (or the next available port).

---

## 🛠️ Key Technologies
- **React 19** (`react`, `react-dom`)
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`, modern utility classes)
- **Lucide React** (Standardized iconography)
- **HTML5 Web Storage API** (`localStorage` persistent state with reset trigger)
