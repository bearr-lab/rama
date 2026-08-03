'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Bell } from 'lucide-react';

export default function NotificationsSettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <Bell className="size-5" /> Notifications
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={prefs.notifEmail}
            onChange={e => setPrefs({...prefs, notifEmail: e.target.checked})}
            className="size-4"
          />
          <label className="text-sm font-bold text-ink">Email Notifications</label>
        </div>
      </div>
    </div>
  );
}
