# 🛡️ ISOLR: Isolation-First Multi-Tenancy

**"Mechanical Isolation. Zero Leakage. Zero Ceremony."**

Isolr is a professional-grade multi-tenant foundation built on the philosophy of **Physical Data Isolation**. Unlike traditional "Soft Multi-tenancy" which relies on fragile `where tenant_id = ?` clauses, Isolr provisions **dedicated physical databases** for every customer from Day 1.

---

## 🚀 The Core Philosophy

Most startups fail at multi-tenancy because they share one giant table for all customers. **Isolr is different.** We optimize for the "Physics of Trust":

-   **Zero Cross-Tenant Leaks**: It is physically impossible to query another customer's data because they live in separate database instances/schemas.
-   **Noisy Neighbor Protection**: Large data operations for one tenant don't starve the resources of another.
-   **Enterprise Ready**: Meet the strictest security compliance requirements by offering physical data residency.
-   **Flexible Scaling**: Move "Unicorn" tenants to dedicated database clusters without affecting the rest of the fleet.

---

## 🛠️ Tech Stack

-   **Frontend**: React 19 + Vite + Tailwind CSS
-   **Routing**: React Router v6 (Hybrid Strategy)
-   **Icons**: Lucide React
-   **API**: Axios with centralized resolution
-   **Security**: Cloudflare Turnstile Captcha + Strict Middleware

---

## ⚡ Hybrid Routing Architecture

Isolr uses a sophisticated "Multi-Mode" routing strategy to balance developer experience with production scalability:

### 1. Development Mode (Path-Based)
Skip the `hosts` file headache. Developers can access tenant dashboards via standard paths:
`http://localhost:5173/t/acme-123`

### 2. Production Mode (Subdomain-Based)
Clean, professional white-labeling for your customers:
`https://acme-123.isolr.ca`

The app automatically detects the environment and switches logic without any code changes required.

---

## 🏁 Getting Started

### 1. Prerequisites
- Node.js 18+
- Backend running locally (usually on port 5001)

### 2. Setup Environment
Create a `.env` file in the root:
```env
VITE_API_URL=http://localhost:5001
VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA # Use testing key for local dev
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 📂 Project Structure

-   `src/App.jsx`: The core switcher logic that decides between Landing Page and Tenant Context.
-   `src/utils/tenant.js`: The "brain" of the subdomain detection system.
-   `src/pages/LandingPage.jsx`: High-converting landing page with bot protection.
-   `src/pages/Dashboard.jsx`: The isolated data plane for specific tenants.
-   `src/pages/docs/`: Comprehensive guides for Migration, Scaling, and Observability.

---

## 🛡️ Security

We implement **Cloudflare Turnstile** to ensure that organization provisioning is protected against automated bot attacks. The frontend integrates seamlessly with the backend's `captchaMiddleware` to verify every signup.

---

## 📈 Scalability Roadmap

Isolr is built to handle the transition from your first 10 customers to your first 10,000.
1.  **Shared Cluster**: Multiple tenant DBs on one large MongoDB cluster.
2.  **Schema Splitting**: Moving active tenants to dedicated clusters.
3.  **Regional Sharding**: Pinning tenant databases to specific geographic regions for latency and legal compliance.

---

*Build on a bulletproof foundation. Built with Isolr.*
