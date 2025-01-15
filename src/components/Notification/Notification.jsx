import { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {

  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }

  }, 
  [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
