import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
          <img className='w-full md:max-w-[360px] rounded-lg shadow-sm' src={assets.contact_image} alt="Hospital Reception" />

          <div className='flex flex-col justify-center items-start gap-5'>
              <p className='font-semibold text-lg text-gray-700'>Banglar Alo Hospital & Research Center</p>
              <p className='text-gray-600'>
                Puran Paltan<br/>
                Dhaka, Bangladesh
              </p>
              <p className='text-gray-600'>
                <span className='font-medium text-gray-700'>Emergency Hotline:</span> +880 1711-000000 / +880 2-9660015<br/>
                <span className='font-medium text-gray-700'>Ambulance 24/7:</span> 10678 / +880 1710-554433<br/>
                <span className='font-medium text-gray-700'>Email:</span> contact@banglaralo.hospital.bd / tanvir210111@diit.edu.bd
              </p>
              <div className='pt-2'>
                <p className='font-semibold text-base text-gray-700'>Visiting & OPD Hours</p>
                <p className='text-gray-500 mt-1'>
                  Saturday - Thursday: 08:00 AM - 10:00 PM<br/>
                  Emergency & Trauma Center: 24 Hours Open (Daily)
                </p>
              </div>
          </div>

      </div>
    </div>
  )
}

export default Contact
