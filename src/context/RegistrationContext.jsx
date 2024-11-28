import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { RegistrationService } from '../services/api';

const RegistrationContext = createContext();

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within RegistrationProvider');
  }
  return context;
};

export const RegistrationProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState(() => {
    return JSON.parse(localStorage.getItem('registrations') || '[]');
  });
  
  const [quota, setQuota] = useState({
    total: 45,
    registered: 0,
    available: 45
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial quota
  useEffect(() => {
    const loadQuota = async () => {
      try {
        const quotaData = await RegistrationService.checkQuota();
        setQuota(quotaData);
      } catch (error) {
        console.error('Error loading quota:', error);
      }
    };
    loadQuota();
  }, []);

  const registerParticipant = async (data) => {
    try {
      setLoading(true);
      setError(null);

      // Upload foto
      const photoUrl = await RegistrationService.uploadPhoto(data.child.photo);
      
      // Format dan simpan data
      const formattedData = {
        child: {
          name: data.child.name,
          birthDate: data.child.birthDate,
          photoUrl
        },
        parents: data.parents,
        registrationDate: new Date().toISOString()
      };

      const result = await RegistrationService.create(formattedData);
      
      // Update state
      setRegistrations(prev => [...prev, result]);
      setQuota(prev => ({
        ...prev,
        registered: prev.registered + 1,
        available: prev.available - 1
      }));

      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    registrations,
    quota,
    loading,
    error,
    registerParticipant
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

// Tambahkan PropTypes
RegistrationProvider.propTypes = {
  children: PropTypes.node.isRequired
}; 