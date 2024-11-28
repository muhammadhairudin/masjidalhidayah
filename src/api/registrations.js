const API_BASE_URL = process.env.REACT_APP_API_URL;

export const saveRegistration = async (data) => {
  const response = await fetch(`${API_BASE_URL}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Gagal menyimpan pendaftaran');
  }
  
  return response.json();
} 