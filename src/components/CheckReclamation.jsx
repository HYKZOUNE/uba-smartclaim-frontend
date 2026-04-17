import React, { useState } from "react";
import axios from "axios";
import "./CheckReclamation.css";

export default function CheckReclamation() {
  const [numeroDossier, setNumeroDossier] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Récupère ton token depuis le localStorage (ou autre endroit)
  const token = localStorage.getItem("token"); // Assure-toi que c'est le bon key

  const handleSearch = async () => {
    if (!numeroDossier) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/chargeback/numero_dossier/${numeroDossier}`,
        {
          headers: {
            Authorization: `Bearer ${token}` // <-- ici le token
          }
        }
      );
      

      if (res.data.success) {
        setResult(res.data.data);
      } else {
        setError("Dossier introuvable");
      }
    } catch (err) {
      setError("Aucun dossier trouvé avec ce numéro");
    } finally {
      setLoading(false);
    }
  };
//============= rembourcement  =================
  const remboursable = result
  ? (
      parseFloat(result.montant_transaction) +
      parseFloat(result.montant_frais)
    ).toFixed(2)
  : "0.00";
//===========  nom    ================
  const clientName = result?.email
  ? result.email
      .split("@")[0]          // enlève @gmail.com
      .replace(/[._-]/g, " ") // remplace . _ - par espace
      .toUpperCase()          // optionnel : majuscules
  : "-";
//============ heure et date    ==============
  const formatDateTime = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} et ${hours}:${minutes}`;
};




  return (
    <div className="check-reclamation">
      <h2>🔍 Vérifier un dossier de rétrofacturation</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="CB-2025-00000"
          value={numeroDossier}
          onChange={(e) => setNumeroDossier(e.target.value)}
        />
        <button onClick={handleSearch}>
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {result && (
        <div className="chargeback-card">
          <div className="cb-header">
            <h3>UNITED BANK FOR AFRICA</h3>
            <p>Demande de rétrofacturation (Chargeback)</p>
          </div>

          <div className="cb-section">
            <span><strong>Dossier :</strong> {result.numero_dossier}</span>
            <span className={`status ${result.status}`}>{result.status.toUpperCase()}</span>
          </div>

          <div className="cb-grid">
            <p><strong>Nom du Client :</strong> {clientName}</p>
            <p><strong>Email :</strong> {result.email}</p>
            <p><strong>Téléphone :</strong> {result.telephone}</p>
            <p><strong>Carte :</strong> {result.numero_carte}</p>
            <p><strong>Compte :</strong> {result.numero_compte}</p>
            <p><strong>Guichet :</strong> {result.guichet}</p>
            <p><strong>Localité :</strong> {result.localite}</p>
            <p>
  <strong>Date transaction :</strong>{" "}
  {formatDateTime(result.transaction_date)}
</p>

<p>
  <strong>Créé le :</strong>{" "}
  {formatDateTime(result.created_at)}
</p>

          </div>

          <hr />

          <div className="cb-amounts">
            <p><strong>Transaction :</strong> {result.montant_transaction.toLocaleString()} FCFA</p>
            <p><strong>Frais :</strong> {result.montant_frais.toLocaleString()} FCFA</p>
            <p className="remboursable">
              <strong>Remboursable :</strong> {remboursable.toLocaleString()} FCFA
            </p>
          </div>

          <div className="cb-motif">
            <strong>Motif</strong>
            <p>{result.raison}</p>
          </div>

          <div className="cb-footer">
            <div>
              <p>Signature client</p>
              <div className="signature-line"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
