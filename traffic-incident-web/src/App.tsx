// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { UserDashboard } from './features/dashboard/UserDashboard';
import { AdminDashboard } from './features/dashboard/AdminDashboard';
import { IncidentsPage } from './features/incidents/IncidentsPage';
import { UsersPage } from './features/users/UsersPage';
import { VehiclesPage } from './features/vehicles/VehiclesPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { WorkshopsPage } from './features/workshops/WorkshopsPage';
import { InsurancePage } from './features/insurance/InsurancePage';
import { ProtectedRoute } from './middleware/ProtectedRoute';
import { DigesettDashboard } from './features/incidents/DigesettDashboard';
import { InsuranceDashboard } from './features/insurance/InsuranceDashboard';
import { CoverageLetterDashboard } from './features/insurance/CoverageLetterDashboard'; // Añadir este import
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { WorkshopQuote } from './features/workshops/WorkshopQuote';
import { ReportIncidentPage } from './features/incidents/ReportIncidentPage';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
         {/* Rutas públicas */}
         <Route path="/" element={<LoginPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
         
         {/* Rutas de usuario */}
         <Route path="/user" element={
           <ProtectedRoute roles={['client']}>
             <MainLayout />
           </ProtectedRoute>
         }>
           <Route index element={<UserDashboard />} />
           <Route path="vehicles" element={<VehiclesPage />} />
           <Route path="incidents" element={<IncidentsPage />} />
           <Route path="report-incident" element={<ReportIncidentPage />} />
           <Route path="profile" element={<ProfilePage />} />
         </Route>


          {/* Rutas Admin */}
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="workshops" element={<WorkshopsPage />} />
            <Route path="insurance-companies" element={<InsurancePage />} />
          </Route>

         {/* Rutas DIGESETT */}
         <Route path="/digesett" element={
           <ProtectedRoute roles={['digesett']}>
             <MainLayout />
           </ProtectedRoute>
         }>
           <Route index element={<DigesettDashboard />} />
           <Route path="incidents" element={<IncidentsPage />} />
         </Route>

         {/* Rutas Aseguradora */}
         <Route path="/insurance-agent" element={
           <ProtectedRoute roles={['insurance_agent']}>
             <MainLayout />
           </ProtectedRoute>
         }>
           <Route index element={<InsuranceDashboard />} />
           <Route path="coverage-letters" element={<CoverageLetterDashboard />} />
         </Route>

         {/* Rutas Taller */}
         <Route path="/workshop" element={
           <ProtectedRoute roles={['workshop']}>
             <MainLayout />
           </ProtectedRoute>
         }>
           <Route path="quote/:incidentId" element={<WorkshopQuote />} />
         </Route>

         </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;