import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserEdit.css";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: ""
  });
  const role = localStorage.getItem("role");

if (role !== "admin" && role !== "agent") {
  navigate("/unauthorized");
}

  // 🔥 FETCH USER
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/users/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Agent non trouvé");
      }
    };
    fetchData();
  }, [id]);

  // 🔥 VALIDATION
  const validate = () => {
    if (!form.nom || !form.prenom || !form.email) {
      toast.warning("Tous les champs sont obligatoires");
      return false;
    }
    return true;
  };

  // 🔥 UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:5000/api/admin/users/${id}`, form);

      // toast visible jusqu'au clic
      toast.success("Agent mis à jour avec succès", {
        autoClose: false,
        onClose: () => {
          const role = localStorage.getItem("role");
          if (role === "admin") navigate("/admin/dashboard");
          else navigate("/agent/dashboard");
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  return (
    <div className="edit-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Modifier un agent</h2>

        <div className="input-group">
          <span>👤</span>
          <input
            placeholder="Nom"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
        </div>

        <div className="input-group">
          <span>👤</span>
          <input
            placeholder="Prénom"
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
          />
        </div>

        <div className="input-group">
          <span>📧</span>
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <span>📱</span>
          <input
            placeholder="Téléphone"
            value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          />
        </div>

        <button className="edit-button" type="submit">
          💾 Mettre à jour
        </button>
        {/* 🔙 Bouton Retour */}
        <button
          type="button"
          className="edit-button"
          style={{ backgroundColor: "#999", marginTop: "10px" }}
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Retour
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={false}
        closeOnClick
        draggable
        pauseOnHover
        newestOnTop
        theme="colored"
      />
    </div>
  );
}