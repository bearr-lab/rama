import { createClient } from '@/lib/supabase/server';

import { BlurFade } from '@/components/magicui/blur-fade';
import { ShieldCheck } from 'lucide-react';
import { LeadsTable } from './leads-table';

import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';

export default async function LeadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The RLS policy will filter out leads for unauthorized users automatically.
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <PageShell>
      <SectionHeader
        breadcrumb={
          isArabic
            ? 'مساحة العمل · إدارة العملاء المحتملين'
            : 'WORKSPACE · CRM LEADS'
        }
        title={isArabic ? 'العملاء المحتملين من الذكاء الاصطناعي' : 'AI Concierge Leads'}
        description={
          isArabic
            ? 'إدارة العملاء المحتملين الذين تم جمعهم عبر مساعد الذكاء الاصطناعي الخاص بك. قم بالاتصال بهم مباشرة لمتابعة الصفقات.'
            : 'Manage and track prospective buyers and tenants captured by your RAMA AI assistant. Prioritize high-intent leads and initiate contact directly.'
        }
      />

      {/* Admin Access Check - RLS handles the data security, but we want a nice UI message */}
      {!user && (
        <div className="rounded-none border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-400">
          <p className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-4" />
            {isArabic ? 'صلاحيات الإدارة مطلوبة' : 'Admin Access Required'}
          </p>
          <p className="mt-1 leading-relaxed font-light">
            {isArabic
              ? 'أنت تستخدم وضع التقييم التجريبي. لتأمين خصوصية العملاء، لا يتم عرض بيانات العملاء المحتملين الحقيقية لغير المدراء. (تم تفعيل سياسة RLS)'
              : 'You are currently in Sandbox mode. For data privacy, lead information is protected by Row Level Security (RLS) and is only visible to authorized brokers and administrators.'}
          </p>
        </div>
      )}

      {/* Leads Data Table */}
      <BlurFade delay={0.1}>
        <div className="w-full">
          <LeadsTable data={leads || []} />
        </div>
      </BlurFade>
    </PageShell>
  );
}
