'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Sliders } from 'lucide-react';

export default function AISettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <Sliders className="size-5" /> AI Concierge
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-ink">Primary AI Model</label>
          <select 
            value={prefs.aiPrimaryModel}
            onChange={e => setPrefs({...prefs, aiPrimaryModel: e.target.value})}
            className="mt-1 block w-full rounded-none border border-border/60 bg-surface-subtle p-2"
          >
            <option value="google/gemini-2.0-pro-exp-02-05:free">Gemini 2.0 Pro Experimental (Free)</option>
            <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B Instruct (Free)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
