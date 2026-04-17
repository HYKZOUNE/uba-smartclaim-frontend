import { Link } from "react-router-dom";
import "../styles/UBA.css";
import logo from "../assets/uba_logo.png"; // ton logo UBA

export default function Header() {
  return (
    <header className="uba-header">
      <Link to="/home">
      <div className="uba-logo">
        <img src={logo} alt="UBA Logo" style={{ width: "50px" }} />
        <span>UBA SmartClaim</span>
      </div>
      </Link>

      <nav className="uba-nav">
        <Link to="/home">Accueil</Link>
        <Link to="/about">À propos</Link>
        <Link to="/services">Chargeback</Link>
        <Link to="/services1">CarteBloquee</Link>
        <Link to="/services2">CarteAvalee</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="uba-btn">Réclamer</Link>
      </nav>
    </header>
  );
}
