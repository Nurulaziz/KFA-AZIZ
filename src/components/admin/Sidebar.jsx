import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isMasterDataOpen, setIsMasterDataOpen] = useState(false);

    const toggleMasterData = () => {
        setIsMasterDataOpen((prev) => !prev);
    };

    return (
        <div
        className=" flex-shrink-0 p-3 text-white d-flex flex-column shadow-sm p-3 mb-5 bg-costum-primary"
        style={{ width: '250px', 
            minHeight: '100vh', 
            position: 'sticky',
            top: 0,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
        >
        {/* Brand */}
        <NavLink
            to="/admin"
            className="mb-3 text-white d-flex align-items-center mb-md-0 me-md-auto text-decoration-none"
        >
            <i className="bi bi-box-seam fs-4 me-2"></i>
            <span className="fs-4">Admin Panel</span>
        </NavLink>

        <hr />

        {/* Navigation Menu */}
        <ul className="mb-auto nav nav-pills flex-column">
            <li className="nav-item">
            <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
            >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
            </NavLink>
            </li>

            <li>
            <NavLink
                to="/admin/users"
                className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
            >
                <i className="bi bi-people me-2"></i>
                Users
            </NavLink>
            </li>

            {/* <li className="nav-item dropdown">
            <button
                className="btn btn-toggle nav-link text-white w-100 text-start d-flex align-items-center mb-2"
                onClick={toggleMasterData}
                aria-expanded={isMasterDataOpen}
                style={{ background: 'none', border: 'none', padding: 0 }}
            >
                <i className="bi bi-box me-2"></i>
                Master Data
                <i
                className={`bi ms-auto ${isMasterDataOpen ? 'bi-caret-down-fill' : 'bi-caret-right-fill'}`}
                ></i>
            </button>

            <div className={`collapse ${isMasterDataOpen ? 'show' : ''}`}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                <li><NavLink to="#" className="nav-link text-white mb-2">Action</NavLink></li>
                <li><NavLink to="#" className="nav-link text-white mb-2">Another action</NavLink></li>
                <li><NavLink to="#" className="nav-link text-white mb-2">Something else here</NavLink></li>
                </ul>
            </div>
            </li> */}

           <li className="nav-item">
    <a
        className="nav-link text-white d-flex justify-content-between align-items-center"
        data-bs-toggle="collapse"
        href="#masterDataMenu"
        role="button"
        aria-expanded="false"
        aria-controls="masterDataMenu"
        style={{ cursor: "pointer" }}
    >
        <span>
            <i className="bi bi-folder me-2"></i>
            Master Data
        </span>
        <i className="bi bi-caret-down-fill"></i>
    </a>

    <div className="collapse ms-4" id="masterDataMenu">
        <ul className="list-unstyled">
            
            {/* Pegawai */}
            <li>
                <NavLink
                    to="/admin/pegawai"
                    className={({ isActive }) =>
                        `nav-link text-white ${isActive ? 'active' : ''}`
                    }
                >
                    <i className="bi bi-person-badge me-2"></i>
                    Pegawai
                </NavLink>
            </li>

            {/* Obat */}
            <li>
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `nav-link text-white ${isActive ? 'active' : ''}`
                    }
                >
                    <i className="bi bi-capsule me-2"></i>
                    Obat
                </NavLink>
            </li>

            {/* Pelanggan */}
            <li>
                <NavLink
                    to="/admin/categories"
                    className={({ isActive }) =>
                        `nav-link text-white ${isActive ? 'active' : ''}`
                    }
                >
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Pelanggan
                </NavLink>
            </li>

            {/* Supplier */}
            <li>
                <NavLink
                    to="/admin/supplier"
                    className={({ isActive }) =>
                        `nav-link text-white ${isActive ? 'active' : ''}`
                    }
                >
                    <i className="bi bi-truck me-2"></i>
                    Supplier
                </NavLink>
            </li>
        </ul>
    </div>
</li>



            <li className="nav-item">
    <a
        className="nav-link text-white d-flex justify-content-between align-items-center"
        data-bs-toggle="collapse"
        href="#laporanMenu"
        role="button"
        aria-expanded="false"
        aria-controls="laporanMenu"
        style={{ cursor: "pointer" }}
    >
        <span>
            <i className="bi bi-file-earmark-bar-graph me-2"></i>
            Laporan
        </span>
        <i className="bi bi-caret-down-fill"></i>
    </a>

        <div className="collapse ms-4" id="laporanMenu">
            <ul className="list-unstyled">

                <li>
                    <NavLink
                        to="/admin/laporan/pembelian"
                        className={({ isActive }) =>
                            `nav-link text-white ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-cart-check me-2"></i>
                        Pembelian
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/admin/laporan/riwayat-transaksi"
                        className={({ isActive }) =>
                            `nav-link text-white ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-clock-history me-2"></i>
                        Riwayat Transaksi
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/admin/laporan/stok"
                        className={({ isActive }) =>
                            `nav-link text-white ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-box-seam me-2"></i>
                        Stok
                    </NavLink>
                </li>

            </ul>
        </div>
    </li>


            <li>
            <NavLink
                to="/admin/settings"
                className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
            >
                <i className="bi bi-gear me-2"></i>
                Settings
            </NavLink>
            </li>
        </ul>

        <hr />
        </div>
    );
    };

export default Sidebar;
