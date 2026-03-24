import { useState, useEffect, useCallback } from 'react';
import announcementService from '../services/announcementService';

function useAnnouncements(activeOnly = false) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = activeOnly
        ? await announcementService.getActive()
        : await announcementService.getAll();
      if (response.success) {
        setAnnouncements(response.data);
      }
    } catch (err) {
      // Final fallback: read from localStorage directly
      const local = announcementService.getAllLocal();
      const filtered = activeOnly ? local.filter((a) => a.isActive) : local;
      setAnnouncements(filtered);
      if (filtered.length === 0) {
        setError(err.message || 'Gagal memuat pengumuman');
      }
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { announcements, loading, error, refetch: fetch };
}

export default useAnnouncements;
