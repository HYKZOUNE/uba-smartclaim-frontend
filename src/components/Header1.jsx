import { Link } from "react-router-dom";
import "../styles/UBA.css";
import logo from "../assets/uba_logo.png"; // ton logo UBA

export default function Header() {
  return (
    <header className="uba-header">
      <div className="uba-logo">
        <img src={logo} alt="UBA Logo" style={{ width: "50px" }} />
        <span>UBA SmartClaim</span>
      </div>

      <nav className="uba-nav">
        <Link to="/ReclamationForm">Chargeback</Link>
        <Link to="/CarteBloque">CarteBloquee</Link>
        <Link to="/CarteAvale">CarteAvalee</Link>
        <Link to="/VerifierDossier">SuiviDossiers</Link>
        <Link to="/service-reconciliation" className="uba-btn">DéConnecter</Link>
      </nav>
    </header>
  );
}
