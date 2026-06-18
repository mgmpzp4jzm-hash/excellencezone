import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Languages, Shield, FileText, Lock, MessageCircle, Trash2, Mail } from "lucide-react";

const CANONICAL = "https://exellencezone.lovable.app/privacy";

type Lang = "en" | "ar";

const t = {
  en: {
    dir: "ltr" as const,
    back: "← Back to Excellence Zone Salon",
    tag: "Your Trust",
    title: "Privacy & Trust",
    intro: "This page is maintained by Excellence Zone Salon to answer common questions about how we handle your information when you book with us.",
    sections: {
      whatWeCollect: {
        icon: FileText,
        title: "What We Collect",
        content: [
          "Your name and phone number — so we can confirm your appointment and reach you if needed.",
          "Your selected service and preferred specialist — to prepare the right experience for your visit.",
          "Your preferred date and time — to reserve your slot.",
          "Any optional notes you share — to personalize your session (for example, skin sensitivity or style preferences).",
        ],
      },
      howWeUse: {
        icon: MessageCircle,
        title: "How We Use Your Information",
        content: [
          "Booking confirmation is sent directly to your WhatsApp and to your chosen specialist, so everyone is prepared for your visit.",
          "Your details are used only to manage your appointment. We do not share them with third parties for marketing or advertising.",
          "We do not store payment information — all transactions happen in person at the salon.",
        ],
      },
      howWeProtect: {
        icon: Lock,
        title: "How We Protect Your Data",
        content: [
          "Booking records are stored securely in our backend database with access limited to salon management.",
          "We do not sell, rent, or trade your personal information.",
          "Our website does not use advertising cookies or third-party trackers.",
        ],
      },
      retention: {
        icon: Trash2,
        title: "Retention & Deletion",
        content: [
          "We keep booking records to help with scheduling, loyalty tracking, and service quality.",
          "If you would like your booking history removed, you can request deletion at any time by contacting us directly.",
        ],
      },
      contact: {
        icon: Mail,
        title: "Contact Us",
        content: [
          "If you have any questions about your privacy or would like to review or delete your information, reach out to us via WhatsApp or phone.",
          "Phone: +966 59 967 6709",
          "Location: Excellence Zone Salon, Saudi Arabia",
        ],
      },
    },
    disclaimer: "This page describes the current practices of Excellence Zone Salon. It is not an independent certification or legal audit.",
    footerRights: "© Excellence Zone Salon",
    footerTagline: "Crafted with care · Men's Grooming",
    toggle: "AR",
  },
  ar: {
    dir: "rtl" as const,
    back: "→ ارجع لصالون منطقة التميز",
    tag: "ثقتك",
    title: "الخصوصية والثقة",
    intro: "هالصفحة من صالون منطقة التميز، عشان نجاوب على الأسئلة الشائعة حول كيفية التعامل مع معلوماتك لما تحجز عندنا.",
    sections: {
      whatWeCollect: {
        icon: FileText,
        title: "إيش نجمع",
        content: [
          "اسمك ورقم جوالك — عشان نأكد لك الموعد ونتواصل معاك لو احتجنا شي.",
          "الخدمة اللي اخترتها والمختص المفضل — عشان نجهز لك التجربة اللي تستاهلها.",
          "التاريخ والوقت اللي تحبهم — عشان نحجز لك الموعد.",
          "أي ملاحظات اختيارية — عشان نخصّص الجلسة لك (مثلاً: حساسية البشرة أو تفضيلات القصّة).",
        ],
      },
      howWeUse: {
        icon: MessageCircle,
        title: "كيف نستخدم معلوماتك",
        content: [
          "تأكيد الحجز يروح مباشرة لواتسابك ولواتساب المختص اللي اخترته، عشان الكل يكون جاهز لزيارتك.",
          "تفاصيلك تُستخدم فقط لإدارة موعدك. ما نشاركها مع طرف ثالث للتسويق أو الإعلانات.",
          "ما نخزّن معلومات دفع — كل المعاملات تتم في الصالون شخصياً.",
        ],
      },
      howWeProtect: {
        icon: Lock,
        title: "كيف نحمي بياناتك",
        content: [
          "سجلات الحجز محفوظة بشكل آمن في قاعدة البيانات، والوصول محدود لإدارة الصالون فقط.",
          "ما نبيع، ولا نؤجر، ولا نتاجر بمعلوماتك الشخصية.",
          "موقعنا ما يستخدم كوكيز إعلانية أو أدوات تتبع من طرف ثالث.",
        ],
      },
      retention: {
        icon: Trash2,
        title: "الحفظ والحذف",
        content: [
          "نحتفظ بسجلات الحجز عشان نساعد في الجدولة ومكافآت الولاء وجودة الخدمة.",
          "لو تبغي تحذف سجل حجوزاتك، تقدر تطلب الحذف في أي وقت بالتواصل معانا مباشرة.",
        ],
      },
      contact: {
        icon: Mail,
        title: "تواصل معانا",
        content: [
          "لو عندك أي سؤال عن خصوصيتك أو تبغي تطلع على معلوماتك أو تحذفها، تواصل معانا عن طريق الواتساب أو الجوال.",
          "الجوال: +966 59 967 6709",
          "الموقع: صالون منطقة التميز، المملكة العربية السعودية",
        ],
      },
    },
    disclaimer: "هالصفحة تصف الممارسات الحالية لصالون منطقة التميز. هي ليست شهادة مستقلة أو مراجعة قانونية.",
    footerRights: "© صالون منطقة التميز",
    footerTagline: "بصنعة وذوق · للعناية بالرجال",
    toggle: "EN",
  },
};

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Trust — Excellence Zone Salon" },
      { name: "description", content: "Learn how Excellence Zone Salon handles your booking information, protects your privacy, and keeps your data safe." },
      { property: "og:title", content: "Privacy & Trust — Excellence Zone Salon" },
      { property: "og:description", content: "How we collect, use, and protect your personal information when you book with us." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Privacy & Trust — Excellence Zone Salon" },
      { name: "twitter:description", content: "Learn how Excellence Zone Salon handles your booking information, protects your privacy, and keeps your data safe." },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [lang, setLang] = useState<Lang>("en");
  const L = t[lang];
  const sections = Object.values(L.sections);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" dir={L.dir}>
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          className="inline-flex items-center gap-2 bg-background border border-border px-3 py-2 text-xs tracking-[0.2em] uppercase hover:border-primary transition"
          style={{ boxShadow: "var(--shadow-luxe)" }}
          aria-label="Toggle language"
        >
          <Languages className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <span className={lang === "ar" ? "text-primary" : "text-muted-foreground"}>ع</span>
          <span className="text-muted-foreground/40">|</span>
          <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
        </button>
      </div>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">
              {L.back}
            </Link>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <p className="text-primary text-xs tracking-[0.4em] uppercase">{L.tag}</p>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-3xl">{L.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">{L.intro}</p>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {sections.map(({ icon: Icon, title, content }) => (
            <div key={title} className="bg-background p-10 hover:bg-card transition-colors">
              <Icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.2} />
              <h2 className="font-serif text-2xl mb-4">{title}</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                {content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-sm text-muted-foreground leading-relaxed">{L.disclaimer}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground tracking-widest uppercase">
          <p>{L.footerRights}</p>
          <p>{L.footerTagline}</p>
        </div>
      </footer>
    </div>
  );
}
