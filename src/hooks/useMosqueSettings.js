import { useState, useCallback } from 'react';
import settingsService from '../services/settingsService';

function useMosqueSettings() {
  const [settings, setSettings] = useState(() => settingsService.get());

  const updateMosqueName = useCallback((name) => {
    const updated = settingsService.save({ mosqueName: name });
    setSettings(updated);
  }, []);

  const updateSettings = useCallback((partial) => {
    const updated = settingsService.save(partial);
    setSettings(updated);
  }, []);

  return {
    mosqueName: settings.mosqueName,
    settings,
    updateMosqueName,
    updateSettings,
  };
}

export default useMosqueSettings;
