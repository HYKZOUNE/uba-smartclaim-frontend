// src/pages/About.jsx
//import React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { FaFlag, FaLightbulb, FaHandshake } from "react-icons/fa";
import Elysee from "../assets/ELYSEE.jpg";
import "./PagesInteractive.css";

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const FAQ = [
    {
      question: "Qu’est-ce que le service SmartClaim ?",
      answer: `
SmartClaim est la plateforme officielle de gestion des réclamations de UBA Tchad. 
Elle permet aux clients de signaler tout incident bancaire de manière simple et sécurisée. 
La plateforme couvre les transactions bancaires, les opérations GAB, les virements, les paiements POS, les transferts Mobile Money et tous les services électroniques. 
Chaque réclamation est enregistrée avec un numéro unique pour faciliter le suivi et la résolution.
      `
    },
    {
      question: "Quels types de problèmes puis-je déclarer ?",
      answer: `
Vous pouvez déclarer tous types d’incidents financiers :
- Cartes : carte avalée, transaction refusée, débit double ou non autorisé.
- Virements : fonds non reçus, virement retardé, erreur de montant.
- Paiements : POS non validé, double paiement, achat internet non crédité.
- Mobile Money : transfert en attente, erreur de numéro destinataire.
- Autres services UBA : anomalies sur applications digitales ou alertes SMS.
Chaque problème est traité selon son type et sa complexité.
      `
    },
    {
      question: "Combien de temps dure le traitement ?",
      answer: `
Le délai standard de traitement est généralement de 24h à 72h.  
- Cas simples (erreur de saisie, débit double, carte bloquée) : résolus en moins de 24h.  
- Cas complexes (réclamations internationales ou coordination avec partenaires Visa/MasterCard) : peuvent prendre jusqu'à 72h.  
UBA Tchad assure un suivi continu et informe le client à chaque étape.
      `
    },
    {
      question: "Comment suivre mon dossier ?",
      answer: `
Après soumission, vous recevez un numéro de dossier unique.  
Vous pouvez suivre votre réclamation par :  
- SMS : alertes automatiques sur l’état de votre dossier.  
- Email : notifications détaillées à chaque mise à jour.  
- Agence UBA : consultation directe auprès de votre conseiller ou agent SmartClaim.  
Le suivi est sécurisé et transparent pour garantir votre tranquillité.
      `
    },
    {
      question: "Est-ce que le service SmartClaim est payant ?",
      answer: `
Non, SmartClaim est totalement gratuit pour tous les clients UBA Tchad.  
Il s’agit d’un service inclus dans vos services bancaires afin de résoudre rapidement vos incidents financiers sans coût additionnel.
      `
    },
    {
      question: "Puis-je annuler ou modifier ma réclamation ?",
      answer: `
Oui, vous pouvez contacter le centre SmartClaim via Email, SMS ou en agence pour demander une modification ou annulation de votre réclamation.  
Toute modification sera enregistrée dans le dossier avec un suivi complet.
      `
    },
    {
      question: "Quels documents dois-je fournir ?",
      answer: `
Pour accélérer le traitement :  
- Copie de la pièce d’identité.  
- Relevé bancaire ou preuve de transaction.  
- Capture d’écran ou reçu du paiement concerné.  
- Toute autre information pertinente pour clarifier l’incident.  
Plus vos informations sont complètes, plus le traitement sera rapide.
      `
    }
  ];
  return (
    <>
    <Header />
    <div className="page-container">
      <header className="page-header">
        <h1>À propos de l'application UBA SmartClaim</h1>

  <p>
    Bienvenue sur <strong>UBA SmartClaim</strong> 👋<br />
    Cette application est une plateforme digitale de gestion des réclamations bancaires et chargebacks pour UBA Tchad.
    Elle permet aux clients de signaler, suivre et gérer leurs incidents financiers en temps réel avec transparence et sécurité.
  </p>

  <p>
    Elle couvre plusieurs services :
    <br />• Cartes bancaires (retraits, blocages, erreurs de transaction)
    <br />• Virements nationaux et internationaux
    <br />• Paiements POS et e-commerce
    <br />• Mobile Money et services digitaux
    <br />• Suivi automatisé des dossiers avec notifications (SMS & Email)
  </p>

  <p>
    L’objectif principal est de réduire le temps de traitement des réclamations
    et d’améliorer l’expérience client grâce à la digitalisation complète du processus.
  </p>
       
      </header>

      <div className="cards-grid">
        <InfoCard
          title="Notre mission"
          text="Simplifier et automatiser la gestion des réclamations pour offrir une expérience client fluide et fiable."
          icon={FaFlag}
          onClick={() => alert("Mission : garantir rapidité, transparence et satisfaction dans le traitement des réclamations.")}
        />
        <InfoCard
          title="Notre vision"
          text="Devenir la plateforme de référence pour la gestion intelligente des réclamations bancaires et commerciales."
          icon={FaLightbulb}
          onClick={() => alert("Vision : digitalisation complète, précision et excellence opérationnelle.")}
        />
        <InfoCard
          title="Nos valeurs"
          text="Intégrité, innovation, efficacité et transparence — piliers de la confiance de nos utilisateurs."
          icon={FaHandshake}
          onClick={() => alert("Valeurs : Intégrité, Innovation, Efficacité, Transparence.")}
        />
      </div>

      <div style={{ marginTop: 26 }} className="page-card">
        <h2>Histoire & présence</h2>
        <p>
          UBA SmartClaim est une initiative du groupe UBA visant à transformer la gestion
          des réclamations et des chargebacks. La plateforme permet un suivi en temps réel,
          une validation structurée et une traçabilité complète des dossiers.
        </p>

        <div className="kpi-grid" style={{ marginTop: 14 }}>
          <div className="kpi"><strong>2026</strong><div>Lancement de UBA SmartClaim</div></div>
          <div className="kpi"><strong>+10k</strong><div>Dossiers traités</div></div>
          <div className="kpi"><strong>100%</strong><div>Traçabilité digitale</div></div>
        </div>
      </div>

      <div style={{ marginTop: 20 }} className="page-card">
        <h2>Engagements & innovation</h2>
        <p>
          UBA SmartClaim s’inscrit dans une dynamique de transformation digitale :
          automatisation des processus, génération de PDF, notifications par email et SMS,
          et amélioration continue de l’expérience client.
        </p>
      </div>
    </div>
    <main className="page-container">
        <h1 className="page-title">Service de Réconciliation UBA Tchad</h1>
        <p className="page-text">
          Un service dédié à la gestion rapide, sécurisée et efficace de vos réclamations bancaires. 
          Grâce à notre plateforme SmartClaim, vos incidents sont enregistrés, suivis et traités selon des standards internationaux.
        </p>

        {/* Section rapide des services */}
        <div className="grid-3 mt-12">
          <div className="section-box">
            <h3>💳 Cartes & GAB</h3>
            <p>Retraits non servis, cartes avalées, refus GAB, transactions non créditées...</p>
          </div>

          <div className="section-box">
            <h3>💸 Virements & Mobile Money</h3>
            <p>Virements retardés, paiements non reçus, transferts MoMo bloqués...</p>
          </div>

          <div className="section-box">
            <h3>🧾 Paiements & Factures</h3>
            <p>POS non validé, paiement en double, débit fantôme, achats internet...</p>
          </div>
        </div>

        {/* CTA */}
        <div className="page-title text-red-700 mb-8">
          <Link to="/login" className="page-btn">Faire une réclamation maintenant</Link>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="page-title text-red-700 mb-8">FAQ – Questions fréquentes</h2>
          <div className="faq-container">
            {FAQ.map((item, index) => (
              <div
                key={index}
                className="faq-item"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="faq-question">
                  {item.question} <span>{openIndex === index ? "−" : "+"}</span>
                </h3>
                {openIndex === index && (
                  <p className="faq-answer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
      </main>
      {/* ===================== À PROPOS DE L'APPLICATION ===================== */}
<div className="page-card about-dev">
  

  <hr style={{ margin: "15px 0" }} />

  <h3>Développeur</h3>

  <p>
    <strong>Nom :</strong> HYKZOUNE ÉLYSÉE REUNBA<br />
    Étudiant à l’INSTA (Institut National des Sciences et Techniques d’Abéché)<br />
    Licence 3 en Génie Informatique, option Génie Logiciel<br />
    En attente de la soutenance de fin d’études 🎓
  </p>

  <p>
    Projet académique de digitalisation de la gestion des réclamations bancaires.
  </p>

  <div className="dev-image">
    <img src={Elysee} alt="Élysée Reunba" />
  </div>
</div>
    <Footer />
    </>
  );
};

export default About;