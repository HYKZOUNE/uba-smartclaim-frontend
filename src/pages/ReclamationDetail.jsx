import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingCircle from '../components/LoadingCircle';

const ReclamationDetail = () => {
  const { id } = useParams();
  const [reclamation, setReclamation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReclamation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reclamations/${id}`, {
          withCredentials: true
        });
        setReclamation(res.data);
      } catch (error) {
        alert('Erreur lors du chargement du dossier.');
      } finally {
        setLoading(false);
      }
    };
    fetchReclamation();
  }, [id]);

  if (loading) return <LoadingCircle />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dossier #{reclamation.numero_dossier}</h1>
      <p><strong>Catégorie :</strong> {reclamation.categorie.nom}</p>
      <p><strong>Date du problème :</strong> {new Date(reclamation.date_probleme).toLocaleDateString()}</p>
      {reclamation.montant && <p><strong>Montant :</strong> {reclamation.montant}</p>}
      <p><strong>Description :</strong> {reclamation.description}</p>
      <p><strong>Statut :</strong> {reclamation.statut}</p>
      {reclamation.pieces_jointes.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Pièces jointes :</h2>
          <ul className="list-disc list-inside">
            {reclamation.pieces_jointes.map(p => (
              <li key={p.id}>
                <a href={`http://localhost:5000/${p.chemin}`} target="_blank" rel="noreferrer">{p.nom_fichier}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reclamation.messages.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Messages :</h2>
          {reclamation.messages.map(m => (
            <div key={m.id} className="border p-2 my-2 rounded bg-gray-50">
              <p><strong>{m.expediteur} :</strong> {m.message}</p>
              <p className="text-xs text-gray-500">{new Date(m.date_envoi).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReclamationDetail;
