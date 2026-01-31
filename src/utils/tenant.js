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
    
    // Support for isolr.ca (target domain)
    if (hostname.endsWith('.isolr.ca')) {
        // tenant.isolr.ca -> hostParts: ["tenant", "isolr", "ca"]
        if (hostParts.length >= 3) {
            const slug = hostParts[0];
            if (slug === 'www' || slug === 'isolr' || slug === 'api') return null;
            return slug;
        }
    }

    // Support for Vercel deployment subdomains (e.g., tenant.isolr-frontend.vercel.app)
    if (hostname.endsWith('.vercel.app')) {
        // base is isolr-frontend.vercel.app (3 parts)
        // tenant.isolr-frontend.vercel.app (4 parts)
        if (hostParts.length >= 4) {
            const slug = hostParts[0];
            if (slug === 'isolr-frontend') return null;
            return slug;
        }
    }

    // Local Subdomain development: tenant.localhost (2 parts: [tenant, localhost])
    if (hostname.endsWith('.localhost') && hostParts.length === 2) {
        return hostParts[0];
    }

    return null;
};

export const getBaseDomain = () => {
    const hostname = window.location.hostname;
    if (hostname.includes('localhost')) return 'localhost:5173';
    if (hostname.endsWith('.vercel.app')) return 'isolr-frontend.vercel.app';
    return 'isolr.ca';
};
