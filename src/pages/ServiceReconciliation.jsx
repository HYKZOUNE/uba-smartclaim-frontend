import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/UBA.css";

export default function ServiceReconciliation() {
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
      <Footer />
    </>
  );
}
