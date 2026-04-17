import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import bg from "../assets/bg.jpg";
import './ClientRegister.css';

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/clients/login", {
        email,
        mot_de_passe: password
      });

      localStorage.setItem("token", res.data.token);
      setTypeMessage("success");
      setMessage("Connexion réussie !");

      setTimeout(() => {
        navigate("/reclamation");
      }, 1000);

    } catch (err) {
      setTypeMessage("error");
      setMessage(err.response?.data?.error || "Connexion impossible");
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      {/* LEFT */}
            <div
              className="auth-left"
              style={{
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bg}) center/cover no-repeat`
              }}
            >
              <h1>Donnez vie à vos idées</h1>
              <p>UBA SmartClaim</p>
            </div>
            
      <div className="register-card">
        <h2>Connexion Client</h2>

        {message && (
          <div className={`message ${typeMessage}`}>{message}</div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Connexion en cours..." : "Se connecter"}
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

export default ClientLogin;





















