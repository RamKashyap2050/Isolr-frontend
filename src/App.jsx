import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DocsLayout from './pages/docs/DocsLayout';
import Migration from './pages/docs/Migration';
import Observability from './pages/docs/Observability';
import Lifecycle from './pages/docs/Lifecycle';
import Testing from './pages/docs/Testing';
import Runbooks from './pages/docs/Runbooks';
import Scaling from './pages/docs/Scaling';
import { getTenantSlug } from './utils/tenant';

const DashboardWrapper = () => {
  // This component will be used when we're in path-based dev mode
  return <Dashboard />;
};

function App() {
  const [tenantSlug, setTenantSlug] = useState(null);
  const [isResolving, setIsResolving] = useState(true);

  useEffect(() => {
    const slug = getTenantSlug();
    setTenantSlug(slug);
    setIsResolving(false);
  }, []);

  if (isResolving) {
    return (
      <div style={{ background: '#030712', color: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="gradient-text" style={{ fontSize: '1.5rem' }}>Initializing Isolr...</p>
      </div>
    );
  }

  // --- SUBDOMAIN MODE (Production) ---
  if (tenantSlug) {
    return <Dashboard tenantId={tenantSlug} />;
  }

  // --- PATH MODE (Development / Root Domain) ---
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/t/:tenantId" element={<Dashboard />} />
        
        {/* Documentation Section */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="migration" replace />} />
          <Route path="migration" element={<Migration />} />
          <Route path="observability" element={<Observability />} />
          <Route path="lifecycle" element={<Lifecycle />} />
          <Route path="testing" element={<Testing />} />
          <Route path="runbooks" element={<Runbooks />} />
          <Route path="scaling" element={<Scaling />} />
        </Route>

        {/* Catch-all to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
