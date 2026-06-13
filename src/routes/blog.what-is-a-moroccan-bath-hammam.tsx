import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://exllencezone.lovable.app/blog/what-is-a-moroccan-bath-hammam";

export const Route = createFileRoute("/blog/what-is-a-moroccan-bath-hammam")({
  head: () => ({
    meta: [
      { title: "What is a Moroccan Bath (Hammam)? Benefits & Ritual Guide" },
      {
        name: "description",
        content:
          "A complete guide to the Moroccan Bath (Hammam): the traditional ritual, the benefits of black soap and kessa gloves, and what to expect at Excellence Zone Salon.",
      },
      { property: "og:title", content: "What is a Moroccan Bath (Hammam)? Benefits & Ritual Guide" },
      {
        property: "og:description",
        content:
          "Discover the centuries-old Moroccan Bath ritual — steam, black soap, kessa exfoliation — and the skin and wellness benefits behind it.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "What is a Moroccan Bath (Hammam)? Benefits & Ritual Guide" },
      {
        name: "twitter:description",
        content:
          "The traditional Hammam ritual, the benefits of black soap and kessa gloves, and what to expect at Excellence Zone Salon.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What is a Moroccan Bath (Hammam)? Benefits & Ritual Guide",
          description:
            "A complete guide to the Moroccan Bath (Hammam): the traditional ritual, the benefits of black soap and kessa gloves, and what to expect at Excellence Zone Salon.",
          mainEntityOfPage: CANONICAL,
          author: { "@type": "Organization", name: "Excellence Zone Salon" },
          publisher: {
            "@type": "Organization",
            name: "Excellence Zone Salon",
            url: "https://exllencezone.lovable.app",
          },
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
              name: "What is a Moroccan Bath?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A Moroccan Bath, or Hammam, is a traditional North African steam-and-exfoliation ritual that deeply cleanses the skin using black soap (savon beldi) and a kessa glove to remove dead cells.",
              },
            },
            {
              "@type": "Question",
              name: "What are the benefits of a Hammam?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A Hammam deeply exfoliates, unclogs pores, improves circulation, softens skin, supports muscle relaxation, and leaves the body feeling refreshed and renewed.",
              },
            },
            {
              "@type": "Question",
              name: "How often should I get a Moroccan Bath?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most guests enjoy a Moroccan Bath every 2 to 4 weeks. Weekly sessions are common in traditional culture, but monthly visits are ideal for most modern routines.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HammamGuide,
});

function HammamGuide() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 text-foreground">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:underline">
          ← Back to Excellence Zone Salon
        </Link>
      </nav>

      <header className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">
          Grooming Guide
        </p>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          What is a Moroccan Bath (Hammam)? Benefits, Ritual & What to Expect
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A centuries-old ritual of steam, black soap, and kessa exfoliation —
          and one of the most-loved experiences at Excellence Zone Salon.
        </p>
      </header>

      <section className="prose prose-invert max-w-none space-y-6 text-base leading-relaxed">
        <h2 className="text-2xl font-semibold">What is a Hammam?</h2>
        <p>
          A Hammam — also called a Moroccan Bath — is a traditional bathing
          ritual rooted in North African and broader Middle Eastern culture.
          More than a wash, it is a multi-step ceremony combining warm steam,
          mineral-rich black soap, and deep manual exfoliation with a textured
          mitt called a <strong>kessa glove</strong>. The result is famously
          smooth, glowing skin and a profound sense of relaxation.
        </p>

        <h2 className="text-2xl font-semibold">The Ritual, Step by Step</h2>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            <strong>Warm steam.</strong> You begin in a heated steam room. The
            humidity softens the skin, opens the pores, and prepares the body
            for deep cleansing.
          </li>
          <li>
            <strong>Black soap (savon beldi).</strong> A dark, olive-based soap
            rich in vitamin E is massaged over the body and left to absorb. It
            loosens dead skin and conditions the surface.
          </li>
          <li>
            <strong>Kessa exfoliation.</strong> Using a coarse kessa glove,
            your therapist exfoliates the entire body in long, firm strokes.
            Dead skin lifts away in visible ribbons — the signature moment of
            the ritual.
          </li>
          <li>
            <strong>Rinse and rebalance.</strong> A warm rinse removes every
            trace of soap and exfoliated skin.
          </li>
          <li>
            <strong>Nourishing mask & oils.</strong> A clay or argan-based
            treatment is applied to hydrate and soothe the freshly polished
            skin.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">Benefits of a Moroccan Bath</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Deep exfoliation.</strong> Removes weeks of built-up dead
            skin in a single session.
          </li>
          <li>
            <strong>Clearer pores.</strong> Steam and black soap unclog pores,
            helping prevent breakouts and ingrown hairs.
          </li>
          <li>
            <strong>Brighter, softer skin.</strong> Revealing fresh skin
            improves tone, texture, and product absorption.
          </li>
          <li>
            <strong>Improved circulation.</strong> Heat and massage stimulate
            blood flow and lymphatic drainage.
          </li>
          <li>
            <strong>Relaxation & stress relief.</strong> The slow, sensory
            pacing of the ritual quiets the nervous system.
          </li>
          <li>
            <strong>Better shaves & grooming.</strong> Polished skin makes
            haircuts, beard care, and skincare visibly more effective.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">
          What to Expect at Excellence Zone Salon
        </h2>
        <p>
          Our Moroccan Bath is performed in a private, climate-controlled room
          by trained therapists. Sessions last around 45–60 minutes. You will
          be provided with disposable shorts and clean towels — modesty is
          fully respected throughout. After your treatment, take a few quiet
          minutes with water or tea before heading back into the day.
        </p>

        <h2 className="text-2xl font-semibold">How to Prepare</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Avoid shaving the same day — exfoliation is gentler on unshaved skin.</li>
          <li>Hydrate well before your appointment.</li>
          <li>Skip heavy lotions or oils on the day of your bath.</li>
          <li>Arrive 10 minutes early to settle in.</li>
        </ul>

        <h2 className="text-2xl font-semibold">How Often Should You Go?</h2>
        <p>
          For most guests, every 2 to 4 weeks is ideal. Traditional weekly
          visits are still common in many cultures, but a monthly rhythm works
          beautifully alongside regular haircuts and skincare.
        </p>

        <h2 className="text-2xl font-semibold">Book Your Moroccan Bath</h2>
        <p>
          Ready to try the ritual? Reserve your session at Excellence Zone
          Salon and experience the original Hammam — done right.
        </p>
        <p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a Moroccan Bath
          </Link>
        </p>
      </section>
    </article>
  );
}
