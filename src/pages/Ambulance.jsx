import React, { useState } from 'react'

const ambulanceTypes = [
  {
    title: 'ICU / Cardiac Ambulance',
    desc: 'Equipped with portable ventilator, defibrillator, multipara cardiac monitor, syringe pump, and emergency medical officer on board.',
    tag: 'Critical Care',
    rate: 'Starting from ৳ 3,500',
    icon: '🚑'
  },
  {
    title: 'AC Life Support Ambulance',
    desc: 'Air-conditioned ambulance equipped with oxygen supply, suction machine, spinal board, stretcher, and trained paramedic.',
    tag: 'Standard Emergency',
    rate: 'Starting from ৳ 2,000',
    icon: '🚐'
  },
  {
    title: 'Neonatal / Pediatric ICU Ambulance',
    desc: 'Specialized neonatal transport incubator, micro-ventilator, and pediatric infusion pumps for fragile newborns and children.',
    tag: 'Infant Transport',
    rate: 'Starting from ৳ 4,000',
    icon: '👶'
  },
  {
    title: 'Inter-District Patient Transfer',
    desc: 'Long-distance patient relocation across Bangladesh with dual oxygen cylinders, physician accompaniment, and high-suspension comfort.',
    tag: 'Nationwide Transfer',
    rate: 'Fixed per-kilometer pricing',
    icon: '🛣️'
  }
]

const Ambulance = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    pickupLocation: '',
    ambulanceType: 'ICU / Cardiac Ambulance',
    urgency: 'Immediate (Emergency)'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className='my-8'>
      
      {/* Top Banner */}
      <div className='bg-gradient-to-r from-blue-900 via-sky-800 to-blue-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <div>
            <span className='bg-white/20 text-sky-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2'>
              🚨 24/7 Rapid Ambulance Dispatch
            </span>
            <h1 className='text-3xl sm:text-4xl font-extrabold'>Banglar Alo Ambulance Service</h1>
            <p className='text-sky-100 text-sm sm:text-base mt-2 max-w-xl'>
              Prompt emergency patient transport with life support systems covering all areas of Dhaka and inter-district transfers.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
            <a 
              href='tel:10678'
              className='bg-red-500 hover:bg-red-600 text-white font-extrabold text-base px-6 py-3.5 rounded-full text-center shadow-lg transition-all flex items-center justify-center gap-2'
            >
              📞 Hotline: 10678
            </a>
            <a 
              href='tel:+8801710554433'
              className='bg-white text-blue-950 font-bold text-sm px-6 py-3.5 rounded-full text-center hover:bg-sky-50 shadow-md transition-all'
            >
              Direct: +880 1710-554433
            </a>
          </div>
        </div>
      </div>

      {/* Ambulance Fleet Cards */}
      <div className='my-12'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-800'>Specialized Ambulance Fleet</h2>
          <p className='text-gray-500 text-sm mt-1'>State-of-the-art vehicles manned by experienced drivers and certified healthcare personnel.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {ambulanceTypes.map((amb, index) => (
            <div 
              key={index}
              className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between'
            >
              <div>
                <div className='flex items-center justify-between mb-3'>
                  <span className='text-4xl'>{amb.icon}</span>
                  <span className='text-[11px] font-semibold bg-sky-50 text-sky-800 px-3 py-1 rounded-full'>
                    {amb.tag}
                  </span>
                </div>
                <h3 className='font-bold text-gray-800 text-lg mb-2'>{amb.title}</h3>
                <p className='text-xs text-gray-600 leading-relaxed mb-4'>{amb.desc}</p>
              </div>

              <div className='pt-4 border-t border-gray-100 flex items-center justify-between'>
                <span className='text-xs font-semibold text-primary'>{amb.rate}</span>
                <a 
                  href='tel:10678'
                  className='bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-blue-700 transition-all'
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Dispatch Request Form */}
      <div className='bg-sky-50/50 border border-sky-100 rounded-2xl p-6 sm:p-10 my-10'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-2xl font-bold text-gray-800 text-center mb-2'>Request Ambulance Online</h2>
          <p className='text-gray-500 text-sm text-center mb-6'>
            Fill in the details below and our dispatch officer will confirm your booking immediately via phone.
          </p>

          {submitted ? (
            <div className='bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center shadow-sm'>
              <span className='text-3xl block mb-2'>✅</span>
              <h3 className='font-bold text-lg'>Ambulance Request Received!</h3>
              <p className='text-sm mt-1'>
                Our central ambulance command at Puran Paltan, Dhaka is dispatching the nearest unit. You will receive a verification call within 2 minutes.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className='mt-4 text-xs font-semibold text-emerald-900 underline'
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-semibold text-gray-700 block mb-1'>Patient Name</label>
                  <input 
                    type='text' 
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                    placeholder='Enter patient name' 
                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary'
                  />
                </div>
                <div>
                  <label className='text-xs font-semibold text-gray-700 block mb-1'>Contact Phone Number</label>
                  <input 
                    type='tel' 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder='+880 1XXXXXXXXX' 
                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary'
                  />
                </div>
              </div>

              <div>
                <label className='text-xs font-semibold text-gray-700 block mb-1'>Pickup Location (Full Address in Dhaka or District)</label>
                <input 
                  type='text' 
                  required
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                  placeholder='e.g., Road 5, Mirpur / Motijheel / Narayanganj' 
                  className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary'
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-semibold text-gray-700 block mb-1'>Ambulance Type</label>
                  <select 
                    value={formData.ambulanceType}
                    onChange={(e) => setFormData({...formData, ambulanceType: e.target.value})}
                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary'
                  >
                    <option>ICU / Cardiac Ambulance</option>
                    <option>AC Life Support Ambulance</option>
                    <option>Neonatal / Pediatric ICU Ambulance</option>
                    <option>Inter-District Patient Transfer</option>
                  </select>
                </div>
                <div>
                  <label className='text-xs font-semibold text-gray-700 block mb-1'>Urgency</label>
                  <select 
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary'
                  >
                    <option>Immediate (Emergency - Dispatch Now)</option>
                    <option>Within 1 Hour</option>
                    <option>Scheduled for Today / Tomorrow</option>
                  </select>
                </div>
              </div>

              <button 
                type='submit'
                className='mt-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-md text-sm'
              >
                Request Dispatch Now 🚑
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  )
}

export default Ambulance

