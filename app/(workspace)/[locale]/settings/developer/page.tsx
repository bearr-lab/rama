'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Terminal } from 'lucide-react';

export default function DeveloperSettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <Terminal className="size-5" /> Developer API
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-ink">Webhook URL</label>
          <input 
            type="url"
            value={prefs.webhookUrl}
            onChange={e => setPrefs({...prefs, webhookUrl: e.target.value})}
            className="mt-1 block w-full rounded-none border border-border/60 bg-surface-subtle p-2"
          />
        </div>
      </div>
    </div>
  );
}
