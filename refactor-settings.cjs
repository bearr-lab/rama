/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const baseDir = 'c:/dubai/rama/app/(workspace)/[locale]/settings';
const componentsDir = 'c:/dubai/rama/components/settings';

// Create directories
['appearance', 'ai', 'notifications', 'security', 'developer'].forEach(dir => {
  fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
});

// 1. Settings Context
fs.writeFileSync(path.join(componentsDir, 'settings-context.tsx'), `'use client';
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
`);

// 2. Settings Sidebar
fs.writeFileSync(path.join(componentsDir, 'settings-sidebar.tsx'), `'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, Sliders, Bell, Shield, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsSidebar({ locale = 'en' }: { locale?: string }) {
  const pathname = usePathname();
  
  const navItems = [
    { href: \`/\${locale}/settings/appearance\`, label: 'Appearance', icon: Palette },
    { href: \`/\${locale}/settings/ai\`, label: 'AI Concierge', icon: Sliders },
    { href: \`/\${locale}/settings/notifications\`, label: 'Notifications', icon: Bell },
    { href: \`/\${locale}/settings/security\`, label: 'Security', icon: Shield },
    { href: \`/\${locale}/settings/developer\`, label: 'Developer API', icon: Terminal },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map(item => {
        const isActive = pathname.includes(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all',
              isActive
                ? 'bg-stone-800 text-stone-100 shadow-resting'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
`);

// 3. Settings Layout
fs.writeFileSync(path.join(baseDir, 'layout.tsx'), `import * as React from 'react';
import { SettingsSidebar } from '@/components/settings/settings-sidebar';
import { SettingsProvider } from '@/components/settings/settings-context';

export default async function SettingsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <SettingsProvider>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10 md:flex-row">
        <aside className="w-full md:w-64 shrink-0">
          <h2 className="font-display text-2xl font-bold mb-6 text-stone-900">Settings</h2>
          <SettingsSidebar locale={locale} />
        </aside>
        <main className="flex-1 border border-stone-200 bg-stone-50 p-6 md:p-8 shadow-resting">
          {children}
        </main>
      </div>
    </SettingsProvider>
  );
}
`);

// 4. Default page redirect
fs.writeFileSync(path.join(baseDir, 'page.tsx'), `import { redirect } from 'next/navigation';

export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(\`/\${locale}/settings/appearance\`);
}
`);

// 5. Appearance Page
fs.writeFileSync(path.join(baseDir, 'appearance', 'page.tsx'), `'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Palette } from 'lucide-react';

export default function AppearanceSettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
          <Palette className="size-5" /> Appearance & Localization
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-stone-900">Currency</label>
          <select 
            value={prefs.currency}
            onChange={e => setPrefs({...prefs, currency: e.target.value})}
            className="mt-1 block w-full rounded-none border border-stone-300 bg-stone-50 p-2"
          >
            <option value="AED">AED</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    </div>
  );
}
`);

// 6. AI Page
fs.writeFileSync(path.join(baseDir, 'ai', 'page.tsx'), `'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Sliders } from 'lucide-react';

export default function AISettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
          <Sliders className="size-5" /> AI Concierge
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-stone-900">Primary AI Model</label>
          <select 
            value={prefs.aiPrimaryModel}
            onChange={e => setPrefs({...prefs, aiPrimaryModel: e.target.value})}
            className="mt-1 block w-full rounded-none border border-stone-300 bg-stone-50 p-2"
          >
            <option value="google/gemini-2.0-pro-exp-02-05:free">Gemini 2.0 Pro Experimental (Free)</option>
            <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B Instruct (Free)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
`);

// 7. Notifications Page
fs.writeFileSync(path.join(baseDir, 'notifications', 'page.tsx'), `'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Bell } from 'lucide-react';

export default function NotificationsSettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
          <Bell className="size-5" /> Notifications
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={prefs.notifEmail}
            onChange={e => setPrefs({...prefs, notifEmail: e.target.checked})}
            className="h-4 w-4"
          />
          <label className="text-sm font-bold text-stone-900">Email Notifications</label>
        </div>
      </div>
    </div>
  );
}
`);

// 8. Security Page
fs.writeFileSync(path.join(baseDir, 'security', 'page.tsx'), `'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Shield } from 'lucide-react';

export default function SecuritySettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
          <Shield className="size-5" /> Security
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={prefs.enable2FA}
            onChange={e => setPrefs({...prefs, enable2FA: e.target.checked})}
            className="h-4 w-4"
          />
          <label className="text-sm font-bold text-stone-900">Enable 2FA</label>
        </div>
      </div>
    </div>
  );
}
`);

// 9. Developer API Page
fs.writeFileSync(path.join(baseDir, 'developer', 'page.tsx'), `'use client';
import * as React from 'react';
import { SettingsContext } from '@/components/settings/settings-context';
import { Terminal } from 'lucide-react';

export default function DeveloperSettings() {
  const { prefs, setPrefs, isLoaded } = React.useContext(SettingsContext);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
          <Terminal className="size-5" /> Developer API
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-stone-900">Webhook URL</label>
          <input 
            type="url"
            value={prefs.webhookUrl}
            onChange={e => setPrefs({...prefs, webhookUrl: e.target.value})}
            className="mt-1 block w-full rounded-none border border-stone-300 bg-stone-50 p-2"
          />
        </div>
      </div>
    </div>
  );
}
`);

console.log('Settings refactored successfully.');
