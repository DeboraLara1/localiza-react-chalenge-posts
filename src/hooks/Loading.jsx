import { useState } from "react";
import { Loadingspinner } from '../components';

const useLoading = () => {
  const [loading, setLoading] = useState(null);

  const startLoading = (key) => setLoading(key);
  const stopLoading = () => setLoading(null);

  const LoadingIndicator = () => (loading ? <LoadingSpinner /> : null);

  return {
    loading,
    startLoading,
    stopLoading,
    LoadingIndicator, 
  };
};

export default useLoading;
