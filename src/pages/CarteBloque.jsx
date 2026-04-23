// frontend/src/pages/CarteBloque.jsx
import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "../pages/CarteBloque.css";
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";

export default function CarteBloque() {
  const sigCanvas = useRef(null);
  const [form, setForm] = useState({
    type_carte: "", numero_carte: "", numero_compte: "", telephone: "",
    email: "", raison: "", guichet: "", localite: "", transaction_date: "",
    transaction_time: "", uploads: [], signature: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFiles = e => setForm({ ...form, uploads: Array.from(e.target.files).slice(0, 3) });
  const clearSignature = () => { sigCanvas.current.clear(); setForm({ ...form, signature: "" }); };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) return setError("Connectez-vous d'abord.");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "uploads") value.forEach(f => formData.append("uploads", f));
      else formData.append(key, value);
    });
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) formData.set("signature", sigCanvas.current.toDataURL());

   try {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/cartebloque/new`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    }
  );
      const result = await res.json();
      if (!res.ok) return setError(result.error || "Erreur lors de l'envoi.");
      setSuccess(`✔ Réclamation envoyée ! Dossier N°: ${result.numero_dossier}`);
      setForm({
        type_carte: "", numero_carte: "", numero_compte: "", telephone: "",
        email: "", raison: "", guichet: "", localite: "", transaction_date: "",
        transaction_time: "", uploads: [], signature: ""
      });
      sigCanvas.current.clear();
    } catch (err) {
      console.error(err);
      setError("Erreur serveur.");
    }
  };

  return (
    <>
      <Header1 />

     
      <div className="form-container">
     <h2>Formulaire de blocage des cartes</h2>
        {error && <div className="failure-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="form-grid">

          {/* Type de carte */}
          <div className="form-group">
            <select name="type_carte" value={form.type_carte} onChange={handleInput}>
              <option value=""> </option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Prepaid">Carte prépayée</option>
            </select>
            <label>Type de carte (facultatif)</label>
          </div>

          {/* Numéro de carte */}
          <div className="form-group">
            <input type="text" name="numero_carte" placeholder=" " value={form.numero_carte} onChange={handleInput} />
            <label>Numéro de carte</label>
          </div>

          {/* Numéro de compte */}
          <div className="form-group">
            <input type="text" name="numero_compte" placeholder=" " value={form.numero_compte} onChange={handleInput} />
            <label>Numéro de compte</label>
          </div>

          {/* Téléphone */}
          <div className="form-group">
            <input type="tel" name="telephone" placeholder=" " value={form.telephone} onChange={handleInput} required />
            <label>Téléphone *</label>
          </div>

          {/* Email */}
          <div className="form-group">
            <input type="email" name="email" placeholder=" " value={form.email} onChange={handleInput} required />
            <label>Email *</label>
          </div>

          {/* Raison */}
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <textarea name="raison" placeholder=" " value={form.raison} onChange={handleInput} required />
            <label>Raison *</label>
          </div>

          {/* Localité */}
          <div className="form-group">
            <input type="text" name="localite" placeholder=" " value={form.localite} onChange={handleInput} required />
            <label>Localité *</label>
          </div>

          {/* Guichet */}
          <select name="guichet" value={form.guichet} onChange={handleInput} required className="input">
          <option value="">-- Guichet utilisé * --</option>
          <option value="UBA Tchad">UBA Tchad</option>
          <option value="Ecobank">Ecobank</option>
          <option value="SGT">SGT</option>
          <option value="BIAT">BIAT</option>
          <option value="CBT">CBT</option>
          <option value="UBA Nigeria">UBA Nigeria</option>
          <option value="Ecobank Nigeria">Ecobank Nigeria</option>
          <option value="BOA Niger">BOA Niger</option>
          <option value="Ecobank Cameroun">Ecobank Cameroun</option>
          <option value="Standard Bank South Africa">Standard Bank South Africa</option>
          <option value="Access Bank Nigeria">Access Bank Nigeria</option>
          <option value="Barclays Kenya">Barclays Kenya</option>
          <option value="BNP Paribas">BNP Paribas</option>
          <option value="Société Générale">Société Générale</option>
          <option value="Barclays">Barclays</option>
          <option value="HSBC">HSBC</option>
          <option value="Autre">Autre (précisez dans la localité)</option>
        </select>

          {/* Date transaction */}
          <div className="form-group">
            <input type="date" name="transaction_date" value={form.transaction_date} onChange={handleInput} required />
            <label>Date de transaction *</label>
          </div>

          {/* Heure transaction */}
          <div className="form-group">
            <input type="time" name="transaction_time" value={form.transaction_time} onChange={handleInput} required />
            <label>Heure de transaction *</label>
          </div>

          {/* Upload fichiers */}
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <input type="file" name="uploads" multiple onChange={handleFiles} />
            <span className="file-note">Vous pouvez télécharger jusqu'à 3 fichiers.</span>
          </div>

          {/* Signature */}
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <SignatureCanvas ref={sigCanvas} penColor="red" canvasProps={{ width: 500, height: 150, className: "signature-pad" }} />
          </div>

          {/* Boutons */}
          <button type="button" className="clear-signature" onClick={clearSignature}>Effacer signature</button>
          <button type="submit" className="submit-btn">Soumettre</button>

        </form>
      </div>
       <Footer1 />
    </>
  );
  
}
