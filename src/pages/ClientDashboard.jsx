import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

export default function ClientDashboard() {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/clients/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setReclamations(res.data.reclamations || []);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  if (loading) return <div className="p-10 text-center text-xl">Chargement...</div>;

  return (
    <div className="vm-container">
      <aside className="vm-sidebar">
        <div className="vm-title">Client Dashboard</div>
        <ul className="vm-menu">
          <li className="active">Dashboard</li>
          <li>Mes Réclamations</li>
        </ul>
      </aside>

      <main className="vm-main">
        <div className="vm-top-buttons">
          <button className="btn refresh" onClick={fetchDashboard}>Refresh</button>
          <button className="btn logout" onClick={() => localStorage.clear()}>Logout</button>
        </div>

        <h1 className="vm-header">Mes Réclamations</h1>

        <table className="vm-table">
          <thead>
            <tr>
              <th>Dossier</th>
              <th>Type Carte</th>
              <th>Compte</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Créé le</th>
            </tr>
          </thead>
          <tbody>
            {reclamations.length === 0 && (
              <tr><td colSpan="6" className="vm-nodata">Aucune réclamation trouvée</td></tr>
            )}
            {reclamations.map((r) => (
              <tr key={r.id}>
                <td>{r.numero_dossier}</td>
                <td>{r.type_carte}</td>
                <td>{r.numero_compte}</td>
                <td>{r.montant_transaction}</td>
                <td>{r.status}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
