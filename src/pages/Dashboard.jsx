import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, CheckCircle, Database, AlertCircle, FileText } from 'lucide-react';
import api from '../utils/api';

const Dashboard = ({ tenantId: propTenantId }) => {
    const { tenantId: pathTenantId } = useParams();
    const tenantId = propTenantId || pathTenantId;
    
    const [status, setStatus] = useState('loading');
    const [health, setHealth] = useState(null);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const checkHealth = async () => {
            if (!tenantId) {
                setStatus('error');
                return;
            }
            try {
                const response = await api.get(`/t/${tenantId}/health`);
                setHealth(response.data);
                setStatus('active');
            } catch (error) {
                console.error('Health check failed', error);
                setStatus('error');
            }
        };

        checkHealth();
    }, [tenantId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setUploadStatus(null);

        const formData = new FormData();
        formData.append('csv', file);

        try {
            const response = await api.post(`/t/${tenantId}/import/csv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus({ type: 'success', message: `Imported ${response.data.count} users successfully.` });
            setFile(null);
        } catch (error) {
            console.error('Upload failed', error);
            setUploadStatus({ type: 'error', message: 'Failed to import CSV. Ensure the format is correct.' });
        } finally {
            setIsUploading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="container min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="gradient-text text-xl font-bold tracking-tight">Resolving Tenant Context...</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="container min-h-screen flex items-center justify-center">
                <div className="glass-card p-12 text-center max-w-lg w-full ring-1 ring-red-500/20">
                    <div className="bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <AlertCircle color="#ef4444" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Tenant Path Invalid</h2>
                    <p className="text-text-dim mb-8 leading-relaxed">We couldn't resolve this organization's data plane. Please verify the URL or your subdomain configuration.</p>
                    <button onClick={() => window.location.href = '/'} className="btn-secondary w-full py-4">Back to Safety</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-bg text-text">
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

            {/* Sidebar */}
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
                    <div className="px-4 py-3 bg-primary/10 text-primary rounded-xl font-bold shadow-sm ring-1 ring-primary/20 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        Data Plane
                    </div>
                    <div className="px-4 py-3 text-text-dim hover:bg-white/5 rounded-xl transition-colors cursor-not-allowed flex items-center gap-3 opacity-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        User Fleet
                    </div>
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

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-hidden">
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 lg:mb-20">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter text-white">Console Control</h1>
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

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                    {/* CSV Upload Card */}
                    <div className="xl:col-span-3 glass-card p-8 md:p-12 border-primary/10 shadow-2xl shadow-primary/5">
                        <div className="mb-10">
                            <h3 className="text-2xl font-black mb-2 flex items-center gap-3 tracking-tight">
                                <Upload className="text-primary" size={24} />
                                Multi-Tenant Ingest
                            </h3>
                            <p className="text-text-dim leading-relaxed">Asynchronously provision user data directly into your isolated MongoDB schema.</p>
                        </div>

                        <form onSubmit={handleUpload}>
                            <div 
                                className={`
                                    border-2 border-dashed rounded-2xl p-12 text-center mb-8 transition-all duration-300
                                    ${file ? 'bg-primary/5 border-primary/40 ring-4 ring-primary/5' : 'bg-black/20 border-white/10 hover:border-white/20'}
                                `}
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <input 
                                    id="fileInput"
                                    type="file" 
                                    accept=".csv"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {file ? (
                                    <div className="flex flex-col items-center gap-4 py-4 animate-in fade-in zoom-in duration-300">
                                        <div className="bg-primary/20 p-4 rounded-2xl">
                                          <FileText size={48} className="text-primary" />
                                        </div>
                                        <div>
                                          <p className="font-bold text-lg">{file.name}</p>
                                          <p className="text-xs text-text-dim mt-1 uppercase tracking-widest font-black">{(file.size / 1024).toFixed(2)} KB DATA PACK</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4 py-4 opacity-60 group cursor-pointer">
                                        <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-white/10 transition-colors">
                                          <Upload size={48} className="text-text-dim" />
                                        </div>
                                        <div>
                                          <p className="font-bold text-lg">Drop Tenant CSV</p>
                                          <p className="text-xs text-text-dim mt-1 uppercase tracking-widest">Supports .csv up to 50MB</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {uploadStatus && (
                                <div className={`
                                    p-5 rounded-xl mb-8 flex items-center gap-4 animate-in slide-in-from-top-4 duration-300
                                    ${uploadStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}
                                `}>
                                    {uploadStatus.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                                    <span className="font-bold text-sm tracking-tight">{uploadStatus.message}</span>
                                </div>
                            )}

                            <button 
                                className="btn-primary w-full py-5 text-lg font-black tracking-tight flex items-center justify-center gap-2 group disabled:grayscale-[0.5] disabled:opacity-50" 
                                disabled={!file || isUploading}
                            >
                                {isUploading ? (
                                  <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    Ingesting Payload...
                                  </>
                                ) : (
                                  <>
                                    Initialize Batch Import
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                  </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Info Card */}
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
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
              <div 
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
              />
            )}
        </div>
    );
};

export default Dashboard;
