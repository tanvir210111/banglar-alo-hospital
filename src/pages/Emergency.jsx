import React from 'react'
import { useNavigate } from 'react-router-dom'

const Emergency = () => {
  const navigate = useNavigate()

  return (
    <div className='my-8'>
      
      {/* Alert Banner */}
      <div className='bg-red-500 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='flex items-center gap-4'>
          <div className='w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl animate-bounce'>
            🚨
          </div>
          <div>
            <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit mb-1'>
              <span className='w-2 h-2 rounded-full bg-yellow-300 animate-ping'></span>
              24/7 Rapid Emergency Response
            </div>
            <h1 className='text-2xl sm:text-3xl font-extrabold'>Banglar Alo Emergency & Trauma Center</h1>
            <p className='text-red-100 text-sm mt-1'>
              Immediate medical intervention, ICU/CCU admission, and emergency surgeries.
            </p>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto'>
          <a 
            href='tel:10678'
            className='w-full sm:w-auto text-center bg-white text-red-600 px-6 py-3.5 rounded-full font-black text-lg hover:bg-red-50 transition-all shadow-md flex items-center justify-center gap-2'
          >
            📞 Call 10678
          </a>
          <a 
            href='tel:+8801711000000'
            className='w-full sm:w-auto text-center bg-red-700/80 border border-white/40 text-white px-5 py-3.5 rounded-full font-bold text-sm hover:bg-red-700 transition-all'
          >
            +880 1711-000000
          </a>
        </div>
      </div>

      {/* Emergency Units Overview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
        
        <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-3xl mb-3'>🏥</div>
          <h3 className='text-lg font-bold text-gray-800 mb-2'>Accident & Trauma Care</h3>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Fully equipped trauma operating theaters with senior orthopedic, neuro, and general surgeons available on immediate call.
          </p>
          <ul className='text-xs text-gray-500 mt-4 space-y-1.5'>
            <li>✓ Immediate blood bank access</li>
            <li>✓ 24/7 Digital X-Ray, CT Scan & Ultrasound</li>
            <li>✓ Dedicated resuscitation bay</li>
          </ul>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-3xl mb-3'>🫀</div>
          <h3 className='text-lg font-bold text-gray-800 mb-2'>Cardiac & Stroke Emergency</h3>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Rapid thrombolytic protocols and cath-lab activation for acute myocardial infarction (heart attack) and brain stroke.
          </p>
          <ul className='text-xs text-gray-500 mt-4 space-y-1.5'>
            <li>✓ 24/7 Interventional Cardiologist on duty</li>
            <li>✓ Rapid ECG & Cardiac Enzymes within 10 min</li>
            <li>✓ Direct ICU / CCU bed assignment</li>
          </ul>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-3xl mb-3'>🩺</div>
          <h3 className='text-lg font-bold text-gray-800 mb-2'>Pediatric & Neonatal Emergency</h3>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Specialized pediatric emergency unit with pediatric ventilators, incubators, and NICU/PICU intensivists.
          </p>
          <ul className='text-xs text-gray-500 mt-4 space-y-1.5'>
            <li>✓ Specialized child triage & pediatricians</li>
            <li>✓ Level-3 NICU with advanced life support</li>
            <li>✓ Dedicated sterile neonatal isolation room</li>
          </ul>
        </div>

      </div>

      {/* Hospital Location & Direct Contact */}
      <div className='bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div>
          <h3 className='text-xl font-bold text-gray-800'>Emergency Location</h3>
          <p className='text-gray-600 text-sm mt-1'>
            📍 Ground Floor, Emergency Entrance, Banglar Alo Hospital, Puran Paltan, Dhaka.
          </p>
          <p className='text-xs text-emerald-600 font-semibold mt-1'>
            ● Ambulance and emergency drive-through open 24 hours daily (No prior registration needed for critical patients)
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button 
            onClick={() => {
              navigate('/contact')
              window.scrollTo(0, 0)
            }}
            className='bg-gray-800 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-black transition-all'
          >
            View Map & Directions
          </button>
        </div>
      </div>

    </div>
  )
}

export default Emergency

