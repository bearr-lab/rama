'use client';

import { useState, useEffect } from 'react';
import { LogOut, User, LayoutDashboard, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';
import { Button, buttonVariants } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
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
  const [user, setUser] = useState<any>(null);
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
    await supabase.auth.signOut();
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-surface-subtle" />
    );
  }

  if (!user) {
    return (
      <MagneticButton
        render={
          <Link
            href={`/${locale}/login`}
            className={cn(
              buttonVariants({ variant: isDark ? 'secondary' : 'default', size: 'sm' }),
              isDark
                ? 'rounded-button bg-white font-medium text-ink hover:bg-white/90'
                : 'rounded-button bg-fjord font-medium text-white hover:bg-fjord-hover',
            )}
          >
            {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Link>
        }
      />
    );
  }

  const initials = user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-8 w-8 overflow-hidden rounded-full focus:ring-2 focus:ring-fjord/50 focus:outline-none">
        <Avatar className="h-full w-full border border-border">
          <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
          <AvatarFallback className="bg-surface-subtle text-xs text-ink">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium text-ink">
              {user.user_metadata?.full_name || 'Account'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/shortlist`)}
          className="cursor-pointer"
        >
          <Heart className="mr-2 h-4 w-4" />
          <span>{locale === 'ar' ? 'المفضلة' : 'Shortlist'}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/advisor`)}
          className="cursor-pointer"
        >
          <Sparkles className="mr-2 h-4 w-4 text-fjord" />
          <span>
            {locale === 'ar' ? 'مستشار الذكاء الاصطناعي' : 'AI Advisor'}
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-risk focus:bg-risk-soft focus:text-risk"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{locale === 'ar' ? 'تسجيل الخروج' : 'Log out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
