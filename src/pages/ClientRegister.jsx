import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import axios from "axios";             
import './ClientRegister.css';

const ClientRegister = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    numero_compte: "",
    telephone: "",
    mot_de_passe: "",
    confirmation_mot_de_passe: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  // ✅ AJOUT PASSWORD RULES
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  // ✅ VALIDATION PASSWORD
  const validatePassword = (password) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    };

    setPasswordRules(rules);
    return Object.values(rules).every(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "mot_de_passe") {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.mot_de_passe !== form.confirmation_mot_de_passe) {
      setTypeMessage("error");
      setMessage("Le mot de passe et la confirmation ne correspondent pas.");
      return;
    }

    // ✅ AJOUT SECURITE PASSWORD
    if (!validatePassword(form.mot_de_passe)) {
      setTypeMessage("error");
      setMessage("Mot de passe trop faible !");
      return;
    }

    setLoading(true);
    
    try {
      await api.post("/api/clients/register", {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        numero_compte: form.numero_compte,
        telephone: form.telephone,
        mot_de_passe: form.mot_de_passe
    });

      setTypeMessage("success");
      setMessage("Compte créé avec succès !");
      setForm({
        nom: "",
        prenom: "",
        email: "",
        numero_compte: "",
        telephone: "",
        mot_de_passe: "",
        confirmation_mot_de_passe: "",
      });

    } catch (err) {
      setTypeMessage("error");
      setMessage(err.response?.data?.error || "Erreur d'inscription");
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Création de compte client</h2>

        {message && (
          <div className={`message ${typeMessage}`}>{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
          <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="text" name="numero_compte" placeholder="Numéro de compte" value={form.numero_compte} onChange={handleChange} required />
          <input type="text" name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />

          {/* PASSWORD */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="mot_de_passe"
              placeholder="Mot de passe"
              value={form.mot_de_passe}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmation_mot_de_passe"
              placeholder="Confirmez le mot de passe"
              value={form.confirmation_mot_de_passe}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* 🔥 REGLES PASSWORD */}
          <div className="password-rules">
            <p style={{ color: passwordRules.length ? "green" : "red" }}>
              • Au moins 8 caractères
            </p>
            <p style={{ color: passwordRules.uppercase ? "green" : "red" }}>
              • Une majuscule
            </p>
            <p style={{ color: passwordRules.lowercase ? "green" : "red" }}>
              • Une minuscule
            </p>
            <p style={{ color: passwordRules.number ? "green" : "red" }}>
              • Un chiffre
            </p>
            <p style={{ color: passwordRules.symbol ? "green" : "red" }}>
              • Un symbole
            </p>
          </div>

        

          <button type="submit" disabled={loading}>
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

        <p className="already-registered">
          Déjà inscrit ?{" "}
          <Link to="/login" className="login-link">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ClientRegister;