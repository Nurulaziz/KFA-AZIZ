const DEFAULT_TEXT = 'Selamat datang di masjid kami. Jaga kebersihan dan ketertiban lingkungan masjid.';

function RunningText({ announcements }) {
  const texts = announcements && announcements.length > 0
    ? announcements.map((a) => a.text)
    : [DEFAULT_TEXT];

  const combined = texts.join('   \u{1F54C}   ');
  const duration = Math.max(20, combined.length * 0.08);

  return (
    <div className="ticker-container">
      <div className="ticker-label">PENGUMUMAN</div>
      <div className="ticker-track">
        <span
          className="ticker-text"
          style={{ '--ticker-duration': `${duration}s` }}
        >
          {combined}
        </span>
      </div>
    </div>
  );
}

export default RunningText;
