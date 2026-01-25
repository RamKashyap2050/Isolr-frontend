const Lifecycle = () => {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>03. Management</p>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Lifecycle Management</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
          Automating the birth, suspension, and deletion of tenant environments.
        </p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>3.1 Tenant States</h2>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <StateBox label="Provisioning" color="#6366f1" />
            <Arrow />
            <StateBox label="Active" color="#10b981" />
            <Arrow />
            <StateBox label="Suspended" color="#f59e0b" />
            <Arrow />
            <StateBox label="Archived" color="#64748b" />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>3.2 Suspension & Retention</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          When a tenant is suspended, API access is revoked at the gateway level while background workers finish data processing.
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-dim)' }}>
          <li><strong>Retention:</strong> Data is kept for 90 days after subscription ends.</li>
          <li><strong>Purging:</strong> Permanent erasure occurs after 100 days (GDPR compliant).</li>
          <li><strong>Export:</strong> Tenants can request a full DB dump before final deletion.</li>
        </ul>
      </section>
    </div>
  );
};

const StateBox = ({ label, color }) => (
  <div style={{ padding: '1rem', border: `1px solid ${color}`, borderRadius: '0.5rem', color: color, fontWeight: '600', minWidth: '120px' }}>
    {label}
  </div>
);

const Arrow = () => <div style={{ color: 'var(--border)' }}>→</div>;

export default Lifecycle;
