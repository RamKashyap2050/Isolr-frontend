import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export const useDashboardLogic = (propTenantId) => {
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

    return {
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
    };
};
