import { useState } from "react";
import LoadingSpinner from "../components/Loadingspinner";

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
