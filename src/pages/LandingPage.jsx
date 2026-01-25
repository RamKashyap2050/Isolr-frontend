import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Shield, Cpu, ArrowRight } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import api from '../utils/api';

const LandingPage = () => {
    const navigate = useNavigate();
    const [orgName, setOrgName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!captchaToken) {
            alert('Please complete the captcha.');
            setIsLoading(false);
            return;
        }
        try {
            const response = await api.post('/org/signup', { 
                orgName, 
                ownerEmail,
                captchaToken 
            });
            const data = response.data;
            setResult(data);
            
            // Redirect to the new tenant dashboard after a short delay (optional) or immediately
            // Since we're in Dev/Path mode, we move to /t/:tenantId
            if (data.tenantId) {
                setTimeout(() => {
                    navigate(`/t/${data.tenantId}`);
                }, 2000);
            }
        } catch (error) {
            console.error('Signup failed', error);
            alert('Signup failed. Check console.');
        } finally {
            setIsLoading(false);
        }
    };

    if (result) {
        return (
            <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-card" style={{ padding: '3rem', maxWidth: '500px', textAlign: 'center' }}>
                    <div style={{ background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Shield color="white" size={32} />
                    </div>
                    <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Tenant Created!</h2>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
                        Your dedicated database has been provisioned. 
                        <strong> {orgName}</strong> is ready.
                    </p>
                    <div className="glass-card" style={{ padding: '1rem', marginBottom: '2rem', textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                        <code style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>ID: {result.tenantId}</code>
                    </div>
                    {/* In a real scenario, we'd redirect to result.url or similar */}
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        To access your dashboard, use the tenant ID in your local development subdomain.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <nav style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: '800', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield className="primary-text" size={28} />
                    <span>ISOLR</span>
                </div>
                <Link to="/docs" className="btn-secondary" style={{ textDecoration: 'none' }}>Documentation</Link>
            </nav>

            <main style={{ padding: '4rem 0' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <h1 className="gradient-text" style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '2rem' }}>
                        Isolation-First Multi-Tenancy.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>
                        Provision dedicated databases for every customer. 
                        Mechanical isolation. Zero accidental leaks. Minimal ceremony.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href="#signup" className="btn-primary">Get Started</a>
                        <button className="btn-secondary">View manifest</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '8rem' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <Cpu className="primary-text" style={{ marginBottom: '1rem' }} />
                        <h3>Modular Monolith</h3>
                        <p style={{ color: 'var(--text-dim)' }}>Single codebase, strict internal boundaries. Scale without the microservices tax.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <Shield className="primary-text" style={{ marginBottom: '1rem' }} />
                        <h3>Physical Isolation</h3>
                        <p style={{ color: 'var(--text-dim)' }}>Each tenant gets its own MongoDB database. No more leaky "where" clauses.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <Rocket className="primary-text" style={{ marginBottom: '1rem' }} />
                        <h3>Low Ceremony</h3>
                        <p style={{ color: 'var(--text-dim)' }}>No complex ORMs or hidden magic. Explicit context resolution via middleware.</p>
                    </div>
                </div>

                <section id="signup" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <h2 style={{ marginBottom: '0.5rem' }}>Create an Organization</h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Start building on a bulletproof foundation.</p>
                        
                        <form onSubmit={handleSignup}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Organization Name</label>
                                <input 
                                    className="input-field" 
                                    placeholder="Acme Inc" 
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Owner Email</label>
                                <input 
                                    className="input-field" 
                                    type="email" 
                                    placeholder="admin@acme.com" 
                                    value={ownerEmail}
                                    onChange={(e) => setOwnerEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <Turnstile 
                                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                                    onSuccess={(token) => setCaptchaToken(token)}
                                />
                            </div>
                            <button className="btn-primary" style={{ width: '100%' }} disabled={isLoading || !captchaToken}>
                                {isLoading ? 'Provisioning...' : 'Provision Database'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-dim)' }}>
                <p>&copy; 2026 Isolr. Built for correctness.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
