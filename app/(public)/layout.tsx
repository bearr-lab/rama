import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col relative w-full">
      <Navbar />
      <main className="flex-1 relative z-10 bg-background" id="main-content">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
