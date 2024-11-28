const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Masjid Al Hidayah</h3>
            <p>Jl. Patimura Gg Taher, Belakang RSUD</p>
            <p>Kuala Pembuang, Kecamatan Seruyan Hilir</p>
            <p>Kabupaten Seruyan, Kalteng</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <p>Muhammad Hairudin: 0852 4920 9213</p>
            <p>Abu Dzakiy: 0821 5090 4592</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Infaq/Donasi</h3>
            <p>Bank Muamalat (147)</p>
            <p>No Rek: 8070010010700250</p>
            <p>a.n MASJID AL HIDAYAH</p>
          </div>
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p>© 2024 Masjid Al Hidayah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 