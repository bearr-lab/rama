'use client';
import * as React from 'react';

export const SettingsContext = React.createContext<any>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = React.useState({
    currency: 'AED',
    notifEmail: true,
    notifWhatsapp: true,
    notifPriceAlerts: true,
    priceDropThreshold: 2,
    whatsappNumber: '+971 50 123 4567',
    enableV2: true,
    enableSandbox: true,
    enableEjariSync: true,
    aiPrimaryModel: 'google/gemini-2.0-pro-exp-02-05:free',
    enable2FA: true,
    webhookUrl: 'https://api.familyoffice-portfolio.ae/v1/rama-webhook',
  });
  
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
    const saved = localStorage.getItem('rama-user-preferences');
    if (saved) setPrefs(prev => ({ ...prev, ...JSON.parse(saved) }));
  }, []);

  const savePrefs = (newPrefs: any) => {
    setPrefs(newPrefs);
    localStorage.setItem('rama-user-preferences', JSON.stringify(newPrefs));
  };

  return (
    <SettingsContext.Provider value={{ prefs, setPrefs: savePrefs, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}
