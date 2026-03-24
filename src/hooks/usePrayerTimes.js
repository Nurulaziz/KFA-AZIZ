import { useState, useEffect } from 'react';
import prayerService from '../services/prayerService';
import settingsService from '../services/settingsService';

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const INDONESIAN_NAMES = {
  Fajr: 'Subuh',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
};

function getPrayerMinutes(prayerTimes) {
  return PRAYER_KEYS.map((key) => {
    const [h, m] = prayerTimes[key].split(':').map(Number);
    return { key, minutes: h * 60 + m };
  });
}

function getActivePrayer(prayerTimes) {
  if (!prayerTimes) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const times = getPrayerMinutes(prayerTimes);

  let active = times[times.length - 1].key;
  for (let i = 0; i < times.length; i++) {
    if (currentMinutes >= times[i].minutes) {
      active = times[i].key;
    }
  }
  return active;
}

function getNextPrayerInfo(prayerTimes) {
  if (!prayerTimes) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const times = getPrayerMinutes(prayerTimes);

  // Find next prayer (first prayer whose time > now)
  for (let i = 0; i < times.length; i++) {
    if (times[i].minutes > currentMinutes) {
      return {
        key: times[i].key,
        name: INDONESIAN_NAMES[times[i].key],
        minutesLeft: times[i].minutes - currentMinutes,
        time: prayerTimes[times[i].key],
      };
    }
  }

  // After Isha — next is Fajr tomorrow
  const fajrTomorrow = times[0].minutes + 24 * 60;
  return {
    key: 'Fajr',
    name: INDONESIAN_NAMES['Fajr'],
    minutesLeft: fajrTomorrow - currentMinutes,
    time: prayerTimes['Fajr'],
  };
}

function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [activePrayer, setActivePrayer] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayers = async () => {
      const { city, country } = settingsService.get();
      const today = new Date().toISOString().split('T')[0];
      const cacheKey = `prayerCache_${today}_${city}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const data = JSON.parse(cached);
        setPrayerTimes(data);
        setActivePrayer(getActivePrayer(data));
        setNextPrayer(getNextPrayerInfo(data));
        setLoading(false);
        return;
      }

      try {
        const timings = await prayerService.getTimingsByCity(city, country);
        const filtered = {};
        PRAYER_KEYS.forEach((k) => {
          filtered[k] = timings[k].split(' ')[0];
        });
        localStorage.setItem(cacheKey, JSON.stringify(filtered));
        setPrayerTimes(filtered);
        setActivePrayer(getActivePrayer(filtered));
        setNextPrayer(getNextPrayerInfo(filtered));
      } catch (err) {
        setError('Gagal memuat jadwal sholat');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  // Update every minute
  useEffect(() => {
    if (!prayerTimes) return;
    const interval = setInterval(() => {
      setActivePrayer(getActivePrayer(prayerTimes));
      setNextPrayer(getNextPrayerInfo(prayerTimes));
    }, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return { prayerTimes, activePrayer, nextPrayer, loading, error };
}

export default usePrayerTimes;
