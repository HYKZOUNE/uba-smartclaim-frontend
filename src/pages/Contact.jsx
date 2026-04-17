// src/pages/Contact.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./PagesInteractive.css";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!form.nom || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Simulation d'envoi : remplacer par fetch() vers ton API
    try {
      await new Promise(res => setTimeout(res, 900)); // simulate network
      setStatus("success");
      setForm({ nom: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
    <Header />
    <div className="page-container">
      <header className="page-header">
        <h1>Contactez UBA SmartClaim</h1>
        <p>Nous sommes à votre disposition pour toute question ou assistance.</p>
      </header>

      <div className="page-card contact-info">
        <h2>Informations de contact</h2>
        <ul>
          <li><FaPhoneAlt /> <strong> Téléphone :</strong> +235 22 52 45 25</li>
          <li><FaPhoneAlt /> <strong> Téléphone et WhatsApp :</strong> +235 63 10 08 68</li>
          <li><FaPhoneAlt /> <strong> Téléphone et WhatsApp :</strong> +235 66 04 95 54</li>
          <li><FaEnvelope /> <strong> Email :</strong> customerexperience.td@ubagroup.com</li>
          <li><FaMapMarkerAlt /> <strong> Adresse :</strong> BP 1460 – N'Djaména, Tchad</li>
        </ul>
      </div>

      <div className="page-card">
        <h2>Envoyez-nous un message</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input placeholder="Nom complet" name="nom" value={form.nom} onChange={handleChange} />
          <input placeholder="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <textarea className="full" placeholder="Votre message" name="message" value={form.message} onChange={handleChange} />
          <div className="full" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button type="submit" className="btn-primary">
              {status === "sending" ? "Envoi..." : "Envoyer le message"}
            </button>
            {status === "success" && <span style={{ color: "green", fontWeight: 700 }}>Message envoyé ✅</span>}
            {status === "error" && <span style={{ color: "#d6142a", fontWeight: 700 }}>Erreur — veuillez vérifier les champs.</span>}
          </div>
        </form>
      </div>

      <div className="page-card">
        <h2>Nos agences principales</h2>
        <ul>
          <li>Agence principale – Avenue Charles de Gaulle, N'Djaména</li>
          <li>Agence de Chagoua – N'Djaména</li>
          <li>Agence d'Abéché</li>
          <li>Agence de Sarh</li>
          <li>Agence de Moundou</li>
        </ul>

        {/* Carte d'emplacement basique (intégrer iframe Google Maps si souhaité) */}
        <div style={{ marginTop: 12 }}>
          <iframe
            title="map-ndjamena"
            src="https://www.openstreetmap.org/export/embed.html?bbox=17.0%2C12.0%2C15.0%2C11.0&layer=mapnik"
            style={{ width: "100%", height: "260px", border: 0, borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;
