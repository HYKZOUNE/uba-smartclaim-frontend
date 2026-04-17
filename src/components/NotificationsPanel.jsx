// frontend/src/components/NotificationsPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationsPanel({ reclamationId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/chargeback/${reclamationId}/notifications`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (reclamationId) fetchNotes();
    // optional: setInterval to poll every 30s
    // const id = setInterval(()=>fetchNotes(), 30000);
    // return ()=>clearInterval(id);
  }, [reclamationId]);

  if (loading) return <div>Chargement des notifications…</div>;
  if (!notes.length) return <div>Aucune notification pour ce dossier.</div>;

  return (
    <div className="notifications-card">
      <h3>Historique des notifications</h3>
      <ul>
        {notes.map(n => (
          <li key={n.id} className={`note ${n.type}`}>
            <div className="note-head">
              <strong>{n.type.toUpperCase()}</strong> — <small>{new Date(n.sent_at).toLocaleString()}</small>
            </div>
            <div className="note-message">{n.message}</div>
            <div className="note-channel">Canal: {n.channel}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
