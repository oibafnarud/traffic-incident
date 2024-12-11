// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LoginPage } from './features/auth/LoginPage112';
import { RegisterPage } from './features/auth/RegisterPage';
import { UserDashboard } from './features/dashboard/UserDashboard';
import { AdminDashboard } from './features/dashboard/AdminDashboard';
import { IncidentsPage } from './features/incidents/IncidentsPage';
import { UsersPage } from './features/users/UsersPage';
import { VehiclesPage } from './features/vehicles/VehiclesPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { WorkshopsPage } from './features/workshops/WorkshopsPage';
import { InsurancePage } from './features/insurance/InsurancePage';
import { ReportIncidentPage } from './features/incidents/ReportIncidentPage';
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { DigesettDashboard } from './features/incidents/DigesettDashboard';
import { CoverageLetterDashboard } from './features/insurance/CoverageLetterDashboard';

function App() {
  return (

    <AuthProvider>
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Rutas de usuario */}
        <Route path="/user" element={<MainLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="incidents" element={<IncidentsPage />} />
          <Route path="report-incident" element={<ReportIncidentPage />} /> {/* Nueva ruta */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Rutas de administrador */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="workshops" element={<WorkshopsPage />} />
          <Route path="insurance-companies" element={<InsurancePage />} />
        </Route>
        
         {/* Rutas de DIGESETT */}
         <Route path="/digesett" element={<MainLayout />}>
          <Route index element={<DigesettDashboard />} />
          <Route path="incidents/:id" element={<DigesettReport />} />
          <Route path="incidents" element={<IncidentsPage />} />
        </Route>

        {/* Rutas de Aseguradoras */}
        <Route path="/insurance-agent" element={<MainLayout />}>
          <Route index element={<InsuranceDashboard />} />
          <Route path="coverage-letters" element={<CoverageLetterDashboard />} />
          <Route path="coverage-letters/:id" element={<CoverageLetter />} />
        </Route>

        {/* Taller */}
        <Route path="/workshop" element={<MainLayout />}>
          <Route index element={<WorkshopDashboard />} />
          <Route path="quotes" element={<QuotesList />} />
          <Route path="quotes/new/:incidentId" element={<WorkshopQuote />} />
        </Route>

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;