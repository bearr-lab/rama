'use client';

import * as React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommandPalette } from './command-palette';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas font-sans">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main
          className="relative flex-1 outline-none"
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
      <CommandPalette />
      <ScrollToTop />
    </div>
  );
}
