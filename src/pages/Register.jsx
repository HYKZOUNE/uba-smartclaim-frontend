import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Register.css';
import logo from '../assets/FB_IMG_1762767457367.jpg';

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('agent');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Les mots de passe ne correspondent pas.');
    }

    setLoading(true);
    try {
      const resp = await api.post('/api/auth/register', {
        nom,
        prenom,
        email,
        telephone,
        mot_de_passe: password,
        role: role.toLowerCase(),
      });
      alert(resp.data.message || 'Inscription réussie !');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Erreur inscription : ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <img src={logo} alt="logo" className="register-logo" />
        <h2>Créer un compte</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} required />
          <input placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Téléphone" value={telephone} onChange={e => setTelephone(e.target.value)} />

          {/* Mot de passe avec œil */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Confirmer mot de passe avec œil */}
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="agent">Agent</option>
            <option value="admin">.....</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>

        <p className="auth-text">
          Déjà inscrit ? <Link to="/login" className="auth-link">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
