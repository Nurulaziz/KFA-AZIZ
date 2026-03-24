import api from './api';

const STORAGE_KEY = 'mosque_announcements';

const announcementService = {
  getAll: async () => {
    try {
      const response = await api.get('/announcements');
      // Cache to localStorage on success
      if (response.data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        return { success: true, data, fromCache: true };
      }
      throw error.response ? error.response.data : error;
    }
  },

  getActive: async () => {
    try {
      const response = await api.get('/announcements', { params: { isActive: true } });
      return response.data;
    } catch (error) {
      // Fallback: filter from localStorage cache
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const data = JSON.parse(cached).filter((a) => a.isActive);
        return { success: true, data, fromCache: true };
      }
      throw error.response ? error.response.data : error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/announcements', data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/announcements/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // localStorage-only fallback methods (used when API is unavailable)
  getAllLocal: () => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  },

  saveLocal: (announcements) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
  },

  createLocal: (data) => {
    const announcements = announcementService.getAllLocal();
    const newItem = {
      id: Date.now(),
      text: data.text,
      isActive: data.isActive !== undefined ? data.isActive : true,
      order: data.order || announcements.length + 1,
      createdAt: new Date().toISOString(),
    };
    announcements.push(newItem);
    announcementService.saveLocal(announcements);
    return newItem;
  },

  updateLocal: (id, data) => {
    const announcements = announcementService.getAllLocal();
    const index = announcements.findIndex((a) => a.id === id);
    if (index !== -1) {
      announcements[index] = { ...announcements[index], ...data };
      announcementService.saveLocal(announcements);
      return announcements[index];
    }
    throw new Error('Pengumuman tidak ditemukan');
  },

  deleteLocal: (id) => {
    const announcements = announcementService.getAllLocal().filter((a) => a.id !== id);
    announcementService.saveLocal(announcements);
  },
};

export default announcementService;
