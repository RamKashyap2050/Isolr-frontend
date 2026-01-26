import axios from 'axios';

const api = axios.create({
    // Use PROD URL if built for production, otherwise fallback to local URL
    baseURL: import.meta.env.PROD 
        ? import.meta.env.VITE_API_PROD_URL 
        : (import.meta.env.VITE_API_URL || 'http://localhost:5001'),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
