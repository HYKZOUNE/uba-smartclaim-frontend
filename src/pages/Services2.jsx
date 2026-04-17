// src/pages/Services2.jsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Counter from "../components/Counter";
import { FaCreditCard, FaMapMarkerAlt, FaRedo } from "react-icons/fa";
import "./PagesInteractive.css";

const Services2 = () => {

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      <Header />
      <div className="page-container">

        <header className="page-header fade-in">
          <h1>Service Carte Avalée</h1>
          <p>Récupération et remplacement simplifiés.</p>
        </header>

        <div className="cards-grid fade-in">
          <InfoCard title="Déclaration" text="Signalement du GAB." icon={FaCreditCard}/>
          <InfoCard title="Localisation" text="Identification de l'agence." icon={FaMapMarkerAlt}/>
          <InfoCard title="Remplacement" text="Nouvelle carte sécurisée." icon={FaRedo}/>
        </div>

        <div className="page-card fade-in" style={{ marginTop: 30 }}>
          <h2>Statistiques Service</h2>

          <div className="kpi-grid">
            <div className="kpi">
              <Counter end={85}/>
              <div>Cartes récupérées (%)</div>
            </div>
            <div className="kpi">
              <Counter end={48}/>
              <div>Temps moyen (heures)</div>
            </div>
            <div className="kpi">
              <Counter end={100}/>
              <div>Notification client</div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Services2;