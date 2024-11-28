import { Link } from 'react-router-dom'
import CountDown from '../components/CountDown'
import QuotaInfo from '../components/QuotaInfo'
import khitanBrosur from '/khitan al hidayah 6.png'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-hero-pattern text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-dark/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-grass-dark/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Bakti Amal Khitan Ke-6 <br/>
                Masjid Al Hidayah
              </h1>
              <p className="text-xl mb-8">
                Program khitan gratis untuk 40 Anak Sholih Pemberani
              </p>
              <div className="mb-8">
                <CountDown />
              </div>
              <Link 
                to="/pendaftaran"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full font-bold inline-block"
              >
                Daftar Sekarang
              </Link>
            </div>
            <div className="hidden md:block">
              <img 
                src={khitanBrosur} 
                alt="Brosur Khitan" 
                className="rounded-lg shadow-xl max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quota Info */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <QuotaInfo />
        </div>
      </div>

      {/* Info Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Persyaratan */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Persyaratan</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Melakukan Pendaftaran Secara Online</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Anak Berusia Minimal 6 Tahun</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tidak Memiliki Riwayat Alergi Obat</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tidak Memiliki Riwayat Kelainan Pembekuan Darah</span>
                </li>
              </ul>
            </div>

            {/* Waktu Pendaftaran */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Waktu Pendaftaran</h2>
              <div className="space-y-4">
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  20 Jumadal Ula 1446 H s.d 21 Jumadal Akhiroh 1446 H
                </p>
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  22 Nopember s.d 22 Desember 2024 M
                </p>
                <p className="text-red-500 mt-4">
                  * Pendaftaran ditutup apabila kuota peserta terpenuhi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fasilitas & Waktu Pelaksanaan */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Fasilitas */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Fasilitas</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Khitan Gratis oleh tim yang berpengalaman</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Obat/perawatan Pasca Khitan</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hadiah Menarik</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Konsumsi (Sarapan dan Snack)</span>
                </li>
              </ul>
            </div>

            {/* Waktu Pelaksanaan */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Waktu Pelaksanaan</h2>
              <div className="space-y-4">
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Ahad, 21 Jumadal Akhiroh 1446 H
                </p>
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Minggu, 22 Desember 2024 M
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-neutral-600">
                    <span className="font-semibold">Waktu Pelaksanaan:</span><br/>
                    Pukul 08.00 WIB s/d Selesai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lokasi Pelaksanaan - Full Width */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Lokasi Pelaksanaan</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-primary-dark mb-2">Masjid Al Hidayah</h3>
                    <p className="text-neutral-600">
                      Jl. Patimura Gg Taher, Belakang RSUD<br />
                      Kuala Pembuang, Kecamatan Seruyan Hilir<br />
                      Kabupaten Seruyan, Kalteng
                    </p>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16408.674060923757!2d112.53746509551999!3d-3.3772290689056774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e09fd701368d0c5%3A0x985eb3930015912f!2sMasjid%20Al%20Hidayah!5e1!3m2!1sid!2sid!4v1732703107534!5m2!1sid!2sid" 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Masjid Al Hidayah"
                  />
                </div>

                {/* Tombol Petunjuk Arah */}
                <a 
                  href="https://maps.app.goo.gl/YOUR_MAPS_LINK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tambahkan section Keutamaan Khitan sebelum section Kontak & Donasi */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-12">
            Keutamaan Khitan dalam Islam
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Dalil Al-Qur'an */}
            <div className="bg-card-pattern rounded-xl p-8 shadow-soft">
              <h3 className="text-xl font-bold text-primary mb-4">
                Dalil dari Al-Qur&apos;an
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-arabic text-center mb-2">
                    ثُمَّ أَوْحَيْنَا إِلَيْكَ أَنِ اتَّبِعْ مِلَّةَ إِبْرَاهِيمَ حَنِيفًا ۖ وَمَا كَانَ مِنَ الْمُشْرِكِينَ
                  </p>
                  <p className="text-neutral-600 italic">
                    &quot;Kemudian Kami wahyukan kepadamu (Muhammad), &apos;Ikutilah agama Ibrahim yang lurus, dan dia bukanlah termasuk orang musyrik.&apos;&quot;
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    (QS. An-Nahl [16]: 123)
                  </p>
                </div>
              </div>
            </div>

            {/* Dalil Hadits */}
            <div className="bg-card-pattern rounded-xl p-8 shadow-soft">
              <h3 className="text-xl font-bold text-primary mb-4">
                Dalil dari Hadits Shahih
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-lg font-arabic text-center mb-2">
                    الْفِطْرَةُ خَمْسٌ: الْخِتَانُ، وَالاِسْتِحْدَادُ، وَتَقْلِيمُ الأَظْفَارِ، وَنَتْفُ الإِبْطِ، وَقَصُّ الشَّارِبِ
                  </p>
                  <p className="text-neutral-600 italic">
                    &quot;Lima perkara yang termasuk fitrah: khitan, mencukur bulu kemaluan, memotong kuku, mencabut bulu ketiak, dan memendekkan kumis.&quot;
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    (HR. Bukhari no. 5889 dan Muslim no. 257)
                  </p>
                </div>

                <div>
                  <p className="text-lg font-arabic text-center mb-2">
                    اخْتَتَنَ إِبْرَاهِيمُ النَّبِيُّ عَلَيْهِ السَّلاَمُ وَهْوَ ابْنُ ثَمَانِينَ سَنَةً بِالْقَدُومِ
                  </p>
                  <p className="text-neutral-600 italic">
                    &quot;Nabi Ibrahim alaihissalam berkhitan ketika berusia 80 tahun dengan menggunakan kapak.&quot;
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    (HR. Bukhari no. 3356)
                  </p>
                </div>
              </div>
            </div>

            {/* Keutamaan dan Hikmah */}
            <div className="bg-card-pattern rounded-xl p-8 shadow-soft">
              <h3 className="text-xl font-bold text-primary mb-4">
                Hikmah dan Manfaat Khitan
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-neutral-600">
                    Khitan merupakan salah satu syiar Islam dan tanda kesucian yang membedakan seorang muslim
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-neutral-600">
                    Mengikuti sunnah Nabi Ibrahim yang merupakan bapak para nabi dan kekasih Allah Ta&apos;ala
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-neutral-600">
                    Menjaga kebersihan dan kesucian dalam beribadah
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-neutral-600">
                    Mencegah berbagai penyakit dan menjaga kesehatan fisik
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kontak & Donasi */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Kontak */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Narahubung / Konfirmasi</h2>
              <div className="space-y-4">
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Muhammad Hairudin: 0852 4920 9213
                </p>
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Abu Dzakiy: 0821 5090 4592
                </p>
              </div>
            </div>

            {/* Donasi */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Infaq / Donasi</h2>
              <div className="space-y-4">
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  BMT Mobile No Rek 0010700250
                </p>
                <p className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Bank Muamalat (Kode Bank 147)<br />
                  No Rek: 8070010010700250<br />
                  a.n MASJID AL HIDAYAH
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  * Infaq/Donasi juga bisa dijemput atau diserahkan langsung ke panitia
                </p>
                <p className="text-sm text-gray-600 italic">
                  Baarokallahu Fiikum
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 