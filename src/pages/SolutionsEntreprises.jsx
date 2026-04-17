import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SolutionsEntreprises() {
  return (
    <>
    <Header />
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-red-700 mb-6">Solutions Entreprises</h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        UBA Tchad accompagne les entreprises avec des services adaptés au développement 
        et à la gestion optimale de leurs activités.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-2xl text-red-700 font-semibold">Compte entreprise PRO</h2>
          <p className="mt-2 text-gray-700">Solutions bancaires complètes pour PME et grandes entreprises.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-2xl text-red-700 font-semibold">Solutions digitales</h2>
          <p className="mt-2 text-gray-700">UBA Business Online, paiements électroniques, APIs.</p>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
}
