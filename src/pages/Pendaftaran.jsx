import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import imageCompression from 'browser-image-compression'
import { useRegistration } from '../context/RegistrationContext';
import { calculateAge } from '../utils/registration';
import { useNavigate } from 'react-router-dom';

const Pendaftaran = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, setError, clearErrors } } = useForm()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const { registerParticipant, loading, error } = useRegistration();
  const navigate = useNavigate();
  const [loadingMessage, setLoadingMessage] = useState('');
  const [ageWarning, setAgeWarning] = useState('');

  const namaAnak = watch('namaAnak', '')
  const tanggalLahir = watch('tanggalLahir');

  useEffect(() => {
    if (tanggalLahir) {
      const age = calculateAge(new Date(tanggalLahir));
      if (age < 6) {
        setAgeWarning('Perhatian: Usia minimal yang direkomendasikan adalah 6 tahun');
      } else {
        setAgeWarning('');
      }
    }
  }, [tanggalLahir]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran foto maksimal 5MB');
        e.target.value = '';
        return;
      }
      setPreview(URL.createObjectURL(file))
    }
  }

  const validateRegistration = (data) => {
    const errors = [];
    
    // Validasi usia
    const birthDate = new Date(data.tanggalLahir);
    const age = calculateAge(birthDate);
    if (age < 6) {
      errors.push("Usia minimal peserta adalah 6 tahun");
    }

    // Validasi nomor telepon
    if (!/^08[1-9][0-9]{7,10}$/.test(data.noTelp)) {
      errors.push("Format nomor telepon tidak valid");
    }

    return errors;
  }

  const generateRegistrationId = () => {
    const currentCount = getRegistrationCount() + 1;
    return `REG-2024-${String(currentCount).padStart(3, '0')}`;
  }

  const onSubmit = async (data) => {
    try {
      setLoadingMessage('Memproses foto...');
      const compressedPhoto = await compressImage(data.foto[0]);

      setLoadingMessage('Mengunggah data...');
      const result = await registerParticipant({
        child: {
          name: data.namaAnak,
          birthDate: data.tanggalLahir,
          photo: compressedPhoto
        },
        parents: {
          fatherName: data.namaAyah,
          motherName: data.namaIbu,
          phone: data.noTelp,
          address: data.alamat
        }
      });

      setLoadingMessage('Menyimpan pendaftaran...');
      console.log('Hasil pendaftaran:', result);
      
      // Reset form dan preview
      reset();
      setPreview(null);

      // Tampilkan alert dan redirect ke halaman daftar peserta
      alert('Pendaftaran berhasil! Anda akan diarahkan ke halaman daftar peserta.');
      navigate('/peserta');
      
    } catch (err) {
      console.error('Error saat pendaftaran:', err);
      alert(`Gagal mendaftar: ${err.message}`);
    } finally {
      setLoadingMessage('');
    }
  };

  // Fungsi untuk compress image
  const compressImage = async (file) => {
    if (!file) return null;
    if (!file.type.startsWith('image/')) {
      throw new Error('File harus berupa gambar');
    }
    
    // Validasi ukuran file
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Ukuran foto maksimal 5MB');
    }
    
    const options = {
      maxSizeMB: 1,          // Hasil compress maksimal 1MB
      maxWidthOrHeight: 1024, // Maksimal dimensi 1024px
      useWebWorker: true,
      fileType: file.type,   // Pertahankan tipe file asli
      initialQuality: 0.8    // Kualitas awal 80%
    }
    
    try {
      const compressedBlob = await imageCompression(file, options);
      return new File([compressedBlob], file.name, {
        type: file.type
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Gagal memproses foto, silakan coba lagi');
    }
  }

  return (
    <div className="py-12 min-h-screen bg-gray-50">
      {loading && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black/50">
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <div className="mx-auto w-8 h-8 rounded-full border-b-2 animate-spin border-primary"></div>
            <p className="mt-2 text-center">{loadingMessage || 'Sedang memproses...'}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="container px-4 mx-auto mb-4">
          <div className="p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        </div>
      )}

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
                      {...register('tanggalLahir', { 
                        required: 'Tanggal lahir wajib diisi'
                      })}
                      className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.tanggalLahir && (
                      <p className="mt-1 text-sm text-red-500">{errors.tanggalLahir.message}</p>
                    )}
                    {ageWarning && (
                      <p className="mt-1 text-sm text-yellow-600">
                        <svg 
                          className="inline mr-1 w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        {ageWarning}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      * Usia yang direkomendasikan minimal 6 tahun
                    </p>
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
                      validate: {
                        fileSize: (files) => {
                          if (files?.[0]?.size > 5 * 1024 * 1024) {
                            return 'Ukuran foto maksimal 5MB';
                          }
                          return true;
                        }
                      },
                      onChange: handleImageChange
                    })}
                    className="px-4 py-2 w-full rounded-lg border transition-colors border-neutral-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  {errors.foto && (
                    <p className="mt-1 text-sm text-red-500">{errors.foto.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    * Format: JPG, PNG, GIF (Maks. 5MB)
                  </p>
                  
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