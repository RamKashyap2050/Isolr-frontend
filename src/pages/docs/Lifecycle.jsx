const Lifecycle = () => {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <p className="text-primary font-semibold mb-2">03. Management</p>
        <h1 className="gradient-text text-4xl md:text-6xl mb-6">Lifecycle Management</h1>
        <p className="text-lg md:text-xl text-text-dim leading-relaxed">
          Automating the birth, suspension, and deletion of tenant environments.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">3.1 Tenant States</h2>
        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-around items-center gap-4">
            <StateBox label="Provisioning" color="indigo" />
            <Arrow />
            <StateBox label="Active" color="emerald" />
            <Arrow />
            <StateBox label="Suspended" color="amber" />
            <Arrow />
            <StateBox label="Archived" color="slate" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl mb-6 border-b border-white/10 pb-2">3.2 Suspension & Retention</h2>
        <p className="text-text-dim mb-6">
          When a tenant is suspended, API access is revoked at the gateway level while background workers finish data processing.
        </p>
        <ul className="space-y-4 text-text-dim list-disc list-inside px-4">
          <li><strong className="text-text">Retention:</strong> Data is kept for 90 days after subscription ends.</li>
          <li><strong className="text-text">Purging:</strong> Permanent erasure occurs after 100 days (GDPR compliant).</li>
          <li><strong className="text-text">Export:</strong> Tenants can request a full DB dump before final deletion.</li>
        </ul>
      </section>
    </div>
  );
};

const StateBox = ({ label, color }) => {
  const colorMap = {
    indigo: 'border-indigo-500 text-indigo-400',
    emerald: 'border-emerald-500 text-emerald-400',
    amber: 'border-amber-500 text-amber-400',
    slate: 'border-slate-500 text-slate-400',
  };
  
  return (
    <div className={`px-6 py-3 border rounded-xl font-bold min-w-[140px] text-center shadow-lg shadow-${color}-900/10 ${colorMap[color]}`}>
      {label}
    </div>
  );
};

const Arrow = () => <div className="text-white/20 text-xl font-bold md:rotate-0 rotate-90">→</div>;

export default Lifecycle;
