import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Banner = () => {

  const navigate = useNavigate()
  return (
    <div className='flex bg-gradient-to-r from-[#071328] via-[#0d2348] to-[#123163] rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-xl border border-blue-900/40'>
      {/* Left side */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white leading-tight'>
            <p>Book Appointment</p>
            <p className='mt-3 text-sky-200'>With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate(`/login`);scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-[#0a192f] font-semibold px-8 py-3 rounded-full mt-6 hover:bg-sky-50 hover:scale-105 transition-all shadow-md'>Create Account</button>
      </div>

      {/* Right side */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative '>
            <img className='w-full  absolute bottom-0 right-0 max-w-md' src= {assets.appointment_img}></img>
        </div>

    </div>
  )
}

export default Banner