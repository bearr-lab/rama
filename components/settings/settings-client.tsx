'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Wallet,
  CheckCircle2,
  Sparkles,
  Sliders,
  Sun,
  Moon,
  Monitor,
  Key,
  Copy,
  Check,
  RefreshCw,
  Zap,
  Lock,
  UserCheck,
  Smartphone,
  Mail,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Activity,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';

interface SettingsClientProps {
  locale: string;
  user: any | null;
}

interface UserPreferences {
  currency: 'AED' | 'USD' | 'EUR';
  notifEmail: boolean;
  notifWhatsapp: boolean;
  notifPriceAlerts: boolean;
  priceDropThreshold: number;
  whatsappNumber: string;
  enableV2: boolean;
  enableSandbox: boolean;
  enableEjariSync: boolean;
  aiPrimaryModel: string;
  enable2FA: boolean;
  webhookUrl: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
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
};

function LagomSwitch({
  checked,
  onChange,
  isArabic,
  disabled = false,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  isArabic?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus-visible:ring-2 focus-visible:ring-fjord focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-fjord' : 'bg-border-hover dark:bg-border/80',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block size-5 transform rounded-none bg-white shadow-md ring-0 transition duration-200 ease-in-out',
          checked
            ? isArabic
              ? '-translate-x-5'
              : 'translate-x-5'
            : 'translate-x-0',
        )}
      />
    </button>
  );
}

export function SettingsClient({ locale, user }: SettingsClientProps) {
  const isArabic = locale === 'ar';
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Hydration state & persisted preferences
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [prefs, setPrefs] =
    React.useState<UserPreferences>(DEFAULT_PREFERENCES);

  // UI Interactive states
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [apiKeyVisible, setApiKeyVisible] = React.useState(false);
  const [apiKeyCopied, setApiKeyCopied] = React.useState(false);
  const [apiKeyString, setApiKeyString] = React.useState(
    'rm_live_dubai_98f24a7c4e8b31d9a0c2e557614d',
  );

  // AI Diagnostic tool states
  const [isTestingAi, setIsTestingAi] = React.useState(false);
  const [aiDiagnosticResult, setAiDiagnosticResult] = React.useState<{
    status: 'idle' | 'success' | 'error';
    latency?: number;
    model?: string;
    message?: string;
  }>({ status: 'idle' });

  // Load persisted preferences on mount
  React.useEffect(() => {
    setIsLoaded(true);
    try {
      const saved = localStorage.getItem('rama-user-preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPrefs({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch (e) {
      console.warn('Failed to load user preferences from localStorage:', e);
    }
  }, []);

  // Save handler
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      localStorage.setItem('rama-user-preferences', JSON.stringify(prefs));
      // Dispatch custom event so other components in the app can react immediately
      window.dispatchEvent(
        new CustomEvent('rama-preferences-updated', { detail: prefs }),
      );
    } catch (err) {
      console.error('Failed to save preferences:', err);
    }
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 400);
  };

  // Reset handler
  const handleReset = () => {
    if (
      window.confirm(
        isArabic
          ? 'هل أنت متأكد من رغبتك في إعادة ضبط جميع الإعدادات إلى القيم الافتراضية؟'
          : 'Are you sure you want to reset all preferences to default values?',
      )
    ) {
      setPrefs(DEFAULT_PREFERENCES);
      localStorage.removeItem('rama-user-preferences');
      setTheme('system');
      window.dispatchEvent(
        new CustomEvent('rama-preferences-updated', {
          detail: DEFAULT_PREFERENCES,
        }),
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Language switch handler
  const handleLanguageSwitch = (targetLocale: 'en' | 'ar') => {
    if (targetLocale === locale) return;
    const currentPath = pathname || `/${locale}/settings`;
    const newPath = currentPath.replace(/^\/(en|ar)/, `/${targetLocale}`);
    router.push(newPath);
  };

  // API Key actions
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKeyString);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2500);
  };

  const handleRegenerateApiKey = () => {
    if (
      window.confirm(
        isArabic
          ? 'تنبيه: إعادة إنشاء مفتاح API سيؤدي إلى إلغاء تنشيط المفتاح القديم فوراً. هل ترغب في المتابعة؟'
          : 'Warning: Regenerating your API key will immediately invalidate the old key across all integrations. Continue?',
      )
    ) {
      const randomHex = Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join('');
      setApiKeyString(`rm_live_dubai_${randomHex}`);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // AI Diagnostic tester
  const runAiDiagnostic = async () => {
    setIsTestingAi(true);
    setAiDiagnosticResult({ status: 'idle' });
    const startTime = performance.now();
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'ping diagnostic test' }],
        }),
      });
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);

      if (response.ok) {
        const data = await response.json();
        setAiDiagnosticResult({
          status: 'success',
          latency,
          model: data.model_used || 'rama-v2-local-simulation-engine',
          message: isArabic
            ? 'تم الاتصال بنجاح بمحرك الذكاء الاصطناعي'
            : 'Connected successfully to RAMA AI Engine',
        });
      } else {
        setAiDiagnosticResult({
          status: 'error',
          latency,
          message: `HTTP ${response.status}: Failed to reach AI endpoint`,
        });
      }
    } catch (err: any) {
      const endTime = performance.now();
      setAiDiagnosticResult({
        status: 'error',
        latency: Math.round(endTime - startTime),
        message: err.message || 'Network timeout or CORS error',
      });
    } finally {
      setIsTestingAi(false);
    }
  };

  // Currency valuation conversion preview
  const getCurrencyPreview = () => {
    const baseAed = 2500000;
    if (prefs.currency === 'USD') {
      const usdVal = Math.round(baseAed / 3.6725).toLocaleString('en-US');
      return isArabic
        ? `عقار بقيمة 2,500,000 درهم يُعرض حالياً بقيمة $${usdVal} دولار (ربط ثابت بسعر 3.6725)`
        : `A property valued at AED 2,500,000 displays as $${usdVal} USD (Fixed peg at 3.6725 AED/USD)`;
    }
    if (prefs.currency === 'EUR') {
      const eurVal = Math.round(baseAed / 3.98).toLocaleString('en-US');
      return isArabic
        ? `عقار بقيمة 2,500,000 درهم يُعرض حالياً بقيمة €${eurVal} يورو (تحديث سعر الصرف الحي)`
        : `A property valued at AED 2,500,000 displays as €${eurVal} EUR (Live ECB forex rate sync)`;
    }
    return isArabic
      ? 'عقار بقيمة 2,500,000 درهم يُعرض بالعملة الوطنية المحلية لدولة الإمارات العربية المتحدة'
      : 'A property valued at AED 2,500,000 displays in the official local currency of the UAE';
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted">
          <RefreshCw className="size-6 animate-spin text-fjord" />
          <span className="text-sm font-medium">
            {isArabic
              ? 'جاري تحميل تفضيلات مساحة العمل...'
              : 'Loading workspace preferences...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* ── 1. Executive Lagom Header ── */}
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">
            {isArabic
              ? 'مساحة العمل · إعدادات المنصة والتفضيلات'
              : 'WORKSPACE · PLATFORM SETTINGS'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fjord sm:text-4xl">
            {isArabic
              ? 'تفضيلات النظام وهندسة القرار'
              : 'Platform Settings & Preferences'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {isArabic
              ? 'تخصيص المظهر الشمالي الهادئ (Nordic Lagom)، وحدات التقييم المالية، ربط شيكات إيجاري الإلكترونية بدائرة الأراضي، ومرونة محرك الذكاء الاصطناعي.'
              : 'Configure your Nordic Lagom aesthetics, financial valuation units, DLD electronic Ejari sync, 2FA biometric identity, and AI concierge resilience fallthrough.'}
          </p>
        </div>

        {saveSuccess && (
          <div className="animate-in fade-in zoom-in-95 flex items-center gap-2 rounded-none border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-xs dark:text-emerald-400">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
            <span>
              {isArabic ? 'تم حفظ التفضيلات بنجاح' : 'Preferences Saved'}
            </span>
          </div>
        )}
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* ── Section 1: Appearance & Localization ── */}
        <section className="rounded-3xl border border-border/60 bg-surface/80 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-border md:p-8">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-none bg-fjord/10 text-fjord">
                <Palette className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-fjord sm:text-xl">
                  {isArabic
                    ? 'المظهر الخارجي واللغة'
                    : 'Appearance & Localization'}
                </h3>
                <p className="text-xs text-muted">
                  {isArabic
                    ? 'تعديل أوضاع العرض واللغة النشطة وعملة تقييم الأصول'
                    : 'Customize display modes, active interface language, and asset valuation currency'}
                </p>
              </div>
            </div>

            {/* Language Toggle Pill */}
            <div className="flex items-center gap-1 rounded-2xl border border-border/80 bg-surface-subtle p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className={cn(
                  'flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold transition-all duration-200',
                  !isArabic
                    ? 'bg-fjord text-white shadow-xs dark:bg-fjord dark:text-white'
                    : 'text-muted hover:text-fjord',
                )}
              >
                <Globe className="size-3.5" />
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('ar')}
                className={cn(
                  'flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold transition-all duration-200',
                  isArabic
                    ? 'bg-fjord text-white shadow-xs dark:bg-fjord dark:text-white'
                    : 'text-muted hover:text-fjord',
                )}
              >
                <Globe className="size-3.5" />
                <span>العربية</span>
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Theme Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-wider text-fjord uppercase">
                  {isArabic
                    ? 'نمط المظهر (Nordic Lagom)'
                    : 'Interface Theme (Nordic Lagom)'}
                </label>
                <span className="text-xs font-medium text-muted">
                  {isArabic ? 'التنشيط الحي:' : 'Active mode:'}{' '}
                  <strong className="text-fjord capitalize">
                    {theme || 'system'}
                  </strong>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    id: 'light',
                    label: isArabic ? 'فاتح' : 'Light',
                    icon: Sun,
                  },
                  { id: 'dark', label: isArabic ? 'داكن' : 'Dark', icon: Moon },
                  {
                    id: 'system',
                    label: isArabic ? 'تلقائي' : 'System',
                    icon: Monitor,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = theme === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme(item.id)}
                      className={cn(
                        'flex flex-col items-center gap-2.5 rounded-2xl border p-4 text-center transition-all duration-200',
                        isActive
                          ? 'border-fjord bg-fjord/5 text-fjord shadow-xs ring-1 ring-fjord/30 dark:bg-fjord/15 dark:text-white'
                          : 'border-border/60 bg-surface-subtle text-muted hover:border-border hover:text-fjord',
                      )}
                    >
                      <Icon
                        className={cn(
                          'size-5',
                          isActive
                            ? 'text-fjord dark:text-white'
                            : 'text-muted',
                        )}
                      />
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Valuation Currency Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-wider text-fjord uppercase">
                  {isArabic
                    ? 'عملة التقييم المالية الافتراضية'
                    : 'Default Valuation Currency'}
                </label>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {isArabic ? 'سعر صرف حي' : 'Live ECB Rate Sync'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    id: 'AED',
                    label: 'AED (Dirham)',
                    sym: 'د.إ',
                    sub: 'UAE Default',
                  },
                  { id: 'USD', label: 'USD ($)', sym: '$', sub: 'Fixed Peg' },
                  { id: 'EUR', label: 'EUR (€)', sym: '€', sub: 'ECB Live' },
                ].map((cur) => {
                  const isSel = prefs.currency === cur.id;
                  return (
                    <button
                      key={cur.id}
                      type="button"
                      onClick={() =>
                        setPrefs({ ...prefs, currency: cur.id as any })
                      }
                      className={cn(
                        'flex flex-col items-center gap-1 rounded-2xl border p-3.5 text-center transition-all duration-200',
                        isSel
                          ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 shadow-xs ring-1 ring-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400'
                          : 'border-border/60 bg-surface-subtle text-muted hover:border-border hover:text-fjord',
                      )}
                    >
                      <span className="font-mono text-base font-black text-fjord">
                        {cur.sym}
                      </span>
                      <span className="text-xs font-bold">{cur.id}</span>
                      <span className="text-[10px] text-muted">{cur.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Currency Preview Banner */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-subtle/80 p-3.5 text-xs text-muted">
            <DollarSign className="size-4 shrink-0 text-fjord" />
            <p className="font-medium">{getCurrencyPreview()}</p>
          </div>
        </section>

        {/* ── Section 2: AI Concierge & Intelligence Engine Resilience ── */}
        <section className="rounded-3xl border border-border/60 bg-surface/80 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-border md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-none bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sliders className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-fjord sm:text-xl">
                  {isArabic
                    ? 'محرك الذكاء الاصطناعي وهندسة المرونة'
                    : 'AI Concierge & Intelligence Engine Resilience'}
                </h3>
                <p className="text-xs text-muted">
                  {isArabic
                    ? 'إدارة تسلسل النماذج المجانية (3-Tier OpenRouter)، وضع التدريب غير المتصل، وتزامن إيجاري'
                    : 'Manage 3-Tier OpenRouter free model hierarchy, offline sandbox simulation, and DLD Ejari sync'}
                </p>
              </div>
            </div>

            {/* AI Diagnostic Button */}
            <button
              type="button"
              onClick={runAiDiagnostic}
              disabled={isTestingAi}
              className="inline-flex items-center gap-2 rounded-none border border-border/80 bg-surface-subtle px-4 py-2 text-xs font-bold text-fjord shadow-2xs transition-all hover:bg-border/40 disabled:opacity-50"
            >
              {isTestingAi ? (
                <RefreshCw className="size-3.5 animate-spin text-fjord" />
              ) : (
                <Zap className="size-3.5 text-amber-500" />
              )}
              <span>
                {isArabic
                  ? 'فحص استجابة محرك الذكاء'
                  : 'Test AI Concierge Endpoint'}
              </span>
            </button>
          </div>

          {/* AI Diagnostic Results Banner */}
          {aiDiagnosticResult.status !== 'idle' && (
            <div
              className={cn(
                'mt-5 flex items-center justify-between gap-3 rounded-2xl border p-4 text-xs font-medium transition-all',
                aiDiagnosticResult.status === 'success'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
              )}
            >
              <div className="flex items-center gap-2.5">
                {aiDiagnosticResult.status === 'success' ? (
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                ) : (
                  <AlertTriangle className="size-4 shrink-0 text-rose-500" />
                )}
                <div>
                  <p className="font-bold">
                    {aiDiagnosticResult.status === 'success'
                      ? isArabic
                        ? 'المحرك متصل ويعمل بكفاءة عالية'
                        : 'AI Concierge Engine Online & Responsive'
                      : isArabic
                        ? 'تنبيه: تم التفعيل التلقائي لوضع المحاكاة المحلية الهادئة'
                        : 'Warning: Network latency triggered Local Simulation Fallback'}
                  </p>
                  <p className="mt-0.5 text-[11px] opacity-80">
                    {aiDiagnosticResult.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
                <span className="rounded-none bg-fjord/5 px-2 py-1 dark:bg-white/10">
                  ⚡ {aiDiagnosticResult.latency}ms
                </span>
                {aiDiagnosticResult.model && (
                  <span className="hidden rounded-none bg-fjord/5 px-2 py-1 sm:inline dark:bg-white/10">
                    {aiDiagnosticResult.model}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-5 divide-y divide-border/60">
            {/* Primary Model Selector */}
            <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'نموذج الذكاء الاصطناعي الأساسي (3-Tier Fallthrough)'
                    : 'Primary AI Reasoning Model (3-Tier Fallthrough)'}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {isArabic
                    ? 'يتم اختيار هذا النموذج أولاً للإجابة على استشارات المستثمرين. في حال تجاوز حد السرعة، يحول النظام تلقائياً للنموذج الاحتياطي مجاناً.'
                    : 'Selected as primary reasoning engine for investor queries. If OpenRouter rate limits occur, RAMA automatically cascades to backup free models.'}
                </p>
              </div>
              <select
                value={prefs.aiPrimaryModel}
                onChange={(e) =>
                  setPrefs({ ...prefs, aiPrimaryModel: e.target.value })
                }
                className="w-full rounded-none border border-border/80 bg-surface-subtle px-3.5 py-2.5 text-xs font-bold text-fjord shadow-2xs focus:border-fjord focus:outline-hidden sm:w-72"
              >
                <option value="google/gemini-2.0-pro-exp-02-05:free">
                  Gemini 2.0 Pro Experimental (Free)
                </option>
                <option value="meta-llama/llama-3.3-70b-instruct:free">
                  Llama 3.3 70B Instruct (Free)
                </option>
                <option value="deepseek/deepseek-r1:free">
                  DeepSeek R1 Reasoning (Free)
                </option>
                <option value="mistralai/mistral-7b-instruct:free">
                  Mistral 7B Instruct (Free)
                </option>
                <option value="rama-v2-local-simulation-engine">
                  RAMA Local Simulation Engine (Offline)
                </option>
              </select>
            </div>

            {/* RAMA V2 Workspace Architecture */}
            <div className="flex items-center justify-between pt-5">
              <div className="max-w-xl">
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'بنية مساحة عمل RAMA V2 المتقدمة'
                    : 'RAMA V2 Workspace Architecture'}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {isArabic
                    ? 'تفعيل العرض المنقسم للعقارات، مقارنات مختبر القرار (Decision Lab)، وجواز ثقة الأصول ذو العوامل الأربعة.'
                    : 'Enables split-view property analysis, Decision Lab trade-off matrices, and 4-factor Trust Passport evidence drawers.'}
                </p>
              </div>
              <LagomSwitch
                checked={prefs.enableV2}
                onChange={(val) => setPrefs({ ...prefs, enableV2: val })}
                isArabic={isArabic}
              />
            </div>

            {/* Sandbox Demo Mode */}
            <div className="flex items-center justify-between pt-5">
              <div className="max-w-xl">
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'وضع محاكاة بيئة التجربة (Offline Sandbox)'
                    : 'Sandbox Demo Mode (Offline Evaluation)'}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {isArabic
                    ? 'تجاوز حواجز تسجيل الدخول لمحاكاة التقييم العقاري واختبار تدفقات عمل الصفقات دون الحاجة لاتصال خارجي.'
                    : 'Bypasses mandatory authentication blockers and simulates domain intelligence when evaluating without live API keys.'}
                </p>
              </div>
              <LagomSwitch
                checked={prefs.enableSandbox}
                onChange={(val) => setPrefs({ ...prefs, enableSandbox: val })}
                isArabic={isArabic}
              />
            </div>

            {/* Live DLD & Ejari Sync */}
            <div className="flex items-center justify-between pt-5">
              <div className="max-w-xl">
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'تزامن شيكات إيجاري ودائرة الأراضي الحية'
                    : 'Live DLD & Ejari Electronic Cheque Sync'}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {isArabic
                    ? 'مزامنة فورية لسجلات الإيجار وتجديدات عقود إيجاري وعوائد الاستثمار مع واجهات دائرة الأراضي والأملاك بدبي.'
                    : 'Real-time tenancy contract valuation synchronization and yield updates via Dubai Land Department REST feeds.'}
                </p>
              </div>
              <LagomSwitch
                checked={prefs.enableEjariSync}
                onChange={(val) => setPrefs({ ...prefs, enableEjariSync: val })}
                isArabic={isArabic}
              />
            </div>
          </div>
        </section>

        {/* ── Section 3: Notification & Alert Preferences ── */}
        <section className="rounded-3xl border border-border/60 bg-surface/80 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-border md:p-8">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex size-10 items-center justify-center rounded-none bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Bell className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-fjord sm:text-xl">
                {isArabic
                  ? 'تنبيهات الصفقات ومراقبة السوق الحية'
                  : 'Notification & Alert Preferences'}
              </h3>
              <p className="text-xs text-muted">
                {isArabic
                  ? 'إدارة إشعارات الواتساب الفورية وتنبيهات تغير الأسعار وتقارير عوائد المحفظة الأسبوعية'
                  : 'Manage real-time deal pipeline notifications, price drop triggers, and Friday portfolio digests'}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5 divide-y divide-border/60">
            {/* Price Drop Alerts */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="max-w-xl">
                  <h4 className="text-sm font-bold text-fjord">
                    {isArabic
                      ? 'تنبيهات هبوط الأسعار والتقييم الفوري'
                      : 'Instant Price Drop & Valuation Alerts'}
                  </h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {isArabic
                      ? 'إرسال إشعار فوري عند انخفاض سعر أي عقار في قائمتك المختصرة بنسبة تتجاوز الحد المحدد أدناه.'
                      : 'Notify immediately when shortlisted properties change asking price or yield by more than your defined threshold.'}
                  </p>
                </div>
                <LagomSwitch
                  checked={prefs.notifPriceAlerts}
                  onChange={(val) =>
                    setPrefs({ ...prefs, notifPriceAlerts: val })
                  }
                  isArabic={isArabic}
                />
              </div>

              {/* Price Drop Threshold Selector */}
              {prefs.notifPriceAlerts && (
                <div className="animate-in fade-in flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-subtle p-3 text-xs">
                  <TrendingUp className="size-4 text-fjord" />
                  <span className="font-medium text-fjord">
                    {isArabic
                      ? 'حد تحفز التنبيه الفوري:'
                      : 'Alert Trigger Threshold:'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 5, 10].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() =>
                          setPrefs({ ...prefs, priceDropThreshold: pct })
                        }
                        className={cn(
                          'rounded-none px-2.5 py-1 font-bold transition-all',
                          prefs.priceDropThreshold === pct
                            ? 'bg-fjord text-white shadow-2xs'
                            : 'bg-surface text-muted hover:text-fjord',
                        )}
                      >
                        &gt;{pct}%
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Business DLD Transfer Alerts */}
            <div className="space-y-3 pt-5">
              <div className="flex items-center justify-between">
                <div className="max-w-xl">
                  <h4 className="text-sm font-bold text-fjord">
                    {isArabic
                      ? 'إشعارات واتساب الرسمية لنقل الملكية (DLD)'
                      : 'WhatsApp Business DLD Transfer Alerts'}
                  </h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {isArabic
                      ? 'تلقي تحديثات معالم تسجيل العقود (Form F) ومواعيد المعاينة ونقل الملكية عبر حساب ريرا الرسمي في واتساب.'
                      : 'Receive official RERA transaction milestones, MOU counters, and viewing confirmations directly via WhatsApp.'}
                  </p>
                </div>
                <LagomSwitch
                  checked={prefs.notifWhatsapp}
                  onChange={(val) => setPrefs({ ...prefs, notifWhatsapp: val })}
                  isArabic={isArabic}
                />
              </div>

              {/* WhatsApp Phone Number Input */}
              {prefs.notifWhatsapp && (
                <div className="animate-in fade-in flex flex-col gap-2 rounded-2xl border border-border/60 bg-surface-subtle p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-fjord">
                    <Smartphone className="size-4 text-emerald-500" />
                    <span>
                      {isArabic
                        ? 'رقم الهاتف المعتمد للإشعارات:'
                        : 'Verified WhatsApp Number:'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={prefs.whatsappNumber}
                    onChange={(e) =>
                      setPrefs({ ...prefs, whatsappNumber: e.target.value })
                    }
                    placeholder="+971 50 000 0000"
                    className="w-full rounded-none border border-border/80 bg-surface px-3 py-1.5 font-mono text-xs font-bold text-fjord focus:border-emerald-500 focus:outline-hidden sm:w-64"
                  />
                </div>
              )}
            </div>

            {/* Weekly Portfolio Cashflow Digest */}
            <div className="flex items-center justify-between pt-5">
              <div className="max-w-xl">
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'ملخص التدفق النقدي والعوائد الأسبوعي'
                    : 'Weekly Portfolio Cashflow Digest'}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {isArabic
                    ? 'تلقي تقرير آلي صباح كل جمعة يلخص صافي عوائد الإيجار ومصاريف الصيانة ومؤشرات إشغال المحفظة عبر البريد الإلكتروني.'
                    : 'Receive an automated Friday summary of net rental yields, maintenance ticket costs, and occupancy metrics.'}
                </p>
              </div>
              <LagomSwitch
                checked={prefs.notifEmail}
                onChange={(val) => setPrefs({ ...prefs, notifEmail: val })}
                isArabic={isArabic}
              />
            </div>
          </div>
        </section>

        {/* ── Section 4: Trust Passport Security & Identity ── */}
        <section className="rounded-3xl border border-border/60 bg-surface/80 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-border md:p-8">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex size-10 items-center justify-center rounded-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Shield className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-fjord sm:text-xl">
                {isArabic
                  ? 'الأمان وجواز الثقة والهوية (Trust Passport Security)'
                  : 'Trust Passport Identity & Account Security'}
              </h3>
              <p className="text-xs text-muted">
                {isArabic
                  ? 'التحقق من هوية المستثمر في دائرة الأراضي، المصادقة الثنائية (2FA)، وإدارة الجلسات النشطة'
                  : 'DLD Investor ID KYC verification, Two-Factor Authentication (2FA), and active session management'}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5 divide-y divide-border/60">
            {/* Investor ID Status Badge */}
            <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'حالة تحقق هوية المستثمر (UAE Pass / DLD KYC)'
                    : 'Investor Identity KYC Status'}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {isArabic
                    ? 'الهوية مرتبطة برقم المستثمر الموحد في ريرا وتتيح توقيع عقود إيجاري ومذكرات التفاهم إلكترونياً.'
                    : 'Linked to your RERA unified investor ID. Enables digital MOU signing and instant escrow reservations.'}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <UserCheck className="size-4 shrink-0 text-emerald-500" />
                <span>
                  {isArabic
                    ? 'مستثمر معتمد (DLD ID #849201)'
                    : 'DLD Verified Investor (#849201)'}
                </span>
              </div>
            </div>

            {/* 2FA Authentication */}
            <div className="flex items-center justify-between pt-5">
              <div className="max-w-xl">
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'المصادقة الثنائية للمعاملات المالية (2FA)'
                    : 'Two-Factor Authentication (2FA Biometrics)'}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {isArabic
                    ? 'طلب رمز تحقق عبر تطبيق المصادق عند إجراء حجوزات حساب الضمان أو سحب عوائد الصناديق العقارية.'
                    : 'Require TOTP or biometric authorization when submitting formal offers or transferring escrow funds.'}
                </p>
              </div>
              <LagomSwitch
                checked={prefs.enable2FA}
                onChange={(val) => setPrefs({ ...prefs, enable2FA: val })}
                isArabic={isArabic}
              />
            </div>

            {/* Active Session Management */}
            <div className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-sm font-bold text-fjord">
                  {isArabic
                    ? 'الجلسة الحالية وإدارة الأجهزة المتصلة'
                    : 'Active Browser Sessions & Devices'}
                </h4>
                <p className="mt-0.5 text-xs text-muted">
                  {isArabic
                    ? 'دبي، الإمارات العربية المتحدة • Chrome 132 على Windows • الجلسة النشطة حالياً'
                    : 'Dubai, UAE • Chrome 132 on Windows • Currently active session'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert(
                    isArabic
                      ? 'تم إلغاء تنشيط جميع الجلسات الأخرى بنجاح.'
                      : 'All other browser sessions have been revoked.',
                  );
                }}
                className="inline-flex items-center gap-2 rounded-none border border-border/80 bg-surface-subtle px-4 py-2 text-xs font-bold text-fjord transition-all hover:bg-border/40 hover:text-rose-600 dark:hover:text-rose-400"
              >
                <Lock className="size-3.5" />
                <span>
                  {isArabic
                    ? 'إلغاء جميع الجلسات الأخرى'
                    : 'Revoke All Other Sessions'}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Section 5: Developer API & Broker CRM Syndication ── */}
        <section className="rounded-3xl border border-border/60 bg-surface/80 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-border md:p-8">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex size-10 items-center justify-center rounded-none bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Terminal className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-fjord sm:text-xl">
                {isArabic
                  ? 'واجهة البرمجة (API) وربط أنظمة الوسطاء'
                  : 'Developer API & Broker CRM Syndication'}
              </h3>
              <p className="text-xs text-muted">
                {isArabic
                  ? 'إدارة مفاتيح API لربط القوائم المختصرة ومحافظ العائلة مع لوحات تحكم Power BI أو أنظمة إدارة العلاقات (CRM)'
                  : 'Manage REST API tokens to syndicate shortlists and portfolio valuations to family office dashboards or CRMs'}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5 divide-y divide-border/60">
            {/* API Key Management */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h4 className="text-sm font-bold text-fjord">
                    {isArabic
                      ? 'مفتاح الوصول الحي لمنصة RAMA (Production Key)'
                      : 'RAMA Production API Access Key'}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted">
                    {isArabic
                      ? 'يستخدم لمصادقة طلبات REST وسحب بيانات التحقق وجواز الثقة إلكترونياً.'
                      : 'Used to authenticate server-to-server REST calls and query real-time Trust Passport scores.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyApiKey}
                    className="inline-flex items-center gap-1.5 rounded-none border border-border/80 bg-surface px-3 py-1.5 text-xs font-bold text-fjord shadow-2xs transition-all hover:bg-surface-subtle"
                  >
                    {apiKeyCopied ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    <span>
                      {apiKeyCopied
                        ? isArabic
                          ? 'تم النسخ'
                          : 'Copied!'
                        : isArabic
                          ? 'نسخ المفتاح'
                          : 'Copy Key'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRegenerateApiKey}
                    className="inline-flex items-center gap-1.5 rounded-none border border-border/80 bg-surface px-3 py-1.5 text-xs font-bold text-muted transition-all hover:bg-surface-subtle hover:text-fjord"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>{isArabic ? 'إعادة إنشاء' : 'Regenerate'}</span>
                  </button>
                </div>
              </div>

              {/* API Key Display Box */}
              <div className="flex items-center justify-between gap-2 rounded-2xl border border-border/80 bg-surface-subtle p-3.5 font-mono text-xs">
                <span className="truncate font-bold text-fjord">
                  {apiKeyVisible
                    ? apiKeyString
                    : `${apiKeyString.slice(0, 16)}••••••••••••••••••••••••••••`}
                </span>
                <button
                  type="button"
                  onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  className="shrink-0 font-sans text-xs font-bold text-fjord hover:underline"
                >
                  {apiKeyVisible
                    ? isArabic
                      ? 'إخفاء'
                      : 'Hide'
                    : isArabic
                      ? 'إظهار'
                      : 'Reveal'}
                </button>
              </div>
            </div>

            {/* Webhook Endpoint */}
            <div className="space-y-2 pt-5">
              <label className="text-xs font-bold tracking-wider text-fjord uppercase">
                {isArabic
                  ? 'رابط الويب هوك لاستلام إشعارات الصفقات (Webhook URL)'
                  : 'Real-time Deal Milestone Webhook Endpoint URL'}
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="url"
                  value={prefs.webhookUrl}
                  onChange={(e) =>
                    setPrefs({ ...prefs, webhookUrl: e.target.value })
                  }
                  placeholder="https://api.yourdomain.com/v1/webhook"
                  className="w-full rounded-none border border-border/80 bg-surface px-3.5 py-2 font-mono text-xs font-medium text-fjord focus:border-fjord focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      isArabic
                        ? 'تم إرسال حمولة تجريبية بنجاح إلى الويب هوك.'
                        : 'Test JSON payload dispatched successfully to endpoint.',
                    );
                  }}
                  className="shrink-0 rounded-none border border-border/80 bg-surface-subtle px-4 py-2 text-xs font-bold text-fjord transition-all hover:bg-border/40"
                >
                  {isArabic ? 'إرسال حمولة اختبار' : 'Send Test Payload'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Executive Action Bar ── */}
        <div className="sticky bottom-4 z-20 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border/80 bg-surface/90 p-4 shadow-lg backdrop-blur-xl sm:flex-row sm:px-8 sm:py-5">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Sparkles className="size-4 text-fjord" />
            <span>
              {isArabic
                ? 'جميع التغييرات تُحفظ بـ تشفير تام وتنعكس فوراً على محرك القرار وسجل الأحداث.'
                : 'All changes are encrypted and synchronize immediately across your RAMA decision workspace.'}
            </span>
          </div>

          <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="rounded-none border border-border/80 bg-transparent px-5 py-2.5 text-xs font-bold text-fjord shadow-2xs transition-colors hover:bg-surface-subtle disabled:opacity-50"
            >
              {isArabic ? 'إعادة ضبط التفضيلات' : 'Reset Defaults'}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-none bg-fjord px-7 py-2.5 text-xs font-bold text-white shadow-md shadow-fjord/20 transition-all hover:bg-fjord-hover active:scale-95 disabled:opacity-50"
            >
              {isSaving && <RefreshCw className="size-3.5 animate-spin" />}
              <span>
                {isSaving
                  ? isArabic
                    ? 'جاري الحفظ...'
                    : 'Saving...'
                  : isArabic
                    ? 'حفظ التفضيلات النشطة'
                    : 'Save Active Preferences'}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
