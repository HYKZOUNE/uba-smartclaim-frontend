import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserEdit.css";

export default function ClientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    numero_compte: "",
    telephone: "",
    mot_de_passe: "",
    confirmation_mot_de_passe: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/admin/clients/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
        setForm({ ...res.data, mot_de_passe: "", confirmation_mot_de_passe: "" });
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement du client.");
      }
    };

    fetchClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/clients/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Client mis à jour avec succès !");
      // redirection facultative, uniquement après validation
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }

    setLoading(false);
  };

  return (
    <div className="edit-container fade-in">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Modifier le client</h2>

        <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="numero_compte" placeholder="Numéro de compte" value={form.numero_compte} onChange={handleChange} required />
        <input type="text" name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />

        <button type="submit" disabled={loading}>{loading ? "Mise à jour..." : "Mettre à jour"}</button>

        <button
          type="button"
          className="edit-button"
          style={{ marginTop: "10px", backgroundColor: "#aaa" }}
          onClick={() => navigate("/admin/dashboard")}
        >
          🔙 Retour
        </button>
      </form>
    </div>
  );
}






