import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ClientEdit.css";

export default function ClientEdit1() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: ""
  });

  const role = localStorage.getItem("role");

  // 🔐 sécurité accès
  useEffect(() => {
    if (role !== "admin" && role !== "agent") {
      navigate("/unauthorized");
    }
  }, [role, navigate]);

  // 🔥 FETCH CLIENT
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/agent/users/${id}`
        );
        setForm(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Client introuvable");
      }
    };

    fetchClient();
  }, [id]);

  // 🔥 validation
  const validate = () => {
    if (!form.nom || !form.prenom || !form.email) {
      toast.warning("Tous les champs sont obligatoires");
      return false;
    }
    return true;
  };

  // 🔥 update client
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

   try {
  await axios.put(
    `${process.env.REACT_APP_API_URL}/api/agent/users/${id}`,
    form
  );

      toast.success("Client modifié avec succès", {
        autoClose: 2000,
        onClose: () => navigate("/agent/dashboard")
      });
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  return (
    <div className="edit-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Modifier Client</h2>

        <input
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />

        <input
          placeholder="Prénom"
          value={form.prenom}
          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Téléphone"
          value={form.telephone}
          onChange={(e) =>
            setForm({ ...form, telephone: e.target.value })
          }
        />

        <button type="submit" className="edit-button">
          💾 Sauvegarder
        </button>

        <button
          type="button"
          className="edit-button cancel"
          onClick={() => navigate("/agent/clients")}
        >
          ← Retour
        </button>
      </form>

      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}