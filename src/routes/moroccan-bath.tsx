import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Droplets,
  Heart,
  Sun,
  Wind,
  ShieldCheck,
  Clock,
  CalendarCheck,
  Languages,
} from "lucide-react";


const CANONICAL = "https://exllencezone.lovable.app/moroccan-bath";

type Lang = "en" | "ar";

const benefits = [
  {
    icon: Droplets,
    en: { title: "Deep Exfoliation", desc: "Removes weeks of built-up dead skin in a single session, revealing fresh, healthy skin beneath." },
    ar: { title: "تقشير عميق", desc: "يشيل تراكم الجلد الميت من أسابيع بجلسة وحدة، ويطلّع بشرة جديدة وصحية." },
  },
  {
    icon: Sparkles,
    en: { title: "Clearer Pores", desc: "Steam and black soap unclog pores, helping prevent breakouts and ingrown hairs for smoother skin." },
    ar: { title: "مسام أنضف", desc: "البخار والصابون البلدي يفتحون المسام، ويساعدون يمنعون الحبوب — بشرة أنعم." },
  },
  {
    icon: Sun,
    en: { title: "Brighter, Softer Skin", desc: "Fresh skin improves tone, texture, and product absorption — your skincare works better afterward." },
    ar: { title: "بشرة أنعم وأكثر إشراق", desc: "بشرة متجدّدة تحسّن اللون والملمس وامتصاص المنتجات — كل عناية بعدها تبيّن أحلى." },
  },
  {
    icon: Wind,
    en: { title: "Relaxation & Stress Relief", desc: "The slow, sensory pacing of the ritual quiets the nervous system and melts away tension." },
    ar: { title: "استرخاء وراحة من الضغط", desc: "الجو الهادي في الجلسة يهدّي أعصابك ويريّحك من ضغط اليوم." },
  },
  {
    icon: ShieldCheck,
    en: { title: "Better Grooming Results", desc: "Polished skin makes haircuts, beard care, and daily skincare visibly more effective." },
    ar: { title: "نتائج عناية أحسن", desc: "البشرة النضيفة تخلي القصّة والعناية باللحية والروتين اليومي يبيّنون أحلى." },
  },
];

const steps = [
  {
    num: "01",
    en: { title: "Warm Steam", desc: "You begin in a heated steam room. The humidity softens the skin, opens the pores, and prepares the body for deep cleansing." },
    ar: { title: "البخار الدافي", desc: "تبدأ في غرفة بخار دافية. الرطوبة تليّن البشرة وتفتح المسام وتجهّز جسمك للتنظيف العميق." },
  },
  {
    num: "02",
    en: { title: "Black Soap (Savon Beldi)", desc: "A dark, olive-based soap rich in vitamin E is massaged over the body and left to absorb. It loosens dead skin and conditions the surface." },
    ar: { title: "الصابون البلدي", desc: "صابون داكن من زيت الزيتون وغني بفيتامين E، يُدلَّك على الجسم ويُترك يمتص. يفكّك الجلد الميت ويغذّي البشرة." },
  },
  {
    num: "03",
    en: { title: "Kessa Exfoliation", desc: "Using a coarse kessa glove, your therapist exfoliates the entire body in long, firm strokes. Dead skin lifts away in visible ribbons." },
    ar: { title: "تقشير الكيسة", desc: "بكيسة خشنة، المعالج يقشّر كل جسمك بحركات طويلة وقوية، ويطلع الجلد الميت قدّامك." },
  },
  {
    num: "04",
    en: { title: "Rinse & Rebalance", desc: "A warm rinse removes every trace of soap and exfoliated skin, leaving you feeling remarkably clean." },
    ar: { title: "الشطف وإعادة التوازن", desc: "شطف دافي يشيل كل أثر للصابون والجلد المتقشّر، ويخليك تحس بنظافة ما جرّبتها قبل." },
  },
  {
    num: "05",
    en: { title: "Nourishing Mask & Oils", desc: "A clay or argan-based treatment is applied to hydrate and soothe the freshly polished skin." },
    ar: { title: "ماسك مغذّي وزيوت", desc: "نحط لك ماسك طين أو زيت أرغان عشان يرطّب ويهدّي بشرتك بعد التقشير." },
  },
];

const t = {
  en: {
    back: "← Back to Excellence Zone Salon",
    signature: "Signature Ritual",
    heroTitle: "The Moroccan Bath",
    heroDesc: "A centuries-old ritual of steam, black soap, and kessa exfoliation — one of the most transformative experiences at Excellence Zone Salon.",
    duration: "45–60 min",
    frequency: "Every 2–4 weeks recommended",
    bookHammam: "Book Your Hammam",
    whyKicker: "Why It Works",
    benefitsTitle: "Benefits of a Moroccan Bath",
    benefitsDesc: "More than a cleanse — the Hammam is a full-body renewal that leaves your skin smoother, your mind calmer, and your grooming routine more effective.",
    experienceKicker: "The Experience",
    ritualTitle: "The Ritual, Step by Step",
    visitKicker: "Your Visit",
    expectTitle: "What to Expect",
    expect1: "Our Moroccan Bath is performed in a private, climate-controlled room by trained therapists. You will be provided with disposable shorts and clean towels — modesty is fully respected throughout.",
    expect2: "After your treatment, take a few quiet minutes with water or tea before heading back into the day. Many guests report feeling lighter, calmer, and noticeably smoother for days afterward.",
    prepTitle: "How to Prepare",
    prep: [
      "Avoid shaving the same day — exfoliation is gentler on unshaved skin.",
      "Hydrate well before your appointment.",
      "Skip heavy lotions or oils on the day of your bath.",
      "Arrive 10 minutes early to settle in.",
    ],
    ctaTitle: "Ready to Experience the Hammam?",
    ctaDesc: "Reserve your Moroccan Bath at Excellence Zone Salon and discover why this ancient ritual is still one of the most requested treatments by our guests.",
    bookSession: "Book Your Session",
    walkins: "Walk-ins welcome · Reservations recommended",
    toggle: "AR",
  },
  ar: {
    back: "→ ارجع لصالون منطقة الامتياز",
    signature: "جلسة مميزة",
    heroTitle: "الحمام المغربي",
    heroDesc: "طقس عمره قرون من البخار والصابون البلدي وتقشير الكيسة — من أكثر التجارب اللي تحس فيها بفرق واضح عندنا في صالون منطقة الامتياز.",
    duration: "٤٥–٦٠ دقيقة",
    frequency: "ينصح فيه كل ٢–٤ أسابيع",
    bookHammam: "احجز حمامك",
    whyKicker: "ليش يستاهل",
    benefitsTitle: "فوايد الحمام المغربي",
    benefitsDesc: "أكثر من مجرد استحمام — الحمام يجدّد جسمك كامل، بشرتك تطلع أنعم، بالك يرتاح، وروتين العناية يبيّن أحلى.",
    experienceKicker: "التجربة",
    ritualTitle: "الجلسة خطوة بخطوة",
    visitKicker: "زيارتك",
    expectTitle: "إيش تتوقع",
    expect1: "نسوي الحمام المغربي في غرفة خاصة بدرجة حرارة مظبوطة، وعلى يد معالجين مدرّبين. نوفر لك شورت يستخدم مرة وحدة ومناشف نضيفة — والخصوصية محفوظة كامل.",
    expect2: "بعد الجلسة، خذ لك كم دقيقة هادية مع ماء أو شاي قبل ما ترجع لبرّا. كثير من الزباين يقولون إنهم يحسّون بخفّة وراحة ونعومة واضحة لأيام بعدها.",
    prepTitle: "كيف تجهّز نفسك",
    prep: [
      "لا تحلق نفس اليوم — التقشير يطلع أحسن على بشرة ما انحلقت.",
      "اشرب ماي كفاية قبل موعدك.",
      "تجنّب الكريمات أو الزيوت الثقيلة في يوم الحمام.",
      "تعال قبل ١٠ دقايق عشان تاخذ راحتك.",
    ],
    ctaTitle: "جاهز تجرّب الحمام؟",
    ctaDesc: "احجز حمامك المغربي عندنا في صالون منطقة الامتياز، واكتشف ليش هالجلسة من أكثر الجلسات اللي يطلبها زباينّا.",
    bookSession: "احجز جلستك",
    walkins: "نرحّب بدون موعد · يفضّل الحجز",
    toggle: "EN",
  },
};

export const Route = createFileRoute("/moroccan-bath")({
  head: () => ({
    meta: [
      { title: "Moroccan Bath (Hammam) — Benefits & Booking | Excellence Zone Salon" },
      {
        name: "description",
        content:
          "Experience the authentic Moroccan Bath at Excellence Zone Salon. Deep exfoliation, black soap, kessa glove ritual, and lasting skin benefits. Book your Hammam session today.",
      },
      { property: "og:title", content: "Moroccan Bath (Hammam) — Benefits & Booking | Excellence Zone Salon" },
      {
        property: "og:description",
        content:
          "Discover the benefits of an authentic Moroccan Bath: deep exfoliation, clearer pores, improved circulation, and total relaxation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Moroccan Bath (Hammam) — Benefits & Booking | Excellence Zone Salon" },
      {
        name: "twitter:description",
        content:
          "Authentic Moroccan Bath ritual with deep exfoliation, black soap, and kessa gloves at Excellence Zone Salon.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Moroccan Bath (Hammam)",
          provider: {
            "@type": "LocalBusiness",
            name: "Excellence Zone Salon",
            url: "https://exllencezone.lovable.app",
            telephone: "+966599676709",
          },
          description:
            "A traditional Moroccan Bath ritual combining steam, black soap, and kessa exfoliation for deeply cleansed, glowing skin.",
          areaServed: "Saudi Arabia",
          url: CANONICAL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What are the benefits of a Moroccan Bath?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A Moroccan Bath deeply exfoliates the skin, clears pores, improves circulation, relieves stress, and leaves the body feeling refreshed and renewed.",
              },
            },
            {
              "@type": "Question",
              name: "How long does a Moroccan Bath session take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sessions at Excellence Zone Salon last approximately 45 to 60 minutes, including steam, black soap treatment, kessa exfoliation, and nourishing aftercare.",
              },
            },
            {
              "@type": "Question",
              name: "How often should I get a Moroccan Bath?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most guests enjoy a Moroccan Bath every 2 to 4 weeks. Monthly visits are ideal for maintaining smooth, healthy skin alongside a regular grooming routine.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: MoroccanBathPage,
});

function MoroccanBathPage() {
  const [lang, setLang] = useState<Lang>("en");
  const L = t[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" dir={dir}>
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
      <section className="relative min-h-[70vh] flex items-end overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">
              {L.back}
            </Link>
          </nav>
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">
            {L.signature}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-3xl">
            {L.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            {L.heroDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
              {L.duration}
            </span>
            <span className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-primary" strokeWidth={1.5} />
              {L.frequency}
            </span>
          </div>
          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center justify-center bg-primary px-8 py-4 text-sm tracking-[0.25em] uppercase text-primary-foreground hover:opacity-90 transition"
              style={{ boxShadow: "var(--shadow-luxe)" }}
            >
              {L.bookHammam}
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-2xl">
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">
            {L.whyKicker}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            {L.benefitsTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {L.benefitsDesc}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {benefits.map(({ icon: Icon, ...b }) => (
            <div
              key={b.en.title}
              className="bg-background p-10 group hover:bg-card transition-colors"
            >
              <Icon
                className="w-8 h-8 text-primary mb-6"
                strokeWidth={1.2}
              />
              <h3 className="font-serif text-xl mb-3">{b[lang].title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {b[lang].desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Ritual Steps */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="mb-16 max-w-2xl">
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">
              {L.experienceKicker}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              {L.ritualTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-background p-10 group hover:bg-card transition-colors"
              >
                <span className="text-primary/40 font-serif text-5xl leading-none">
                  {s.num}
                </span>
                <h3 className="font-serif text-xl mt-6 mb-3">{s[lang].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {s[lang].desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="max-w-3xl mx-auto">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">
              {L.visitKicker}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              {L.expectTitle}
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>{L.expect1}</p>
              <p>{L.expect2}</p>
            </div>
            <div className="mt-10 space-y-4">
              <h4 className="font-serif text-lg">{L.prepTitle}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {L.prep.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            {L.ctaTitle}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            {L.ctaDesc}
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center bg-primary px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary-foreground hover:opacity-90 transition"
            style={{ boxShadow: "var(--shadow-luxe)" }}
          >
            {L.bookSession}
          </a>
          <p className="mt-6 text-xs text-muted-foreground tracking-widest uppercase">
            {L.walkins}
          </p>
        </div>
      </section>
    </div>
  );
}
