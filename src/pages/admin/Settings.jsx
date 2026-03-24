import { useState } from 'react';
import useMosqueSettings from '../../hooks/useMosqueSettings';

function Settings() {
  const { mosqueName, updateMosqueName } = useMosqueSettings();
  const [inputName, setInputName] = useState(mosqueName);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    updateMosqueName(inputName.trim());
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
              Identitas Masjid
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
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Masukkan nama masjid..."
                    required
                  />
                  <div className="form-text">
                    Nama ini akan tampil di header TV Display.
                  </div>
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
                  {inputName || '(Nama Masjid)'}
                </span>
                <span style={{ color: '#c5c0b0', fontSize: '0.9rem' }}>
                  Senin, 24 Maret 2026
                </span>
              </div>
            </div>
            <div className="card-footer">
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
