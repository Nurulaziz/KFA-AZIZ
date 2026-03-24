import { useState, useEffect } from 'react';

const ROTATE_INTERVAL = 12000; // 12 detik per hadith

function HadithDisplay({ hadiths }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const active = hadiths && hadiths.length > 0 ? hadiths.filter((h) => h.isActive) : [];

  useEffect(() => {
    if (active.length <= 1) return;

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % active.length);
        setVisible(true);
      }, 600);
    }, ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [active.length]);

  if (active.length === 0) return null;

  const current = active[index % active.length];

  return (
    <div className="hadith-container">
      <div className={`hadith-card ${visible ? 'hadith-visible' : 'hadith-hidden'}`}>
        <div className="hadith-label">HADITH</div>
        {current.arabic && (
          <div className="hadith-arabic">{current.arabic}</div>
        )}
        <div className="hadith-translation">"{current.translation}"</div>
        {current.source && (
          <div className="hadith-source">— {current.source}</div>
        )}
      </div>
    </div>
  );
}

export default HadithDisplay;
