# 🏥 Banglar Alo Hospital & Research Center

Full-stack modern Hospital Management & Patient Appointment Booking System.

---

## 📁 Project Architecture (Single Unified App)

```text
Hospital/
├── public/                 # Favicon, assets, logos
├── src/
│   ├── assets/             # Branding icons, images
│   ├── components/         # Patient website components (Navbar, Header, Footer, Banner)
│   ├── pages/              # Patient pages (Home, Departments, Doctors, Emergency, Ambulance, Contact, About)
│   ├── admin/              # Complete Hospital Admin & Staff Management System (/admin)
│   │   ├── Pages/          # Dashboard, Doctors, Patients, Appointments, Staffs
│   │   └── utils/          # Admin helpers & visual assets
│   ├── context/            # Global AppContext
│   ├── App.jsx             # Unified React Router (/ for patient website, /admin for admin panel)
│   ├── index.css           # Global & Tailwind styling
│   └── main.jsx            # Unified React 18 entry point
├── server/                 # Express.js backend API & JSON database (Doctors, Patients, Appointments)
├── package.json            # Single root package.json for the entire project
├── vite.config.js          # Root Vite build & dev config
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel SPA routing
└── .vercelignore           # Excludes backend from frontend build
```

---

## 🚀 Quick Start (Local Run)

Run both the frontend and backend together with a single command:

```bash
npm run dev
```

| Portal | URL | Description |
| :--- | :--- | :--- |
| **Main Patient Website** | [http://localhost:5173/](http://localhost:5173/) | Patient appointment booking, emergency & ambulance |
| **Admin Panel** | [http://localhost:5173/admin](http://localhost:5173/admin) | Hospital admin & doctors management |
| **Backend API Server** | [http://localhost:5000/](http://localhost:5000/) | Unified REST API & data sync |

---

## ⚡ 1-Click Deploy on Vercel

There are **NO subdirectories to choose from**! Everything is in a single root project:

1. Go to **[vercel.com](https://vercel.com/)** and click **Add New Project**.
2. Select your repository: `tanvir210111/banglar-alo-hospital`.
3. Vercel will automatically detect **Vite** at root (`./`).
4. Click **Deploy**! ✅ That's it!

Once deployed:
- `https://your-domain.vercel.app/` ➡️ Main Patient Website
- `https://your-domain.vercel.app/admin` ➡️ Admin Dashboard
- `https://your-domain.vercel.app/departments` ➡️ Medical Departments
- `https://your-domain.vercel.app/emergency` ➡️ 24/7 Emergency & ICU
- `https://your-domain.vercel.app/ambulance` ➡️ Ambulance Dispatch
