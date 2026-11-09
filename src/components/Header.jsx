import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='relative overflow-hidden rounded-2xl bg-[#071328] border border-blue-900/40 shadow-2xl my-4'>
        
        {/* =========================================
            DESKTOP BACKGROUND (md and above)
            ========================================= */}
        <div className='hidden md:block absolute inset-0 w-full h-full pointer-events-none'>
            {/* Ultra-wide hospital picture with building on the right and open sky on the left */}
            <img 
                className='w-full h-full object-cover object-right' 
                src={assets.header_hospital} 
                alt='Banglar Alo Hospital' 
            />
            {/* Soft navy blue gradient overlay on the left for crisp text contrast */}
            <div className='absolute inset-y-0 left-0 bg-gradient-to-r from-[#071328] via-[#071328]/90 sm:via-[#071328]/75 md:via-[#071328]/40 to-transparent w-full md:w-3/5 lg:w-[50%] z-10'></div>
        </div>

        {/* =========================================
            MOBILE LAYOUT (below md screen)
            Zero clutter, clear text & full hospital view
            ========================================= */}
        <div className='flex flex-col md:hidden'>
            
            {/* Top Text & CTA Section */}
            <div className='px-5 sm:px-8 pt-7 pb-4 flex flex-col gap-3.5 items-start'>
                <div className='inline-flex items-center gap-2 bg-blue-950/80 border border-sky-400/40 text-sky-200 text-xs px-3.5 py-1.5 rounded-full font-medium shadow-md'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
                    🏥 Banglar Alo Hospital & Research Center
                </div>

                <h1 className='text-2xl sm:text-3xl text-white font-extrabold leading-tight tracking-tight'>
                    Banglar Alo Hospital <br/>
                    <span className='text-sky-300 font-semibold text-lg sm:text-xl'>
                        Book Appointment With Trusted Doctors
                    </span>
                </h1>

                <p className='text-sky-100/90 text-xs sm:text-sm font-light leading-relaxed'>
                    Bringing light to healthcare. Browse verified specialist doctors, check real-time availability, and schedule your appointment hassle-free.
                </p>

                <div className='pt-1'>
                    <a 
                        className='inline-flex items-center gap-2 bg-white px-7 py-3 rounded-full text-[#071328] text-xs sm:text-sm font-bold hover:bg-sky-50 shadow-xl' 
                        href='#speciality'
                    >
                        Book Appointment <img className='w-3' src={assets.arrow_icon} alt='' />
                    </a>
                </div>
            </div>

            {/* Hospital Building Image on Mobile (proper aspect ratio, fully visible) */}
            <div className='relative w-full h-52 sm:h-64 my-1 overflow-hidden px-4'>
                <div className='relative w-full h-full rounded-xl overflow-hidden border border-blue-900/60 shadow-inner'>
                    {/* Top and bottom soft gradient vignettes */}
                    <div className='absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#071328]/80 to-transparent z-10'></div>
                    <div className='absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#071328]/80 to-transparent z-10'></div>
                    <img 
                        className='w-full h-full object-cover object-right' 
                        src={assets.header_hospital} 
                        alt='Banglar Alo Hospital Building' 
                    />
                </div>
            </div>

            {/* Mobile Bottom Info Bar */}
            <div className='px-5 sm:px-8 pb-5 pt-2 flex flex-col gap-1 text-xs text-sky-200/90 font-medium'>
                <div className='flex items-center gap-2 flex-wrap'>
                    <span className='flex items-center gap-1.5'>
                        <span className='w-2 h-2 rounded-full bg-emerald-400'></span>
                        24/7 Emergency & ICU
                    </span>
                    <span className='text-sky-400'>•</span>
                    <span>Puran Paltan, Dhaka</span>
                </div>
                <div className='text-sky-300/80 text-[11px]'>
                    Hotline: +880 1711-000000
                </div>
            </div>

        </div>

        {/* =========================================
            DESKTOP CONTENT (md and above)
            ========================================= */}
        <div className='hidden md:flex relative z-20 w-full md:w-3/5 lg:w-[50%] px-10 md:px-12 py-12 lg:py-16 flex-col gap-4 items-start min-h-[460px] md:min-h-[520px] lg:min-h-[540px] justify-center'>
            
            <div className='inline-flex items-center gap-2 bg-blue-950/80 border border-sky-400/40 text-sky-200 text-xs sm:text-sm px-4 py-1.5 rounded-full font-medium shadow-md backdrop-blur-md'>
                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
                🏥 Banglar Alo Hospital & Research Center
            </div>

            <h1 className='text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold leading-tight tracking-tight drop-shadow-md'>
                Banglar Alo Hospital <br/>
                <span className='text-sky-300 font-semibold text-2xl sm:text-3xl lg:text-4xl'>
                    Book Appointment With Trusted Doctors
                </span>
            </h1>    

            <div className='flex items-center gap-3 text-sky-100/90 text-sm font-light mt-1 max-w-xl'>
                <p className='leading-relaxed'>
                    Bringing light to healthcare. Browse verified specialist doctors,<br />
                    check real-time availability, and schedule your appointment hassle-free.
                </p>
            </div>

            <div className='flex items-center gap-4 mt-3'>
                <a 
                    className='flex items-center gap-2 bg-white px-8 py-3.5 rounded-full text-[#071328] text-sm font-bold hover:bg-sky-50 hover:scale-105 transition-all duration-300 shadow-xl' 
                    href='#speciality'
                >
                    Book Appointment <img className='w-3' src={assets.arrow_icon} alt='' />
                </a>
            </div>

            <div className='flex items-center gap-4 text-xs text-sky-200/80 mt-2 font-medium flex-wrap'>
                <span className='flex items-center gap-1.5'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400'></span>
                    24/7 Emergency & ICU
                </span>
                <span>• Puran Paltan, Dhaka</span>
                <span>• Hotline: +880 1711-000000</span>
            </div>

        </div>

    </div>
  )
}

export default Header
