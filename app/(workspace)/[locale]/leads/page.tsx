import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Calendar,
  Sparkles,
  User,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

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
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            {isArabic
              ? 'مساحة العمل · إدارة العملاء المحتملين'
              : 'WORKSPACE · CRM LEADS'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {isArabic
              ? 'العملاء المحتملين من الذكاء الاصطناعي'
              : 'AI Concierge Leads'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            {isArabic
              ? 'إدارة العملاء المحتملين الذين تم جمعهم عبر مساعد الذكاء الاصطناعي الخاص بك. قم بالاتصال بهم مباشرة لمتابعة الصفقات.'
              : 'Manage and track prospective buyers and tenants captured by your RAMA AI assistant. Prioritize high-intent leads and initiate contact directly.'}
          </p>
        </div>
      </header>

      {/* Admin Access Check - RLS handles the data security, but we want a nice UI message */}
      {!user && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-400">
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

      {/* Leads Table/Grid */}
      <div className="grid grid-cols-1 gap-6">
        {leads && leads.length > 0 ? (
          leads.map((lead, index) => (
            <BlurFade key={lead.id} delay={0.1 * index}>
              <div className="hover:shadow-floating flex flex-col justify-between gap-6 rounded-3xl border border-border/40 bg-surface/60 p-6 backdrop-blur-md transition-all hover:border-fjord/30 lg:flex-row lg:items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/40 bg-surface text-fjord shadow-2xs">
                      <User className="size-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {lead.first_name} {lead.last_name}
                        </h3>
                        {lead.ai_intent_score === 'high' ||
                        lead.ai_intent_score === 'urgent' ? (
                          <Badge className="border-amber-500/20 bg-amber-500/10 px-2 py-0 text-[10px] text-amber-600">
                            {lead.ai_intent_score.toUpperCase()} INTENT
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="px-2 py-0 text-[10px] uppercase"
                          >
                            {lead.ai_intent_score} INTENT
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className="px-2 py-0 text-[10px] uppercase"
                        >
                          {lead.status}
                        </Badge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-xs font-light text-muted-foreground">
                        <span>{lead.email}</span>
                        {lead.phone && (
                          <>
                            <span>·</span>
                            <span>{lead.phone}</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Notes Section */}
                  <div className="max-w-3xl rounded-2xl border border-border/30 bg-surface px-4 py-3">
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-fjord">
                      <Sparkles className="size-3" />
                      {isArabic
                        ? 'ملاحظات الذكاء الاصطناعي'
                        : 'AI Concierge Notes'}
                    </p>
                    <p className="text-xs leading-relaxed font-light whitespace-pre-wrap text-muted-foreground">
                      {lead.ai_notes || 'No conversation context provided.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-border/40 pt-4 lg:flex-col lg:items-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                  {lead.phone && (
                    <Link
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.first_name}, I'm reaching out from RAMA Real Estate regarding your recent inquiry.`)}`}
                      target="_blank"
                      className="w-full sm:w-auto"
                    >
                      <Button className="shadow-floating w-full rounded-2xl bg-[#25D366] font-semibold text-white transition-all hover:bg-[#20b858]">
                        <MessageCircle className="mr-2 size-4" />
                        {isArabic ? 'تواصل عبر واتساب' : 'WhatsApp Client'}
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-border/60 font-medium hover:bg-surface-subtle sm:w-auto"
                  >
                    {isArabic ? 'تحديث الحالة' : 'Update Status'}
                  </Button>
                </div>
              </div>
            </BlurFade>
          ))
        ) : user ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-surface/30 py-20 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface shadow-2xs">
              <User className="size-8 text-muted-foreground/50" />
            </div>
            <h3 className="font-display text-lg font-medium text-ink">
              {isArabic ? 'لا يوجد عملاء محتملين بعد' : 'No Leads Found'}
            </h3>
            <p className="mt-1 max-w-sm text-sm font-light text-muted-foreground">
              {isArabic
                ? 'عندما يتفاعل المستخدمون مع مستشارك الذكي ويتركون بياناتهم، ستظهر هنا.'
                : 'When users interact with your AI Concierge and provide their contact details, they will appear here.'}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
