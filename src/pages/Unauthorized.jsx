// frontend/src/pages/Unauthorized.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    const timer = setTimeout(() => {
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "agent") navigate("/agent/dashboard");
      else navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">❌ Accès refusé</h1>
      <p className="mb-6 text-lg">Vous n’êtes pas autorisé à accéder à cette page.</p>
      <p className="text-gray-600">
        Redirection automatique dans 5 secondes…
      </p>
    </div>
  );
};

export default Unauthorized;
