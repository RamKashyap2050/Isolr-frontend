import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useDashboardLogic } from '../LogicHandler/DashboardHandlers';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CsvUpload from '../components/dashboard/CsvUpload';
import InfraInfo from '../components/dashboard/InfraInfo';

const Dashboard = ({ tenantId: propTenantId }) => {
    const {
        tenantId,
        status,
        health,
        file,
        isUploading,
        uploadStatus,
        isSidebarOpen,
        setIsSidebarOpen,
        handleFileChange,
        handleUpload
    } = useDashboardLogic(propTenantId);

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
            <Sidebar isSidebarOpen={isSidebarOpen} />

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-hidden">
                <DashboardHeader 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                    health={health} 
                    tenantId={tenantId} 
                />

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                    <CsvUpload 
                        file={file}
                        handleFileChange={handleFileChange}
                        handleUpload={handleUpload}
                        isUploading={isUploading}
                        uploadStatus={uploadStatus}
                    />

                    <InfraInfo health={health} />
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
