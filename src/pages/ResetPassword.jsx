import React, { useState } from "react";
import axios from "axios";
import api from "../api";
import { useParams } from "react-router-dom";
import "./oublie.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/clients/reset-password/${token}`,
  { mot_de_passe: password }
);
      

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Erreur");
    }
  };

  return (
    
    <div className="auth-reset-container">
  
            
      <h2>Nouveau mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Valider</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;

