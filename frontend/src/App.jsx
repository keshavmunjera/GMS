import { GrantsProvider, useGrants } from './context/GrantsContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { DashboardOverview } from './components/analytics/DashboardOverview';
import { ProgramsList } from './components/programs/ProgramsList';
import { EligibilityChecker } from './components/eligibility/EligibilityChecker';
import { ApplicationsList } from './components/applications/ApplicationsList';
import { ReviewWorkflow } from './components/review/ReviewWorkflow';
import { DisbursementManager } from './components/disbursement/DisbursementManager';
import { DocumentationView } from './components/docs/DocumentationView';

const MainContent = () => {
  const { activeTab } = useGrants();

  return (
    <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && <DashboardOverview />}
        {activeTab === 'programs' && <ProgramsList />}
        {activeTab === 'eligibility' && <EligibilityChecker />}
        {activeTab === 'applications' && <ApplicationsList />}
        {activeTab === 'reviews' && <ReviewWorkflow />}
        {activeTab === 'disbursements' && <DisbursementManager />}
        {activeTab === 'docs' && <DocumentationView />}
      </div>
    </main>
  );
};

function App() {
  return (
    <GrantsProvider>
      <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
        <ToastContainer />
      </div>
    </GrantsProvider>
  );
}

export default App;

