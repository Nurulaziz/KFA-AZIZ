import PrayerCard from './PrayerCard';

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function PrayerTimes({ prayerTimes, activePrayer, loading }) {
  if (loading) {
    return (
      <div className="tv-prayer-section">
        {PRAYER_KEYS.map((k) => (
          <div key={k} className="prayer-skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="tv-prayer-section">
      {PRAYER_KEYS.map((k) => (
        <PrayerCard
          key={k}
          prayerKey={k}
          time={prayerTimes ? prayerTimes[k] : '--:--'}
          isActive={activePrayer === k}
        />
      ))}
    </div>
  );
}

export default PrayerTimes;
