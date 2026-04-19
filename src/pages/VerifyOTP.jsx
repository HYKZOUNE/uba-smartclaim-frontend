
import { useState } from "react";
import api from "../services/api";
import axios from "axios";
import "./auth.css";

export default function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      await api.post("/api/clients/verify-otp", {
  email,
  code
});

      alert("✅ OTP validé !");
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  return (
    <div>
      <h2>Vérification OTP</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Code OTP"
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleVerify}>Vérifier</button>
    </div>
  );
}   