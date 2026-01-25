import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  MoveRight, 
  Activity, 
  RefreshCcw, 
  ShieldCheck, 
  LifeBuoy, 
  TrendingUp,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';

const DocsLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Tenant Migration', path: 'migration', icon: MoveRight },
    { name: 'Observability', path: 'observability', icon: Activity },
    { name: 'Lifecycle', path: 'lifecycle', icon: RefreshCcw },
    { name: 'Testing', path: 'testing', icon: ShieldCheck },
    { name: 'Operational Runbooks', path: 'runbooks', icon: LifeBuoy },
    { name: 'Scaling', path: 'scaling', icon: TrendingUp },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text selection:bg-primary/30">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
            <ShieldCheck size={20} color="white" />
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight">ISOLR <span className="text-primary text-[10px] uppercase align-top ml-1">Docs</span></span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-text-dim hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-0 left-0 w-[300px] h-screen bg-bg-secondary/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none
          border-r border-white/5 p-6 flex flex-col z-50 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="mb-10">
            <NavLink to="/" className="flex items-center gap-2 text-text-dim hover:text-white text-sm transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </NavLink>
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl shadow-xl shadow-primary/20">
                <ShieldCheck size={24} color="white" />
              </div>
              <span className="font-outfit font-black text-2xl tracking-tighter">ISOLR <span className="text-primary text-xs uppercase align-top ml-1 opacity-80">Docs</span></span>
            </div>
          </div>

          <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-[10px] font-bold text-text-dim/60 uppercase tracking-widest mb-4 px-4 font-inter">
              System Architecture
            </p>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary/10 text-white border border-primary/20 shadow-sm' 
                    : 'text-text-dim hover:bg-white/5 hover:text-white border border-transparent'}
                `}
              >
                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 pt-6 border-t border-white/5">
            <div className="glass-card p-4 ring-1 ring-white/5">
              <p className="text-[10px] text-text-dim font-mono mb-1">v1.4.2-stable</p>
              <p className="text-[10px] text-text-dim/60">Built for Critical Infra</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0 md:px-16 md:py-16 px-6 py-10 overflow-hidden">
          <div className="max-w-4xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity md:hidden"
        />
      )}
    </div>
  );
};

export default DocsLayout;
