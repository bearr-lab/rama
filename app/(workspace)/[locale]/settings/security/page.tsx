'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Shield } from 'lucide-react';

export default function SecuritySettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <Shield className="size-5" /> Security
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={prefs.enable2FA}
            onChange={e => setPrefs({...prefs, enable2FA: e.target.checked})}
            className="size-4"
          />
          <label className="text-sm font-bold text-ink">Enable 2FA</label>
        </div>
      </div>
    </div>
  );
}
