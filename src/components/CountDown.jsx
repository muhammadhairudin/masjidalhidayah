import { useState, useEffect } from 'react'

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const targetDate = new Date('2024-12-22').getTime()
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-6 justify-center bg-white/20 backdrop-blur-sm rounded-xl p-6">
      <div className="text-center">
        <div className="text-4xl font-bold bg-white/90 text-primary-dark rounded-lg px-4 py-2 min-w-[3rem]">
          {timeLeft.days}
        </div>
        <div className="text-sm mt-2 font-medium">Hari</div>
      </div>
      <div className="text-4xl font-bold self-start">:</div>
      <div className="text-center">
        <div className="text-4xl font-bold bg-white/90 text-primary-dark rounded-lg px-4 py-2 min-w-[3rem]">
          {timeLeft.hours}
        </div>
        <div className="text-sm mt-2 font-medium">Jam</div>
      </div>
      <div className="text-4xl font-bold self-start">:</div>
      <div className="text-center">
        <div className="text-4xl font-bold bg-white/90 text-primary-dark rounded-lg px-4 py-2 min-w-[3rem]">
          {timeLeft.minutes}
        </div>
        <div className="text-sm mt-2 font-medium">Menit</div>
      </div>
      <div className="text-4xl font-bold self-start">:</div>
      <div className="text-center">
        <div className="text-4xl font-bold bg-white/90 text-primary-dark rounded-lg px-4 py-2 min-w-[3rem]">
          {timeLeft.seconds}
        </div>
        <div className="text-sm mt-2 font-medium">Detik</div>
      </div>
    </div>
  )
}

export default CountDown 