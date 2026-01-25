const Observability = () => {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>02. Monitoring</p>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Observability</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
          Maintaining visibility into thousands of isolated databases requires a unified telemetry approach with strict tenant-context injection.
        </p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>2.1 Logging Standards</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          All logs MUST include the <code>tenant_id</code> field. Our middleware automatically injects this into the request context.
        </p>
        <div className="glass-card" style={{ padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.875rem', color: '#818cf8' }}>
          {`{ "level": "info", "tenant_id": "org_4k2l", "message": "Query executed", "duration_ms": 12 }`}
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>2.2 Metrics & Cost</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Throughput</h3>
            <p style={{ fontSize: '0.9rem' }}>Track requests per second per tenant to identify noisy neighbors.</p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Storage</h3>
            <p style={{ fontSize: '0.9rem' }}>Direct disk usage metrics for accurate per-tenant billing.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>2.3 Alerting Thresholds</h2>
        <p style={{ marginBottom: '1.5rem' }}>We recommend the following P99 latency alerts:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-dim)' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem' }}>Metric</th>
              <th style={{ padding: '1rem' }}>Warning</th>
              <th style={{ padding: '1rem' }}>Critical</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '1rem' }}>DB Connection Time</td>
              <td style={{ padding: '1rem' }}>150ms</td>
              <td style={{ padding: '1rem' }}>500ms</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '1rem' }}>Tenant Resolution</td>
              <td style={{ padding: '1rem' }}>50ms</td>
              <td style={{ padding: '1rem' }}>200ms</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Observability;
