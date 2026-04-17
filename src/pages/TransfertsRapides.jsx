import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TransfertsRapides() {
  return (
    <>
    <Header />
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-red-700 mb-6">Transferts rapides</h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        Avec UBA, envoyez et recevez de l'argent instantanément au Tchad et à l'international grâce à nos 
        solutions sécurisées.
      </p>

      <div className="space-y-6 max-w-3xl">
        <div className="p-6 shadow bg-gray-50 rounded-xl">
          <h2 className="text-2xl text-red-700 font-semibold">UBA Money Transfer</h2>
          <p className="mt-2 text-gray-700">Transferts rapides entre comptes UBA.</p>
        </div>

        <div className="p-6 shadow bg-gray-50 rounded-xl">
          <h2 className="text-2xl text-red-700 font-semibold">Western Union</h2>
          <p className="mt-2 text-gray-700">Recevez et envoyez de l’argent partout dans le monde.</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
