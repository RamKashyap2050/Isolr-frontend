/**
 * Detects the tenant slug from the hostname.
 * e.g., acme.isolr.ca -> "acme"
 * localhost:5173 -> null
 */
export const getTenantSlug = () => {
    const hostname = window.location.hostname;
    
    // If we're on localhost but NOT using a subdomain (just 'localhost' or '127.0.0.1')
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return null; 
    }

    const hostParts = hostname.split('.');
    
    // Production: tenant.isolr.ca (3 parts: [tenant, isolr, ca])
    if (hostname.endsWith('.isolr.ca')) {
        const slug = hostParts[0];
        if (slug === 'www' || slug === 'isolr') return null;
        return slug;
    }

    // Local Subdomain development: tenant.localhost (2 parts: [tenant, localhost])
    // This part is for users who DO use the hosts file, supporting both worlds.
    if (hostname.endsWith('.localhost') && hostParts.length === 2) {
        return hostParts[0];
    }

    return null;
};

export const getBaseDomain = () => {
    const hostname = window.location.hostname;
    if (hostname.includes('localhost')) return 'localhost:5173';
    return 'isolr.ca';
};
