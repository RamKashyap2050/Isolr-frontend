const Runbooks = () => {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>05. Security</p>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Operational Runbooks</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
          Step-by-step procedures for the worst-case scenarios in a multi-tenant environment.
        </p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>5.1 Incident: Potential Data Leak</h2>
        <div style={{ padding: '1.5rem', border: '1px solid #ef4444', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.05)' }}>
          <p style={{ fontWeight: '700', color: '#ef4444', marginBottom: '1rem' }}>IMMEDIATE ACTION REQUIRED</p>
          <ol style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>Isolate the tenant by setting <code>status: 'quarantined'</code>.</li>
            <li>Invalidate all active sessions for that tenant.</li>
            <li>Snapshot the current DB state for forensic audit.</li>
            <li>Check <code>context_provider</code> logs for cross-tenant ID references.</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>5.2 Disaster Recovery</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Isolr uses Point-in-Time Recovery (PITR) per database. You can restore a single tenant without affecting any other customers.
        </p>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
          <code style={{ fontSize: '0.8rem' }}>
            isolr-ctl restore --tenant=org_123 --to-timestamp="2026-01-24T12:00:00Z"
          </code>
        </div>
      </section>
    </div>
  );
};

export default Runbooks;
