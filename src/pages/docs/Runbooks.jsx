const Runbooks = () => {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <p className="text-primary font-semibold mb-2">05. Security</p>
        <h1 className="gradient-text text-4xl md:text-6xl mb-6">Operational Runbooks</h1>
        <p className="text-lg md:text-xl text-text-dim leading-relaxed">
          Step-by-step procedures for the worst-case scenarios in a multi-tenant environment.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2 text-red-500/80">5.1 Incident: Potential Data Leak</h2>
        <div className="p-8 border border-red-500/20 rounded-2xl bg-red-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-red-500 text-6xl font-black">!</span>
          </div>
          <p className="font-black text-red-500 mb-6 tracking-tighter">IMMEDIATE ACTION REQUIRED</p>
          <ol className="space-y-4 text-text-dim list-decimal list-inside">
            <li>Isolate the tenant by setting <code className="bg-red-500/20 text-red-400 px-1 rounded mx-1">status: 'quarantined'</code>.</li>
            <li>Invalidate all active sessions for that tenant.</li>
            <li>Snapshot the current DB state for forensic audit.</li>
            <li>Check <code className="text-primary">context_provider</code> logs for cross-tenant ID references.</li>
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">5.2 Disaster Recovery</h2>
        <p className="text-text-dim mb-6 leading-relaxed">
          Isolr uses Point-in-Time Recovery (PITR) per database. You can restore a single tenant without affecting any other customers.
        </p>
        <div className="bg-black/50 p-6 rounded-xl border border-white/5 group shadow-inner">
          <code className="text-indigo-400 block break-all text-xs md:text-sm font-mono leading-loose">
            <span className="text-text-dim select-none">$</span> isolr-ctl restore --tenant=org_123 --to-timestamp="2026-01-24T12:00:00Z"
          </code>
        </div>
      </section>
    </div>
  );
};

export default Runbooks;
