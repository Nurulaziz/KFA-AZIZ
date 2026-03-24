import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminNavbar = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!window.confirm('Yakin ingin keluar?')) return;
    await logout();
    navigate('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : (user?.email?.[0] || 'A').toUpperCase();

  return (
    <nav className="bg-white shadow-sm navbar navbar-expand-lg navbar-light border-bottom">
      <div className="container-fluid">
        {/* Toggle Button untuk Sidebar */}
        <button
          className="btn btn-outline-secondary me-3"
          type="button"
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Sembunyikan Sidebar' : 'Tampilkan Sidebar'}
        >
          <i className={`bi ${sidebarOpen ? 'bi-list' : 'bi-chevron-right'} fs-5`}></i>
        </button>

        {/* Right Side Items */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center gap-2"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#003a77',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              <span>{user?.name || user?.fullName || user?.email || 'Admin'}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/admin/settings">
                  <i className="bi bi-gear me-2"></i>
                  Pengaturan
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Keluar
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
