// Shows countdown to next prayer when ≤ WARN_MINUTES away
const WARN_MINUTES = 15;

function PrayerCountdown({ nextPrayer }) {
  if (!nextPrayer) return null;
  if (nextPrayer.minutesLeft > WARN_MINUTES) return null;

  const mins = nextPrayer.minutesLeft;
  const isImminent = mins <= 5;

  return (
    <div className={`prayer-countdown ${isImminent ? 'imminent' : ''}`}>
      <i className="bi bi-alarm me-2"></i>
      {mins <= 1
        ? `Waktu ${nextPrayer.name} sebentar lagi!`
        : `${nextPrayer.name} dalam ${mins} menit`}
    </div>
  );
}

export default PrayerCountdown;
