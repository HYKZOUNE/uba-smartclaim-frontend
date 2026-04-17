import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ChargebackA4 from "../components/ChargebackA4";
import ReclamationForm from "./ReclamationForm";
import CarteBloque from "./CarteBloque";
import CarteAvale from "./CarteAvale";
import VerifierDossier from "./VerifierDossier";
import ClientRegister from "./ClientRegister";
import "./AdminDashboard.css";

// ✅ BON IMPORT
import { jwtDecode } from "jwt-decode";





// ================== TOAST ==================
const Toast = ({ message, type, onClose }) => (
  <div className={`toast ${type}`}>
    {message}
    <button onClick={onClose}>×</button>
  </div>
);


// ================== AGENT DASHBOARD ==================
export default function AgentDashboard() {
  const [stats, setStats] = useState({
    totalReclamations: 0,
    totalClients: 0,
    totalCarteBloquees: 0,
    totalCarteAvale: 0,
    enAttente: 0,
    validees: 0,
    rejetees: 0,
    payee: 0,
  });
  const [view, setView] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState(null);
  const [agent, setAgent] = useState({ prenom: "", nom: "", email: "" });
  const [user, setUser] = useState(null);
  const [activeTable, setActiveTable] = useState("reclamations");
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const perPage = 10;
  const token = localStorage.getItem("token");
  const printRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [cartesBloquees, setCartesBloquees] = useState([]);
  
  const navigate = useNavigate();

  // 🔹 Décodage token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          email: decoded.email,
          role: decoded.role.toLowerCase(),
          nom: decoded.nom || decoded.email,
          prenom: decoded.prenom || ""
        });
        setAgent({
          nom: decoded.nom || decoded.email,
          prenom: decoded.prenom || "",
          email: decoded.email,
        });
      } catch (err) {
        console.error("❌ Erreur décodage token :", err);
      }
    }
  }, [token]);

  const isAdmin = user?.role === "admin";


const showToast = (message, type = "success") => {
  setToastMsg({ message, type });
  setTimeout(() => setToastMsg(null), 2500);
};


useEffect(() => {
  const fetchCartesBloquees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agent/cartesbloquees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartesBloquees(res.data);
    } catch (err) {
      console.error("Erreur fetch cartes bloquées:", err);
    }
  };

  fetchCartesBloquees(); 
  }, [token]);  // token dans le tableau pour éviter le warning



// eslint-disable-next-line no-unused-vars

const [chargebacks, setChargebacks] = useState([]);

// Exemple : récupération initiale des dossiers

useEffect(() => {
  const fetchChargebacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/agent/chargeback/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ s'assurer que c'est bien un tableau
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setChargebacks(data);

    } catch (err) {
      console.error("❌ Erreur récupération chargebacks:", err);
      setChargebacks([]); // toujours un tableau même en cas d'erreur
    }
  };

  fetchChargebacks();
}, [token]);

  // ================== TABLE COLUMNS ==================
  const tableColumns = {
    reclamations: ["id","numero_compte","telephone","montant_transaction","guichet","localite","transaction_date","status"],
    cartebloquees: ["id","numero_carte","numero_compte","telephone","guichet","localite","transaction_date", "status"],
    carteavale: ["id","numero_carte","numero_compte","telephone","guichet","localite","transaction_date", "status"],
    clients: ["id","nom","prenom","email","telephone","numero_compte"],
    attente: ["id","numero_dossier","numero_compte","telephone","montant_transaction","guichet","localite","transaction_date","status"],
    validees: ["id","numero_dossier","numero_compte","telephone","montant_transaction","guichet","localite","transaction_date","status"],
    rejetees: ["id","numero_dossier","numero_compte","telephone","montant_transaction","guichet","localite","transaction_date","status"],
    paye: ["id","numero_dossier","numero_compte","telephone","montant_transaction","guichet","localite","transaction_date","status"],
  };

  // ================== FETCH DASHBOARD & PROFILE ==================
  
  const fetchDashboard = useCallback(async () => {
  setLoading(true);
  try {
    const res = await axios.get("http://localhost:5000/api/agent/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      setStats(res.data.stats);
    } else {
      console.log("⚠️ Erreur dashboard:", res.data);
    }

    const profile = await axios.get("http://localhost:5000/api/agent/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (profile.data.success) {
      setAgent(profile.data.user);
    }

  } catch (err) {
    console.error(err);
    showToast("Impossible de charger le dashboard", "error");
  } finally {
    setLoading(false);
  }
}, [token]);


  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  // ================== LOAD TABLE ==================
const loadTable = useCallback(async (type) => {
  let normalizedType = type.toLowerCase();

  if (type.startsWith("total")) normalizedType = type.replace("total","").toLowerCase();

  // Correction pour "paye"
  if (normalizedType === "payee") normalizedType = "paye";

  setActiveTable(normalizedType);
  setPage(1);
  setSelectedIds([]);
  setLoading(true);

  try {
    let url = "";
    switch(normalizedType){
      case "reclamations": url="/api/agent/chargeback/all"; break;
      case "cartebloquees": url="/api/agent/cartesbloquees"; break;
      case "carteavale": url="/api/agent/carteavale"; break;
      case "clients": url="/api/agent/clients"; break;
      case "attente": url = `/api/agent/chargeback/status/en-attente`; break;
      case "validees": url = `/api/agent/chargeback/status/valide`; break;
      case "rejetees": url = `/api/agent/chargeback/status/rejete`; break;
      case "paye": url = `/api/agent/chargeback/status/paye`; break;
      default: setAllData([]); setLoading(false); return;
    }

    const res = await axios.get(`http://localhost:5000${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Vérifier si res.data.data existe sinon []
    setAllData(res.data.data || []);
  } catch(err){
    console.error(err);
    showToast("Erreur lors du chargement des données", "error");
  } finally {
    setLoading(false);
  }
}, [token]);

  // ================== GESTION SÉLECTION LIGNES ==================
  const selectAll = () => {
    const paginated = allData.slice((page - 1) * perPage, page * perPage);
    if (selectedIds.length === paginated.length) setSelectedIds([]);
    else setSelectedIds(paginated.map((r) => r.id));
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ================== HANDLE DELETE UNIFIÉ ==================
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;

    const tableRouteMap = {
      reclamations: "chargeback",
      cartebloquees: "cartesbloquees",
      carteavale: "carteavale",
      clients: "clients",
    };

    const route = tableRouteMap[activeTable];
    if (!route) {
      showToast("Suppression non supportée pour cette table", "error");
      console.error("Clé activeTable inconnue :", activeTable);
      return;
    }

    try {
      const url = `http://localhost:5000/api/${isAdmin ? "admin" : "agent"}/${route}/${id}`;
      console.log("DELETE =>", url);

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast("Supprimé avec succès", "success");
      loadTable(activeTable);
    } catch (err) {
      console.error("❌ DELETE ERROR:", err.response?.data || err.message);
      showToast(err.response?.data?.message || "Erreur lors de la suppression", "error");
    }
  };



  // ================== EXPORT EXCEL ==================
  const exportExcel = () => {
    const data = selectedIds.length ? allData.filter(d=>selectedIds.includes(d.id)) : allData;
    if(!data.length) return showToast("Aucune donnée", "error");

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${activeTable}.xlsx`);
  };

  // ================== EXPORT PDF ==================
const exportPDF = async () => {
  const data = selectedIds.length
    ? allData.filter(d => selectedIds.includes(d.id))
    : allData;

  if (!data.length) return showToast("Aucune donnée", "error");

  setLoading(true);

  try {
   
    const res = await axios.post(
  "http://localhost:5000/api/export-pdf",
  {
    dossiers: data
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: "blob"
  }
);

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeTable || "export"}.pdf`;
    link.click();

    showToast("PDF généré avec succès !", "success");

  } catch (err) {
    console.error("❌ FRONT PDF ERROR:", err.response?.data || err);
    showToast("Erreur lors de l'export PDF", "error");
  } finally {
    setLoading(false);
  }
};

  // ================== ACTION DECISION ==================
// ===================== Décision Chargeback Frontend (Toast Compact) =====================
const actionDecision = async (id, action) => {
  try {
    console.log(`🚀 Envoi décision: ${action} pour dossier ID: ${id}`);

    const response = await axios.post(
      `http://localhost:5000/api/agent/chargeback/${id}/decision`,
      { decision: action },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.success) {
      // 🔄 Mettre à jour le tableau local
      setChargebacks(prev =>
        prev.map(d =>
          d.id === id ? { ...d, status: response.data.status } : d
        )
      );

      // 📣 Construire le message compact
      const toastMessage = `✅ Dossier ${id} ${response.data.status} | 📧 Email ${response.data.emailSent ? "✅" : "❌"} | 📱 SMS ${response.data.smsSent ? "✅" : "❌"}`;

      toast.success(toastMessage, {
        position: "top-right",
        autoClose: 7000,
        pauseOnHover: true,
        closeOnClick: true,
      });

      console.log(
        `✅ Dossier ${id} mis à jour avec status "${response.data.status}"`,
        "📧 Email envoyé:", response.data.emailSent,
        "📱 SMS envoyé:", response.data.smsSent
      );

    } else {
      toast.error(`⚠️ ${response.data.message}`, { position: "top-right" });
    }

  } catch (err) {
    console.error("❌ Erreur actionDecision:", err);

    if (err.response?.status === 401) {
      toast.error("❌ Non autorisé ! Token invalide ou expiré.");
    } else if (err.response?.data?.error) {
      toast.error(`❌ Erreur: ${err.response.data.error}`);
    } else {
      toast.error("❌ Erreur serveur");
    }
  }
};



// ===================== Décision Carte Bloquée Frontend =====================
const actionDecisionCarteBloquee = async (id) => {
  try {
    console.log("🚀 Envoi décision Carte Bloquée ID:", id);

    const res = await axios.post(
      `http://localhost:5000/api/agent/cartesbloquees/${id}/decision`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ OK:", res.data);
    showToast("Carte bloquée traitée avec succès");
  } catch (err) {
    console.error("❌ Erreur actionDecisionCarteBloquee:", err);
    showToast("Erreur lors du traitement", "error");
  }
};


const actionDecisionCarteAvale = async (id) => {
  try {
    await axios.post(
      `http://localhost:5000/api/agent/carteavale/${id}/decision`,
      {}, // ❌ vide (pas de body)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showToast("Carte retirée avec succès");
  } catch (err) {
    console.error(err);
    showToast("Erreur traitement", "error");
  }
};



  // ================== SEARCH & PAGINATION ==================
 const dataSource = activeTable === "reclamations" 
  ? chargebacks 
  : allData;



const filtered = dataSource.filter(item =>
  JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  // ================== RENDER ACTION BUTTONS ==================
  const renderActions = (r) => {
    const mapActions = {
      reclamations: (
        <>
          <button onClick={()=>actionDecision(r.id,"valider")}>✅</button>
          <button onClick={()=>actionDecision(r.id,"rejeter")}>❌</button>
          <button onClick={()=>actionDecision(r.id,"payer")}>💰</button>
          <button onClick={()=>handleDelete(r.id)}>🗑️</button>
        </>
      ),
      cartebloquees: (
        <>
          <button
  className="btn-small pay"
  onClick={() => actionDecisionCarteBloquee(r.id)}
>
  Bloquée
</button>
          <button className="btn-small delete" onClick={()=>handleDelete(r.id)}>🗑️</button>
        </>
      ),
      carteavale: (
        <>
          <button
  className="btn-small pay"
  onClick={() => actionDecisionCarteAvale(r.id)}
>
  Retirée
</button>
          <button className="btn-small delete" onClick={()=>handleDelete(r.id)}>🗑️</button>
        </>
      ),
      clients: (
        <>
          <button
  className="btn-small pay"
  onClick={() => navigate(`/agent/clients/edit1/${r.id}`)}
>
  Modifier
</button>
          <button className="btn-small delete" onClick={()=>handleDelete(r.id)}>🗑️</button>
        </>
      )
    };
    return mapActions[activeTable] || <button onClick={()=>handleDelete(r.id)}>🗑️</button>;
  };

  // ================== RENDER VIEW ==================
  const renderView = () => {
    switch(view){
      case "ReclamationForm": return <ReclamationForm />;
      case "CarteBloque": return <CarteBloque />;
      case "CarteAvale": return <CarteAvale />;
      case "VerifierDossier": return <VerifierDossier />;
      case "ClientRegister": return <ClientRegister />;
      default: return null;
    }
  };

  // ================== RENDER DASHBOARD ==================
  return (
    <div className="vm-container">
      {toastMsg && (
  <Toast
    message={toastMsg.message}
    type={toastMsg.type}
    onClose={() => setToastMsg(null)}
  />
)}

        {toastMsg && (
  <Toast
    message={toastMsg.message}
    type={toastMsg.type}
    onClose={() => setToastMsg(null)}
  />
)}

      <aside className="vm-sidebar premium">
        <div className="admin-header">{agent.prenom} {agent.nom}</div>
        <ul className="vm-menu">
          <li className={view==="dashboard"?"active-menu":""} onClick={()=>setView("dashboard")}>📊 Dashboard</li>
          <li className={view.includes("reclamation")?"active-menu":""} onClick={()=>setOpenMenu(openMenu==="reclamation"?null:"reclamation")}>📂 Réclamations</li>
          {openMenu==="reclamation" && (
            <ul className="vm-submenu animated">
              <li onClick={()=>setView("ReclamationForm")}>Chargeback</li>
              <li onClick={()=>setView("CarteBloque")}>CarteBloquée</li>
              <li onClick={()=>setView("CarteAvale")}>CarteAvalée</li>
              <li onClick={()=>setView("VerifierDossier")}>SuiviDossiers</li>
            </ul>
          )}
          <li className={view==="ClientRegister"?"active-menu":""} onClick={()=>setView("ClientRegister")}>👥 AjouterClients</li>
          <li onClick={()=>{ localStorage.clear(); window.location.href="/login"; }}>🚪 Déconnexion</li>
        </ul>
      </aside>

      <main className="vm-main">
        {view==="dashboard" && (
          <>
            <div className="vm-top-buttons">
              <button className="btn refresh" onClick={fetchDashboard}>🔄 Actualiser</button>
              <button className="btn export" onClick={exportPDF}>PDF</button>
              <button className="btn export" onClick={exportExcel}>Excel</button>
            </div>

            {loading && <div className="vm-loading">Chargement...</div>}

            <div className="vm-cards">
              {Object.keys(stats).map(key=>(
                <div key={key} className="vm-card" onClick={()=>loadTable(key)}>
                  <div className="vm-card-title">{key}</div>
                  <div className="vm-card-value">
                    <CountUp start={0} end={Number(stats[key])||0} duration={1.5} separator="," redraw={true} />
                  </div>
                </div>
              ))}
            </div>

            <div className="vm-table-header">
              <input type="text" placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)} />
              <div className="pagination">
                <button disabled={page===1} onClick={()=>setPage(page-1)}>◀</button>
                <span>{page} / {totalPages}</span>
                <button disabled={page===totalPages} onClick={()=>setPage(page+1)}>▶</button>
              </div>
            </div>

            <table className="vm-table">
              <thead>
                <tr>
                  <th><input type="checkbox" onChange={selectAll} checked={selectedIds.length===paginated.length && paginated.length>0} /></th>
                  {tableColumns[activeTable]?.map(col=><th key={col}>{col}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length===0 ? (
                  <tr><td colSpan={(tableColumns[activeTable]?.length||0)+2}>Aucune donnée</td></tr>
                ) : paginated.map(r=>(
                  <tr key={r.id} className={selectedIds.includes(r.id)?"selected-row":""}>
                    <td><input type="checkbox" checked={selectedIds.includes(r.id)} onChange={()=>toggleSelect(r.id)} /></td>
                    {tableColumns[activeTable]?.map(col=><td key={`${r.id}-${col}`}>{r[col]}</td>)}
                    <td>
                      <button onClick={()=>setModalData(r)}>👁️</button>
                      {renderActions(r)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {modalData && (
              <div className="vm-modal">
                <div className="vm-modal-content">
                  <div className="vm-modal-header">
                    <h2>Dossier {modalData.numero_dossier||modalData.id}</h2>
                    <button className="close" onClick={()=>setModalData(null)}>❌</button>
                  </div>
                  <ChargebackA4 ref={printRef} data={modalData} onClose={()=>setModalData(null)} />
                  <div style={{textAlign:"center",marginTop:"15px"}}>
                    <button onClick={()=>window.print()}>🖨️ Imprimer</button>
                    <button onClick={()=>{ showToast("PDF validé !"); setModalData(null); }}>✅ Valider PDF</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {view!=="dashboard" && renderView()}
      </main>
    </div>
  );
}












