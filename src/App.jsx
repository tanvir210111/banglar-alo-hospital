import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Patient Website Components & Pages
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PaymentSuccess from './components/Payment-Success'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppoinments from './pages/MyAppoinments'
import Appoinment from './pages/Appoinment'
import Departments from './pages/Departments'
import Emergency from './pages/Emergency'
import Ambulance from './pages/Ambulance'

// Admin Panel Dashboard & Pages
import './admin/Admin.css'
import Dashboard from './admin/Pages/Dashboard/Dashboard'
import AdminHome from './admin/Pages/Home/Home/Home'
import PatientViewDoctor from './admin/Pages/Doctors/Doctors/PatientViewDoctor'
import AddDoctor from './admin/Pages/Doctors/AddDoctor/AddDoctor'
import ApproveDoctor from './admin/Pages/Doctors/ApproveDoctor/ApproveDoctor'
import DeleteDoctor from './admin/Pages/Doctors/DeleteDoctor/DeleteDoctor'
import FindDoctor from './admin/Pages/Doctors/UpdateDoctor/FindDoctor'
import Patients from './admin/Pages/Patients/Patients/Patients'
import AddPatient from './admin/Pages/Patients/AddPatients/AddPatient'
import ViewDoctors from './admin/Pages/Patients/ViewDoctors/ViewDoctors'
import PatientDetails from './admin/Pages/Patients/PatientsDetails/PatientDetails'
import Staffs from './admin/Pages/Staffs/Staffs'
import Appointment from './admin/Pages/Appointments/Appointment'
import AdminLogin from './admin/Pages/Login/Login'
import AdminRegistration from './admin/Pages/Login/Registration/Registration'

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className={isAdminRoute ? 'w-full min-h-screen bg-slate-50' : 'mx-4 sm:mx-[10%]'}>
      <ToastContainer />
      
      {/* Patient Website Header (only on patient routes) */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ========================================================
            PATIENT WEBSITE ROUTES (banglaralohospital.vercel.app/)
            ======================================================== */}
        <Route path='/' element={<Home />} />
        <Route path='/departments' element={<Departments />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/emergency' element={<Emergency />} />
        <Route path='/ambulance' element={<Ambulance />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppoinments />} />
        <Route path='/appointment/:docId' element={<Appoinment />} />
        <Route path='/success' element={<PaymentSuccess />} />

        {/* ========================================================
            ADMIN PANEL ROUTES (banglaralohospital.vercel.app/admin)
            ======================================================== */}
        <Route path='/admin' element={<Dashboard />}>
          <Route index element={<AdminHome />} />
          <Route path='doctors' element={<PatientViewDoctor />} />
          <Route path='addDoctor' element={<AddDoctor />} />
          <Route path='approveDoctor' element={<ApproveDoctor />} />
          <Route path='deleteDoctor' element={<DeleteDoctor />} />
          <Route path='updateDoctor' element={<FindDoctor />} />
          <Route path='patients' element={<Patients />} />
          <Route path='addPatient' element={<AddPatient />}>
            <Route path=':email' element={<AddPatient />} />
          </Route>
          <Route path='viewDoctors' element={<ViewDoctors />} />
          <Route path='patientDetails/:id' element={<PatientDetails />} />
          <Route path='staffs' element={<Staffs />} />
          <Route path='appointment' element={<Appointment />}>
            <Route path=':email' element={<Appointment />} />
          </Route>
          <Route path='login' element={<AdminLogin />} />
          <Route path='registration' element={<AdminRegistration />} />
        </Route>
      </Routes>

      {/* Patient Website Footer (only on patient routes) */}
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
