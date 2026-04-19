import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingCircle from '../components/LoadingCircle';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/api/rapports', {
          withCredentials: true
        });
        setReports(res.data);
      } catch (error) {
        alert('Erreur lors du chargement des rapports.');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <LoadingCircle />;

  return (
    <>
    <Header />
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Rapports</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-uba-blue text-white">
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Contenu</th>
            <th className="py-2 px-4">Date création</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{r.type}</td>
              <td className="py-2 px-4">{r.contenu}</td>
              <td className="py-2 px-4">{new Date(r.date_creation).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
        </>
  );
};

export default Reports;
