// Fungsi untuk menghitung umur
export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  // Validasi tanggal
  if (birth > today) {
    return 0;
  }
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Kurangi 1 tahun jika belum ulang tahun
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Fungsi untuk mendapatkan jumlah pendaftaran
export const getRegistrationCount = async () => {
  try {
    const response = await fetch('/data/registrations.json');
    const data = await response.json();
    return data.metadata.registeredCount;
  } catch (error) {
    console.error('Error getting registration count:', error);
    return 0;
  }
};

// Fungsi untuk validasi format data
export const validateRegistrationData = (data) => {
  const errors = [];
  
  // Validasi nama
  if (data.child.name.length < 3) {
    errors.push('Nama anak minimal 3 karakter');
  }
  
  // Validasi nomor telepon
  if (!/^08[1-9][0-9]{7,10}$/.test(data.parents.phone)) {
    errors.push('Format nomor telepon tidak valid');
  }
  
  return errors;
}; 