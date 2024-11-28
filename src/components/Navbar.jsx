import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">
            Masjid Al Hidayah
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-secondary">
              Beranda
            </Link>
            <Link to="/pendaftaran" className="hover:text-secondary">
              Pendaftaran Khitan
            </Link>
            <Link to="/peserta" className="hover:text-secondary">
              Daftar Peserta
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 