// src/pages/Services1.jsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Counter from "../components/Counter";
import { FaLock, FaUserShield, FaSync } from "react-icons/fa";
import "./PagesInteractive.css";

const Services1 = () => {

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
          <h1>Service Carte Bloquée</h1>
          <p>Gestion rapide et sécurisée des cartes bloquées.</p>
        </header>

        <div className="cards-grid fade-in">
          <InfoCard title="Signalement" text="Déclaration immédiate." icon={FaLock}/>
          <InfoCard title="Vérification" text="Contrôle d'identité sécurisé." icon={FaUserShield}/>
          <InfoCard title="Réactivation" text="Déblocage ou remplacement." icon={FaSync}/>
        </div>

        <div className="page-card fade-in" style={{ marginTop: 30 }}>
          <h2>Indicateurs Clés</h2>

          <div className="kpi-grid">
            <div className="kpi">
              <Counter end={90}/>
              <div>Résolution rapide (%)</div>
            </div>
            <div className="kpi">
              <Counter end={100}/>
              <div>Sécurité renforcée</div>
            </div>
            <div className="kpi">
              <Counter end={24}/>
              <div>Support continu</div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Services1;