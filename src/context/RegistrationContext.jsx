import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { RegistrationService } from '../services/api';
import { GitHubService } from '../services/github';

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
      
      // Format data
      const formattedData = {
        child: {
          name: data.child.name,
          birthDate: data.child.birthDate,
          photoUrl
        },
        parents: data.parents,
        registrationDate: new Date().toISOString()
      };

      // Simpan ke GitHub
      const result = await GitHubService.saveRegistration(formattedData);
      
      // Update state lokal
      setRegistrations(result.registrations);
      setQuota({
        total: result.metadata.totalQuota,
        registered: result.metadata.registeredCount,
        available: result.metadata.totalQuota - result.metadata.registeredCount
      });

      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteRegistration = async (id, password) => {
    try {
      setLoading(true);
      setError(null);

      const result = await GitHubService.deleteRegistration(id, password);
      
      setRegistrations(result.registrations);
      setQuota({
        total: result.metadata.totalQuota,
        registered: result.metadata.registeredCount,
        available: result.metadata.totalQuota - result.metadata.registeredCount
      });

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
    registerParticipant,
    deleteRegistration
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