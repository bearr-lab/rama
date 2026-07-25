import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ChatInterface } from "@/components/ai/chat-interface"

export default async function AdvisorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/${locale}/login`)
  }

  const isArabic = locale === "ar"

  return (
    <div className="container mx-auto px-4 py-8 mt-16 min-h-[80vh] flex flex-col">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-ink mb-2">
          {isArabic ? "مستشار الذكاء الاصطناعي RAMA" : "RAMA AI Advisor"}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {isArabic 
            ? "اسأل عن أي شيء يخص عقارات دبي. احصل على رؤى حول السوق، وتوصيات حول العقارات، ومعلومات عن القوانين في ثوانٍ." 
            : "Ask anything about Dubai real estate. Get market insights, property recommendations, and legal information in seconds."}
        </p>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full">
        <ChatInterface locale={locale as "en" | "ar"} />
      </div>
    </div>
  )
}
