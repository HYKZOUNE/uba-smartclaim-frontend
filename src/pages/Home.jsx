import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/uba_logo.png';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import "./responsive.css";

const Home = () => {

  const slides = [
    {
      title: "Bienvenue à UBA Tchad",
      text: "Votre partenaire financier de confiance pour un avenir meilleur.",
      button: "Découvrir nos services",
      image: slide1,
    },
    {
      title: "Banque digitale sécurisée",
      text: "Gérez vos comptes facilement grâce à nos solutions numériques innovantes.",
      button: "Ouvrir un compte",
      image: slide2,
    },
    {
      title: "UBA, Toujours à vos côtés",
      text: "Des solutions bancaires adaptées à vos besoins personnels et professionnels.",
      button: "En savoir plus",
      image: slide3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeRefs = useRef([]);

  /* ================= DARK MODE ================= */

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  /* ================= SLIDER AUTO ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  /* ================= ANIMATION SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      fadeRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page">

      {/* ================= HEADER ================= */}
      <header className="home-header">
        <div className="logo-container">
          <Link to="/home">
            <img src={logo} alt="UBA Logo" className="home-logo clickable-logo" />
          </Link>
          <h1>UBA SmartClaim</h1>
        </div>

        <nav className="home-nav">

          <Link to="/home" className="nav-link">Accueil</Link>
          <Link to="/about" className="nav-link">À propos</Link>
          <Link to="/services" className="nav-link">Chargeback</Link>
          <Link to="/services1" className="nav-link">Carte Bloquée</Link>
          <Link to="/services2" className="nav-link">Carte Avalée</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <button onClick={toggleDarkMode} className="btn-primary">
            {darkMode ? "☀️ Mode clair" : "🌙 Mode sombre"}
          </button>
          <Link to="/login" className="nav-link">Se connecter</Link>
        </nav>
      </header>

      {/* ================= SLIDER ================= */}
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
              <Link to="/contact" className="hero-button">
                {slide.button}
              </Link>
            </div>
          </div>
        ))}

        <button
          className="prev"
          onClick={() =>
            setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
          }
        >❮</button>

        <button
          className="next"
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % slides.length)
          }
        >❯</button>
      </div>

      {/* ================= MAIN ================= */}
      <main className="home-main">
        <section className="features-section">
          {[
            {
              title: "Chargeback",
              text: "Service dédié aux réclamations de débits à tort et contestations d'opérations.",
              link: "/services"
            },
            {
              title: "Carte Bloquée",
              text: "Assistance rapide pour le déblocage sécurisé de votre carte bancaire.",
              link: "/services1"
            },
            {
              title: "Carte Avalée",
              text: "Procédure simplifiée pour récupérer ou remplacer votre carte avalée par un GAB.",
              link: "/services2"
            }
          ].map((feature, i) => (
            <Link
              key={i}
              to={feature.link}
              className="feature-card fade-up"
              ref={el => (fadeRefs.current[i] = el)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </Link>
          ))}
        </section>
        <div className="page-title text-red-700 mb-8">
                  <Link to="/service-reconciliation" className="page-btn"> + d'informations sur Réclamation </Link>
                </div>
      </main>

      {/* ================= FOOTER ================= */}
      {/* Footer */}
      <footer className="home-footer fade-up" ref={el => (fadeRefs.current[3] = el)}>
        <div className="footer-container">
          <div className="footer-section">
            <h4>Information utile</h4>
            <ul>
              <li>Compte épargne</li>
              <li>Compte courant</li>
              <li>Cartes</li>
              <li>Contactez-nous</li>
              <li>Banque avec nous</li>
              <li>Les services bancaires personnels</li>
              <li>Banque d'affaires</li>
              <li>Solutions numériques</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>À propos d'UBA</h4>
            <ul>
              <li>Focus Business</li>
              <li>Histoire d'UBA</li>
              <li>Conseil d'administration</li>
              <li>Réalisations</li>
              <li>Force & Évaluations</li>
              <li>Ressources</li>
              <li>Informations actionnaires</li>
              <li>Vue d'ensemble du PDG</li>
              <li>Rapports d'analyste</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact & Horaires</h4>
            <p>📧 Email : <a href="mailto:contact@uba-tchad.com">contact@uba-tchad.com</a></p>
            <p>📞 Téléphone : +235 22 51 12 34</p>
            <p></p>
            <ul>
              <li>⏱ Lundi - Vendredi : 07h30 - 17h00</li>
              <li>⏱ Samedi - Dimanche : Fermé </li>
            </ul>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} United Bank for Africa - UBA Tchad. Tous droits réservés.
        </p>
        {/* Réseaux sociaux sous le copyright */}
        <div className="footer-social">
          <a href="https://www.facebook.com/UBATchadsa/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" width="24" />
          </a>
          <a href="https://x.com/UBAGabon" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" width="24" />
          </a>
          <a href="https://www.linkedin.com/company/ubatchad/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="24" />
          </a>
          <a href="https://www.instagram.com/ubatchad/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" width="24" />
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Home;