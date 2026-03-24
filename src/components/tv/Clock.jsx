import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());

  return (
    <div className="tv-clock-section">
      <span className="tv-clock">
        {hours}:{minutes}
        <span className="tv-clock-seconds">:{seconds}</span>
      </span>
    </div>
  );
}

export default Clock;
