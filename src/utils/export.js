import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, filename = 'data-peserta') => {
  // Format data untuk excel
  const formattedData = data.map((item, index) => ({
    'No': index + 1,
    'ID Registrasi': item.id,
    'Nama Anak': item.child.name,
    'Tanggal Lahir': new Date(item.child.birthDate).toLocaleDateString('id-ID'),
    'Nama Ayah': item.parents.fatherName,
    'Nama Ibu': item.parents.motherName,
    'No. Telepon': item.parents.phone,
    'Alamat': item.parents.address,
    'Tanggal Daftar': new Date(item.registrationDate).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    'Status': item.status,
    'Status Verifikasi': item.verificationStatus
  }));

  // Buat workbook baru
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedData);

  // Atur lebar kolom
  const colWidths = [
    { wch: 5 },  // No
    { wch: 15 }, // ID
    { wch: 25 }, // Nama Anak
    { wch: 15 }, // Tgl Lahir
    { wch: 25 }, // Nama Ayah
    { wch: 25 }, // Nama Ibu
    { wch: 15 }, // No Telp
    { wch: 40 }, // Alamat
    { wch: 25 }, // Tgl Daftar
    { wch: 15 }, // Status
    { wch: 15 }  // Status Verifikasi
  ];
  ws['!cols'] = colWidths;

  // Tambahkan worksheet ke workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Data Peserta');

  // Generate file dan download
  const wbout = XLSX.write(wb, { 
    bookType: 'xlsx', 
    type: 'binary' 
  });

  // Konversi ke blob
  const buf = new ArrayBuffer(wbout.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < wbout.length; i++) {
    view[i] = wbout.charCodeAt(i) & 0xFF;
  }
  
  // Download file
  const blob = new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  saveAs(blob, `${filename}.xlsx`);
}; 