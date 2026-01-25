const Migration = () => {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>01. Operations</p>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Tenant Migration</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
          Moving tenants across regions or evolving schemas without downtime requires a coordinated orchestration of the data plane and application routing.
        </p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>1.1 Cross-Region Migration</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Isolr supports asynchronous tenant relocation using the migration heartbeat protocol.
        </p>
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
           <ol style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <li><strong>Initial Snapshot:</strong> Primary DB state is cloned to destination region via <code>db.copyStore()</code>.</li>
             <li><strong>CDC Synchronization:</strong> Change Data Capture streams incremental updates to the destination.</li>
             <li><strong>Traffic Cutover:</strong> DNS/Subdomain routing is updated to the new regional gateway.</li>
             <li><strong>Final Consistency Verify:</strong> Integrity checks performed before decommission.</li>
           </ol>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>1.2 Schema Evolution</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Since each tenant has a dedicated DB, migrations can be rolled out progressively rather than in a single "big bang" event.
        </p>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
          <code style={{ color: '#a5b4fc' }}>
            isolr-ctl migrate --tenant-group=beta --schema-path=./v2-schema.json
          </code>
        </div>
        <p style={{ color: 'var(--text-dim)' }}>
          Always use additive schema changes to maintain backward compatibility during the propagation window.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>1.3 Rollback Procedures</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          In case of migration failure, Isolr maintains a "Cold Standby" of the original database for 24 hours.
        </p>
        <div style={{ padding: '1.5rem', borderLeft: '4px solid #f59e0b', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '0 0.5rem 0.5rem 0' }}>
          <strong>Warning:</strong> Rollbacks after the cutover point may result in data loss for writes that occurred in the new destination. Always coordinate with tenant admins.
        </div>
      </section>
    </div>
  );
};

export default Migration;
