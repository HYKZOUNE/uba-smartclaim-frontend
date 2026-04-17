// src/components/InfoCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

const InfoCard = ({ title, text, to, icon: Icon, onClick }) => {
  const content = (
    <div className="info-card" onClick={onClick}>
      <div className="info-icon">
        <IconContext.Provider value={{ size: "28px" }}>
          <Icon />
        </IconContext.Provider>
      </div>
      <div className="info-body">
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="card-cta">En savoir plus →</div>
      </div>
    </div>
  );

  return to ? <Link to={to} className="card-link">{content}</Link> : content;
};

export default InfoCard;
