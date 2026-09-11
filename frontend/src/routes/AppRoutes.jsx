import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ImageIntegrity from '../pages/ImageIntegrity';
import ModelIntegrity from '../pages/ModelIntegrity';
import PredictionVerification from '../pages/PredictionVerification';
import Contributors from '../pages/Contributors';
import BlockchainEvidence from '../pages/BlockchainEvidence';
import TrustScore from '../pages/TrustScore';
import ImpactFinder from '../pages/ImpactFinder';
import IncidentCenter from '../pages/IncidentCenter';
import VisualPipeline from '../pages/VisualPipeline';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/image-integrity"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ImageIntegrity />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/model-integrity"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ModelIntegrity />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/prediction-verification"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PredictionVerification />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contributors"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Contributors />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/blockchain-evidence"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BlockchainEvidence />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trust-score"
        element={
          <ProtectedRoute>
            <MainLayout>
              <TrustScore />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/impact-finder"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ImpactFinder />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/incident-center"
        element={
          <ProtectedRoute>
            <MainLayout>
              <IncidentCenter />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/visual-pipeline"
        element={
          <ProtectedRoute>
            <MainLayout>
              <VisualPipeline />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
    </Routes>
  );
}
