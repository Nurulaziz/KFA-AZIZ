import axios from 'axios';

const ALADHAN_BASE = 'https://api.aladhan.com/v1';

const prayerService = {
  getTimingsByCity: async (city = 'Bekasi', country = 'Indonesia', method = 11) => {
    const response = await axios.get(`${ALADHAN_BASE}/timingsByCity`, {
      params: { city, country, method },
      timeout: 10000,
    });
    return response.data.data.timings;
  },
};

export default prayerService;
