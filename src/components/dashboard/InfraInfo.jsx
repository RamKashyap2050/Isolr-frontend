import React from 'react';
import { Database, Shield } from 'lucide-react';

const InfraInfo = ({ health }) => {
    return (
        <div className="xl:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="glass-card p-8 border-white/5 relative overflow-hidden flex-1">
                <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12">
                    <Database size={80} />
                </div>
                <h4 className="text-lg md:text-xl font-black mb-8 flex items-center gap-3 tracking-tight">
                    <Database size={20} className="text-primary" />
                    Infra Telemetry
                </h4>
                <div className="space-y-6">
                    <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                        <span className="text-[10px] uppercase font-black tracking-widest text-text-dim/60">Dedicated ID</span>
                        <span className="font-bold font-mono text-primary text-sm truncate">{health?.db || '...'}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                        <span className="text-[10px] uppercase font-black tracking-widest text-text-dim/60">Fleet Coverage</span>
                        <span className="font-bold text-white text-sm">{health?.collections || '0'} Isolated Collections</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase font-black tracking-widest text-text-dim/60">Network Edge</span>
                        <span className="font-bold text-white text-sm flex items-center gap-2 italic underline underline-offset-4 decoration-primary/30">Global CDN Path</span>
                    </div>
                </div>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-primary/10 via-bg to-bg border-primary/20 ring-1 ring-primary/20 shadow-2xl shadow-primary/10">
                <h4 className="text-lg font-black mb-4 flex items-center gap-2 tracking-tight">
                    <Shield size={18} className="text-primary" />
                    Security Context
                </h4>
                <p className="text-sm text-text-dim leading-loose font-medium">
                    Cross-Tenant bleed is impossible. Traffic is filtered via <code className="text-primary font-bold">tenant_id</code> headers before touching the driver.
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] uppercase font-black tracking-tighter text-text-dim/50 italic">
                    <span>Hardware Enforced</span>
                    <span>P99 &lt; 1ms</span>
                </div>
            </div>
        </div>
    );
};

export default InfraInfo;
