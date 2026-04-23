// frontend/src/components/ReclamationForm.jsx
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
//import NumberToWords from "number-to-words";
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";
import "./ReclamationForm.css";

// Fonction pour convertir nombre en lettres français
function nombreEnLettres(nombre) {
  const UNITS = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const TEENS = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
  const TENS = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

  if (nombre === 0) return "zéro";
  if (nombre < 0) return "moins " + nombreEnLettres(-nombre);

  let words = "";

  if (Math.floor(nombre / 1000) > 0) {
    words += nombreEnLettres(Math.floor(nombre / 1000)) + " mille ";
    nombre %= 1000;
  }

  if (Math.floor(nombre / 100) > 0) {
    if (Math.floor(nombre / 100) === 1) words += "cent ";
    else words += UNITS[Math.floor(nombre / 100)] + " cent ";
    nombre %= 100;
  }

  if (nombre >= 10 && nombre < 17) {
    words += TEENS[nombre - 10] + " ";
  } else if (nombre >= 17 && nombre < 20) {
    words += "dix-" + UNITS[nombre - 10] + " ";
  } else if (nombre >= 20) {
    const dizaine = Math.floor(nombre / 10);
    const unite = nombre % 10;
    if (dizaine === 7 || dizaine === 9) {
      words += TENS[dizaine] + "-" + TEENS[unite] + " ";
    } else {
      words += TENS[dizaine] + (unite > 0 ? "-" + UNITS[unite] : "") + " ";
    }
  } else if (nombre > 0) {
    words += UNITS[nombre] + " ";
  }

  return words.trim();
}

export default function ReclamationForm() {
  const sigCanvas = useRef(null);

  const [form, setForm] = useState({
    type_carte: "",
    numero_carte: "",
    numero_compte: "",
    telephone: "",
    email: "",
    montant_transaction: "",
    montant_frais: "",
    montant_remboursable: "",
    montant_total: "",
    montant_total_lettres: "",
    raison: "",
    guichet: "",
    localite: "",
    transaction_date: "",
    transaction_time: "",
    uploads: [],
    signature: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  /** ---------------------------- HANDLE INPUTS -----------------------------*/
  const handleInput = (e) => {
  const { name, value } = e.target;

  const updated = {
    ...form,
    [name]: value,
  };

  const montant = Number(updated.montant_transaction) || 0;
  const guichet = updated.guichet;

  let frais = 0;

  if (guichet === "UBA Tchad") {
    frais = 0;
  } else {
    if (montant >= 10000 && montant <= 20000) frais = 299;
    else if (montant <= 30000) frais = 358;
    else if (montant <= 40000) frais = 477;
    else if (montant <= 50000) frais = 577;
    else if (montant <= 60000) frais = 716;
    else if (montant <= 70000) frais = 835;
    else if (montant <= 80000) frais = 954;
    else if (montant <= 99999) frais = 1074;
    else if (montant <= 400000) frais = 1193;
  }

  const remboursable = montant + frais;

  let colorClass = "neutral";
  if (montant < 20000) colorClass = "red";
  else if (montant <= 100000) colorClass = "orange";
  else colorClass = "green";

  setForm({
    ...updated,
    montant_transaction: montant,
    montant_frais: frais,
    montant_remboursable: remboursable,
    montant_total: remboursable,
    montant_total_lettres: nombreEnLettres(remboursable).toUpperCase(),
    colorClass,
  });
};


  /** ---------------------------- HANDLE FILES -----------------------------*/
  const handleFiles = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setForm({ ...form, uploads: files });
  };

  /** ------------------------- CLEAR SIGNATURE -----------------------------*/
  const clearSignature = () => {
    sigCanvas.current.clear();
    setForm({ ...form, signature: "" });
  };

  /** --------------------------- SUBMIT FORM -------------------------------*/
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation obligatoire
  if (
    !form.telephone ||
    !form.montant_transaction ||
    !form.guichet ||
    !form.localite ||
    !form.transaction_date ||
    !form.transaction_time
  ) {
    setError("Veuillez remplir tous les champs obligatoires.");
    setSuccess("");
    return;
  }

  if (form.montant_transaction < 5000 || form.montant_transaction > 400000) {
    setError("Le montant doit être compris entre 5 000 FCFA et 400 000 FCFA.");
    setSuccess("");
    return;
  }

  // Validation numéro de carte selon type
  if (form.type_carte && form.numero_carte) {
    const cardPrefixes = {
      Visa: "472862******",
      MasterCard: "534401******",
      Prepaid: "457281******",
    };

    const prefix = cardPrefixes[form.type_carte];
    if (!form.numero_carte.startsWith(prefix)) {
      setError(`Le numéro de carte ne correspond pas au type ${form.type_carte}.`);
      setSuccess("");
      return;
    }
  }

  const token = localStorage.getItem("token");
  if (!token) {
    setError("Vous devez vous connecter avant de soumettre une réclamation.");
    setSuccess("");
    return;
  }

const formData = new FormData();
 Object.keys(form).forEach((key) => {
  if (key === "uploads") {
    form.uploads.forEach((file) => formData.append("uploads", file));
  } else if (key !== "colorClass") {
    formData.append(key, form[key]);
  }
});

  if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
    formData.set("signature", sigCanvas.current.toDataURL());
  }

 try {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/chargeback/new`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || "Erreur lors de l'envoi de la réclamation.");
      setSuccess("");
      return;
    }

    setSuccess(`✔ Réclamation envoyée avec succès ! Dossier N°: ${result.numero_dossier}`);
    setError("");
    setForm({
      type_carte: "",
      numero_carte: "",
      numero_compte: "",
      telephone: "",
      email: "",
      montant_transaction: "",
      montant_frais: "",
      montant_remboursable: "",
      montant_total: "",
      montant_total_lettres: "",
      raison: "",
      guichet: "",
      localite: "",
      transaction_date: "",
      transaction_time: "",
      uploads: [],
      signature: "",
      colorClass: "neutral",
    });
    sigCanvas.current.clear();
  } catch (err) {
    console.error(err);
    setError("Erreur lors de l'envoi de la réclamation.");
    setSuccess("");
  }
};


  return (
    <>
      <Header1 />

    <div className="form-container">
  <h2>Formulaire de Chargebacks</h2>

  {error && <div className="failure-message">{error}</div>}
  {success && <div className="success-message">{success}</div>}

  <form onSubmit={handleSubmit} className="form-grid">
    <select
      name="type_carte"
      value={form.type_carte}
      onChange={handleInput}
      className="input"
    >
      <option value="">-- Type de carte (facultatif) --</option>
      <option value="Visa">Visa</option>
      <option value="MasterCard">MasterCard</option>
      <option value="Prepaid">Carte prépayée</option>
    </select>

    <input
      type="text"
      name="numero_carte"
      placeholder="Numéro de carte (facultatif)"
      value={form.numero_carte}
      onChange={handleInput}
      className="input"
    />

    <input
      type="text"
      name="numero_compte"
      placeholder="Numéro de compte (facultatif)"
      value={form.numero_compte}
      onChange={handleInput}
      className="input"
    />

    <input
      type="tel"
      name="telephone"
      placeholder="Téléphone *"
      value={form.telephone}
      onChange={handleInput}
      required
      className="input"
    />

    <input
      type="email"
      name="email"
      placeholder="Email *"
      value={form.email}
      onChange={handleInput}
      required
      className="input"
    />

    <input
      type="number"
      name="montant_transaction"
      placeholder="Montant transaction *"
      value={form.montant_transaction}
      onChange={handleInput}
      required
      className={`input ${form.colorClass}`}
    />

    <input
      type="text"
      name="montant_frais"
      placeholder="Frais"
      value={form.montant_frais}
      readOnly
      className={`input ${form.colorClass}`}
    />

    <input
      type="text"
      name="montant_remboursable"
      placeholder="Montant remboursable"
      value={form.montant_remboursable}
      readOnly
      className={`input ${form.colorClass}`}
    />

    <input
      type="text"
      name="montant_total"
      placeholder="Montant total"
      value={form.montant_total}
      readOnly
      className="input"
    />

    <input
      type="text"
      name="montant_total_lettres"
      placeholder="Montant total en lettres"
      value={form.montant_total_lettres}
      readOnly
      className="input"
    />

    <textarea
      name="raison"
      placeholder="Décrivez la raison *"
      value={form.raison}
      onChange={handleInput}
      required
      className="input"
    />

    <select
      name="guichet"
      value={form.guichet}
      onChange={handleInput}
      required
      className="input"
    >
      <option value="">-- Guichet utilisé * --</option>
      <option value="UBA Tchad">UBA Tchad</option>
      <option value="Ecobank">Ecobank</option>
      <option value="SGT">SGT</option>
      <option value="BIAT">BIAT</option>
      <option value="CBT">CBT</option>
      <option value="UBA Nigeria">UBA Nigeria</option>
      <option value="Ecobank Nigeria">Ecobank Nigeria</option>
      <option value="BOA Niger">BOA Niger</option>
      <option value="Ecobank Cameroun">Ecobank Cameroun</option>
      <option value="Standard Bank South Africa">Standard Bank South Africa</option>
      <option value="Access Bank Nigeria">Access Bank Nigeria</option>
      <option value="Barclays Kenya">Barclays Kenya</option>
      <option value="BNP Paribas">BNP Paribas</option>
      <option value="Société Générale">Société Générale</option>
      <option value="Barclays">Barclays</option>
      <option value="HSBC">HSBC</option>
      <option value="Autre">Autre (précisez dans la localité)</option>
    </select>

    <input
      type="text"
      name="localite"
      placeholder="Localité (facultatif)"
      value={form.localite}
      onChange={handleInput}
      className="input"
    />

    <input
      type="date"
      name="transaction_date"
      value={form.transaction_date}
      onChange={handleInput}
      required
      className="input"
      lang="fr"
    />

    <input
      type="time"
      name="transaction_time"
      value={form.transaction_time}
      onChange={handleInput}
      className="input"
      lang="fr"
    />

    <input
      type="file"
      name="uploads"
      multiple
      onChange={handleFiles}
      className="input"
    />
    <p className="file-note">Fichiers (images ou PDF)</p>

    <SignatureCanvas
      ref={sigCanvas}
      penColor="red"
      canvasProps={{
        width: 500,
        height: 150,
        className: "signature-pad",
      }}
    />
    <button
      type="button"
      className="clear-signature"
      onClick={clearSignature}
    >
      Effacer signature
    </button>

    <button type="submit" className="submit-btn">
      Soumettre la réclamation
    </button>
  </form>
</div>
     <Footer1 />
    </>
  );
}
