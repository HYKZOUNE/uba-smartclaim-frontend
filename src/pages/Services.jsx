// src/pages/Services.jsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Counter from "../components/Counter";
import { FaFileAlt, FaSearchDollar, FaCheckCircle } from "react-icons/fa";
import "./PagesInteractive.css";

const Services = () => {

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
          <h1>Service Chargeback</h1>
          <p>Gestion intelligente des transactions contestées.</p>
        </header>

        <div className="cards-grid fade-in">
          <InfoCard
            title="Déclaration"
            text="Soumettre une transaction contestée pour analyse."
            icon={FaFileAlt}
          />
          <InfoCard
            title="Analyse"
            text="Vérification complète des preuves et justificatifs."
            icon={FaSearchDollar}
          />
          <InfoCard
            title="Validation"
            text="Décision finale avec génération PDF et notification."
            icon={FaCheckCircle}
          />
        </div>

        <div className="page-card fade-in" style={{ marginTop: 30 }}>
          <h2>Performance du Service</h2>
          <p>
            Traitement structuré des litiges avec suivi automatisé
            et notifications en temps réel.
          </p>

          <div className="kpi-grid" style={{ marginTop: 14 }}>
            <div className="kpi">
              <Counter end={100} />
              <div>Traçabilité</div>
            </div>
            <div className="kpi">
              <Counter end={24} />
              <div>Disponibilité 24/7</div>
            </div>
            <div className="kpi">
              <Counter end={95} />
              <div>Satisfaction Client (%)</div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Services;