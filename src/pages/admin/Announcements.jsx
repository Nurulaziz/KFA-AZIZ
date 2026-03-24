import { useState, useEffect } from 'react';
import announcementService from '../../services/announcementService';
import Swal from 'sweetalert2';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApiAvailable, setIsApiAvailable] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    text: '',
    isActive: true,
    order: 1,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await announcementService.getAll();
      if (response.success) {
        setAnnouncements(response.data);
        setIsApiAvailable(!response.fromCache);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat data');
      setIsApiAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAdd = () => {
    setModalMode('add');
    setSelectedItem(null);
    setFormData({ text: '', isActive: true, order: announcements.length + 1 });
    setFormError(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setFormData({ text: item.text, isActive: item.isActive, order: item.order || 1 });
    setFormError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.text.trim()) {
      setFormError('Teks pengumuman wajib diisi');
      return;
    }

    try {
      setFormLoading(true);
      setFormError(null);

      if (isApiAvailable) {
        if (modalMode === 'add') {
          await announcementService.create(formData);
        } else {
          await announcementService.update(selectedItem.id, formData);
        }
        await fetchAnnouncements();
      } else {
        // localStorage fallback
        if (modalMode === 'add') {
          announcementService.createLocal(formData);
        } else {
          announcementService.updateLocal(selectedItem.id, formData);
        }
        setAnnouncements(announcementService.getAllLocal());
      }

      handleCloseModal();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);

      if (isApiAvailable) {
        await announcementService.delete(itemToDelete.id);
        await fetchAnnouncements();
      } else {
        announcementService.deleteLocal(itemToDelete.id);
        setAnnouncements(announcementService.getAllLocal());
      }

      handleCloseDeleteModal();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.message || 'Gagal menghapus pengumuman',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="mb-0 h3">Pengumuman</h1>
          <p className="mb-0 text-muted">Kelola teks running text TV Display</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>
          Tambah Pengumuman
        </button>
      </div>

      {/* API warning */}
      {!isApiAvailable && !loading && (
        <div className="alert alert-warning">
          <i className="bi bi-wifi-off me-2"></i>
          API tidak tersedia. Data disimpan secara lokal di browser ini.
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Memuat data...</p>
        </div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '50px' }}>No</th>
                  <th>Teks Pengumuman</th>
                  <th style={{ width: '100px' }}>Status</th>
                  <th style={{ width: '80px' }}>Urutan</th>
                  <th style={{ width: '100px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {announcements.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Belum ada pengumuman. Tambahkan pengumuman untuk ditampilkan di TV Display.
                    </td>
                  </tr>
                ) : (
                  announcements.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.text}</td>
                      <td>
                        <span className={`badge ${item.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {item.isActive ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td>{item.order || '-'}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Hapus"
                          onClick={() => handleDeleteClick(item)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === 'add' ? 'Tambah Pengumuman' : 'Edit Pengumuman'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {formError && (
                  <div className="alert alert-danger py-2">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {formError}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="text" className="form-label">
                    Teks Pengumuman <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="text"
                    name="text"
                    rows="3"
                    value={formData.text}
                    onChange={handleInputChange}
                    placeholder="Masukkan teks pengumuman..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="order" className="form-label">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="order"
                    name="order"
                    min="1"
                    value={formData.order}
                    onChange={handleInputChange}
                    style={{ maxWidth: '120px' }}
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Aktif (tampil di TV Display)
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={formLoading}>
                  Batal
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Menyimpan...
                    </>
                  ) : modalMode === 'add' ? (
                    'Simpan'
                  ) : (
                    'Update'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Hapus</h5>
                <button type="button" className="btn-close" onClick={handleCloseDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">Hapus pengumuman ini?</p>
                <p className="text-muted small mt-1">"{itemToDelete?.text}"</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal} disabled={deleteLoading}>
                  Batal
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm} disabled={deleteLoading}>
                  {deleteLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Menghapus...
                    </>
                  ) : (
                    'Hapus'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
