'use client';

import { useState, useEffect } from 'react';
import {
  LogOut,
  Heart,
  Sparkles,
  Settings,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';
import { buttonVariants } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  locale?: 'en' | 'ar';
  isDark?: boolean;
}

export function UserMenu({ locale = 'en', isDark = false }: UserMenuProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    toast.promise(
      supabase.auth.signOut().then(({ error }) => {
        if (error) throw error;
        router.push(`/${locale}/login`);
        router.refresh();
      }),
      {
        loading: locale === 'ar' ? 'جارٍ تسجيل الخروج...' : 'Signing out...',
        success:
          locale === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Signed out successfully',
        error: locale === 'ar' ? 'حدث خطأ' : 'Failed to sign out',
      },
    );
  };

  if (isLoading) {
    return (
      <div className="size-8 animate-pulse rounded-none bg-surface-subtle" />
    );
  }

  if (!user) {
    return (
      <MagneticButton
        render={
          <Link
            href={`/${locale}/login`}
            className={cn(
              buttonVariants({
                variant: isDark ? 'secondary' : 'primary',
                size: 'sm',
              }),
              isDark
                ? 'rounded-none bg-surface font-medium text-ink hover:bg-surface-subtle'
                : 'rounded-none bg-fjord font-medium text-white hover:bg-fjord-hover',
            )}
          >
            {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Link>
        }
      />
    );
  }

  // Supabase stores Google metadata in user_metadata with either 'full_name' or 'name' key
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Account';
  // Google avatar comes via user_metadata.avatar_url or user_metadata.picture
  const avatarUrl =
    user.user_metadata?.avatar_url || user.user_metadata?.picture || '';
  // Initials from display name, not raw email
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative size-8 overflow-hidden rounded-none focus:ring-2 focus:ring-fjord/50 focus:outline-none">
        <Avatar className="size-full border border-border">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="bg-surface-subtle text-xs text-ink">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right" align="end" sideOffset={16}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium text-ink">
                {displayName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/dashboard`)}
          className="cursor-pointer"
        >
          <LayoutDashboard className="mr-2 size-4" />
          <span>{locale === 'ar' ? 'لوحة القيادة' : 'Dashboard'}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/shortlist`)}
          className="cursor-pointer"
        >
          <Heart className="mr-2 size-4" />
          <span>{locale === 'ar' ? 'المفضلة' : 'Shortlist'}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/advisor`)}
          className="cursor-pointer"
        >
          <Sparkles className="mr-2 size-4 text-fjord" />
          <span>
            {locale === 'ar' ? 'مستشار الذكاء الاصطناعي' : 'AI Advisor'}
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/settings`)}
          className="cursor-pointer"
        >
          <Settings className="mr-2 size-4 text-muted-foreground" />
          <span>{locale === 'ar' ? 'الإعدادات' : 'Settings'}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-risk focus:bg-risk-soft focus:text-risk"
        >
          <LogOut className="mr-2 size-4" />
          <span>{locale === 'ar' ? 'تسجيل الخروج' : 'Log out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
