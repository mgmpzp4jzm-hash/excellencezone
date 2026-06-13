import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Droplets,
  Heart,
  Sun,
  Wind,
  ShieldCheck,
  Clock,
  CalendarCheck,
} from "lucide-react";
import bathImg from "@/assets/salon/moroccan-bath.jpg";

const CANONICAL = "https://exllencezone.lovable.app/moroccan-bath";

const benefits = [
  {
    icon: Droplets,
    title: "Deep Exfoliation",
    desc: "Removes weeks of built-up dead skin in a single session, revealing fresh, healthy skin beneath.",
  },
  {
    icon: Sparkles,
    title: "Clearer Pores",
    desc: "Steam and black soap unclog pores, helping prevent breakouts and ingrown hairs for smoother skin.",
  },
  {
    icon: Sun,
    title: "Brighter, Softer Skin",
    desc: "Fresh skin improves tone, texture, and product absorption — your skincare works better afterward.",
  },
  {
    icon: Heart,
    title: "Improved Circulation",
    desc: "Heat and massage stimulate blood flow and lymphatic drainage, reducing puffiness and fatigue.",
  },
  {
    icon: Wind,
    title: "Relaxation & Stress Relief",
    desc: "The slow, sensory pacing of the ritual quiets the nervous system and melts away tension.",
  },
  {
    icon: ShieldCheck,
    title: "Better Grooming Results",
    desc: "Polished skin makes haircuts, beard care, and daily skincare visibly more effective.",
  },
];

const steps = [
  {
    num: "01",
    title: "Warm Steam",
    desc: "You begin in a heated steam room. The humidity softens the skin, opens the pores, and prepares the body for deep cleansing.",
  },
  {
    num: "02",
    title: "Black Soap (Savon Beldi)",
    desc: "A dark, olive-based soap rich in vitamin E is massaged over the body and left to absorb. It loosens dead skin and conditions the surface.",
  },
  {
    num: "03",
    title: "Kessa Exfoliation",
    desc: "Using a coarse kessa glove, your therapist exfoliates the entire body in long, firm strokes. Dead skin lifts away in visible ribbons.",
  },
  {
    num: "04",
    title: "Rinse & Rebalance",
    desc: "A warm rinse removes every trace of soap and exfoliated skin, leaving you feeling remarkably clean.",
  },
  {
    num: "05",
    title: "Nourishing Mask & Oils",
    desc: "A clay or argan-based treatment is applied to hydrate and soothe the freshly polished skin.",
  },
];

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
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">
              ← Back to Excellence Zone Salon
            </Link>
          </nav>
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">
            Signature Ritual
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-3xl">
            The Moroccan Bath
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            A centuries-old ritual of steam, black soap, and kessa exfoliation —
            one of the most transformative experiences at Excellence Zone Salon.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
              45–60 min
            </span>
            <span className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-primary" strokeWidth={1.5} />
              Every 2–4 weeks recommended
            </span>
          </div>
          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center justify-center bg-primary px-8 py-4 text-sm tracking-[0.25em] uppercase text-primary-foreground hover:opacity-90 transition"
              style={{ boxShadow: "var(--shadow-luxe)" }}
            >
              Book Your Hammam
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-2xl">
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">
            Why It Works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            Benefits of a Moroccan Bath
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            More than a cleanse — the Hammam is a full-body renewal that
            leaves your skin smoother, your mind calmer, and your grooming
            routine more effective.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-background p-10 group hover:bg-card transition-colors"
            >
              <Icon
                className="w-8 h-8 text-primary mb-6"
                strokeWidth={1.2}
              />
              <h3 className="font-serif text-xl mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {desc}
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
              The Experience
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              The Ritual, Step by Step
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {steps.map(({ num, title, desc }) => (
              <div
                key={num}
                className="bg-background p-10 group hover:bg-card transition-colors"
              >
                <span className="text-primary/40 font-serif text-5xl leading-none">
                  {num}
                </span>
                <h3 className="font-serif text-xl mt-6 mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {desc}
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
              Your Visit
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              What to Expect
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Our Moroccan Bath is performed in a private, climate-controlled
                room by trained therapists. You will be provided with disposable
                shorts and clean towels — modesty is fully respected throughout.
              </p>
              <p>
                After your treatment, take a few quiet minutes with water or tea
                before heading back into the day. Many guests report feeling
                lighter, calmer, and noticeably smoother for days afterward.
              </p>
            </div>
            <div className="mt-10 space-y-4">
              <h4 className="font-serif text-lg">How to Prepare</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">—</span>
                  Avoid shaving the same day — exfoliation is gentler on
                  unshaved skin.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">—</span>
                  Hydrate well before your appointment.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">—</span>
                  Skip heavy lotions or oils on the day of your bath.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">—</span>
                  Arrive 10 minutes early to settle in.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Ready to Experience the Hammam?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Reserve your Moroccan Bath at Excellence Zone Salon and discover
            why this ancient ritual is still one of the most requested
            treatments by our guests.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center bg-primary px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary-foreground hover:opacity-90 transition"
            style={{ boxShadow: "var(--shadow-luxe)" }}
          >
            Book Your Session
          </a>
          <p className="mt-6 text-xs text-muted-foreground tracking-widest uppercase">
            Walk-ins welcome · Reservations recommended
          </p>
        </div>
      </section>
    </div>
  );
}
