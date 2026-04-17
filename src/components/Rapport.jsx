import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";
import "./Rapport.css";

export default function Rapport() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
    categorie: ""
  });

  // ===== MAP STATUS =====
  const mapStatus = useCallback((status, categorie) => {
    if (!status) return "-";
    switch (categorie) {
      case "CHARGEBACK":
        return { "en-attente": "EN ATTENTE", "valide": "VALIDÉ", "rejete": "REJETÉ", "paye": "PAYÉ" }[status] || status;
      case "CARTE_AVALEE":
        return status === "retirée" ? "RETRAIT" : status;
      case "CARTE_BLOQUEE":
        return status === "bloquer" ? "BLOQUÉ" : status;
      default:
        return status;
    }
  }, []);

  // ===== FETCH RAPPORT =====
  const fetchRapport = useCallback(async () => {
    if (!filters.categorie) { setMessage("Veuillez sélectionner une catégorie"); setData([]); return; }
    try {
      const res = await axios.get("http://localhost:5000/api/admin/rapport", { params: filters });
      if (res.data.message) { setMessage(res.data.message); setData([]); } 
      else { setMessage(""); setData(res.data.data); }
    } catch (err) {
      console.error("Erreur API :", err);
      setMessage("Erreur lors de la récupération des données");
      setData([]);
    }
  }, [filters]);

  useEffect(() => { fetchRapport(); }, [fetchRapport]);

  // ===== TOTAL MONTANT =====
 // const totalMontant = data.reduce((sum, r) => sum + (Number(r.montant_total) || 0), 0);

 // ================== EXPORT PDF ==================
const exportPDF = () => {
  if (data.length === 0) return alert("Aucune donnée à exporter !");

  const doc = new jsPDF("p", "mm", "a4");

  const logo = new Image();
  logo.src = "/assets/logo-uba.png"; // logo dans public/assets/
  logo.onload = () => {
    const ubaRed = [215, 25, 32];

    // Calcul du total ici
    const totalMontant = data.reduce((sum, r) => sum + Number(r.montant_total || 0), 0);

    // Entête rouge
    doc.setFillColor(...ubaRed);
    doc.rect(0, 0, 210, 25, "F");

    // Logo + titre
    doc.addImage(logo, "PNG", 10, 5, 40, 15);
    doc.setFontSize(16);
    doc.setTextColor(255);
    doc.text("UBA SmartClaim - Rapport Professionnel", 60, 15);
    doc.setFontSize(12);
    doc.text(`Catégorie: ${filters.categorie || "Toutes"} | Total montant: ${totalMontant.toLocaleString()} FCFA`, 60, 22);

    // Ligne
    doc.setDrawColor(...ubaRed);
    doc.setLineWidth(0.5);
    doc.line(10, 28, 200, 28);

    autoTable(doc, {
      startY: 35,
      head: [["Dossier","Client","Agent","Montant (FCFA)","Statut","Catégorie","Date"]],
      body: data.map(r => [
        r.numero_dossier || "-",
        r.client_nom || "-",
        r.dossier_action || "-",
        Number(r.montant_total || 0).toLocaleString(),
        mapStatus(r.status, r.categorie),
        r.categorie || "-",
        r.created_at ? new Date(r.created_at).toLocaleDateString() : "-"
      ]),
      theme: "grid",
      headStyles: { fillColor: ubaRed, textColor: 255, halign: "center" },
      foot: [["", "", "", totalMontant.toLocaleString(), "", "", ""]],
      footStyles: { fillColor: ubaRed, textColor: 255, halign: "center" },
      didDrawPage: (dataArg) => {
        const page = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Page ${page}`, dataArg.settings.margin.left, 290);
        doc.text("© UBA SmartClaim 2026", 170, 290);
      }
    });

    doc.save("rapport_pro_uba.pdf");
  };
};

// ===== EXPORT EXCEL =====
const exportExcel = () => {
  if (data.length === 0) return alert("Aucune donnée à exporter !");

  const ws = XLSX.utils.json_to_sheet(
    data.map(r => ({
      Dossier: r.numero_dossier || "-",
      Client: r.client_nom || "-",
      Agent: r.dossier_action || "-",
      Montant: Number(r.montant_total || 0).toLocaleString(),
      Statut: mapStatus(r.status, r.categorie),
      Catégorie: r.categorie || "-",
      Date: r.created_at ? new Date(r.created_at).toLocaleDateString() : "-"
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rapport");
  XLSX.writeFile(wb, "rapport_pro_uba.xlsx");
};

  return (
    <div className="rapport-container">
      <h2>📊 Rapport Professionnel UBA</h2>

      {/* FILTRES */}
      <div className="filters">
        <input type="date" value={filters.startDate} onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))} />
        <input type="date" value={filters.endDate} onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))} />
        <select value={filters.categorie} onChange={e => setFilters(f => ({ ...f, categorie: e.target.value }))}>
          <option value="">Catégorie</option>
          <option value="CHARGEBACK">CHARGEBACK</option>
          <option value="CARTE_AVALEE">CARTE AVALÉE</option>
          <option value="CARTE_BLOQUEE">CARTE BLOQUÉE</option>
        </select>
        <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} disabled={!filters.categorie}>
          <option value="">Statut</option>
          {filters.categorie === "CHARGEBACK" && <>
            <option value="en-attente">EN ATTENTE</option>
            <option value="valide">VALIDÉ</option>
            <option value="rejete">REJETÉ</option>
            <option value="paye">PAYÉ</option>
          </>}
          {filters.categorie === "CARTE_AVALEE" && <option value="retirée">RETRAIT</option>}
          {filters.categorie === "CARTE_BLOQUEE" && <option value="bloquer">BLOQUÉ</option>}
        </select>
        <button onClick={fetchRapport}>🔍 Filtrer</button>
        <button onClick={exportPDF}>📄 Export PDF</button>
        <button onClick={exportExcel}>📥 Export Excel</button>
      </div>

      {message && <p className="error">{message}</p>}

      {/* STATISTIQUES */}
      {data.length > 0 && (
        <div className="chart">
          <h3>📈 Statistiques par statut</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={Object.entries(
              data.reduce((acc, r) => {
                const s = mapStatus(r.status, r.categorie);
                acc[s] = (acc[s] || 0) + 1;
                return acc;
              }, {})
            ).map(([name, value]) => ({ name, value }))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#005BAC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* TABLEAU */}
      <table className="rapport-table">
        <thead>
          <tr>
            <th>Dossier</th>
            <th>Client</th>
            <th>Agent</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Catégorie</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((r, idx) => (
            <tr key={r.numero_dossier || idx}>
              <td>{r.numero_dossier}</td>
              <td>{r.client_nom}</td>
              <td>{r.dossier_action}</td>
              <td>{Number(r.montant_total || 0).toLocaleString()}</td>
              <td>{mapStatus(r.status, r.categorie)}</td>
              <td>{r.categorie}</td>
              <td>{r.created_at ? new Date(r.created_at).toLocaleDateString() : "-"}</td>
            </tr>
          )) : <tr><td colSpan="7" style={{textAlign:"center"}}>Aucune donnée trouvée</td></tr>}
        </tbody>
      </table>
    </div>
  );
}