import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export const useUserFleetLogic = (propTenantId) => {
    const { tenantId: pathTenantId } = useParams();
    const tenantId = propTenantId || pathTenantId;
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [health, setHealth] = useState(null); // Keep health for header info if needed
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!tenantId) {
                setError('No tenant ID provided');
                setLoading(false);
                return;
            }

            try {
                // Fetch users
                // Note: Assuming endpoint /t/:tenantId/users exists or similar. 
                // Based on previous dashboard upload, it was /t/:tenantId/import/csv
                // Standard REST convention would suggest GET /t/:tenantId/users
                const userResponse = await api.get(`/t/${tenantId}/getUsers`);
                setUsers(userResponse.data);
                
                // Also fetch health/info for the header context
                const healthResponse = await api.get(`/t/${tenantId}/health`);
                setHealth(healthResponse.data);

                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch user fleet', err);
                setError('Failed to load user fleet.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [tenantId]);

    return {
        tenantId,
        users,
        loading,
        error,
        health,
        isSidebarOpen,
        setIsSidebarOpen
    };
};
