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
            <div className="container min-h-screen flex items-center justify-center">
                <div className="glass-card p-12 max-w-[500px] w-full text-center">
                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                        <Shield color="white" size={32} />
                    </div>
                    <h2 className="gradient-text text-3xl font-bold mb-4">Tenant Created!</h2>
                    <p className="text-text-dim mb-8">
                        Your dedicated database has been provisioned. 
                        <strong className="text-text ml-1">{orgName}</strong> is ready.
                    </p>
                    <div className="bg-black/20 p-4 rounded-xl mb-8 text-left ring-1 ring-white/5">
                        <code className="text-sm text-primary font-mono break-all line-clamp-1 flex items-center gap-2">
                          <span className="opacity-50 select-none">ID:</span> {result.tenantId}
                        </code>
                    </div>
                    <p className="text-xs text-text-dim/80 leading-relaxed">
                        To access your dashboard, use the tenant ID in your local development subdomain.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container overflow-x-hidden">
            <nav className="py-8 flex justify-between items-center relative z-10">
                <div className="font-extrabold text-2xl flex items-center gap-2.5 tracking-tighter">
                    <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
                      <Shield size={22} color="white" />
                    </div>
                    <span>ISOLR</span>
                </div>
                <Link to="/docs" className="btn-secondary text-sm px-5 py-2.5">Documentation</Link>
            </nav>

            <main className="py-16 md:py-24 relative">
                {/* Hero Glows */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 blur-[120px] -z-10 rounded-full"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 blur-[150px] -z-10 rounded-full"></div>

                <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
                    <h1 className="gradient-text text-5xl md:text-8xl leading-[1.05] md:leading-[1.1] mb-8 font-black tracking-tight">
                        Isolation-First<br />Multi-Tenancy.
                    </h1>
                    <p className="text-lg md:text-2xl text-text-dim mb-12 max-w-2xl mx-auto leading-relaxed">
                        Provision dedicated databases for every customer. 
                        Mechanical isolation. Zero leaks. Minimal ceremony.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                        <a href="#signup" className="btn-primary text-center px-8 py-4">Get Started Immediately</a>
                        <button className="btn-secondary text-center px-8 py-4 bg-white/5 border-white/5 hover:bg-white/10 transition-all">View system manifest</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 md:mb-40">
                    <div className="glass-card p-8 group hover:bg-white/[0.07] transition-all duration-300 border-white/5">
                        <Cpu className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
                        <h3 className="text-xl mb-3 font-bold group-hover:text-primary transition-colors">Modular Monolith</h3>
                        <p className="text-text-dim text-sm leading-relaxed">Single codebase, strict internal boundaries. Scale without the microservices tax.</p>
                    </div>
                    <div className="glass-card p-8 group hover:bg-white/[0.07] transition-all duration-300 border-white/5">
                        <Shield className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
                        <h3 className="text-xl mb-3 font-bold group-hover:text-primary transition-colors">Physical Isolation</h3>
                        <p className="text-text-dim text-sm leading-relaxed">Each tenant gets its own MongoDB database. No more leaky "where" clauses.</p>
                    </div>
                    <div className="glass-card p-8 group hover:bg-white/[0.07] transition-all duration-300 border-white/5">
                        <Rocket className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
                        <h3 className="text-xl mb-3 font-bold group-hover:text-primary transition-colors">Low Ceremony</h3>
                        <p className="text-text-dim text-sm leading-relaxed">No complex ORMs or hidden magic. Explicit context resolution via middleware.</p>
                    </div>
                </div>

                <section id="signup" className="max-w-[550px] mx-auto scroll-mt-24">
                    <div className="glass-card p-8 md:p-12 border-primary/20 bg-gradient-to-b from-white/[0.06] to-transparent ring-1 ring-primary/10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tighter">Create Organization</h2>
                        <p className="text-text-dim mb-10 leading-relaxed">Start building on a bulletproof foundation.</p>
                        
                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-text-dim px-1">Organization Name</label>
                                <input 
                                    className="input-field py-4 focus:ring-4 focus:ring-primary/10" 
                                    placeholder="Acme Corporation" 
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-text-dim px-1">Owner Email</label>
                                <input 
                                    className="input-field py-4 focus:ring-4 focus:ring-primary/10" 
                                    type="email" 
                                    placeholder="admin@acme.com" 
                                    value={ownerEmail}
                                    onChange={(e) => setOwnerEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="py-4 flex justify-center bg-black/10 rounded-xl border border-white/5">
                                <Turnstile 
                                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                                    onSuccess={(token) => setCaptchaToken(token)}
                                />
                            </div>
                            <button 
                                className="btn-primary w-full py-5 text-lg group relative overflow-hidden" 
                                disabled={isLoading || !captchaToken}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  {isLoading ? 'Provisioning Infra...' : 'Provision Dedicated Database'}
                                  {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </span>
                                {isLoading && <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="py-16 border-t border-white/5 text-center text-text-dim text-sm mt-32">
                <p>&copy; 2026 Isolr Engine. Mechanical Reliability and Mathematical Correctness.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
