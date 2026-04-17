/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ubaLogo from "../assets/stide5.jpg"; 
import "./ChargebackA4.css";


const ChargebackA4 = ({ data, onClose }) => {
  // Fermer avec Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!data) return null;

  const clientName = data.email
    ? data.email.split("@")[0].replace(/[._]/g, " ").toUpperCase()
    : "-";

  let statusColor = "#000";
  if (data.status?.toLowerCase().includes("valide")) statusColor = "#0b5ed7";
  else if (data.status?.toLowerCase().includes("rejeté")) statusColor = "#dc3545";
  else if (data.status?.toLowerCase().includes("payé")) statusColor = "#198754";

  return (
    <div className="uba-overlay" onClick={onClose}>
  <div className="uba-modal" onClick={(e) => e.stopPropagation()}>
    


    

        {/* HEADER */}
        <div className="uba-header">
          <img src={ubaLogo} alt="UBA" className="uba-logo" />
          
{/* X rouge pour fermer */}
    <button
      className="close-x"
      onClick={(e) => {
        e.stopPropagation(); // Empêche la propagation au modal parent
        onClose();           // Ferme la modale
      }}
    >
      ❌
    </button>
          <div>
            
            <h3>UNITED BANK FOR AFRICA</h3>
            <span>Demande de rétrofacturation (Chargeback)</span>
            
          </div>
          
        </div>
        

        {/* BODY */}
        <div className="uba-body">
          <div className="uba-grid">
            <div><b>Dossier :</b> {data.numero_dossier}</div>
            <div><b>Client :</b> {clientName}</div>
            <div><b>Email :</b> {data.email}</div>
            <div><b>Téléphone :</b> {data.telephone}</div>
            <div><b>Carte :</b> {data.numero_carte}</div>
            <div><b>Compte :</b> {data.numero_compte}</div>
            <div><b>Guichet :</b> {data.guichet}</div>
            <div><b>Localité :</b> {data.localite}</div>
            <div><b>Date transaction :</b> {data.transaction_date}</div>
            <div><b>Créé le :</b> {data.created_at}</div>
            <div>
              <b>Status :</b>{" "}
              <span style={{ color: statusColor, fontWeight: "bold" }}>
                {data.status}
              </span>
            </div>
          </div>

          <div className="amounts">
            <div>Transaction : {data.montant_transaction} FCFA</div>
            <div>Frais : {data.montant_frais} FCFA</div>
            <div>Remboursable : {data.montant_remboursable} FCFA</div>
          </div>

          <div className="comment">
            <b>Motif</b>
            <p>{data.raison}</p>
          </div>

          {data.signature && (
            <div className="signature">
              <b>Signature client</b>
              <img src={data.signature} alt="signature" />
              
            </div>
            
          )}
        </div>
        
      </div>
      
    </div>
  );
};

export default ChargebackA4;
