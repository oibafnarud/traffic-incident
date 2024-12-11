import { useState, useEffect } from 'react';
import { locationHandler } from '../utils/locationHandler';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    setLoading(true);
    try {
      const currentLocation = await locationHandler.getCurrentLocation();
      setLocation(currentLocation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, loading, error, getLocation };
};