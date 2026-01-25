const Observability = () => {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <p className="text-primary font-semibold mb-2">02. Monitoring</p>
        <h1 className="gradient-text text-4xl md:text-6xl mb-6">Observability</h1>
        <p className="text-lg md:text-xl text-text-dim leading-relaxed">
          Maintaining visibility into thousands of isolated databases requires a unified telemetry approach with strict tenant-context injection.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">2.1 Logging Standards</h2>
        <p className="text-text-dim mb-6">
          All logs MUST include the <code className="text-primary text-sm">tenant_id</code> field. Our middleware automatically injects this into the request context.
        </p>
        <div className="glass-card p-6 overflow-x-auto">
          <code className="text-indigo-400 font-mono text-sm whitespace-nowrap">
            {`{ "level": "info", "tenant_id": "org_4k2l", "message": "Query executed", "duration_ms": 12 }`}
          </code>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">2.2 Metrics & Cost</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 hover:bg-white/[0.07] transition-colors">
            <h3 className="text-xl mb-3 text-primary">Throughput</h3>
            <p className="text-text-dim text-sm leading-relaxed">Track requests per second per tenant to identify noisy neighbors.</p>
          </div>
          <div className="glass-card p-6 hover:bg-white/[0.07] transition-colors">
            <h3 className="text-xl mb-3 text-primary">Storage</h3>
            <p className="text-text-dim text-sm leading-relaxed">Direct disk usage metrics for accurate per-tenant billing.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">2.3 Alerting Thresholds</h2>
        <p className="text-text-dim mb-6">We recommend the following P99 latency alerts:</p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/5 text-text border-b border-white/10">
                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Metric</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-amber-500">Warning</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-red-500">Critical</th>
              </tr>
            </thead>
            <tbody className="text-text-dim text-sm">
              <tr className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 text-text font-medium">DB Connection Time</td>
                <td className="p-4">150ms</td>
                <td className="p-4 font-bold text-red-500/50">500ms</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-text font-medium">Tenant Resolution</td>
                <td className="p-4">50ms</td>
                <td className="p-4 font-bold text-red-500/50">200ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Observability;
