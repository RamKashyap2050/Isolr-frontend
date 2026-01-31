import React from 'react';
import { useUserFleetLogic } from '../LogicHandler/UserFleetHandlers';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import UserList from '../components/dashboard/UserList';

const UserFleet = () => {
    const {
        tenantId,
        users,
        loading,
        error,
        health,
        isSidebarOpen,
        setIsSidebarOpen
    } = useUserFleetLogic();

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
                    title="User Fleet"
                />

                <div className="w-full">
                    <UserList users={users} loading={loading} error={error} />
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

export default UserFleet;
