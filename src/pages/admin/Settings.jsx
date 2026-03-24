import { useState } from 'react';
import useMosqueSettings from '../../hooks/useMosqueSettings';

const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function formatDateID(date) {
  return `${DAYS_ID[date.getDay()]}, ${date.getDate()} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
}

function Settings() {
  const { settings, updateSettings } = useMosqueSettings();

  const [form, setForm] = useState({
    mosqueName: settings.mosqueName,
    city: settings.city,
    country: settings.country,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.mosqueName.trim() || !form.city.trim() || !form.country.trim()) return;
    updateSettings({
      mosqueName: form.mosqueName.trim(),
      city: form.city.trim(),
      country: form.country.trim(),
    });
    // Clear prayer cache so new city takes effect
    const today = new Date().toISOString().split('T')[0];
    Object.keys(localStorage)
      .filter((k) => k.startsWith('prayerCache_'))
      .forEach((k) => localStorage.removeItem(k));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="mb-0 h3">Pengaturan</h1>
        <p className="mb-0 text-muted">Konfigurasi tampilan masjid</p>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <i className="bi bi-mosque me-2"></i>
              Identitas & Lokasi Masjid
            </div>
            <div className="card-body">
              {saved && (
                <div className="alert alert-success py-2 mb-3">
                  <i className="bi bi-check-circle me-2"></i>
                  Pengaturan berhasil disimpan!
                </div>
              )}
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label htmlFor="mosqueName" className="form-label">
                    Nama Masjid / Musholla
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mosqueName"
                    name="mosqueName"
                    value={form.mosqueName}
                    onChange={handleChange}
                    placeholder="Masukkan nama masjid..."
                    required
                  />
                  <div className="form-text">Tampil di header TV Display.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Contoh: Bekasi, Jakarta, Bandung..."
                    required
                  />
                  <div className="form-text">Digunakan untuk menentukan jadwal sholat.</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="country" className="form-label">
                    Negara
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Contoh: Indonesia"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-save me-2"></i>
                  Simpan Pengaturan
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <i className="bi bi-eye me-2"></i>
              Preview Header TV Display
            </div>
            <div className="card-body p-0">
              <div
                style={{
                  background: '#0d1f13',
                  color: '#f5f0e0',
                  padding: '1rem 1.5rem',
                  borderRadius: '0 0 0.375rem 0.375rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#f5c842', fontWeight: 700, fontSize: '1.1rem' }}>
                  {form.mosqueName || '(Nama Masjid)'}
                </span>
                <span style={{ color: '#c5c0b0', fontSize: '0.9rem' }}>
                  {formatDateID(new Date())}
                </span>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <span className="text-muted small">
                <i className="bi bi-geo-alt me-1"></i>
                Jadwal sholat: {form.city || '-'}, {form.country || '-'}
              </span>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-success"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i>
                Buka TV Display
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
