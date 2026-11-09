import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { doctors as defaultDoctors } from '../assets/assets';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';
  
  const [doctors, setDoctors] = useState(defaultDoctors);
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [userData, setUserData] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState({
    hospitalName: "Banglar Alo Hospital & Research Center",
    tagline: "Smart Care, Modern Medicine & Dedicated Healthcare",
    location: "House 24, Road 7, Panthapath / Dhanmondi, Dhaka-1205, Bangladesh",
    emergency_hotline: "+880 1711-000000 / +880 2-9660015",
    ambulance_service: "10678 / +880 1710-554433",
    email: "contact@banglaralo.hospital.bd"
  });

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      if (data && data.success && Array.isArray(data.doctors) && data.doctors.length > 0) {
        setDoctors(data.doctors);
      } else {
        setDoctors(defaultDoctors);
      }
    } catch (error) {
      console.log("Connecting to fallback doctors:", error.message);
      setDoctors(defaultDoctors);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // Fallback mock profile so user session persists seamlessly
      setUserData({
        name: "Hospital Patient",
        email: "patient@hospital.bd",
        phone: "+880 1711-000000",
        address: { line1: "House 14, Road 4, Dhanmondi", line2: "Dhaka-1205" },
        gender: "Male",
        dob: "1994-06-15",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
      });
    }
  };

  const getHospitalInfo = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/hospital/overview');
      if (data) {
        setHospitalInfo(data);
      }
    } catch (e) {
      // Keep initial hospital info
    }
  };

  useEffect(() => {
    getDoctorsData();
    getHospitalInfo();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    getDoctorsData,
    backendUrl,
    adminUrl,
    userData,
    setUserData,
    loadUserProfileData,
    hospitalInfo
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
