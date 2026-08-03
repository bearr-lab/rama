'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Palette, TrendingUp, Monitor } from 'lucide-react';

export default function AppearanceSettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
      {/* Settings Panel */}
      <div className="space-y-6">
        <div className="border-b border-border/60 pb-4">
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Palette className="size-5" /> Appearance & Localization
          </h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Currency Preference</label>
            <select 
              value={prefs.currency}
              onChange={e => setPrefs({...prefs, currency: e.target.value})}
              className="mt-2 block w-full rounded-none border border-border/60 bg-surface-subtle p-3 font-medium text-ink focus:border-fjord focus:ring-1 focus:ring-ink focus:outline-none"
            >
              <option value="AED">AED (Emirati Dirham)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (British Pound)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Interface Density</label>
            <select 
              className="mt-2 block w-full rounded-none border border-border/60 bg-surface-subtle p-3 font-medium text-ink focus:border-fjord focus:ring-1 focus:ring-ink focus:outline-none"
            >
              <option value="comfortable">Comfortable (Nordic Lagom Default)</option>
              <option value="compact">Compact (Data Heavy)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Live Preview Panel (Lagom-compliant) */}
      <div className="shadow-subtle h-full rounded-none border border-border/60 bg-surface p-6">
        <h4 className="mb-6 flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
          <Monitor className="size-4" /> Live Preview Component
        </h4>
        
        <div className="space-y-4">
          <div className="shadow-resting rounded-none border border-border/60 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Total Portfolio Value</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">
                  {prefs.currency} {prefs.currency === 'AED' ? '18,500,000' : prefs.currency === 'USD' ? '5,035,000' : prefs.currency === 'EUR' ? '4,625,000' : '3,925,000'}
                </p>
              </div>
              <div className="flex items-center gap-1 border border-fjord bg-surface px-2 py-1 text-xs font-bold text-ink">
                <TrendingUp className="size-3.5" /> +12%
              </div>
            </div>
          </div>
          
          <div className="shadow-resting rounded-none border border-border/60 bg-white p-5">
             <p className="text-xs leading-relaxed font-medium text-muted-foreground">
               This is a simulated preview of how your financial data and metrics will render across the RAMA dashboard based on your active localization settings. The strict Nordic Lagom styling ensures absolute readability regardless of currency or density mode.
             </p>
          </div>
        </div>
      </div>

    </div>
  );
}
