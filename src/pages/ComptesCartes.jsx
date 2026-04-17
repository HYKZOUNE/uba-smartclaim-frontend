import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function ComptesCartes() {
  return (
    <>
    <Header />
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-red-700 mb-6">Comptes & Cartes</h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        UBA Tchad propose une gamme complète de comptes bancaires et de cartes pour répondre aux besoins
        des particuliers, étudiants, fonctionnaires, commerçants et entreprises.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-2xl text-red-700 font-semibold">Compte courant</h2>
          <p className="mt-2 text-gray-700">
            Un compte flexible pour vos opérations quotidiennes.
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-2xl text-red-700 font-semibold">Carte VISA UBA</h2>
          <p className="mt-2 text-gray-700">
            Pour vos achats au Tchad et à l'international.
          </p>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
}
