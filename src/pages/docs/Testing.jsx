const Testing = () => {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>04. Quality</p>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Testing & Validation</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
          Testing multi-tenancy is fundamentally different from testing single-tenant apps. You must verify what happens between tenants.
        </p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>4.1 Isolation Test Suite</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Our flagship test suite ensures that no data from <code>Tenant A</code> is accessible via a session belonging to <code>Tenant B</code>.
        </p>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>The "Leak Test" Pattern:</h4>
          <ol style={{ marginLeft: '1.5rem', color: 'var(--text-dim)' }}>
            <li>Create Tenant A and Tenant B.</li>
            <li>Seed private data into Tenant A.</li>
            <li>Attempt to query Tenant A's data using Tenant B's JWT.</li>
            <li>Verify <code>403 Forbidden</code> or <code>404 Not Found</code>.</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>4.2 Chaos Engineering</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Simulating "Hot DB" scenarios where one tenant's heavy queries impact the connection pool for others.
        </p>
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <p style={{ color: '#ef4444', fontWeight: 'bold' }}>Simulation #1: Connection Exhaustion</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Verify that the global rate limiter kicks in before the DB reaches max_connections.</p>
        </div>
      </section>
    </div>
  );
};

export default Testing;
