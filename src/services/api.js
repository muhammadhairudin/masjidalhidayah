import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Fungsi helper untuk simulasi delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API menggunakan localStorage
export const RegistrationService = {
  async create(data) {
    try {
      await delay(1000); // Simulasi network delay
      
      const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      const newRegistration = {
        ...data,
        id: `REG-${Date.now()}`,
        registrationDate: new Date().toISOString(),
        status: 'REGISTERED'
      };
      
      registrations.push(newRegistration);
      localStorage.setItem('registrations', JSON.stringify(registrations));
      
      return newRegistration;
    } catch (error) {
      console.error('Registration Error:', error);
      throw new Error('Gagal menyimpan pendaftaran');
    }
  },

  async uploadPhoto(file) {
    try {
      if (!(file instanceof Blob)) {
        throw new Error('Invalid file format');
      }

      await delay(1500); // Simulasi upload delay
      
      // Simpan foto sebagai Base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
          resolve(reader.result); // Ini akan berisi string base64
        };
        
        reader.onerror = () => {
          reject(new Error('Gagal membaca file'));
        };
        
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Upload Error:', error);
      throw new Error('Gagal mengupload foto');
    }
  },

  async checkQuota() {
    try {
      await delay(500);
      
      const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      return {
        total: 45,
        registered: registrations.length,
        available: 45 - registrations.length
      };
    } catch (error) {
      console.error('Quota Error:', error);
      throw new Error('Gagal mengecek kuota');
    }
  }
}; 