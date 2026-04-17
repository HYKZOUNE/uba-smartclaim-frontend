import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';


// Pages principales
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Services1 from './pages/Services1';
import Services2 from './pages/Services2';
import Contact from './pages/Contact';
import Reclamation from "./pages/Reclamation";

// Pages Services Détail
import ComptesCartes from "./pages/ComptesCartes";
import TransfertsRapides from "./pages/TransfertsRapides";
import SolutionsEntreprises from "./pages/SolutionsEntreprises";
import ServiceReconciliation from "./pages/ServiceReconciliation";
import ChargebackA4 from "./components/ChargebackA4";
import VerifierDossier from "./pages/VerifierDossier";

// Pages Auth
import Login from './pages/Login';
import ClientLogin from './pages/ClientLogin';
import Register from './pages/Register';
import ClientRegister from './pages/ClientRegister';
import VerifyToken from './pages/VerifyToken';
import VerifyOTP from './pages/VerifyOTP';
import Unauthorized from './pages/Unauthorized';
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ClientEdit1 from "./pages/ClientEdit1";

// Dashboards
import ClientDashboard from './pages/ClientDashboard';
import ClientEdit from './pages/ClientEdit';
import UserEdit from './pages/UserEdit';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReclamationForm from "./pages/ReclamationForm";
import CarteBloque from "./pages/CarteBloque";
import CarteAvale from "./pages/CarteAvale";
import Parametre from "./pages/Parametre";

// Routes sécurisées
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (

    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>

          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services1" element={<Services1 />} />
          <Route path="/services2" element={<Services2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Reclamation" element={<Reclamation />} />


          {/* Services détaillés */}
          <Route path="/comptes-cartes" element={<ComptesCartes />} />
          <Route path="/transferts-rapides" element={<TransfertsRapides />} />
          <Route path="/solutions-entreprises" element={<SolutionsEntreprises />} />
          <Route path="/service-reconciliation" element={<ServiceReconciliation />} />
          <Route path="/ChargebackA4" element={<ChargebackA4 />} />
          <Route path="/VerifierDossier" element={<VerifierDossier />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/clientlogin" element={<ClientLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clientregister" element={<ClientRegister />} />
          <Route path="/verify-token" element={<VerifyToken />} />
          <Route path="/VerifyOTP" element={<VerifyOTP />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/admin/clients/edit/:id" element={<ClientEdit />} />
          <Route path="/admin/users/edit/:id" element={<UserEdit />} />
          <Route path="/agent/clients/edit1/:id" element={<ClientEdit1 />} />
          {/* Formulaires */}
          <Route path="/reclamationform" element={<ReclamationForm />} />
          <Route path="/CarteBloque" element={<CarteBloque />} />
          <Route path="/CarteAvale" element={<CarteAvale />} />
          <Route path="/Parametre" element={<Parametre />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />


          {/* Dashboards sécurisés */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/agent/dashboard"
            element={
              <PrivateRoute role="agent">
                <AgentDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/client/dashboard"
            element={
              <PrivateRoute role="client">
                <ClientDashboard />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
