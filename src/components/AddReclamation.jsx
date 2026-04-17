import React, { useState } from "react";
import "./AddReclamation.css";

export default function AddReclamation() {
  const [form, setForm] = useState({
    numero_compte: "",
    telephone: "",
    montant_transaction: "",
    guichet: "",
    localite: "",
    transaction_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:5000/api/chargeback/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de l'enregistrement");
      }

      setMessage({
        type: "success",
        text: `✔ Réclamation enregistrée avec succès. Dossier N° : ${data.numero_dossier || ""}`,
      });

      // reset formulaire
      setForm({
        numero_compte: "",
        telephone: "",
        montant_transaction: "",
        guichet: "",
        localite: "",
        transaction_date: "",
      });

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Une erreur est survenue",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-reclamation">
      <h2>➕ Ajouter une réclamation</h2>

      {message && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="numero_compte"
          placeholder="Numéro de compte"
          value={form.numero_compte}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="montant_transaction"
          placeholder="Montant de la transaction"
          value={form.montant_transaction}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="guichet"
          placeholder="Guichet"
          value={form.guichet}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="localite"
          placeholder="Localité"
          value={form.localite}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="transaction_date"
          value={form.transaction_date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Enregistrement..." : "📤 Enregistrer"}
        </button>
      </form>
    </div>
  );
}
