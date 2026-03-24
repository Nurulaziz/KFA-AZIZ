import { useState, useEffect, useCallback } from 'react';
import hadithService from '../services/hadithService';

function useHadith(activeOnly = false) {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = activeOnly
        ? await hadithService.getActive()
        : await hadithService.getAll();
      if (response.success) {
        setHadiths(response.data);
      }
    } catch (err) {
      const local = hadithService.getAllLocal();
      const filtered = activeOnly ? local.filter((h) => h.isActive) : local;
      setHadiths(filtered);
      if (filtered.length === 0) {
        setError(err.message || 'Gagal memuat hadith');
      }
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { hadiths, loading, error, refetch: fetch };
}

export default useHadith;
