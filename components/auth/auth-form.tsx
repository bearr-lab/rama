'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2, Mail, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  locale: 'en' | 'ar';
  defaultMode?: 'sign-in' | 'sign-up';
  redirectPath?: string;
  compact?: boolean;
  onComplete?: () => void;
}

const copy = {
  en: {
    signIn: 'Sign in',
    signUp: 'Create account',
    forgotPassword: 'Forgot password?',
    email: 'Email address',
    password: 'Password',
    continueSignIn: 'Sign in with email',
    continueSignUp: 'Create account with email',
    google: 'Continue with Google',
    confirmation: 'Check your inbox to confirm your email address, then return here to sign in.',
    terms: 'By continuing, you agree to the Terms of Service and Privacy Policy.',
    noAccount: "Don't have an account? ",
    hasAccount: 'Already have an account? ',
  },
  ar: {
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    forgotPassword: 'نسيت كلمة المرور؟',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    continueSignIn: 'تسجيل الدخول بالبريد الإلكتروني',
    continueSignUp: 'إنشاء حساب بالبريد الإلكتروني',
    google: 'المتابعة باستخدام Google',
    confirmation: 'تحقق من بريدك الإلكتروني لتأكيد الحساب، ثم عد لتسجيل الدخول.',
    terms: 'بمتابعتك، فإنك توافق على شروط الخدمة وسياسة الخصوصية.',
    noAccount: 'ليس لديك حساب؟ ',
    hasAccount: 'لديك حساب بالفعل؟ ',
  },
} as const;

export function AuthForm({
  locale,
  defaultMode = 'sign-in',
  redirectPath,
  compact = false,
  onComplete,
}: AuthFormProps) {
  const [mode] = useState<'sign-in' | 'sign-up'>(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = copy[locale];
  const destination = redirectPath ?? `/${locale}/dashboard`;
  const isSignIn = mode === 'sign-in';

  const finish = () => {
    onComplete?.();
    router.replace(destination);
    router.refresh();
  };

  const handleEmailAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    setError(null);
    setNotice(null);
    setIsLoading(true);

    const supabase = createClient();

    const result = isSignIn
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(destination)}`,
          },
        });

    setIsLoading(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (!isSignIn && !result.data.session) {
      setNotice(t.confirmation);
      return;
    }
    finish();
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setNotice(null);
    setIsLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(destination)}`,
      },
    });
    if (authError) {
      setError(authError.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('space-y-6', compact && 'space-y-4')}>
      <form className="space-y-4" onSubmit={handleEmailAuth} noValidate>
        <label className="block space-y-1.5 text-sm font-medium text-ink">
          <span>{t.email}</span>
          <Input name="email" type="email" autoComplete="email" required />
        </label>

        <label className="block space-y-1.5 text-sm font-medium text-ink">
          <div className="flex items-center justify-between">
            <span>{t.password}</span>
            {isSignIn && (
              <Link
                href={`/${locale}/forgot-password`}
                className="text-xs font-normal text-muted hover:text-ink hover:underline"
              >
                {t.forgotPassword}
              </Link>
            )}
          </div>
          <Input
            name="password"
            type="password"
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
            minLength={8}
            required
          />
        </label>

        {error && (
          <p className="rounded-md bg-risk-soft px-3 py-2 text-sm text-risk" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="rounded-md bg-verified-soft px-3 py-2 text-sm text-verified" role="status">
            {notice}
          </p>
        )}

        <Button className="h-11 w-full" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : <Mail />}
          {isSignIn ? t.continueSignIn : t.continueSignUp}
          {!isLoading && <ArrowRight className="ms-auto" />}
        </Button>
      </form>

      <div className="relative py-1 text-center text-xs text-muted before:absolute before:inset-x-0 before:top-1/2 before:border-t before:border-border">
        <span className="relative bg-surface px-3">or</span>
      </div>

      <Button
        className="h-11 w-full"
        disabled={isLoading}
        onClick={handleGoogleAuth}
        type="button"
        variant="outline"
      >
        <GoogleMark />
        {t.google}
      </Button>

      {!compact && (
        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-verified" />
          {t.terms}
        </p>
      )}

      {/* Footer Navigation Link */}
      <div className="pt-2 text-center text-sm text-muted">
        {isSignIn ? (
          <>
            <span>{t.noAccount}</span>
            <Link href={`/${locale}/sign-up`} className="font-medium text-ink hover:underline">
              {t.signUp}
            </Link>
          </>
        ) : (
          <>
            <span>{t.hasAccount}</span>
            <Link href={`/${locale}/login`} className="font-medium text-ink hover:underline">
              {t.signIn}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.09A6.99 6.99 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.15-2.45.81-.39Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
