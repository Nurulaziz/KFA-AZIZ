import api from './api';

const STORAGE_KEY = 'mosque_hadiths';

const DEFAULT_HADITHS = [
  {
    id: 1,
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
    translation: 'Sesungguhnya setiap amalan tergantung pada niatnya.',
    source: 'HR. Bukhari & Muslim',
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
    translation: 'Muslim sejati adalah orang yang kaum muslimin lain selamat dari (gangguan) lisan dan tangannya.',
    source: 'HR. Bukhari & Muslim',
    isActive: true,
    order: 2,
  },
  {
    id: 3,
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    translation: 'Sebaik-baik kalian adalah orang yang mempelajari Al-Quran dan mengajarkannya.',
    source: 'HR. Bukhari',
    isActive: true,
    order: 3,
  },
  {
    id: 4,
    arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    translation: 'Menuntut ilmu adalah kewajiban bagi setiap Muslim.',
    source: 'HR. Ibnu Majah',
    isActive: true,
    order: 4,
  },
  {
    id: 5,
    arabic: 'الدِّينُ النَّصِيحَةُ',
    translation: 'Agama itu adalah nasihat.',
    source: 'HR. Muslim',
    isActive: true,
    order: 5,
  },
];

const hadithService = {
  getAll: async () => {
    try {
      const response = await api.get('/hadiths');
      if (response.data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.data));
      }
      return response.data;
    } catch {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        return { success: true, data, fromCache: true };
      }
      // Gunakan default hadiths jika tidak ada cache
      return { success: true, data: DEFAULT_HADITHS, fromCache: true };
    }
  },

  getActive: async () => {
    try {
      const response = await api.get('/hadiths', { params: { isActive: true } });
      return response.data;
    } catch {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const data = JSON.parse(cached).filter((h) => h.isActive);
        return { success: true, data, fromCache: true };
      }
      return { success: true, data: DEFAULT_HADITHS.filter((h) => h.isActive), fromCache: true };
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/hadiths', data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/hadiths/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/hadiths/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getAllLocal: () => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : DEFAULT_HADITHS;
  },

  saveLocal: (hadiths) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hadiths));
  },

  createLocal: (data) => {
    const hadiths = hadithService.getAllLocal();
    const newItem = {
      id: Date.now(),
      arabic: data.arabic || '',
      translation: data.translation,
      source: data.source || '',
      isActive: data.isActive !== undefined ? data.isActive : true,
      order: data.order || hadiths.length + 1,
      createdAt: new Date().toISOString(),
    };
    hadiths.push(newItem);
    hadithService.saveLocal(hadiths);
    return newItem;
  },

  updateLocal: (id, data) => {
    const hadiths = hadithService.getAllLocal();
    const index = hadiths.findIndex((h) => h.id === id);
    if (index !== -1) {
      hadiths[index] = { ...hadiths[index], ...data };
      hadithService.saveLocal(hadiths);
      return hadiths[index];
    }
    throw new Error('Hadith tidak ditemukan');
  },

  deleteLocal: (id) => {
    const hadiths = hadithService.getAllLocal().filter((h) => h.id !== id);
    hadithService.saveLocal(hadiths);
  },
};

export default hadithService;
