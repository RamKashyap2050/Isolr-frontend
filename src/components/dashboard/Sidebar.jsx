import React from 'react';
import { Database, Users, Settings } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const { pathname } = useLocation();
    const { tenantId } = useParams();

    const isActive = (path) => pathname.includes(path);
    const isDataPlane = pathname === `/t/${tenantId}` || pathname === `/t/${tenantId}/`;
    const isUserFleet = pathname.includes(`/t/${tenantId}/users`);

    return (
        <aside className={`
            fixed md:sticky top-0 left-0 w-72 h-screen bg-bg-secondary/50 backdrop-blur-xl md:backdrop-blur-none
            border-r border-white/5 p-8 flex flex-col z-50 transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
            <div className="mb-12 flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-xl ring-1 ring-primary/30">
                    <Database className="text-primary" size={24} />
                </div>
                <span className="font-black text-2xl tracking-tighter gradient-text">ISOLR</span>
            </div>
            
            <nav className="flex flex-col gap-2 flex-1">
                <Link to={`/t/${tenantId}`} className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-3 ${isDataPlane ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'text-text-dim hover:bg-white/5 hover:text-white'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isDataPlane ? 'bg-primary animate-pulse' : 'bg-white/20'}`}></div>
                    Data Plane
                </Link>
                
                <Link to={`/t/${tenantId}/users`} className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-3 ${isUserFleet ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'text-text-dim hover:bg-white/5 hover:text-white'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isUserFleet ? 'bg-primary animate-pulse' : 'bg-white/20'}`}></div>
                    User Fleet
                </Link>

                <div className="px-4 py-3 text-text-dim hover:bg-white/5 rounded-xl transition-colors cursor-not-allowed flex items-center gap-3 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    System Configuration
                </div>
            </nav>

            <div className="mt-12 pt-8 border-t border-white/5">
                <div className="glass-card p-5 border-white/5 flex flex-col gap-1.5">
                    <p className="text-[10px] uppercase font-black text-text-dim tracking-widest px-1 opacity-60 italic">Tenant Mode</p>
                    <p className="text-sm font-bold text-emerald-400 flex items-center gap-2 px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        Isolated Physical
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
