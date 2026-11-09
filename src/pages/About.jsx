import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img src={assets.about_image}  className='w-full md:max-w-[360px]'></img>

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Welcome to <b className='text-gray-800 font-semibold'>Banglar Alo Hospital & Research Center</b>, your trusted medical healthcare partner in Dhaka, dedicated to providing compassionate clinical treatments and seamless doctor appointment scheduling.</p>
        <p>Banglar Alo Hospital is committed to clinical excellence, modern medical diagnostics, and round-the-clock emergency care. With specialized departments including Cardiology, Gynecology, Neurology, Pediatrics, Orthopedics, and Dermatology, our senior consultants and nursing teams are here to support your family every step of the way.</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Our vision at Banglar Alo Hospital is to deliver accessible, ethical, and high-quality healthcare to every patient through advanced medical expertise, compassionate attention, and cutting-edge digital hospital management.</p>
        </div>
      </div>

    <div className='text-xl my-4'>
      <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
    </div>

    <div className='flex flex-col md:flex-row mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white duration-300 text-gray-600 cursor-pointer'>
        <b>Efficiency:</b>
        <p>Streamlined appointment scheduling that fits into your busy lifestyle. </p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white duration-300 text-gray-600 cursor-pointer'>
        <b>Convenience:</b>
        <p>Access to a network of trusted healthcare professionals in your area. </p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white duration-300 text-gray-600 cursor-pointer'>
        <b>Personalization:</b>
        <p>Tailored recommendations and reminders to help you stay on top of your health. </p>
      </div>
    </div>

    </div>
  )
}

export default About