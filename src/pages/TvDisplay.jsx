import usePrayerTimes from '../hooks/usePrayerTimes';
import useAnnouncements from '../hooks/useAnnouncements';
import useMosqueSettings from '../hooks/useMosqueSettings';
import Clock from '../components/tv/Clock';
import PrayerTimes from '../components/tv/PrayerTimes';
import PrayerCountdown from '../components/tv/PrayerCountdown';
import PrayerAlert from '../components/tv/PrayerAlert';
import RunningText from '../components/tv/RunningText';

const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function formatDateID(date) {
  const day = DAYS_ID[date.getDay()];
  const d = date.getDate();
  const month = MONTHS_ID[date.getMonth()];
  const year = date.getFullYear();
  return `${day}, ${d} ${month} ${year}`;
}

function TvDisplay() {
  const { prayerTimes, activePrayer, nextPrayer, loading } = usePrayerTimes();
  const { announcements } = useAnnouncements(true);
  const { mosqueName } = useMosqueSettings();

  const today = new Date();

  return (
    <div className="tv-display">
      {/* Header */}
      <div className="tv-header">
        <div className="tv-mosque-name">{mosqueName}</div>
        <div className="tv-date">{formatDateID(today)}</div>
      </div>

      {/* Bismillah */}
      <div className="tv-bismillah">بسم الله الرحمن الرحيم</div>

      {/* Countdown — hanya muncul ≤15 menit sebelum sholat */}
      <PrayerCountdown nextPrayer={nextPrayer} />

      {/* Digital Clock */}
      <Clock />

      {/* Prayer Times */}
      <PrayerTimes
        prayerTimes={prayerTimes}
        activePrayer={activePrayer}
        loading={loading}
      />

      {/* Running Text */}
      <RunningText announcements={announcements} />

      {/* Alert Overlay — muncul otomatis saat waktu sholat tiba */}
      <PrayerAlert activePrayer={activePrayer} />
    </div>
  );
}

export default TvDisplay;
