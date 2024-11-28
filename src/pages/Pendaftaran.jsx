import { useForm } from 'react-hook-form'
import { useState } from 'react'
import imageCompression from 'browser-image-compression'

// Definisikan API_URL di luar komponen
const API_URL = '/api/upload'

const Pendaftaran = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const namaAnak = watch('namaAnak', '')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const fetchWithRetry = async (url, options, retries = 3) => {
    const timeout = 60000; // 60 detik timeout
    
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
      } catch (err) {
        console.log(`Attempt ${i + 1} failed:`, err);
        if (i === retries - 1) throw err;
        // Tunggu sebentar sebelum retry
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
      }
    }
  }

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      console.log('Starting upload...');

      const formData = new FormData();
      formData.append('foto', data.foto[0]);
      formData.append('namaAnak', data.namaAnak);
      formData.append('tanggalLahir', data.tanggalLahir);
      formData.append('namaAyah', data.namaAyah);
      formData.append('namaIbu', data.namaIbu);
      formData.append('noTelp', data.noTelp);
      formData.append('alamat', data.alamat);
      formData.append('persetujuan', data.persetujuan);

      console.log('Uploading to:', API_URL);
      console.log('Form data:', Object.fromEntries(formData));

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers));

      const text = await response.text();
      console.log('Raw response:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Upload failed');
      }

      console.log('Success response:', result);

      // Simpan data ke localStorage
      const existingData = JSON.parse(localStorage.getItem('pesertaKhitan') || '[]')
      const newData = [...existingData, { 
        ...data, 
        id: Date.now(), 
        status: 'Terdaftar',
        fotoUrl: result.data.fotoUrl 
      }]
      localStorage.setItem('pesertaKhitan', JSON.stringify(newData))

      alert('Pendaftaran berhasil!')
    } catch (error) {
      console.error('Upload error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      alert(`Gagal mendaftar: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Fungsi untuk compress image
  const compressImage = async (file) => {
    if (!file.type.startsWith('image/')) return file;
    
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    }
    
    try {
      const compressedBlob = await imageCompression(file, options);
      return new File([compressedBlob], file.name, {
        type: file.type
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      return file;
    }
  }

  return (
    <div className="py-12 min-h-screen bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-3xl">
          <div className="p-8 rounded-xl bg-card-pattern shadow-soft">
            <h1 className="mb-8 text-3xl font-bold text-center text-primary-dark">
              Pendaftaran Khitan
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Data Anak */}
              <div className="p-6 space-y-6 bg-white rounded-lg">
                <h2 className="text-xl font-semibold text-primary">Data Anak</h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-neutral-600">
                      Nama Lengkap Anak
                    </label>
                    <input
                      type="text"
                      {...register('namaAnak', { required: 'Nama anak wajib diisi' })}
                      className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Masukkan nama lengkap anak"
                    />
                    {errors.namaAnak && (
                      <p className="mt-1 text-sm text-red-500">{errors.namaAnak.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-neutral-600">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      {...register('tanggalLahir', { required: 'Tanggal lahir wajib diisi' })}
                      className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.tanggalLahir && (
                      <p className="mt-1 text-sm text-red-500">{errors.tanggalLahir.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-neutral-600">
                    Foto Anak
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('foto', { 
                      required: 'Foto wajib diupload',
                      onChange: handleImageChange
                    })}
                    className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  {errors.foto && (
                    <p className="mt-1 text-sm text-red-500">{errors.foto.message}</p>
                  )}
                  
                  {preview && (
                    <div className="mt-4">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="object-cover w-32 h-32 rounded-lg border-4 border-white shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="p-6 space-y-6 bg-white rounded-lg">
                <h2 className="text-xl font-semibold text-primary">Data Orang Tua</h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-neutral-600">
                      Nama Ayah
                    </label>
                    <input
                      type="text"
                      {...register('namaAyah', { required: 'Nama ayah wajib diisi' })}
                      className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Masukkan nama ayah"
                    />
                    {errors.namaAyah && (
                      <p className="mt-1 text-sm text-red-500">{errors.namaAyah.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-neutral-600">
                      Nama Ibu
                    </label>
                    <input
                      type="text"
                      {...register('namaIbu', { required: 'Nama ibu wajib diisi' })}
                      className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Masukkan nama ibu"
                    />
                    {errors.namaIbu && (
                      <p className="mt-1 text-sm text-red-500">{errors.namaIbu.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-neutral-600">
                    No. HP / WhatsApp
                  </label>
                  <input
                    type="tel"
                    {...register('noTelp', { required: 'Nomor telepon wajib diisi' })}
                    className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Contoh: 08123456789"
                  />
                  {errors.noTelp && (
                    <p className="mt-1 text-sm text-red-500">{errors.noTelp.message}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-neutral-600">
                    Alamat Lengkap
                  </label>
                  <textarea
                    {...register('alamat', { required: 'Alamat wajib diisi' })}
                    rows="3"
                    className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Masukkan alamat lengkap"
                  />
                  {errors.alamat && (
                    <p className="mt-1 text-sm text-red-500">{errors.alamat.message}</p>
                  )}
                </div>
              </div>

              {/* Persetujuan */}
              <div className="p-6 space-y-4 bg-white rounded-lg">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('persetujuan', { 
                      required: 'Anda harus menyetujui pendaftaran' 
                    })}
                    className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-neutral-600">
                    Dengan ini saya menyatakan bahwa <span className="font-semibold">{namaAnak || '[Nama Anak]'}</span> ingin 
                    mendaftar sebagai peserta khitan Masjid Al Hidayah Periode ke-6 
                    Tahun 1446 H / 2024 M dan bersedia mematuhi segala ketentuan yang berlaku
                  </span>
                </label>
                {errors.persetujuan && (
                  <p className="mt-2 text-sm text-red-500">{errors.persetujuan.message}</p>
                )}

                {/* Tambahkan Doa */}
                <div className="mt-6 text-center">
                  <p className="text-sm italic text-neutral-600">
                    اللَّهُمَّ يَسِّرْ وَلاَ تُعَسِّرْ ، وَأَتْمِمْ بِالْخَيْرِ
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">
                    "Ya Allah, mudahkanlah dan jangan persulit, dan sempurnakanlah dengan kebaikan"
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    Semoga Allah ﷻ memudahkan dan memberkahi kegiatan bakti amal khitan ini, 
                    serta menjadikannya sebagai amal jariyah bagi seluruh peserta, panitia dan donatur.
                    <br/>
                    <span className="block mt-2 font-arabic">آمين يا رب العالمين</span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-3 w-full font-bold text-white bg-gradient-to-r rounded-lg transition-all duration-300 from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <span className="flex justify-center items-center">
                    <svg className="mr-3 -ml-1 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim...
                  </span>
                ) : 'Daftar Sekarang'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pendaftaran 