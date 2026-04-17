import "../styles/UBA.css";

export default function Footer() {
  return (
    <footer className="uba-footer">
      <div className="footer-grid">

        <div>
          <h4 className="footer-title">Services</h4>
          <a href="/comptes-cartes" className="footer-link">Comptes & Cartes</a>
          <a href="/transferts-rapides" className="footer-link">Transferts rapides</a>
          <a href="/solutions-entreprises" className="footer-link">Solutions entreprises</a>
          <a href="/services" className="footer-link">Digital Banking</a>
        </div>

        <div>
          <h4 className="footer-title">À propos d'UBA</h4>
          <a href="/about" className="footer-link">Histoire d'UBA</a>
          <a href="/about" className="footer-link">Focus Business</a>
          <a href="/about" className="footer-link">Conseil d'administration</a>
          <a href="/about" className="footer-link">Ressources et rapports</a>
        </div>

        <div>
          <h4 className="footer-title">Contact & Horaires</h4>
          <p className="footer-contact">📧 Email: contact@uba-tchad.com</p>
          <p className="footer-contact">📞 Téléphone: +235 22 51 12 34</p>
          <p className="footer-contact">⏱ Lundi - Vendredi: 07h30 - 17h00</p>
          <p className="footer-contact">⏱ Samedi - Dimanche : Fermé </p>

          <div className="footer-social">
            <a href="https://www.facebook.com/UBATchadsa/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" width="24" style={{ marginRight: "10px" }}/>
            </a>
            <a href="https://x.com/UBAGabon" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" width="24" style={{ marginRight: "10px" }}/>
            </a>
            <a href="https://www.linkedin.com/company/ubatchad/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="24" style={{ marginRight: "10px" }}/>
            </a>
            <a href="https://www.instagram.com/ubatchad/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" width="24"/>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} United Bank for Africa - UBA Tchad. Tous droits réservés.
      </div>
    </footer>
  );
}
