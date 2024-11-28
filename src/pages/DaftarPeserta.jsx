import { useState, useEffect } from 'react'

const DaftarPeserta = () => {
  const [peserta, setPeserta] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('pesertaKhitan') || '[]')
    setPeserta(data)
  }, [])

  const filteredPeserta = peserta.filter(p => 
    p.namaAnak.toLowerCase().includes(search.toLowerCase()) ||
    p.namaOrtu.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Daftar Peserta Khitan</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari nama peserta atau orang tua..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Foto</th>
              <th className="px-6 py-3 text-left">Nama Anak</th>
              <th className="px-6 py-3 text-left">Usia</th>
              <th className="px-6 py-3 text-left">Nama Orang Tua</th>
              <th className="px-6 py-3 text-left">No. Telepon</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeserta.map((p, index) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  {p.fotoUrl && (
                    <img 
                      src={p.fotoUrl} 
                      alt={p.namaAnak}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4">{p.namaAnak}</td>
                <td className="px-6 py-4">{p.usia} tahun</td>
                <td className="px-6 py-4">{p.namaOrtu}</td>
                <td className="px-6 py-4">{p.noTelp}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredPeserta.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Tidak ada data peserta
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DaftarPeserta 