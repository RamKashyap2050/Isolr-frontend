import { NavLink, Outlet } from 'react-router-dom';
import { 
  MoveRight, 
  Activity, 
  RefreshCcw, 
  ShieldCheck, 
  LifeBuoy, 
  TrendingUp,
  ArrowLeft
} from 'lucide-react';

const DocsLayout = () => {
  const navItems = [
    { name: 'Tenant Migration', path: 'migration', icon: MoveRight },
    { name: 'Observability', path: 'observability', icon: Activity },
    { name: 'Lifecycle', path: 'lifecycle', icon: RefreshCcw },
    { name: 'Testing', path: 'testing', icon: ShieldCheck },
    { name: 'Operational Runbooks', path: 'runbooks', icon: LifeBuoy },
    { name: 'Scaling', path: 'scaling', icon: TrendingUp },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '300px', 
        background: 'rgba(17, 24, 39, 0.8)', 
        borderRight: '1px solid var(--border)', 
        padding: '2rem 1.5rem',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        backdropFilter: 'blur(20px)',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <NavLink to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            color: 'var(--text-dim)', 
            textDecoration: 'none',
            fontSize: '0.875rem',
            marginBottom: '1.5rem'
          }}>
            <ArrowLeft size={16} />
            Back to Home
          </NavLink>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'var(--primary)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} color="white" />
            </div>
            <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>ISOLR <span style={{ color: 'var(--primary)', fontSize: '0.75rem', verticalAlign: 'top' }}>DOCS</span></span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
            Production Guide
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                color: isActive ? 'white' : 'var(--text-dim)',
                background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.2s ease'
              })}
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '4rem' }}>
          <div className="glass-card" style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.05)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Version 1.4.2-stable</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>© 2026 Isolr Engine</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: '300px',
        padding: '4rem 6rem',
        maxWidth: '1200px'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DocsLayout;
