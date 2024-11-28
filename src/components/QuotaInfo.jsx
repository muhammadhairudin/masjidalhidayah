import { useState, useEffect } from 'react'

const QuotaInfo = () => {
  const [quota, setQuota] = useState({
    total: 45, // 40 utama + 5 cadangan
    registered: 0
  })

  useEffect(() => {
    const peserta = JSON.parse(localStorage.getItem('pesertaKhitan') || '[]')
    setQuota(prev => ({
      ...prev,
      registered: peserta.length
    }))
  }, [])

  const availableQuota = quota.total - quota.registered
  const quotaPercentage = (quota.registered / quota.total) * 100

  return (
    <div className="bg-card-pattern rounded-lg p-6 shadow-soft">
      <h3 className="text-2xl font-bold mb-4 text-primary-dark">Informasi Kuota</h3>
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
            <span className="font-bold text-accent-dark">{availableQuota} Peserta</span>
          </div>
        </div>
        <div className="w-full bg-neutral-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${quotaPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-neutral-500 italic">
          * Termasuk 5 kuota cadangan
        </p>
      </div>
    </div>
  )
}

export default QuotaInfo 