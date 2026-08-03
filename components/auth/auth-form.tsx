'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2, Mail, ShieldCheck, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import type { AuthError } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/toast';

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
    confirmation:
      'Check your inbox to confirm your email address, then return here to sign in.',
    terms:
      'By continuing, you agree to the Terms of Service and Privacy Policy.',
    noAccount: "Don't have an account? ",
    hasAccount: 'Already have an account? ',
    or: 'or',
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
    confirmation:
      'تحقق من بريدك الإلكتروني لتأكيد الحساب، ثم عد لتسجيل الدخول.',
    terms: 'بمتابعتك، فإنك توافق على شروط الخدمة وسياسة الخصوصية.',
    noAccount: 'ليس لديك حساب؟ ',
    hasAccount: 'لديك حساب بالفعل؟ ',
    or: 'أو',
  },
} as const;

import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

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
  const supabase = createClient();
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

    try {
      let authError = null;
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        authError = error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        authError = error;
      }

      setIsLoading(false);
      
      if (authError) throw authError;

      toast.add({
        title: isSignIn
          ? locale === 'ar'
            ? 'تم تسجيل الدخول بنجاح'
            : 'Signed in successfully'
          : locale === 'ar'
            ? 'تم إنشاء الحساب بنجاح'
            : 'Account created successfully',
        type: 'success',
      });
      finish();
    } catch (err) {
      const authErr = err as AuthError;
      setIsLoading(false);
      toast.add({ title: authErr.message, type: 'error' });
      setError(authErr.message);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setNotice(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${destination}`,
        },
      });
      if (error) throw error;
      // finish() is handled by the redirect callback
    } catch (err) {
      const authErr = err as AuthError;
      toast.add({ title: authErr.message, type: 'error' });
      setError(authErr.message);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={cn('space-y-6', compact && 'space-y-4')}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <form className="space-y-3" onSubmit={handleEmailAuth} noValidate>
        <motion.label
          variants={itemVariants}
          className="block space-y-2 text-sm font-medium text-fjord"
        >
          <span>{t.email}</span>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-10 border-border/60 bg-surface/50 text-sm shadow-none transition-all focus:border-fjord/50 focus:bg-surface focus:ring-4 focus:ring-fjord/10"
          />
        </motion.label>

        <motion.label
          variants={itemVariants}
          className="block space-y-2 text-sm font-medium text-fjord"
        >
          <div className="flex items-center justify-between">
            <span>{t.password}</span>
            {isSignIn && (
              <Link
                href={`/${locale}/forgot-password`}
                className="text-xs font-normal text-muted-foreground hover:text-fjord hover:underline"
              >
                {t.forgotPassword}
              </Link>
            )}
          </div>
          <Input
            name="password"
            type="password"
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
            required
            minLength={8}
            className="h-10 border-border/60 bg-surface/50 text-sm shadow-none transition-all focus:border-fjord/50 focus:bg-surface focus:ring-4 focus:ring-fjord/10"
          />
        </motion.label>

        {error && (
          <motion.p
            variants={itemVariants}
            className="rounded-none bg-risk-soft px-4 py-3 text-sm text-risk"
            role="alert"
          >
            {error}
          </motion.p>
        )}
        {notice && (
          <motion.p
            variants={itemVariants}
            className="rounded-none bg-verified-soft px-4 py-3 text-sm text-verified"
            role="status"
          >
            {notice}
          </motion.p>
        )}

        <motion.div variants={itemVariants}>
          <Button
            className="h-10 w-full text-sm font-semibold shadow-sm"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : isSignIn ? (
              <Mail className="mr-2 size-4" />
            ) : (
              <UserPlus className="mr-2 size-4" />
            )}
            {isSignIn ? t.continueSignIn : t.continueSignUp}
            {!isLoading && <ArrowRight className="ms-auto opacity-70" />}
          </Button>
        </motion.div>
      </form>

      <motion.div
        variants={itemVariants}
        className="relative py-2 text-center text-xs text-muted-foreground before:absolute before:inset-x-0 before:top-1/2 before:border-t before:border-border"
      >
        <span className="relative bg-surface px-3">{t.or}</span>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full bg-surface text-sm font-semibold shadow-sm hover:bg-surface-subtle"
          disabled={isLoading}
          onClick={handleGoogleAuth}
        >
          <GoogleMark />
          {t.google}
        </Button>
      </motion.div>

      {!compact && (
        <motion.p
          variants={itemVariants}
          className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
        >
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-verified" />
          {t.terms}
        </motion.p>
      )}

      {/* Footer Navigation Link */}
      <motion.div
        variants={itemVariants}
        className="pt-2 text-center text-sm text-muted-foreground"
      >
        {isSignIn ? (
          <>
            <span>{t.noAccount}</span>
            <Link
              href={`/${locale}/sign-up`}
              className="font-semibold text-fjord hover:underline"
            >
              {t.signUp}
            </Link>
          </>
        ) : (
          <>
            <span>{t.hasAccount}</span>
            <Link
              href={`/${locale}/login`}
              className="font-semibold text-fjord hover:underline"
            >
              {t.signIn}
            </Link>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.99 6.99 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.15-2.45.81-.39Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
