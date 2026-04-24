import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import CountUp from "react-countup";
import "./AdminDashboard.css";
import ChargebackA4 from "../components/ChargebackA4";
import { useNavigate } from 'react-router-dom';


// ⚡ IMPORTS CORRIGÉS POUR LES VUES
import AddReclamation from "../components/AddReclamation";
import CheckReclamation from "../components/CheckReclamation";
import Rapport from "../components/Rapport";
import ProfilAdmin from "../components/ProfilAdmin";
import AboutUBA from "../components/AboutUBA";
import ReclamationForm from "./ReclamationForm";
import CarteBloque from "./CarteBloque";
import CarteAvale from "./CarteAvale";
import VerifierDossier from "./VerifierDossier";
import ClientRegister from "./ClientRegister";
import Register from "./Register";

// ================== TOAST ==================
const Toast = ({ message, type, onClose }) => (
  <div className={`toast ${type}`}>
    {message}
    <button onClick={onClose}>×</button>
  </div>
);

export default function AdminDashboard() {
  // ================== STATES ==================
  const [stats, setStats] = useState({
    totalReclamations: 0,
    totalClients: 0,
    totalAgents: 0,
    totalCarteBloquees: 0,
    totalCarteAvale: 0,
    enAttente: 0,
    validees: 0,
    rejetees: 0,
    paye: 0,
  });

  const [newCounts] = useState({
    reclamations: 0,
    cartebloquees: 0,
    carteavale: 0,
    clients: 0,
    agents: 0,
    attente: 0,
    validees: 0,
    rejetees: 0,
    paye: 0,
  });

  const [view, setView] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState(null);
  const [admin, setAdmin] = useState({ prenom: "", nom: "", email: "" });
  const [activeTable, setActiveTable] = useState("reclamations");
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const perPage = 10;
  const token = localStorage.getItem("token");
  const printRef = useRef();
  const navigate = useNavigate();
  

  // ================== TOAST ==================
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };





  // 🔥 fonctions (à mettre en haut de ton composant)
const handleDecision = async (id, decision) => {
  try {
  const token = localStorage.getItem("token");

  await axios.post(
    `${process.env.REACT_APP_API_URL}/api/admin/chargeback/${id}/decision`,
    { decision },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

    alert("Décision envoyée avec succès");
  } catch (err) {
    console.error(err);
    alert("Erreur serveur");
  }
};


  // ================== TABLE COLUMNS ==================
  const tableColumns = {
    reclamations: ["id", "numero_dossier", "numero_compte", "telephone", "montant_transaction", "guichet", "localite", "transaction_date", "status"],
    cartebloquees: ["id", "numero_dossier", "numero_carte", "numero_compte", "telephone", "guichet", "localite", "transaction_date", "status"],
    CarteAvale: ["id", "numero_dossier", "numero_carte", "numero_compte", "telephone", "guichet", "localite", "transaction_date", "status"],
    clients: ["id", "nom", "prenom", "email", "telephone", "numero_compte"],
    agents: ["id", "nom", "prenom", "email", "role"],
    attente: ["id", "numero_dossier", "numero_compte", "telephone", "montant_transaction", "guichet", "localite", "transaction_date", "status"],
    validees: ["id", "numero_dossier", "numero_compte", "telephone", "montant_transaction", "guichet", "localite", "transaction_date", "status"],
    rejetees: ["id", "numero_dossier", "numero_compte", "telephone", "montant_transaction", "guichet", "localite", "transaction_date", "status"],
    paye: ["id", "numero_dossier", "numero_compte", "telephone", "montant_transaction", "guichet", "localite", "transaction_date", "status"]
  };

  // ================== LOAD TABLE ==================
  const loadTable = useCallback(
    async (type) => {
      setActiveTable(type);
      setPage(1);
      setSelectedIds([]);
      setLoading(true);
      try {
  let url = "";
  switch (type) {
    case "reclamations": url = "/api/admin/chargeback/all"; break;
    case "cartebloquees": url = "/api/admin/cartebloquees"; break;
    case "CarteAvale": url = "/api/admin/carteavale"; break;
    case "clients": url = "/api/admin/clients"; break;
    case "agents": url = "/api/admin/agents"; break;
    case "attente": url = `/api/admin/chargeback/status/en-attente`; break;
    case "validees": url = `/api/admin/chargeback/status/valide`; break;
    case "rejetees": url = `/api/admin/chargeback/status/rejete`; break;
    case "paye": url = `/api/admin/chargeback/status/paye`; break;
    default: setAllData([]); setLoading(false); return;
  }

  await axios.get(
    `${process.env.REACT_APP_API_URL}${url}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then(res => setAllData(res.data.data || []));

} catch (err) {
  console.error(err);
  showToast("Erreur lors du chargement des données", "error");
} finally {
  setLoading(false);
}
},
[token]
);
  // ================== FETCH DASHBOARD & PROFILE ==================
  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
  await axios.get(
    `${process.env.REACT_APP_API_URL}/api/admin/dashboard`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then(res => {
    if (res.data.success) {
      setStats(res.data.stats);
      setAllData(res.data.reclamations || []);
    }
  });

  await axios.get(
    `${process.env.REACT_APP_API_URL}/api/admin/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then(profile => {
    if (profile.data.success) setAdmin(profile.data.user);
  });

    } catch (err) {
      console.error(err);
      showToast("Impossible de charger le dashboard", "error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  // ================== CLICK SUR LES CARTES ==================
  const handleCardClick = (type) => { loadTable(type); };

  const selectAll = () => {
    if (selectedIds.length === paginated.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginated.map(r => r.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  // ================== DELETE ==================
// ================== DELETE ==================
const handleDelete = async (id) => {
  if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;

  const tableRouteMap = {
    reclamations: "chargeback",
    cartebloquees: "cartebloquees",
    CarteAvale: "carteavale",
    clients: "clients",
    agents: "users",
  };

  const route = tableRouteMap[activeTable];

  if (!route) {
    alert("Suppression non supportée !");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const url = `${process.env.REACT_APP_API_URL}/api/admin/${route}/${id}`;

    console.log("DELETE =>", url);

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    showToast("Supprimé avec succès", "success");
    loadTable(activeTable);

  } catch (err) {
    console.error("❌ DELETE ERROR:", err.response?.data || err.message);
    showToast("Erreur suppression", "error");
  }
};

  // ================== EXPORT EXCEL ==================
  const exportExcel = () => {
    const data = selectedIds.length ? allData.filter(d => selectedIds.includes(d.id)) : allData;
    if (!data.length) return showToast("Aucune donnée", "error");

    const wb = XLSX.utils.book_new();
    const safeData = data.map(row => {
      const cleanRow = {};
      Object.keys(row).forEach(key => {
        const value = row[key];
        cleanRow[key] =
          typeof value === "string"
            ? value.slice(0, 200)
            : value ?? "";
      });
      return cleanRow;
    });

    const ws = XLSX.utils.json_to_sheet(safeData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${activeTable}.xlsx`);
  };

  // ================== EXPORT PDF ==================
  const exportPDF = async () => {
  const data = selectedIds.length
    ? allData.filter(d => selectedIds.includes(d.id))
    : allData;

 try {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/export-pdf`,
    { dossiers: data },
    { responseType: "blob" }
  );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "UBA_Dossiers.pdf");
    link.click();
  } catch (err) {
    console.error("Erreur export PDF :", err);
  }
};


  // ================== ACTION DECISION ==================
  const actionDecision = async (id, message, type) => {
    try {
  let url = "";
  switch(type){
    case "chargeback": url = `/api/admin/chargeback/${id}/decision`; break;
    case "cartebloquees": url = `/api/admin/cartebloquees/${id}/decision`; break;
    case "CarteAvale": url = `/api/admin/carteavale/${id}/decision`; break;
    default: return;
  }

  await axios.post(
    `${process.env.REACT_APP_API_URL}${url}`,
    { message },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

      showToast(`Décision "${message}" envoyée avec succès`);
    } catch (err) {
      console.error("❌ Erreur décision :", err.response || err);
      showToast("Action refusée ou non autorisée", "error");
    }
  };

  // ================== SEARCH & PAGINATION ==================
  const filtered = allData.filter(item =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // ================== RENDER VIEW ==================
  const renderView = () => {
    switch (view) {
      case "rapport": return <Rapport />;
      case "addreclamation": return <AddReclamation />;
      case "checkreclamation": return <CheckReclamation />;
      case "VerifierDossier": return <VerifierDossier/>;
      case "profils": return <ProfilAdmin />;
      case "ReclamationForm": return <ReclamationForm/>;
      case "CarteBloque": return <CarteBloque/>;
      case "CarteAvale": return <CarteAvale/>;
      case "ClientRegister": return <ClientRegister/>;
      case "Register": return <Register/>;
      case "about": return <AboutUBA />;
      default: return null;
    }
  };

  useEffect(() => {
    if (view === "add-reclamation" || view === "check-reclamation") {
      setOpenMenu("reclamation");
    }
  }, [view]);

  // ================== RENDER ==================
  return (
    <div className="vm-container">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

  

      {/* ================= SIDEBAR ================= */}
      <aside className="vm-sidebar premium">
        <div className="admin-header">
          <span className="admin-icon"></span> {admin.prenom} {admin.nom}
        </div>

        <ul className="vm-menu">
          <li className={view === "dashboard" ? "active-menu" : ""} onClick={() => setView("dashboard")}>
            <span className="menu-icon">📊</span> Dashboard
          </li>

          <li className={view.includes("reclamation") ? "active-menu" : ""} onClick={() => setOpenMenu(openMenu === "reclamation" ? null : "reclamation")}>
            <span className="menu-icon">📂</span> Réclamations
          </li>
          {(openMenu === "reclamation" || view.includes("reclamation")) && (
            <ul className="vm-submenu animated">
              <li onClick={() => setView("ReclamationForm")}>Chargeback</li>
              <li onClick={() => setView("CarteBloque")}>CarteBloquée</li>
              <li onClick={() => setView("CarteAvale")}>CarteAvalée</li>
              <li onClick={() => setView("VerifierDossier")}>🔍 SuiviDossiers</li>
            </ul>
          )}

          <li className={view === "ClientRegister" ? "active-menu" : ""} onClick={() => setView("ClientRegister")}>
            <span className="menu-icon">👥</span> AjouterClients
          </li>

          <li className={view === "Register" ? "active-menu" : ""} onClick={() => setView("Register")}>
            <span className="menu-icon">🧑</span> AjouterAgents
          </li>

          <li className={view === "rapport" ? "active-menu" : ""} onClick={() => setView("rapport")}>
            <span className="menu-icon">📑</span> Rapport
          </li>

          <li className={view === "profils" ? "active-menu" : ""} onClick={() => setView("profils")}>
            <span className="menu-icon">👤</span> Profils
          </li>

          

          <li className={view === "about" ? "active-menu" : ""} onClick={() => setView("about")}>
            <span className="menu-icon">ℹ️</span>  À propos SmartClaim
          </li>
        </ul>
      </aside>


      {/* ================= MAIN ================= */}
<main className="vm-main">
  {view === "dashboard" && (
    <>
      <div className="vm-top-buttons">
        <button className="btn refresh" onClick={fetchDashboard}>🔄 Actualiser</button>
        {/* =================    <button className="btn export" onClick={exportPDF}>PDF Chargeback</button>    ================= */}
        <button className="btn export" onClick={exportPDF}>PDF Listes</button>
        <button className="btn export" onClick={exportExcel}>Excel</button>
        <button className="btn logout" onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>Déconnexion</button>
      </div>

      <h1 className="vm-header">
        <span className="vm-header-text">
          📊 Tableau de bord Admin — UBA SmartClaim
        </span>
      </h1>

      {loading && <div className="vm-loading">Chargement...</div>}

      {/* ================= CARDS ================= */}
<div className="vm-cards">
  {[
    { title: "Total Chargebacks", key: "reclamations", value: stats.totalReclamations },
    { title: "Carte Bloquées", key: "cartebloquees", value: stats.totalCarteBloquees },
    { title: "Cartes Avalées", key: "CarteAvale", value: stats.totalCarteAvale },
    { title: "Clients", key: "clients", value: stats.totalClients },
    { title: "Agents", key: "agents", value: stats.totalAgents },
    { title: "Chargebacks - En attente", key: "attente", value: stats.enAttente },
    { title: "Chargebacks - Validées", key: "validees", value: stats.validees },
    { title: "Chargebacks - Rejetées", key: "rejetees", value: stats.rejetees },
    { title: "Chargebacks - Payées", key: "paye", value: stats.paye }
  ].map(card => (
    <div
      key={card.key}
      className={`vm-card ${card.key}`}
      onClick={() => {
        setActiveTable(card.key);   // ⚡ assure que la table change
        handleCardClick(card.key);  // ⚡ charge les données correctes
      }}
    >
      <div className="vm-card-title">{card.title}</div>

      <div className="vm-card-value">
        <CountUp
          key={card.value}                  // ⚡ force recalcul si valeur change
          start={0}
          end={Number(card.value) || 0}     // ⚡ toujours un nombre
          duration={1.5}
          separator=","
          redraw={true}                     // ⚡ redraw pour mise à jour
        />
      </div>

      {newCounts[card.key] > 0 && (
        <span className="vm-badge">+{newCounts[card.key]}</span>
      )}
    </div>
  ))}
</div>

     {/* ================= SEARCH + PAGINATION ================= */}
<div className="vm-table-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
  {/* Barre de recherche à gauche */}
  <input
    type="text"
    placeholder="Rechercher............."
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="vm-search"
    style={{ flex: "1", marginRight: "10px", padding: "5px 10px" }}
  />

  {/* Pagination à droite */}
  <div className="pagination" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="btn-small"
    >
      ◀ Précédent
    </button>
    <span>Page {page} / {totalPages}</span>
    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className="btn-small"
    >
      Suivant ▶
    </button>
  </div>
</div>

{/* ================= TABLE ================= */}
<table className="vm-table">
  <thead>
    <tr>
      <th>
        <input
          type="checkbox"
          onChange={selectAll}
          checked={selectedIds.length === paginated.length && paginated.length > 0}
        />
      </th>
      {tableColumns[activeTable]?.map(col => <th key={col}>{col}</th>)}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {paginated.length === 0 ? (
      <tr>
        <td colSpan={(tableColumns[activeTable]?.length || 0) + 2} className="vm-nodata">
          Aucune donnée trouvée
        </td>
      </tr>
    ) : (
      paginated.map((r) => (
        <tr key={r.id} className={selectedIds.includes(r.id) ? "selected-row" : ""}>
          <td>
            <input
              type="checkbox"
              checked={selectedIds.includes(r.id)}
              onChange={() => toggleSelect(r.id)}
            />
          </td>

          {tableColumns[activeTable]?.map((col) => (
            <td key={`${r.id}-${col}`}>{r[col]}</td>
          ))}

          {/* ================= DYNAMIQUE ACTIONS ================= */}
          <td className="actions-cell">
            <button
  className="btn-small view"
  onClick={() => setModalData(r)}
  title="Voir"
>
  👁️
</button>

{(() => {
  switch (activeTable) {
    case "reclamations":
      return (
        <>
          {/* ✅ VALIDER */}
          <button
            className="btn-small success"
            onClick={() => handleDecision(r.id, "valider")}
            title="Valider"
          >
            ✅
          </button>

          {/* ❌ REJETER */}
          <button
            className="btn-small danger"
            onClick={() => handleDecision(r.id, "rejeter")}
            title="Rejeter"
          >
            ❌
          </button>

          {/* 💰 PAYER */}
          <button
            className="btn-small warning"
            onClick={() => handleDecision(r.id, "payer")}
            title="Payer"
          >
            💰
          </button>

          {/* 🗑️ SUPPRIMER */}
          <button
            className="btn-small delete"
            onClick={() => handleDelete(r.id)}
            title="Supprimer"
          >
            🗑️
          </button>
        </>
      );

                case "cartebloquees":
                  return (
                    <>
                      <button
  className="btn-small pay"
  onClick={() => actionDecision(r.id, "carte est bien bloquée", "cartebloquees")}
  title="Bloquer"
>
  Bloquée
</button>
                      <button
                        className="btn-small delete"
                        onClick={() => handleDelete(r.id)}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </>
                  );

                case "CarteAvale":
                  return (
                    <>
                      <button
  className="btn-small pay"
  onClick={() => actionDecision(r.id, "carte est bien retirée", "CarteAvale")}
  title="Retirer"
>
  Retirée
</button>
                      <button
                        className="btn-small delete"
                        onClick={() => handleDelete(r.id)}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </>
                  );
                  case "clients":
  return (
    <>
      <button
        className="btn-small pay"
        onClick={() => navigate(`/admin/clients/edit/${r.id}`)}
        title="Modifier"
      >
        Modifier
      </button>
      <button
        className="btn-small delete"
        onClick={() => handleDelete(r.id)}
        title="Supprimer"
      >
        🗑️
      </button>
    </>
  );

case "agents":
  return (
    <>
      <button
        className="btn-small pay"
        onClick={() => navigate(`/admin/users/edit/${r.id}`)}
        title="Modifier"
      >
        Modifier
      </button>
      <button
        className="btn-small delete"
        onClick={() => handleDelete(r.id)}
        title="Supprimer"
      >
        🗑️
      </button>
    </>
  );

                    
                default:
                  return null;
              }
            })()}
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
     


{/* ================= MODAL ================= */}
{modalData && (
  <div className="vm-modal">
    <div className="vm-modal-content">
      {/* HEADER */}
      <div className="vm-modal-header">
        <h2>Dossier {modalData.numero_dossier || "N/A"}</h2>
        <button className="close" onClick={() => setModalData(null)}>❌</button>
      </div>

      {/* DOCUMENT A4 */}
      <ChargebackA4
        ref={printRef}
        data={modalData}
        onClose={() => setModalData(null)}
      />
      <button className="close" onClick={() => setModalData(null)}>❌</button>

      {/* SEUL BOUTON PDF */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          className="btn-small pdf"
          title="Télécharger PDF"
          onClick={async () => {
            if (!modalData) return;

            // --- Compléter modalData avec valeurs par défaut ---
            const dossierComplet = {
              ...modalData,
              numero_dossier: modalData.numero_dossier || "N/A",
              nom_client: modalData.nom || modalData.prenom || modalData.email?.split("@")[0] || "N/A",
              email: modalData.email || "N/A",
              telephone: modalData.telephone || "N/A",
              carte: modalData.carte || "N/A",
              compte: modalData.compte || "N/A",
              guichet: modalData.guichet || "N/A",
              localite: modalData.localite || "N/A",
              transaction_date: modalData.transaction_date || "N/A",
              created_at: modalData.created_at || "N/A",
              status: modalData.status || "N/A",
              montant_transaction: modalData.montant_transaction || 0,
              frais: modalData.frais || 0,
              montant_remboursable: modalData.montant_remboursable || 0,
              motif: modalData.motif || "N/A"
            };

            try {
              
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/pdf/generate/${dossierComplet.id}`,
                { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dossierComplet) }
              );

              if (!response.ok) throw new Error("Erreur génération PDF");

              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `UBA_Chargeback_${dossierComplet.numero_dossier}.pdf`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            } catch (err) {
              console.error(err);
              alert("Erreur lors de la génération du PDF !");
            }
          }}
        >
          📄 PDF
        </button>
      </div>
    </div>
  </div>
)}




    </>
  )}

  {view !== "dashboard" && renderView()}
</main>

    </div>
  );
}
