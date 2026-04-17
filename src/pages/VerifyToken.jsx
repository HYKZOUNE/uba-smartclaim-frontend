import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const VerifyToken = () => {
  const navigate = useNavigate();

  const [channel, setChannel] = useState("email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Évite double soumission (React StrictMode / double clic)
  const isSubmitting = useRef(false);

  const userId = sessionStorage.getItem("tmpUserId");
  

  /* ================== PROTECTION PAGE ================== */
  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
    }
  }, [userId, navigate]);

  /* ================== ENVOI CODE ================== */
  const sendToken = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await api.post("/auth/send-token", {
        userId: Number(userId),
        channel,
      });

      alert(`Code envoyé par ${channel.toUpperCase()}`);
    } catch (err) {
      alert(
        "Erreur envoi code : " +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================== VERIFICATION CODE ================== */
  const verify = async (e) => {
    e.preventDefault();

    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setLoading(true);

    try {
      const { data } = await api.post("/auth/verify-token", {
        userId: Number(userId),
        code,
      });

      if (!data?.token || !data?.role) {
        alert("Code invalide ou expiré");
        return;
      }

      // ✅ STOCKAGE UNIQUE ET PROPRE
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role.toLowerCase());

      sessionStorage.removeItem("tmpUserId");

      // 🚦 REDIRECTION CONTROLEE
      if (data.role.toLowerCase() === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (data.role.toLowerCase() === "agent") {
        navigate("/agent/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }

    } catch (err) {
      alert(
        "Erreur vérification : " +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  /* ================== UI ================== */
  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Vérification du code</h2>

        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          disabled={loading}
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>

        <button onClick={sendToken} disabled={loading}>
          {loading ? "Envoi..." : "Envoyer le code"}
        </button>

        <form onSubmit={verify}>
          <input
            type="text"
            placeholder="Entrez le code reçu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Vérification..." : "Valider le code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyToken;
