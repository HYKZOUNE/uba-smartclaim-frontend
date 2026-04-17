// AgentReclamationForm.jsx
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./ReclamationForm.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/chargeback";

export default function AgentReclamationForm() {
  const sigPad = useRef(null);
  const [form, setForm] = useState({
    nom_client: "",
    prenom_client: "",
    telephone_client: "",
    email_client: "",
    montant_transaction: "",
    raison: "",
    guichet: "",
    localite: "",
    uploads: []
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0,3);
    const tooBig = files.find(f => f.size > 5*1024*1024);
    if (tooBig) { setError("Fichiers > 5MB non acceptés."); return; }
    setForm(prev => ({ ...prev, uploads: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setResult(null);

    if (!form.telephone_client) { setError("Téléphone client requis."); return; }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) { setError("Non autorisé. Connectez-vous."); setLoading(false); return; }

      const formData = new FormData();
      Object.entries(form).forEach(([k,v]) => {
        if (k === "uploads") return;
        formData.append(k, v ?? "");
      });

      if (sigPad.current && !sigPad.current.isEmpty()) {
        formData.append("signature", sigPad.current.getTrimmedCanvas().toDataURL("image/png"));
      }
      form.uploads.forEach(f => formData.append("uploads", f, f.name));

      const resp = await fetch(`${API_URL}/new`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData
      });
      const json = await resp.json();
      if (!json.success) { setError(json.message || "Erreur backend"); setLoading(false); return; }
      setResult({ numero_dossier: json.numero_dossier });
      setForm({ nom_client:"", prenom_client:"", telephone_client:"", email_client:"", montant_transaction:"", raison:"", guichet:"", localite:"", uploads:[] });
      try { sigPad.current.clear(); } catch {}
    } catch (err) {
      setError("Erreur envoi");
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <div className="form-container">
      <h2>Agent — Enregistrer une réclamation client</h2>
      {error && <div className="failure-message">{error}</div>}
      {result && <div className="success-message">Dossier créé : <strong>{result.numero_dossier}</strong></div>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input name="nom_client" placeholder="Nom client" value={form.nom_client} onChange={handleInput} className="input"/>
        <input name="prenom_client" placeholder="Prénom client" value={form.prenom_client} onChange={handleInput} className="input"/>
        <input name="telephone_client" placeholder="Téléphone client" value={form.telephone_client} onChange={handleInput} className="input" required/>
        <input name="email_client" placeholder="Email client" value={form.email_client} onChange={handleInput} className="input"/>
        <input name="montant_transaction" placeholder="Montant transaction" value={form.montant_transaction} onChange={handleInput} className="input"/>
        <textarea name="raison" placeholder="Raison" value={form.raison} onChange={handleInput} className="input"/>
        <select name="guichet" value={form.guichet} onChange={handleInput} className="input">
          <option value="">-- Guichet --</option>
          <option>UBA Tchad</option>
          <option>Ecobank Tchad</option>
          <option>Autre</option>
        </select>
        <input name="localite" placeholder="Localité" value={form.localite} onChange={handleInput} className="input"/>
        <input type="file" name="uploads" multiple accept="image/*,application/pdf" onChange={handleFiles} className="input"/>
        <div className="signature-box">
          <SignatureCanvas ref={sigPad} penColor="black" canvasProps={{ width: 600, height: 130, className: 'signature-canvas' }} />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>{loading ? "Envoi..." : "Enregistrer"}</button>
      </form>
    </div>
  );
}
