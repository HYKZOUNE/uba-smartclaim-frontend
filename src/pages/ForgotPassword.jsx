import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/clients/forgot-password`,
  { email }
);

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Erreur");
    }
  };

  return (
    <div className="auth-reset-container">


      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Mot de passe oublié</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Entrer votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Envoyer</button>
          </form>

          <p className="auth-message">{message}</p>
        </div>
      </div>

    </div>
  );
};

export default ForgotPassword;