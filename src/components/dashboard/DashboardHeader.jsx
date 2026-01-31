import React from 'react';
import { Database, Menu, X } from 'lucide-react';

const DashboardHeader = ({ isSidebarOpen, setIsSidebarOpen, health, tenantId, title }) => {
    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <Database className="text-primary" size={20} />
                    <span className="font-extrabold text-lg tracking-tighter italic">ISOLR</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-text-dim hover:text-white"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Desktop Header Content (Main Header) */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 lg:mb-20">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter text-white">{title || 'Console Control'}</h1>
                    <div className="flex items-center gap-3 text-text-dim text-sm md:text-base font-medium">
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            Connection Active
                        </span>
                        <span className="text-white/10 select-none">|</span>
                        <span>Target: <strong className="text-primary font-mono bg-primary/5 px-2 py-0.5 rounded">{health?.db || 'initializing...'}</strong></span>
                    </div>
                </div>
                <div className="flex items-center shrink-0">
                    <div className="glass-card px-4 py-2 border-white/10 ring-1 ring-white/5 font-mono text-[11px] md:text-xs text-text-dim flex items-center gap-2 group">
                        <span className="bg-white/10 w-1.5 h-1.5 rounded-full"></span>
                        {tenantId}
                    </div>
                </div>
            </header>
        </>
    );
};

export default DashboardHeader;
