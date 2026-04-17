// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar w-64 bg-white shadow h-screen p-4 flex flex-col space-y-4">
      <input type="text" placeholder="Rechercher..." className="p-2 rounded border"/>

      {role === "agent" && (
        <>
          <Link to="/agent/dashboard">Dashboard Agent</Link>
          <Link to="/agent/reclamations">Réclamations</Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link to="/admin/dashboard">Dashboard Admin</Link>
          <Link to="/admin/reclamations">Toutes les Réclamations</Link>
          <Link to="/admin/utilisateurs">Gestion des utilisateurs</Link>
        </>
      )}

      <Link to="/settings">Paramètres</Link>
      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}>Déconnexion</button>
    </div>
  );
};

export default Sidebar;
