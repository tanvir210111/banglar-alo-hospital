import React from 'react'
import { useNavigate } from 'react-router-dom'
import { specialityData } from '../assets/assets'

const departmentDetails = [
  {
    name: 'General Physician & Internal Medicine',
    speciality: 'General physician',
    desc: 'Primary care, chronic condition management, fever, infections, and comprehensive health checkups.',
    icon: '🩺',
    badge: 'OPD & Inpatient'
  },
  {
    name: 'Obstetrics & Gynecology',
    speciality: 'Gynecologist',
    desc: "Women's wellness, prenatal & postnatal care, high-risk pregnancy management, and laparoscopic procedures.",
    icon: '🤰',
    badge: 'Maternity Unit'
  },
  {
    name: 'Dermatology & Cosmetology',
    speciality: 'Dermatologist',
    desc: 'Specialized clinical dermatology, acne, eczema, allergy diagnostics, and advanced laser skincare.',
    icon: '✨',
    badge: 'Clinical & Cosmetic'
  },
  {
    name: 'Pediatrics & Neonatology',
    speciality: 'Pediatricians',
    desc: 'Dedicated newborn and child healthcare, routine vaccinations, pediatric ICU (PICU), and growth tracking.',
    icon: '👶',
    badge: 'Child & NICU'
  },
  {
    name: 'Neurology & Neuro Surgery',
    speciality: 'Neurologist',
    desc: 'Expert care for stroke, migraine, epilepsy, nerve disorders, neuro-rehab, and advanced brain diagnostics.',
    icon: '🧠',
    badge: 'Advanced Neuro Lab'
  },
  {
    name: 'Gastroenterology & Hepatology',
    speciality: 'Gastroenterologist',
    desc: 'Digestive tract endoscopy, liver diseases, gastrointestinal therapies, and minimally invasive surgeries.',
    icon: '🔬',
    badge: 'Endoscopy & Liver Care'
  }
]

const Departments = () => {
  const navigate = useNavigate()

  return (
    <div className='my-8'>
      
      {/* Page Header */}
      <div className='text-center py-6'>
        <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-3'>
          🏥 Clinical Excellence at Puran Paltan, Dhaka
        </div>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800'>
          Medical <span className='text-primary'>Departments</span>
        </h1>
        <p className='text-gray-500 max-w-2xl mx-auto mt-2 text-sm sm:text-base'>
          Banglar Alo Hospital provides multi-disciplinary clinical departments powered by cutting-edge medical technologies and renowned specialist doctors.
        </p>
      </div>

      {/* Departments Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
        {departmentDetails.map((dept, index) => {
          const specObj = specialityData.find(s => s.speciality.toLowerCase() === dept.speciality.toLowerCase())
          return (
            <div 
              key={index}
              className='bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group'
            >
              <div>
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform'>
                    {specObj?.image ? (
                      <img src={specObj.image} alt={dept.name} className='w-10 h-10 object-contain' />
                    ) : (
                      <span>{dept.icon}</span>
                    )}
                  </div>
                  <span className='text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                    {dept.badge}
                  </span>
                </div>
                
                <h3 className='text-lg font-bold text-gray-800 group-hover:text-primary transition-colors'>
                  {dept.name}
                </h3>
                <p className='text-gray-600 text-sm mt-2 leading-relaxed'>
                  {dept.desc}
                </p>
              </div>

              <div className='pt-6 mt-4 border-t border-gray-100 flex items-center justify-between'>
                <button 
                  onClick={() => {
                    navigate(`/doctors/${dept.speciality}`)
                    window.scrollTo(0, 0)
                  }}
                  className='text-sm font-semibold text-primary hover:text-blue-700 flex items-center gap-1.5'
                >
                  Find Specialists &rarr;
                </button>
                <span className='text-xs text-gray-400 font-medium'>24/7 On-Duty</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Hospital Facility Highlights */}
      <div className='bg-gradient-to-r from-[#071328] to-[#0f2952] rounded-2xl p-8 sm:p-10 text-white my-12 shadow-xl'>
        <div className='max-w-3xl'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-3'>Need help choosing the right department?</h2>
          <p className='text-sky-200 text-sm leading-relaxed mb-6'>
            Our clinical triage desk at Puran Paltan, Dhaka is available 24/7 to guide you to the appropriate medical specialist according to your symptoms.
          </p>
          <div className='flex items-center gap-4 flex-wrap'>
            <a 
              href='tel:+8801711000000'
              className='bg-white text-[#071328] px-6 py-3 rounded-full text-sm font-bold hover:bg-sky-50 transition-all shadow-md'
            >
              📞 Call Reception: +880 1711-000000
            </a>
            <button 
              onClick={() => {
                navigate('/doctors')
                window.scrollTo(0, 0)
              }}
              className='border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-all'
            >
              View All Doctors
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Departments

