import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      className="flex-shrink-0 p-3 text-white d-flex flex-column bg-dark"
      style={{ width: '250px', minHeight: '100vh' }}
    >
      {/* Brand */}
      <NavLink
        to="/admin"
        className="mb-3 text-white d-flex align-items-center mb-md-0 me-md-auto text-decoration-none"
      >
        <i className="bi bi-mosque fs-4 me-2"></i>
        <span className="fs-5">Admin Masjid</span>
      </NavLink>

      <hr />

      {/* Navigation Menu */}
      <ul className="mb-auto nav nav-pills flex-column">
        <li className="nav-item">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/announcements"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <i className="bi bi-megaphone me-2"></i>
            Pengumuman
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <i className="bi bi-gear me-2"></i>
            Pengaturan
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <i className="bi bi-people me-2"></i>
            Users
          </NavLink>
        </li>
      </ul>

      <hr />

      {/* TV Display Link */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link text-success"
      >
        <i className="bi bi-display me-2"></i>
        Buka TV Display
      </a>
    </div>
  );
};

export default Sidebar;
