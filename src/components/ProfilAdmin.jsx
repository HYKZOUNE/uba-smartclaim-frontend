import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilAdmin.css";

export default function ProfilAdmin() {
  const [admin, setAdmin] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    role: "",
    avatar: ""
  });

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    avatarFile: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔒 CLEAN DATA
  const cleanUser = (user = {}) => ({
    prenom: user.prenom ?? "",
    nom: user.nom ?? "",
    email: user.email ?? "",
    telephone: user.telephone ?? "",
    role: user.role ?? "",
    avatar: user.avatar ?? ""
  });

  // ================= FETCH     ALTER TABLE users ADD avatar VARCHAR(255);            et        =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/admin/me`,
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);

        if (res.data?.success) {
          const user = cleanUser(res.data.user);

          setAdmin(user);

          setFormData({
            prenom: user.prenom,
            nom: user.nom,
            telephone: user.telephone,
            avatarFile: null
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [token]);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value ?? ""
    }));
  };

  // ================= PASSWORD INPUT =================
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData(prev => ({
      ...prev,
      [name]: value ?? ""
    }));
  };

  // ================= AVATAR =================
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, avatarFile: file }));
    setPreviewAvatar(URL.createObjectURL(file));
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    setLoading(true);

    try {
      const data = new FormData();
      data.append("prenom", formData.prenom);
      data.append("nom", formData.nom);
      data.append("telephone", formData.telephone);
      if (formData.avatarFile) data.append("avatar", formData.avatarFile);

      const res = await axios.put(
  `${process.env.REACT_APP_API_URL}/api/admin/profile/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.data.success) {
        setAdmin(cleanUser(res.data.user));
        setPreviewAvatar(null);
        alert("✅ Profil mis à jour !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await axios.put(
  `${process.env.REACT_APP_API_URL}/api/admin/profile/change-password`,
        passwordData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        alert("🔐 Mot de passe modifié !");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  // ================= INITIALS =================
  const getInitials = () => {
    return (
      (admin.prenom?.charAt(0).toUpperCase() || "") +
      (admin.nom?.charAt(0).toUpperCase() || "")
    );
  };

  return (
    <div className="profil-admin-container">
      <h2>Mon Profil</h2>

      <div className="profil-card">

        {/* AVATAR */}
        <div className="profil-avatar">
          {previewAvatar || admin.avatar ? (
            <img src={previewAvatar || admin.avatar} alt="avatar" />
          ) : (
            <div className="avatar-initials">{getInitials()}</div>
          )}
          <input type="file" onChange={handleAvatarChange} />
        </div>

        {/* INFOS */}
        <div className="profil-info">
          <input name="prenom" value={formData.prenom ?? ""} onChange={handleChange} />
          <input name="nom" value={formData.nom ?? ""} onChange={handleChange} />
          <input name="telephone" value={formData.telephone ?? ""} onChange={handleChange} />

          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Rôle:</strong> {admin.role}</p>

          <button onClick={handleSave} disabled={loading}>
  {loading ? "Enregistrement..." : "💾 Enregistrer"}
</button>
        </div>
      </div>

      {/* 🔐 PASSWORD */}
      <div className="password-section">
        <h3>🔐 Changer mot de passe</h3>

        <input
          type="password"
          name="currentPassword"
          placeholder="Ancien mot de passe"
          value={passwordData.currentPassword ?? ""}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={passwordData.newPassword ?? ""}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer"
          value={passwordData.confirmPassword ?? ""}
          onChange={handlePasswordChange}
        />

        <button onClick={handleChangePassword}>
          🔐 Modifier mot de passe
        </button>
      </div>
    </div>
  );
}