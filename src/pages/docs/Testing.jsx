const Testing = () => {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <p className="text-primary font-semibold mb-2">04. Quality</p>
        <h1 className="gradient-text text-4xl md:text-6xl mb-6">Testing & Validation</h1>
        <p className="text-lg md:text-xl text-text-dim leading-relaxed">
          Testing multi-tenancy is fundamentally different from testing single-tenant apps. You must verify what happens between tenants.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">4.1 Isolation Test Suite</h2>
        <p className="text-text-dim mb-6">
          Our flagship test suite ensures that no data from <code className="text-indigo-400">Tenant A</code> is accessible via a session belonging to <code className="text-indigo-400">Tenant B</code>.
        </p>
        <div className="glass-card p-8 border border-white/10">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            The "Leak Test" Pattern
          </h4>
          <ol className="space-y-4 text-text-dim list-decimal list-inside px-2">
            <li>Create Tenant A and Tenant B.</li>
            <li>Seed private data into Tenant A.</li>
            <li>Attempt to query Tenant A's data using Tenant B's JWT.</li>
            <li>Verify <code className="text-red-400 text-xs px-2 py-1 bg-red-400/5 rounded">403 Forbidden</code> or <code className="text-red-400 text-xs px-2 py-1 bg-red-400/5 rounded">404 Not Found</code>.</li>
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">4.2 Chaos Engineering</h2>
        <p className="text-text-dim mb-6">
          Simulating "Hot DB" scenarios where one tenant's heavy queries impact the connection pool for others.
        </p>
        <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/20">
          <p className="text-red-500 font-bold mb-2">Simulation #1: Connection Exhaustion</p>
          <p className="text-text-dim text-sm leading-relaxed">Verify that the global rate limiter kicks in before the DB reaches max_connections.</p>
        </div>
      </section>
    </div>
  );
};

export default Testing;
