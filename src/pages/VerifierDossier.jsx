import { useState } from "react";
//import axios from "axios";
import api from "../services/api";
import "./VerifierDossier.css";
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";

export default function VerifierDossier() {

  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [type, setType] = useState("");
  const [historique, setHistorique] = useState([]);
  const [error, setError] = useState("");

  /* ================= SEARCH ================= */
  const handleSearch = async () => {

    setError("");
    setResult(null);
    setHistorique([]);

    try {

      const res = await api.post("/api/suivi/verifier", {
  numero_dossier: numero,
  email
});

      setResult(res.data.data);
      setType(res.data.type);

      // historique
      const hist = await api.get(`/api/suivi/historique/${numero}`);

      setHistorique(hist.data);

    } catch {
      setError("Aucun dossier trouvé");
    }
  };

  /* ================= DATE ================= */
  const formatDate = (date) =>
    date ? new Date(date).toLocaleString("fr-FR") : "-";

  /* ================= STATUS NORMALIZE ================= */
  const normalizeStatus = (status) => {
    if (!status) return "ENREGISTRE";

    const s = status.toUpperCase();

    if (s.includes("ATTENTE")) return "ENREGISTRE";
    if (s.includes("COURS")) return "EN_COURS";
    if (s.includes("VALIDE")) return "VALIDE";
    if (s.includes("TERMINE")) return "TERMINE";

    return "ENREGISTRE";
  };

  const getStepClass = (step) => {
    const order = ["ENREGISTRE","EN_COURS","VALIDE","TERMINE"];

    const current = normalizeStatus(result?.status);

    const currentIndex = order.indexOf(current);
    const stepIndex = order.indexOf(step);

    if (stepIndex < currentIndex) return "done";
    if (stepIndex === currentIndex) return "active";
    return "";
  };

  return (
    <>
      <Header1 />

      <div className="suivi-container">

        <h2>Suivre ma réclamation</h2>

        {/* SEARCH */}
        <div className="suivi-search">
          <input
            placeholder="CB-..., CA-..."
            value={numero}
            onChange={(e)=>setNumero(e.target.value)}
          />

          <input
            placeholder="Votre email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button onClick={handleSearch}>Rechercher</button>
        </div>

        {error && <p className="error">{error}</p>}

        {/* RESULT */}
        {result && (
          <div className="suivi-card">

            <div className="suivi-header">
              <h3>UBA SmartClaim</h3>
              <span className="badge">{type}</span>
            </div>

            <div className="suivi-info">
              <p><strong>Dossier :</strong> {result.numero_dossier}</p>
              <p><strong>Email :</strong> {result.email}</p>
              <p><strong>Téléphone :</strong> {result.telephone}</p>
              <p><strong>Guichet :</strong> {result.guichet}</p>
              <p><strong>Localité :</strong> {result.localite}</p>
              <p><strong>Date :</strong> {formatDate(result.created_at)}</p>
            </div>

            <div className="suivi-motif">
              <strong>Motif :</strong>
              <p>{result.raison}</p>
            </div>

            <div className={`status ${normalizeStatus(result.status)}`}>
              {result.status}
            </div>

            {/* ===== PROGRESS ===== */}
            <div className="progress-container">
              <div className={`step ${getStepClass("ENREGISTRE")}`}>
                <span>1</span><p>Enregistré</p>
              </div>
              <div className={`step ${getStepClass("EN_COURS")}`}>
                <span>2</span><p>En cours</p>
              </div>
              <div className={`step ${getStepClass("VALIDE")}`}>
                <span>3</span><p>Validé</p>
              </div>
              <div className={`step ${getStepClass("TERMINE")}`}>
                <span>4</span><p>Terminé</p>
              </div>
            </div>

            {/* ===== TIMELINE ===== */}
            {historique.length > 0 && (
              <div className="timeline">

                <h3>Historique du dossier</h3>

                {historique.map((item,index)=>(
                  <div key={index} className="timeline-item">

                    <div className="timeline-dot"></div>

                    <div className="timeline-content">
                      <strong>{item.action}</strong>
                      <p>{item.detail}</p>
                      <span>{formatDate(item.created_at)}</span>
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>
        )}
      </div>
       <Footer1 />
    </>
  );
}