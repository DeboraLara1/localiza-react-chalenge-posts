import { useState } from "react";
import LoadingSpinner from "../components/Loadingspinner"; // Certifique-se de importar o componente corretamente

const useLoading = () => {
  const [loading, setLoading] = useState(null);

  const startLoading = (key) => setLoading(key);
  const stopLoading = () => setLoading(null);

  const LoadingIndicator = () => (loading ? <LoadingSpinner /> : null);

  return {
    loading,
    startLoading,
    stopLoading,
    LoadingIndicator, // Reutilizável em qualquer lugar
  };
};

export default useLoading;
