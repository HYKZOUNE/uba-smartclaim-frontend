import React, { useState } from 'react';
import axios from 'axios';
import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingCircle from '../components/LoadingCircle';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        await api.put('/api/users/change-password', {
          currentPassword,
          newPassword
        }, { withCredentials: true });
        alert('Mot de passe changé avec succès !');
        setCurrentPassword('');
        setNewPassword('');
      } catch (error) {
        alert('Erreur : ' + error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    }, 25000);
  };

  return (
    <>
    <Header />
    <div className="p-6 max-w-md">
      {loading && <LoadingCircle />}
      <h1 className="text-xl font-bold mb-4">Paramètres</h1>
      <form onSubmit={handleChangePassword} className="flex flex-col space-y-3 bg-white p-6 rounded shadow">
        <input
          type="password"
          placeholder="Mot de passe actuel"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-uba-blue text-white py-2 rounded hover:bg-blue-700">
          Changer le mot de passe
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Settings;
