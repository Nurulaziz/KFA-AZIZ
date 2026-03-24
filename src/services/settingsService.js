const SETTINGS_KEY = 'mosqueSettings';

const DEFAULT_SETTINGS = {
  mosqueName: 'Musholla Al Husna',
  city: 'Bekasi',
  country: 'Indonesia',
};

const settingsService = {
  get: () => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
    return DEFAULT_SETTINGS;
  },

  save: (settings) => {
    const current = settingsService.get();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  },
};

export default settingsService;
