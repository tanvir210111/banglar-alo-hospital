import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1.5fr_1.5fr] gap-14 my-10 mt-40 text-sm'>

            {/* Left side */}
            <div>
                <img className='mb-4 w-48' src={assets.logo} alt="Banglar Alo Hospital" />
                <p className='w-full md:w-4/5 text-gray-600 leading-6'>
                    Banglar Alo Hospital & Research Center is dedicated to accessible, compassionate, and specialized 24/7 medical care with modern clinical excellence in Puran Paltan, Dhaka.
                </p>
            </div>

            {/* Center section */}
            <div>
                <p className='text-base font-bold mb-4 text-gray-800'>QUICK LINKS</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li><Link to='/' onClick={()=>scrollTo(0,0)} className='hover:text-primary'>Home</Link></li>
                    <li><Link to='/departments' onClick={()=>scrollTo(0,0)} className='hover:text-primary'>Departments</Link></li>
                    <li><Link to='/doctors' onClick={()=>scrollTo(0,0)} className='hover:text-primary'>All Doctors</Link></li>
                    <li><Link to='/emergency' onClick={()=>scrollTo(0,0)} className='text-red-600 font-medium hover:underline'>24/7 Emergency</Link></li>
                    <li><Link to='/ambulance' onClick={()=>scrollTo(0,0)} className='hover:text-primary'>Ambulance Service</Link></li>
                    <li><Link to='/about' onClick={()=>scrollTo(0,0)} className='hover:text-primary'>About Us</Link></li>
                    <li><Link to='/contact' onClick={()=>scrollTo(0,0)} className='hover:text-primary'>Contact Us</Link></li>
                </ul>
            </div>

            {/* Right side */}
            <div>
                <p className='text-base font-bold mb-4 text-gray-800'>24/7 EMERGENCY & CONTACT</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li className='font-semibold text-red-600'>🚨 Emergency Hotline: 10678</li>
                    <li>📞 Reception: +880 1711-000000</li>
                    <li>🚑 Ambulance: +880 1710-554433</li>
                    <li>📍 Location: Puran Paltan, Dhaka</li>
                    <li>✉️ contact@banglaralo.hospital.bd</li>
                </ul>
            </div>
        </div>

        {/* Copyright text */}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center text-gray-500'>Copyright © 2025 Nazmul(210121) & Tanvir(210111) . All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer
