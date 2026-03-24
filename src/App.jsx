import { Routes, Route } from 'react-router-dom';
import TvDisplay from './pages/TvDisplay';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import MasjidDashboard from './pages/admin/MasjidDashboard';
import Announcements from './pages/admin/Announcements';
import Settings from './pages/admin/Settings';
import Users from './components/admin/Users';

function App() {
  return (
    <Routes>
      {/* TV Display - full screen, no layout wrapper */}
      <Route path="/" element={<TvDisplay />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Admin - protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MasjidDashboard />} />
        <Route path="dashboard" element={<MasjidDashboard />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
