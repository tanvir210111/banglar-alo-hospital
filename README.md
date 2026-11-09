# 🏥 Banglar Alo Hospital & Research Center

Full-stack modern Hospital Management & Patient Appointment Booking System.

---

## 📁 Project Architecture

```text
Hospital/
├── main-website/               # Patient Portal (Doctor appointments, departments, emergency, ambulance)
│   └── client/                 # React (Vite) + Tailwind CSS Frontend
│
├── admin-panel/                # Hospital Admin & Staff Management System
│   ├── client/                 # React (Vite) + Material UI (MUI) Dashboard
│   └── server/                 # Express.js + Unified API Server (Syncs doctors, patients, appointments)
│
├── package.json                # Root automation scripts
└── README.md                   # Documentation
```

---

## 🚀 Quick Start (Root Commands)

Run any service directly from the root `Hospital/` directory:

| Action | Command | URL |
| :--- | :--- | :--- |
| **Run All Services** | `npm run dev` | Everything together |
| **Patient Website** | `npm run dev:website` | http://localhost:5173 |
| **Admin Panel** | `npm run dev:admin` | http://localhost:5174 |
| **Backend API Server** | `npm run dev:server` | http://localhost:5000 |
| **Build Patient Website** | `npm run build:website` | Production build |
| **Build Admin Panel** | `npm run build:admin` | Production build |

---

## 🌟 Key Features

- **Banglar Alo Hospital Branding:** Fully custom logo, custom favicon, and responsive cinematic hospital hero banner.
- **24/7 Multi-Service Portals:**
  - Emergency & Trauma Unit with direct hotline (`10678`).
  - Specialized 24/7 Ambulance dispatch request & tracking.
  - Multi-specialty clinical departments (Cardiology, Gynecology, Pediatrics, Neurology, Gastroenterology, Dermatology).
- **Full-Stack Data Synchronization:**
  - Adding or approving a doctor in Admin Panel instantly updates the Patient Website.
  - Patient bookings on Main Website reflect live in Admin Panel appointments.
  - Appointment cancellations update status across both platforms.
- **Location:** Puran Paltan, Dhaka, Bangladesh.
