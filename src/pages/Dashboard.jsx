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
            // Note: The backend needs to have this endpoint implemented
            // POST /t/:tenantId/import/csv
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
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <p className="gradient-text" style={{ fontSize: '1.5rem' }}>Resolving Tenant Context...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <AlertCircle color="#ef4444" size={48} style={{ marginBottom: '1rem' }} />
                    <h2>Tenant Not Found</h2>
                    <p style={{ color: 'var(--text-dim)' }}>We couldn't resolve this organization. Check your domain or URL.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', padding: '2rem' }}>
                <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Database color="var(--primary)" />
                    <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>ISOLR</span>
                </div>
                
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '0.5rem', fontWeight: '600' }}>
                        Dashboard
                    </div>
                    <div style={{ padding: '0.75rem 1rem', color: 'var(--text-dim)', cursor: 'not-allowed' }}>Users</div>
                    <div style={{ padding: '0.75rem 1rem', color: 'var(--text-dim)', cursor: 'not-allowed' }}>Settings</div>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                            <span>Connected to: <strong>{health?.db || 'tenant_db'}</strong></span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="glass-card" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            {tenantId}
                        </div>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* CSV Upload Card */}
                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Import Users</h3>
                            <p style={{ color: 'var(--text-dim)' }}>Drop a CSV file to provision users into your database.</p>
                        </div>

                        <form onSubmit={handleUpload}>
                            <div 
                                style={{ 
                                    border: '2px dashed var(--border)', 
                                    borderRadius: '1rem', 
                                    padding: '3rem 2rem', 
                                    textAlign: 'center',
                                    marginBottom: '2rem',
                                    cursor: 'pointer',
                                    background: file ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                                    borderColor: file ? 'var(--primary)' : 'var(--border)'
                                }}
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <input 
                                    id="fileInput"
                                    type="file" 
                                    accept=".csv"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {file ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <FileText size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                                        <p style={{ fontWeight: '600' }}>{file.name}</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
                                        <p style={{ fontWeight: '600' }}>Click to select or drag CSV</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>Only .csv files are supported</p>
                                    </>
                                )}
                            </div>

                            {uploadStatus && (
                                <div style={{ 
                                    padding: '1rem', 
                                    borderRadius: '0.5rem', 
                                    marginBottom: '2rem',
                                    background: uploadStatus.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: uploadStatus.type === 'success' ? '#10b981' : '#ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {uploadStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                    <span>{uploadStatus.message}</span>
                                </div>
                            )}

                            <button 
                                className="btn-primary" 
                                style={{ width: '100%' }} 
                                disabled={!file || isUploading}
                            >
                                {isUploading ? 'Importing...' : 'Start Import'}
                            </button>
                        </form>
                    </div>

                    {/* Info Card */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Database size={18} color="var(--primary)" />
                                Data Plane Stats
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-dim)' }}>Database Name</span>
                                    <span>{health?.db || '...'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-dim)' }}>Collections</span>
                                    <span>{health?.collections || '0'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-dim)' }}>Region</span>
                                    <span>Global (Standard)</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Developer Insights</h4>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                                This dashboard is interacting with your dedicated data plane. 
                                Isolation is enforced at the network level via the <code>tenantContextMiddleware</code>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
