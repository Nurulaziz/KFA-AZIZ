import { Link } from 'react-router-dom';
import useAnnouncements from '../../hooks/useAnnouncements';
import usePrayerTimes from '../../hooks/usePrayerTimes';
import useMosqueSettings from '../../hooks/useMosqueSettings';

const INDONESIAN_NAMES = {
  Fajr: 'Subuh',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
};

function MasjidDashboard() {
  const { announcements, loading: annLoading } = useAnnouncements();
  const { prayerTimes, activePrayer, loading: prayerLoading } = usePrayerTimes();
  const { mosqueName } = useMosqueSettings();

  const totalAnnouncements = announcements.length;
  const activeAnnouncements = announcements.filter((a) => a.isActive).length;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="mb-0 h3">Dashboard</h1>
          <p className="mb-0 text-muted">{mosqueName}</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          <i className="bi bi-display me-2"></i>
          Buka TV Display
        </a>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <i className="bi bi-megaphone fs-2 text-primary mb-2 d-block"></i>
              <h3 className="mb-1">{annLoading ? '...' : totalAnnouncements}</h3>
              <p className="text-muted mb-0 small">Total Pengumuman</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <i className="bi bi-check-circle fs-2 text-success mb-2 d-block"></i>
              <h3 className="mb-1">{annLoading ? '...' : activeAnnouncements}</h3>
              <p className="text-muted mb-0 small">Pengumuman Aktif</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <i className="bi bi-mosque fs-2 text-warning mb-2 d-block"></i>
              <h3 className="mb-1">5</h3>
              <p className="text-muted mb-0 small">Waktu Sholat Hari Ini</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <i className="bi bi-display fs-2 text-info mb-2 d-block"></i>
              <h3 className="mb-1">TV</h3>
              <p className="text-muted mb-0 small">Display Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today Prayer Times */}
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <i className="bi bi-clock me-2"></i>
              Jadwal Sholat Hari Ini (Bekasi)
            </div>
            <div className="card-body">
              {prayerLoading ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-primary"></div>
                  <p className="mt-2 text-muted small">Memuat jadwal...</p>
                </div>
              ) : prayerTimes ? (
                <div className="list-group list-group-flush">
                  {Object.entries(INDONESIAN_NAMES).map(([key, name]) => (
                    <div
                      key={key}
                      className={`list-group-item d-flex justify-content-between align-items-center px-0 ${
                        activePrayer === key ? 'fw-bold text-warning' : ''
                      }`}
                    >
                      <span>
                        {activePrayer === key && (
                          <i className="bi bi-arrow-right me-1 text-warning"></i>
                        )}
                        {name}
                      </span>
                      <span>{prayerTimes[key]}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Gagal memuat jadwal sholat.</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <i className="bi bi-grid me-2"></i>
              Menu Cepat
            </div>
            <div className="card-body d-flex flex-column gap-2">
              <Link to="/admin/announcements" className="btn btn-outline-primary text-start">
                <i className="bi bi-megaphone me-2"></i>
                Kelola Pengumuman
              </Link>
              <Link to="/admin/settings" className="btn btn-outline-secondary text-start">
                <i className="bi bi-gear me-2"></i>
                Pengaturan Masjid
              </Link>
              <Link to="/admin/users" className="btn btn-outline-dark text-start">
                <i className="bi bi-people me-2"></i>
                Kelola Users
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success text-start"
              >
                <i className="bi bi-display me-2"></i>
                Preview TV Display
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasjidDashboard;
