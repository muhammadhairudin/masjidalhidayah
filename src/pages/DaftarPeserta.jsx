import { useEffect, useState } from 'react'
import { useRegistration } from '../context/RegistrationContext'

const DaftarPeserta = () => {
  const { registrations, loading, error, deleteRegistration } = useRegistration()
  const [search, setSearch] = useState('')
  const [filteredPeserta, setFilteredPeserta] = useState([])

  // Filter peserta berdasarkan pencarian
  useEffect(() => {
    const filtered = registrations.filter(p => 
      p.child.name.toLowerCase().includes(search.toLowerCase()) ||
      p.parents.fatherName.toLowerCase().includes(search.toLowerCase()) ||
      p.parents.motherName.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredPeserta(filtered)
  }, [search, registrations])

  // Format tanggal
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  const handleDelete = async (id) => {
    try {
      const password = prompt("Masukkan password untuk menghapus data:");
      if (!password) return;

      await deleteRegistration(id, password);
      alert("Data berhasil dihapus");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-dark mb-8">
        Daftar Peserta Khitan
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari nama peserta atau orang tua..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Peserta Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Foto</th>
              <th className="px-6 py-3 text-left">Nama Anak</th>
              <th className="px-6 py-3 text-left">Orang Tua</th>
              <th className="px-6 py-3 text-left">Kontak</th>
              <th className="px-6 py-3 text-left">Tanggal Daftar</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPeserta.map((peserta, index) => (
              <tr key={peserta.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  {peserta.child.photoUrl && (
                    <img 
                      src={peserta.child.photoUrl} 
                      alt={peserta.child.name}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {peserta.child.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>Ayah: {peserta.parents.fatherName}</div>
                  <div>Ibu: {peserta.parents.motherName}</div>
                </td>
                <td className="px-6 py-4">
                  <div>{peserta.parents.phone}</div>
                  <div className="text-sm text-gray-500">
                    {peserta.parents.address}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {formatDate(peserta.registrationDate)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium
                    ${peserta.status === 'REGISTERED' ? 'bg-green-100 text-green-800' : 
                      peserta.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {peserta.status}
                  </span>
                  {peserta.verificationStatus && (
                    <span className="block mt-1 text-xs text-gray-500">
                      {peserta.verificationStatus}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(peserta.id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {filteredPeserta.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  {search ? 'Tidak ada peserta yang sesuai dengan pencarian' : 'Belum ada peserta terdaftar'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Statistik */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Peserta</div>
          <div className="text-2xl font-bold text-primary">
            {registrations.length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500">Status Terdaftar</div>
          <div className="text-2xl font-bold text-green-600">
            {registrations.filter(p => p.status === 'REGISTERED').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500">Menunggu Verifikasi</div>
          <div className="text-2xl font-bold text-yellow-600">
            {registrations.filter(p => p.verificationStatus === 'PENDING').length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DaftarPeserta 