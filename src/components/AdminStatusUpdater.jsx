// frontend/src/components/AdminStatusUpdater.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AdminStatusUpdater({ reclamationId, onDone }) {
  const [status, setStatus] = useState("en_cours");
  const [note, setNote] = useState("");
  const [channels, setChannels] = useState({ email: true, sms: true });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(`http://localhost:5000/api/chargeback/${reclamationId}/status`, {
        status,
        note,
        channels: Object.keys(channels).filter(k=>channels[k])
      });
      alert(res.data.message || "OK");
      onDone && onDone();
    } catch (err) {
      console.error(err);
      alert("Erreur mise à jour statut");
    } finally { setLoading(false); }
  };

  return (
    <div className="admin-panel">
      <h4>Mettre à jour le statut</h4>
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="en_cours">En cours</option>
        <option value="investigation">Investigation</option>
        <option value="resolu">Résolu</option>
        <option value="rejete">Rejeté</option>
      </select>
      <textarea placeholder="Note ou raison (optionnel)" value={note} onChange={e=>setNote(e.target.value)} />
      <div>
        <label><input type="checkbox" checked={channels.email} onChange={e=>setChannels(c=>({...c, email:e.target.checked}))} /> Email</label>
        <label style={{marginLeft:12}}><input type="checkbox" checked={channels.sms} onChange={e=>setChannels(c=>({...c, sms:e.target.checked}))} /> SMS</label>
      </div>
      <button onClick={submit} disabled={loading}>{loading ? "Envoi..." : "Envoyer"}</button>
    </div>
  );
}
