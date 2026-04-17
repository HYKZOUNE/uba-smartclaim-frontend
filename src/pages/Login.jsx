import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import api from '../api';
import './Login.css';
import logo from '../assets/FB_IMG_1762767457367.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await api.post("/api/auth/login", { 
        email, 
        mot_de_passe: password 
      });

      if (!resp.data.token || !resp.data.role) {
        alert("Réponse serveur invalide");
        return;
      }

      // ✅ Stockage
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("role", resp.data.role);

      // ✅ Redirection selon rôle
      if (resp.data.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } 
      else if (resp.data.role === "agent") {
        navigate("/agent/dashboard", { replace: true });
      } 
      else if (resp.data.role === "client") {
        navigate("/reclamation", { replace: true }); // 🔥 AJOUT IMPORTANT
      }
      
      else {
        alert("Accès non autorisé");
        localStorage.clear();
      }

    } catch (err) {
      alert(err.response?.data?.error || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <img src={logo} alt="logo" className="register-logo" />
        <h2>Connexion</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p>
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </p>

        <p className="already-registered">
          Pas de compte ?{" "}
          <Link to="/ClientRegister" className="login-link">
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;