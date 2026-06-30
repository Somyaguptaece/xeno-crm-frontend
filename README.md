<div align="center">

# 🎨 Xeno CRM — Frontend

### *AI-Powered CRM Platform · Built with React 19 + Vite + Tailwind CSS*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Client-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://xeno-crm-frontend-lovat.vercel.app)

<br/>

> 🚀 A sleek, real-time CRM dashboard that lets marketers **create AI-powered campaigns**, **segment audiences**, **track live delivery**, and **export reports** — all from a single beautiful interface.

**[🌐 Live Demo →](https://xeno-crm-frontend-lovat.vercel.app)**

</div>

---

## ✨ What's Inside

| Feature | Tech Used |
|---|---|
| ⚡ Lightning-fast dev & build | **Vite 8** with HMR |
| 🎨 Utility-first styling | **Tailwind CSS v4** |
| 📊 Interactive charts & analytics | **Recharts** |
| 🔴 Live campaign delivery updates | **Socket.io Client** |
| 🧭 Client-side routing | **React Router v7** |
| 🔔 Beautiful toast notifications | **React Hot Toast** |
| 📄 Export reports to PDF | **jsPDF** |
| 🖼️ Rich icon library | **Lucide React + React Icons** |
| 🌐 API communication | **Axios** |

---

## 🖥️ Pages & Features

### 🔐 Authentication
- Login & Register with JWT-based auth
- Protected routes — unauthenticated users redirected automatically

### 📋 Dashboard
- At-a-glance overview of customers, campaigns, and delivery stats
- Live charts powered by **Recharts**
- Real-time updates via **Socket.io**

### 👥 Customer Management
- View, add, and manage customer records
- Search and filter customers

### 🎯 Audience Segmentation
- Create rule-based segments (by spend, activity, behavior)
- Preview audience size before launching a campaign

### 📣 Campaign Management
- Create campaigns with AI-generated message suggestions
- Track campaign status: **Queued → Processing → Delivered → Failed**
- Live delivery receipt feed (real-time via WebSocket)

### 📊 Analytics
- Campaign performance charts
- Delivery success/failure breakdown
- Export reports as **PDF** with one click

---

## 🗂️ Project Structure

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|---|---|---|
| **UI Library** | React | 19 |
| **Build Tool** | Vite | 8 |
| **Styling** | Tailwind CSS | 4 |
| **Routing** | React Router DOM | 7 |
| **Charts** | Recharts | 3 |
| **Real-time** | Socket.io Client | 4 |
| **HTTP Client** | Axios | 1.17 |
| **PDF Export** | jsPDF | 4 |
| **Notifications** | React Hot Toast | 2 |
| **Icons** | Lucide React + React Icons | latest |
| **Deployment** | Vercel | — |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Backend running → [xeno-crm-backend](https://github.com/Somyaguptaece/xeno-crm-backend)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Somyaguptaece/xeno-crm-frontend.git
cd xeno-crm-frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# → Set your backend API URL
```

### Environment Variables

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Run Locally

```bash
# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

App runs at → **http://localhost:5173**

---

## 🔄 How It Connects to the Backend

---

## 🌐 Deployment

This app is deployed on **Vercel** with SPA routing configured via `vercel.json`.

**Live URL →** [https://xeno-crm-frontend-lovat.vercel.app](https://xeno-crm-frontend-lovat.vercel.app)

To deploy your own:

```bash
npm install -g vercel
vercel --prod
```

---

## 📈 Why This Stack?

**React 19** — The latest React with improved concurrent rendering and the new compiler-ready architecture.

**Vite 8** — Insanely fast HMR in dev and optimized ESM bundles in production. No webpack slowdowns.

**Tailwind CSS v4** — Utility-first styling with zero dead CSS in production builds.

**Recharts** — Composable, declarative chart components built on top of SVG — perfect for campaign analytics.

**Socket.io Client** — Makes real-time delivery tracking feel instant and seamless.

---

## 👩‍💻 Author

**Somya Gupta**

[![GitHub](https://img.shields.io/badge/GitHub-Somyaguptaece-181717?style=flat-square&logo=github)](https://github.com/Somyaguptaece)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=flat-square&logo=vercel)](https://xeno-crm-frontend-lovat.vercel.app)

---

<div align="center">

*Built with ❤️ — where every pixel serves a purpose*

</div>
