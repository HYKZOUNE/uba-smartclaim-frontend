// src/pages/Parametre.jsx
import React, { useState } from "react";

export default function Parametre() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);

  const handleSave = () => {
    alert("Paramètres mis à jour avec succès !");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-uba-blue mb-6">Paramètres</h1>

      {/* SECTION PROFIL */}
      <div className="bg-white p-5 rounded-lg shadow mb-5">
        <h2 className="text-xl font-semibold mb-4">Profil utilisateur</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Nom"
          />
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Prénom"
          />
          <input
            type="email"
            className="p-2 border rounded"
            placeholder="Adresse email"
          />
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Numéro de téléphone"
          />
        </div>
      </div>

      {/* SECTION SÉCURITÉ */}
      <div className="bg-white p-5 rounded-lg shadow mb-5">
        <h2 className="text-xl font-semibold mb-4">Sécurité</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="password"
            className="p-2 border rounded"
            placeholder="Ancien mot de passe"
          />
          <input
            type="password"
            className="p-2 border rounded"
            placeholder="Nouveau mot de passe"
          />
          <input
            type="password"
            className="p-2 border rounded"
            placeholder="Confirmer nouveau mot de passe"
          />
        </div>
      </div>

      {/* SECTION NOTIFICATIONS */}
      <div className="bg-white p-5 rounded-lg shadow mb-5">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notifEmail}
            onChange={() => setNotifEmail(!notifEmail)}
          />
          Notification par Email
        </label>

        <label className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={notifSMS}
            onChange={() => setNotifSMS(!notifSMS)}
          />
          Notification par SMS
        </label>
      </div>

      {/* SECTION THÈME */}
      <div className="bg-white p-5 rounded-lg shadow mb-5">
        <h2 className="text-xl font-semibold mb-4">Apparence</h2>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Activer le mode sombre
        </label>
      </div>

      {/* SAUVEGARDE */}
      <button
        onClick={handleSave}
        className="bg-uba-blue text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      >
        Enregistrer les paramètres
      </button>
    </div>
  );
}
