const Scaling = () => {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <p className="text-primary font-semibold mb-2">06. Architecture</p>
        <h1 className="gradient-text text-4xl md:text-6xl mb-6">Scaling Considerations</h1>
        <p className="text-lg md:text-xl text-text-dim leading-relaxed">
          How to scale Isolr from 10 to 10,000 tenants.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">6.1 Extracting Services</h2>
        <p className="text-text-dim mb-6 leading-relaxed">
          When a specific module (e.g., Reports) becomes a bottleneck, it can be extracted into a separate service while maintaining the multi-tenant context delegation.
        </p>
        <div className="glass-card p-6 border-l-4 border-primary">
          <p className="text-sm font-medium"><strong className="text-primary underline underline-offset-4 mr-2">Rule of thumb:</strong> If a service consumes more than 40% of the total tenant CPU time, it's a candidate for extraction.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">6.2 Multi-Cluster Deployment</h2>
        <p className="text-text-dim mb-6">
          Moving from a single database cluster to a Sharded Tenant Architecture.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 border border-white/5 bg-white/5 rounded-2xl border-l-4 border-l-primary group hover:bg-white/[0.08] transition-colors">
            <p className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Cluster A</p>
            <p className="text-xs text-text-dim uppercase tracking-widest">Tenants 0-1000 (Low volume)</p>
          </div>
          <div className="p-5 border border-white/5 bg-white/5 rounded-2xl border-l-4 border-l-primary group hover:bg-white/[0.08] transition-colors">
            <p className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Cluster B</p>
            <p className="text-xs text-text-dim uppercase tracking-widest">Tenants 1001-2000 (Enterprise)</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">6.3 Rate Limiting</h2>
        <p className="text-text-dim mb-6 italic">
          Implement hierarchical rate limits:
        </p>
        <div className="space-y-4">
          {[
            { level: 'Global Level', desc: 'Protect infrastructure from DDoS.' },
            { level: 'Tenant Level', desc: 'Enforce fair usage across clients.' },
            { level: 'User Level', desc: 'Prevent script abuse within a single org.' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20 shrink-0">
                0{idx + 1}
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5 group-hover:text-primary transition-colors">{item.level}</p>
                <p className="text-sm text-text-dim">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Scaling;
