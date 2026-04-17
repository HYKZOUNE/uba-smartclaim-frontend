// src/components/Navbar.jsx
import React from 'react';
import logo from '../assets/logo-uba.png';

const Navbar = ({ role }) => {
  return (
    <div className="flex justify-between items-center p-4 shadow bg-white">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="UBA Logo" className="w-10 h-10"/>
        <span className="font-bold text-lg text-red-600">
          UBA SmartClaim – {role === "admin" ? "Admin" : "Agent"}
        </span>
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="px-3 py-2 border rounded"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default Navbar;
