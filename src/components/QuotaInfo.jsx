import { useRegistration } from '../context/RegistrationContext'
import { Link } from 'react-router-dom'

const QuotaInfo = () => {
  const { quota } = useRegistration()

  const quotaPercentage = (quota.registered / quota.total) * 100

  return (
    <div className="bg-card-pattern rounded-lg p-6 shadow-soft">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-primary-dark">Informasi Kuota</h3>
        <Link 
          to="/peserta" 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary hover:text-white border border-primary hover:bg-primary rounded-lg transition-colors duration-300"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Lihat Daftar Peserta
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Total Kuota:</span>
            <span className="font-bold text-primary">{quota.total} Peserta</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Terdaftar:</span>
            <span className="font-bold text-secondary">{quota.registered} Peserta</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Sisa Kuota:</span>
            <span className="font-bold text-accent-dark">{quota.available} Peserta</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                Progres Pendaftaran
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary">
                {Math.round(quotaPercentage)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
            <div 
              style={{ width: `${quotaPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            />
          </div>
        </div>

        {/* Info & Warning */}
        <div className="space-y-2 text-sm">
          {quota.available <= 5 && (
            <div className="p-2 bg-yellow-50 text-yellow-800 rounded">
              <span className="font-medium">Perhatian:</span> Kuota hampir penuh!
            </div>
          )}
          {quota.available === 0 && (
            <div className="p-2 bg-red-50 text-red-800 rounded">
              <span className="font-medium">Pemberitahuan:</span> Kuota sudah penuh.
            </div>
          )}
          <p className="text-neutral-500 italic">
            * Termasuk {quota.total - 40} kuota cadangan
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuotaInfo 