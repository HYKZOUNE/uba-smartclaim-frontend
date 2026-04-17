// src/components/DashboardCard.jsx
import React from "react";

const DashboardCard = ({ title, subtitle, status, date, agent }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300 border-l-4 border-red-600">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600 text-sm">{subtitle}</p>

      <div className="mt-3">
        <p><b>Statut :</b> {status}</p>
        <p><b>Date :</b> {new Date(date).toLocaleString()}</p>
        <p><b>Assigné à :</b> {agent}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
