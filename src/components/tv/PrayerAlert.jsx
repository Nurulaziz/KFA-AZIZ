import { useState, useEffect, useRef } from 'react';

const INDONESIAN_NAMES = {
  Fajr: 'Subuh',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
};

const ARABIC_NAMES = {
  Fajr: 'الفجر',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

// Show alert for this many minutes after prayer starts
const ALERT_DURATION_MINUTES = 10;

function PrayerAlert({ activePrayer }) {
  const [visible, setVisible] = useState(false);
  const prevPrayerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!activePrayer) return;

    // Trigger when active prayer changes (new prayer time just started)
    if (prevPrayerRef.current !== null && prevPrayerRef.current !== activePrayer) {
      setVisible(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, ALERT_DURATION_MINUTES * 60 * 1000);
    }

    prevPrayerRef.current = activePrayer;
  }, [activePrayer]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible || !activePrayer) return null;

  return (
    <div className="prayer-alert-overlay" onClick={() => setVisible(false)}>
      <div className="prayer-alert-box">
        <div className="prayer-alert-allahu">الله أكبر</div>
        <div className="prayer-alert-title">Waktu Sholat</div>
        <div className="prayer-alert-name">
          {INDONESIAN_NAMES[activePrayer]}
          <span className="prayer-alert-arabic"> — {ARABIC_NAMES[activePrayer]}</span>
        </div>
        <div className="prayer-alert-sub">Segera tunaikan sholat</div>
        <div className="prayer-alert-dismiss">Ketuk untuk tutup</div>
      </div>
    </div>
  );
}

export default PrayerAlert;
