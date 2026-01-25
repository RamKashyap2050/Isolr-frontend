const Migration = () => {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <p className="text-primary font-semibold mb-2">01. Operations</p>
        <h1 className="gradient-text text-4xl md:text-6xl mb-6">Tenant Migration</h1>
        <p className="text-lg md:text-xl text-text-dim leading-relaxed">
          Moving tenants across regions or evolving schemas without downtime requires a coordinated orchestration of the data plane and application routing.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">1.1 Cross-Region Migration</h2>
        <p className="text-text-dim mb-6">
          Isolr supports asynchronous tenant relocation using the migration heartbeat protocol.
        </p>
        <div className="glass-card p-8 mb-8">
           <ol className="list-decimal list-inside space-y-4 text-text-dim">
             <li><strong className="text-text">Initial Snapshot:</strong> Primary DB state is cloned to destination region via <code className="text-primary text-sm">db.copyStore()</code>.</li>
             <li><strong className="text-text">CDC Synchronization:</strong> Change Data Capture streams incremental updates to the destination.</li>
             <li><strong className="text-text">Traffic Cutover:</strong> DNS/Subdomain routing is updated to the new regional gateway.</li>
             <li><strong className="text-text">Final Consistency Verify:</strong> Integrity checks performed before decommission.</li>
           </ol>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">1.2 Schema Evolution</h2>
        <p className="text-text-dim mb-6">
          Since each tenant has a dedicated DB, migrations can be rolled out progressively rather than in a single "big bang" event.
        </p>
        <div className="bg-black/40 p-6 rounded-xl border border-white/5 mb-6 overflow-x-auto">
          <code className="text-indigo-300 whitespace-nowrap">
            isolr-ctl migrate --tenant-group=beta --schema-path=./v2-schema.json
          </code>
        </div>
        <p className="text-text-dim italic">
          Always use additive schema changes to maintain backward compatibility during the propagation window.
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">1.3 Rollback Procedures</h2>
        <p className="text-text-dim mb-6">
          In case of migration failure, Isolr maintains a "Cold Standby" of the original database for 24 hours.
        </p>
        <div className="p-6 border-l-4 border-amber-500 bg-amber-500/5 rounded-r-lg">
          <strong className="text-amber-500 block mb-2">Warning</strong>
          <p className="text-text-dim text-sm">
            Rollbacks after the cutover point may result in data loss for writes that occurred in the new destination. Always coordinate with tenant admins.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Migration;
