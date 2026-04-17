// frontend/src/pages/CarteAvale.jsx
import React, { useState } from "react"; 
import "../pages/CarteAvale.css";
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";

export default function CarteAvale() {
  const [form, setForm] = useState({
    type_carte: "", numero_carte: "", numero_compte: "", telephone: "",
    email: "", raison: "", guichet: "", localite: "", transaction_date: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); 
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) return setError("Connectez-vous d'abord.");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      const res = await fetch("http://localhost:5000/api/carteavale/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` // ne pas mettre Content-Type pour FormData
        },
        body: formData
      });

      const result = await res.json();
      if (!res.ok) return setError(result.error || "Erreur lors de l'envoi.");

      setSuccess(`✔ Réclamation envoyée ! Dossier N°: ${result.numero_dossier}`);
      setForm({
        type_carte: "", numero_carte: "", numero_compte: "", telephone: "",
        email: "", raison: "", guichet: "", localite: "", transaction_date: ""
      });
    } catch (err) {
      console.error(err);
      setError("Erreur serveur.");
    }
  };

  return (
    <>
      <Header1 />
      <div className="form-container">
        <h2>Réclamation Carte Avalée</h2>
        {error && <div className="failure-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="form-grid">

          <div className="form-group">
            <select name="type_carte" value={form.type_carte} onChange={handleInput}>
              <option value=""> </option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Prepaid">Carte prépayée</option>
            </select>
            <label>Type de carte (facultatif)</label>
          </div>

          <div className="form-group">
            <input type="text" name="numero_carte" placeholder=" " value={form.numero_carte} onChange={handleInput} />
            <label>Numéro de carte</label>
          </div>

          <div className="form-group">
            <input type="text" name="numero_compte" placeholder=" " value={form.numero_compte} onChange={handleInput} />
            <label>Numéro de compte</label>
          </div>

          <div className="form-group">
            <input type="tel" name="telephone" placeholder=" " value={form.telephone} onChange={handleInput} required />
            <label>Téléphone *</label>
          </div>

          <div className="form-group">
            <input type="email" name="email" placeholder=" " value={form.email} onChange={handleInput} required />
            <label>Email *</label>
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <textarea name="raison" placeholder=" " value={form.raison} onChange={handleInput} required />
            <label>Raison *</label>
          </div>

          <div className="form-group">
            <input type="text" name="localite" placeholder=" " value={form.localite} onChange={handleInput} required />
            <label>Localité *</label>
          </div>

          <select name="guichet" value={form.guichet} onChange={handleInput} required className="input">
            <option value="">-- Guichet utilisé * --</option>
            <option value="UBA Tchad">UBA Tchad</option>
            <option value="Ecobank">Ecobank</option>
            <option value="SGT">SGT</option>
            <option value="BIAT">BIAT</option>
            <option value="CBT">CBT</option>
            <option value="Autre">Autre (précisez dans la localité)</option>
          </select>

          <div className="form-group">
            <input type="date" name="transaction_date" value={form.transaction_date} onChange={handleInput} required />
            <label>Date de transaction *</label>
          </div>

          <button type="submit" className="submit-btn">Soumettre</button>
        </form>
      </div>
       <Footer1 />
    </>
  );
}