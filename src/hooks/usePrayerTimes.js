import { useState, useEffect } from 'react';
import prayerService from '../services/prayerService';

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function getActivePrayer(prayerTimes) {
  if (!prayerTimes) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const times = PRAYER_KEYS.map((key) => {
    const [h, m] = prayerTimes[key].split(':').map(Number);
    return { key, minutes: h * 60 + m };
  });

  let active = times[times.length - 1].key; // default to Isha
  for (let i = 0; i < times.length; i++) {
    if (currentMinutes >= times[i].minutes) {
      active = times[i].key;
    }
  }
  return active;
}

function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [activePrayer, setActivePrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayers = async () => {
      const today = new Date().toISOString().split('T')[0];
      const cacheKey = `prayerCache_${today}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const data = JSON.parse(cached);
        setPrayerTimes(data);
        setActivePrayer(getActivePrayer(data));
        setLoading(false);
        return;
      }

      try {
        const timings = await prayerService.getTimingsByCity();
        const filtered = {};
        PRAYER_KEYS.forEach((k) => {
          // Remove timezone suffix like "(WIB)"
          filtered[k] = timings[k].split(' ')[0];
        });
        localStorage.setItem(cacheKey, JSON.stringify(filtered));
        setPrayerTimes(filtered);
        setActivePrayer(getActivePrayer(filtered));
      } catch (err) {
        setError('Gagal memuat jadwal sholat');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  // Update active prayer every minute
  useEffect(() => {
    if (!prayerTimes) return;
    const interval = setInterval(() => {
      setActivePrayer(getActivePrayer(prayerTimes));
    }, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return { prayerTimes, activePrayer, loading, error };
}

export default usePrayerTimes;
