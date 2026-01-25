const Scaling = () => {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>06. Architecture</p>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Scaling Considerations</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
          How to scale Isolr from 10 to 10,000 tenants.
        </p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>6.1 Extracting Services</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          When a specific module (e.g., Reports) becomes a bottleneck, it can be extracted into a separate service while maintaining the multi-tenant context delegation.
        </p>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <strong>Rule of thumb:</strong> If a service consumes more than 40% of the total tenant CPU time, it's a candidate for extraction.
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>6.2 Multi-Cluster Deployment</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Moving from a single database cluster to a Sharded Tenant Architecture.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderLeft: '4px solid var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
            <strong>Cluster A:</strong> Tenants 0-1000 (Low volume)
          </div>
          <div style={{ padding: '1rem', borderLeft: '4px solid var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
            <strong>Cluster B:</strong> Tenants 1001-2000 (Enterprise)
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>6.3 Rate Limiting</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Implement hierarchical rate limits:
        </p>
        <ul style={{ color: 'var(--text-dim)', marginLeft: '1.5rem' }}>
          <li><strong>Global Level:</strong> Protect infrastructure from DDoS.</li>
          <li><strong>Tenant Level:</strong> Enforce fair usage across clients.</li>
          <li><strong>User Level:</strong> Prevent script abuse within a single org.</li>
        </ul>
      </section>
    </div>
  );
};

export default Scaling;
