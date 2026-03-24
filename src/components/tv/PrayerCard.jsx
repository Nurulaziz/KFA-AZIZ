const ARABIC_NAMES = {
  Fajr: 'الفجر',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

const INDONESIAN_NAMES = {
  Fajr: 'Subuh',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
};

function PrayerCard({ prayerKey, time, isActive }) {
  return (
    <div className={`prayer-card ${isActive ? 'active' : ''}`}>
      <div className="prayer-card-arabic">{ARABIC_NAMES[prayerKey]}</div>
      <div className="prayer-card-name">{INDONESIAN_NAMES[prayerKey]}</div>
      <div className="prayer-time">{time}</div>
    </div>
  );
}

export default PrayerCard;
