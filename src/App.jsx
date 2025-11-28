import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import {lazy, Suspense} from 'react';
import PageLoader from './components/PageLoader';
// import Pegawai from '../src/components/admin/Pegawai'


// LAZY IMPORT - Komponen yang di-load saat dibutuhkan
// ============================================

// Public Pages`
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Admin Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./components/admin/Users'));

// APP COMPONENT
// ============================================
function App() {
  return (
    <Suspense fallback={<PageLoader/>}>
      <Routes>
         {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* admin route protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;