import { createFileRoute, Link } from "@tanstack/react-router";
import { Scissors, Sparkles, Hand, Flower2, Waves, Clock, MapPin, Phone, Star, Languages, Droplets, Sun, Heart, Wind, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createBooking, getTakenBookings } from "@/lib/bookings.functions";
import { toast } from "sonner";

import heroImg from "@/assets/salon/hero-shower.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Excellence Zone Salon — Luxury Men's Grooming" },
      { name: "description", content: "Excellence Zone Salon: expert haircuts, Moroccan bath, skin, hand & foot care, and relaxing massage for the modern gentleman." },
      { property: "og:title", content: "Excellence Zone Salon — Luxury Men's Grooming" },
      { property: "og:description", content: "Expert haircuts, Moroccan bath, skin care, and signature grooming rituals — rated 4.9 by guests." },
      { property: "og:url", content: "https://exellencezone.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://exellencezone.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BarberShop",
          name: "Excellence Zone Salon",
          url: "https://exellencezone.lovable.app/",
          telephone: "+966599676709",
          priceRange: "$$",
          image: "https://exellencezone.lovable.app/",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
              opens: "10:00",
              closes: "02:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Friday"],
              opens: "14:30",
              closes: "02:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "217",
          },
        }),
      },
    ],
  }),
});




type Lang = "en" | "ar";

const servicesData: Array<{
  icon: any;
  price?: number;
  en: { title: string; desc: string; duration: string; link?: string };
  ar: { title: string; desc: string; duration: string; link?: string };
}> = [
  { icon: Scissors, price: 45, en: { title: "Haircut & Styling", desc: "Precision cuts and refined styling shaped by expert barbers using the latest tools and techniques.", duration: "40 min" }, ar: { title: "قص وتصفيف الشعر", desc: "قصّات مظبوطة وتصفيف على الذوق على يد حلاقين خبرة، بأحدث الأدوات.", duration: "٤٠ دقيقة" } },
  { icon: Star, price: 35, en: { title: "Beard Trimming", desc: "Sharp line-ups, hot-towel shaves, and beard sculpting tailored to your face shape.", duration: "30 min" }, ar: { title: "تشذيب اللحية", desc: "تشذيب اللحية، حلاقة بالمنشفة الساخنة، وتفصيل على شكل وجهك.", duration: "٣٠ دقيقة" } },
  { icon: Scissors, price: 65, en: { title: "Haircut & Beard", desc: "The full grooming package — a fresh cut paired with a sharp beard shape-up and shave.", duration: "1 hour" }, ar: { title: "قص الشعر واللحية", desc: "الباقة الكاملة — قصّة شعر نظيفة مع تشذيب اللحية وحلاقة مرتبة.", duration: "ساعة" } },
  { icon: Sparkles, en: { title: "Braids", desc: "Stylish braiding tailored to your hair length and look — clean, neat, and long-lasting.", duration: "1 hour" }, ar: { title: "ضفاير", desc: "ضفاير مرتبة على ذوقك، تناسب طول شعرك وستايلك — نضيفة وتدوم.", duration: "ساعة" } },
  { icon: Sparkles, price: 350, en: { title: "Perm — Long Lasting", desc: "A long-lasting perm treatment that gives your hair lasting texture and shape.", duration: "75 min" }, ar: { title: "كيرلي دائم", desc: "جلسة كيرلي تدوم طويلاً، تمنح الشعر ملمساً وشكلاً يبقى معاك.", duration: "٧٥ دقيقة" } },
  { icon: Sparkles, price: 100, en: { title: "Perm — Classic", desc: "A classic perm treatment to add volume and soft waves to your hair.", duration: "25 min" }, ar: { title: "كيرلي كلاسيك", desc: "كيرلي كلاسيكي يضيف كثافة وموجات ناعمة للشعر.", duration: "٢٥ دقيقة" } },
  { icon: Flower2, price: 150, en: { title: "Moroccan Bath — Classic", desc: "A deeply cleansing body ritual using authentic black soap and kessa exfoliation.", duration: "35 min", link: "/moroccan-bath" }, ar: { title: "الحمام المغربي — كلاسيك", desc: "جلسة تنظيف عميق للجسم بالصابون البلدي الأصلي وتقشير الكيسة.", duration: "٣٥ دقيقة", link: "/moroccan-bath" } },
  { icon: Flower2, price: 250, en: { title: "Moroccan Bath — King", desc: "The full royal Hammam experience — extended exfoliation, relaxation, and care.", duration: "1 hour", link: "/moroccan-bath" }, ar: { title: "الحمام المغربي — ملكي", desc: "تجربة الحمام الملكي الكاملة — تقشير ممتد، استرخاء، وعناية فاخرة.", duration: "ساعة", link: "/moroccan-bath" } },
  { icon: Waves, price: 150, en: { title: "Massage — Classic", desc: "Specialized techniques to stimulate circulation, relieve tension, and restore radiance.", duration: "40 min" }, ar: { title: "مساج — كلاسيك", desc: "تقنيات متخصصة تنشّط الدورة الدموية، تفك التكتيف، وترجّع نشاطك.", duration: "٤٠ دقيقة" } },
  { icon: Waves, price: 180, en: { title: "Massage — King", desc: "An extended, deeply restorative massage session for full-body relaxation and renewal.", duration: "1 hour" }, ar: { title: "مساج — ملكي", desc: "جلسة مساج ممتدة وعميقة للاسترخاء الكامل وتجديد حيوية الجسم.", duration: "ساعة" } },
  { icon: Hand, en: { title: "Manicure", desc: "Meticulous hand care with attention to nail health, cuticles, and a clean finish.", duration: "30 min" }, ar: { title: "مانيكير", desc: "عناية دقيقة باليدين — صحة الأظافر، الجلد الزائد، ولمسة نهائية نضيفة.", duration: "٣٠ دقيقة" } },
  { icon: Hand, en: { title: "Pedicure", desc: "Thorough foot care including exfoliation, nail grooming, and skin health.", duration: "30 min" }, ar: { title: "باديكير", desc: "عناية شاملة بالقدمين — تقشير، ترتيب الأظافر، وصحة البشرة.", duration: "٣٠ دقيقة" } },
  { icon: Hand, en: { title: "Manicure & Pedicure", desc: "Complete hand and foot care in one session — nails, skin, and a polished finish.", duration: "1 hour" }, ar: { title: "مانيكير وباديكير", desc: "عناية كاملة باليدين والقدمين في جلسة واحدة — أظافر، بشرة، ولمعة نهائية.", duration: "ساعة" } },
  { icon: Sparkles, price: 50, en: { title: "Facial & Skin Care", desc: "Tailored facial treatments to keep skin fresh, balanced, and radiant.", duration: "30 min" }, ar: { title: "العناية بالوجه والبشرة", desc: "جلسات وجه مخصّصة لك، تخلي بشرتك منتعشة ومتوازنة ومشرقة.", duration: "٣٠ دقيقة" } },
];

const t = {
  en: {
    dir: "ltr" as const,
    nav: { services: "Services", gallery: "Gallery", reviews: "Reviews", about: "About", contact: "Contact", book: "Book" },
    hero: {
      tag: "Men's Grooming · Established Excellence",
      h1a: "Where the modern", h1b: "gentleman", h1c: "is shaped.",
      sub: "A luxurious, comprehensive men's grooming experience — defined by craft, comfort, and a sophisticated atmosphere.",
      cta1: "Reserve your seat", cta2: "Explore services",
      stat1: "Master Stylists", stat2: "Guest Rated",
    },
    about: { tag: "The Philosophy", h: "A sanctuary tailored for the discerning guest.", p: "At Excellence Zone Salon we attend to every detail — from the first greeting to the final mirror reveal — ensuring an exceptional experience that combines luxury and comfort. Our standards never waver; your satisfaction is the measure." },
    services: { tag: "The Menu", h: "Signature Services", p: "Each treatment is delivered with precision instruments, premium products, and the unhurried attention you deserve." },
    gallery: { tag: "The Space", h: "Inside Excellence Zone" },
    team: { tag: "The Team", h: "Meet Our Specialists", p: "A dedicated team of barbers and therapists, each with their own craft." },
    contact: { tag: "Visit Us", h: "Book your moment of excellence.", p: "Walk-ins welcome. Reservations recommended for the full signature experience.", maps: "Find us on Google Maps", hours: "Sat–Thu · 10:00 — 02:00", hoursFri: "Fri · 14:30 — 02:00" },
    form: { title: "Request an Appointment", name: "Full name", phone: "Phone", selectService: "Select a service", selectWorker: "Preferred barber / worker", notes: "Notes (optional)", submit: "Send Request", greeting: "Hello, I would like to book an appointment at Excellence Zone Salon.", lName: "Name", lPhone: "Phone", lService: "Service", lWorker: "Barber/Worker", lDate: "Date/Time", lNotes: "Notes" },
    moroccanBath: { tag: "Signature Ritual", h: "Benefits of a Moroccan Bath", p: "More than a cleanse — the Hammam is a full-body renewal that leaves your skin smoother, your mind calmer, and your grooming routine more effective.", link: "Explore the full ritual →" },
    reviews: { tag: "Guest Words", h: "Loved by our clients", rating: "4.9 · 217 Google reviews" },
    footer: { rights: "Excellence Zone Salon", tagline: "Crafted with care · Men's Grooming" },
  },
  ar: {
    dir: "rtl" as const,
    nav: { services: "الخدمات", gallery: "المعرض", reviews: "آراء الزباين", about: "عنّا", contact: "تواصل معنا", book: "احجز" },
    hero: {
      tag: "عناية للرجال · تميّز ما عليه كلام",
      h1a: "هنا يطلع", h1b: "الرجال", h1c: "بأبهى طلّة.",
      sub: "تجربة عناية فاخرة وكاملة للشباب — شغل نضيف، جلسة مريحة، وأجواء على الذوق.",
      cta1: "احجز كرسيك", cta2: "شوف الخدمات",
      stat1: "حلاقين محترفين", stat2: "تقييم الزباين",
    },
    about: { tag: "فكرتنا", h: "مكان مخصوص لكل ضيف يبغى الأحسن.", p: "في صالون منطقة الامتياز نهتم بأدق التفاصيل — من أول ما تطّل علينا لين تشوف نفسك بالمراية — عشان نطلّعك بتجربة مرتبة تجمع الفخامة والراحة. مستوانا ثابت، وراحتك هي الأهم عندنا." },
    services: { tag: "قائمة الخدمات", h: "خدماتنا المميزة", p: "كل خدمة نقدّمها بأدوات دقيقة ومنتجات فاخرة، وبراحة من غير استعجال — تستاهل." },
    gallery: { tag: "المكان", h: "من داخل منطقة الامتياز" },
    team: { tag: "الفريق", h: "تعرّف على فريقنا", p: "فريق متخصص من الحلاقين والمعالجين، كل واحد محترف في شغله." },
    contact: { tag: "زورونا", h: "احجز لك لحظة تميّز.", p: "تقدر تجي من غير موعد، بس يفضّل تحجز عشان تاخذ راحتك الكاملة.", maps: "موقعنا على قوقل ماب", hours: "السبت–الخميس · 10:00 — 02:00", hoursFri: "الجمعة · 14:30 — 02:00" },
    form: { title: "اطلب موعد", name: "الاسم الكامل", phone: "رقم الجوال", selectService: "اختر الخدمة", selectWorker: "الحلاق / العامل المفضل", notes: "ملاحظات (اختياري)", submit: "إرسال الطلب", greeting: "هلا، أبي أحجز موعد في صالون منطقة الامتياز.", lName: "الاسم", lPhone: "الجوال", lService: "الخدمة", lWorker: "الحلاق/العامل", lDate: "التاريخ/الوقت", lNotes: "ملاحظات" },
    moroccanBath: { tag: "طقس مميز", h: "فوايد الحمام المغربي", p: "أكثر من مجرد استحمام — الحمام المغربي يجدّد جسمك من راسك لرجلك، بشرتك تطلع أنعم، بالك يرتاح، وكل عناية بعدها تبيّن أحلى.", link: "شوف الطقس كامل ←" },
    reviews: { tag: "كلام الزباين", h: "زباينّا يحبّونا", rating: "4.9 · 217 تقييم على قوقل" },
    footer: { rights: "صالون منطقة الامتياز", tagline: "بصنعة وذوق · للعناية بالرجال" },
  },
};

const bookingServices: Record<Lang, { value: string; duration: number }[]> = {
  en: [
    { value: "Haircut & Styling", duration: 40 },
    { value: "Beard Trimming", duration: 30 },
    { value: "Haircut & Beard", duration: 60 },
    { value: "Braids", duration: 60 },
    { value: "Perm — Long Lasting", duration: 75 },
    { value: "Perm — Classic", duration: 25 },
    { value: "Moroccan Bath — Classic", duration: 35 },
    { value: "Moroccan Bath — King", duration: 60 },
    { value: "Massage — Classic", duration: 40 },
    { value: "Massage — King", duration: 60 },
    { value: "Manicure", duration: 30 },
    { value: "Pedicure", duration: 30 },
    { value: "Facial & Skin Care", duration: 30 },
  ],
  ar: [
    { value: "قص وتصفيف الشعر", duration: 40 },
    { value: "تشذيب اللحية", duration: 30 },
    { value: "قص الشعر واللحية", duration: 60 },
    { value: "ضفاير", duration: 60 },
    { value: "كيرلي دائم", duration: 75 },
    { value: "كيرلي كلاسيك", duration: 25 },
    { value: "الحمام المغربي — كلاسيك", duration: 35 },
    { value: "الحمام المغربي — ملكي", duration: 60 },
    { value: "مساج — كلاسيك", duration: 40 },
    { value: "مساج — ملكي", duration: 60 },
    { value: "مانيكير", duration: 30 },
    { value: "باديكير", duration: 30 },
    { value: "العناية بالوجه والبشرة", duration: 30 },
  ],
};

// Which workers (by English name) can perform each service (keyed by English service name)
const serviceWorkers: Record<string, string[]> = {
  "Haircut & Styling": ["Hamza", "Sayed", "Soufyan", "Yassine"],
  "Beard Trimming": ["Hamza", "Sayed", "Soufyan", "Yassine"],
  "Haircut & Beard": ["Hamza", "Sayed", "Soufyan", "Yassine"],
  "Braids": ["Yassine"],
  "Perm — Long Lasting": ["Yassine"],
  "Perm — Classic": ["Yassine"],
  "Moroccan Bath — Classic": ["Rasheed 🇲🇦"],
  "Moroccan Bath — King": ["Rasheed 🇲🇦"],
  "Massage — Classic": ["Rasheed 🇲🇦"],
  "Massage — King": ["Rasheed 🇲🇦"],
  "Manicure": ["Rasheed 🇲🇦"],
  "Pedicure": ["Rasheed 🇲🇦"],
  "Facial & Skin Care": ["Rasheed 🇲🇦"],
};

// Shop hours: 10:00 → 02:00 next day (16 hours). Slots step by the service duration.
const OPEN_MIN = 10 * 60;
const CLOSE_MIN = OPEN_MIN + 16 * 60;

function buildSlots(duration: number): string[] {
  if (!duration) return [];
  const slots: string[] = [];
  const lastStart = CLOSE_MIN - duration;
  for (let m = OPEN_MIN; m <= lastStart; m += duration) {
    const h = Math.floor(m / 60) % 24;
    const mm = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}

const FRIDAY_CUTOFF_MIN = 14 * 60 + 30; // 14:30

function isFriday(dateStr: string): boolean {
  if (!dateStr) return false;
  const [Y, M, D] = dateStr.split("-").map(Number);
  return new Date(Y, M - 1, D).getDay() === 5;
}

function BookingForm({ lang }: { lang: Lang }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [preferredWorker, setPreferredWorker] = useState(""); // "" = Any available
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [taken, setTaken] = useState<{ worker: string; startAt: string; endAt: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const tr = t[lang].form;

  const fetchTaken = useServerFn(getTakenBookings);
  const createBookingFn = useServerFn(createBooking);

  const serviceIdx = bookingServices[lang].findIndex((s) => s.value === service);
  const selectedService = serviceIdx >= 0 ? bookingServices[lang][serviceIdx] : undefined;
  const serviceEn = serviceIdx >= 0 ? bookingServices.en[serviceIdx].value : "";
  const allowedWorkersEn = serviceEn ? serviceWorkers[serviceEn] ?? [] : [];
  const availableTeam = serviceEn ? team.filter((m) => allowedWorkersEn.includes(m.name.en)) : team;
  const workerNames = availableTeam.map((m) => m.name[lang]);
  // Workers to query/insert against, with the preferred worker first (server falls back to others if taken).
  const orderedWorkerNames = preferredWorker
    ? [preferredWorker, ...workerNames.filter((n) => n !== preferredWorker)]
    : workerNames;
  const slots = buildSlots(selectedService?.duration ?? 0);
  const isFridayDate = date ? isFriday(date) : false;
  const visibleSlots = isFridayDate
    ? slots.filter((s) => {
        const [hh, mm] = s.split(":").map(Number);
        return hh < 10 || hh * 60 + mm >= FRIDAY_CUTOFF_MIN;
      })
    : slots;

  const slotTimes = (slotHHMM: string) => {
    if (!date || !selectedService) return null;
    const [hh, mm] = slotHHMM.split(":").map(Number);
    const [Y, M, D] = date.split("-").map(Number);
    const start = new Date(Y, M - 1, D, hh, mm).getTime();
    const end = start + selectedService.duration * 60_000;
    return { start, end };
  };

  const isTaken = (slotHHMM: string) => {
    const t = slotTimes(slotHHMM);
    if (!t || workerNames.length === 0) return false;
    const busy = new Set<string>();
    for (const b of taken) {
      const bs = new Date(b.startAt).getTime();
      const be = new Date(b.endAt).getTime();
      if (t.start < be && t.end > bs) busy.add(b.worker);
    }
    // Fallback is allowed: the slot is "taken" only when every eligible worker is busy.
    return busy.size >= workerNames.length;
  };

  const refreshTaken = async (workers: string[], d: string) => {
    if (workers.length === 0 || !d) {
      setTaken([]);
      return;
    }
    const [Y, M, D] = d.split("-").map(Number);
    const dayStart = new Date(Y, M - 1, D).toISOString();
    const dayEnd = new Date(Y, M - 1, D + 2).toISOString();
    try {
      const rows = await fetchTaken({ data: { workers, dayStart, dayEnd } });
      setTaken(rows);
    } catch {
      setTaken([]);
    }
  };

  useEffect(() => {
    refreshTaken(workerNames, date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, date]);

  // Clear time when it becomes invalid for new service/availability
  useEffect(() => {
    if (!time) return;
    if (!visibleSlots.includes(time) || isTaken(time)) setTime("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, date, taken, preferredWorker]);

  // Reset preferred worker if it isn't valid for the newly selected service
  useEffect(() => {
    if (preferredWorker && !workerNames.includes(preferredWorker)) {
      setPreferredWorker("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  const handleServiceChange = (val: string) => {
    setService(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !date || !time || !selectedService || orderedWorkerNames.length === 0) return;
    const t = slotTimes(time);
    if (!t) return;
    setSubmitting(true);
    try {
      const res = await createBookingFn({
        data: {
          service,
          workers: orderedWorkerNames,
          startAt: new Date(t.start).toISOString(),
          durationMin: selectedService.duration,
          customerName: name,
          customerPhone: phone,
          notes: notes || null,
        },
      });
      if (!res.ok) {
        if (res.error === "SLOT_TAKEN") {
          toast.error(lang === "ar" ? "هذا الوقت محجوز، اختر وقت ثاني" : "That time was just booked. Please pick another slot.");
          await refreshTaken(workerNames, date);
          setTime("");
        } else {
          toast.error(res.error);
        }
        return;
      }
      const datetime = `${date} ${time}`;
      const lines = [
        tr.greeting,
        `${tr.lName}: ${name}`,
        `${tr.lPhone}: ${phone}`,
        `${tr.lService}: ${service}`,
        `${tr.lWorker}: ${res.worker}`,
        `${tr.lDate}: ${datetime}`,
        notes ? `${tr.lNotes}: ${notes}` : "",
      ].filter(Boolean);
      const text = encodeURIComponent(lines.join("\n"));
      window.open(`https://wa.me/966599676709?text=${text}`, "_blank");
      toast.success(lang === "ar" ? "تم الحجز بنجاح" : "Booking confirmed");
    } finally {
      setSubmitting(false);
    }
  };


  const timePlaceholder = lang === "ar"
    ? (!service ? "اختر الخدمة أولاً" : !date ? "اختر التاريخ أولاً" : "اختر الوقت")
    : (!service ? "Select a service first" : !date ? "Select a date first" : "Select time");

  const takenLabel = lang === "ar" ? "محجوز" : "Taken";
  const timeDisabled = !service || !date;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form className="bg-card border border-border p-10 space-y-6" onSubmit={handleSubmit} aria-label={tr.title}>
      <h3 className="font-serif text-2xl">{tr.title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <input aria-label={tr.name} value={name} onChange={(e) => setName(e.target.value)} className="bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" placeholder={tr.name} required />
        <input aria-label={tr.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" placeholder={tr.phone} required />
      </div>
      <select aria-label={tr.selectService} value={service} onChange={(e) => handleServiceChange(e.target.value)} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" required>
        <option value="">{tr.selectService}</option>
        {bookingServices[lang].map((s) => <option key={s.value} value={s.value}>{s.value}</option>)}
      </select>
      <select aria-label={tr.selectWorker} value={preferredWorker} onChange={(e) => setPreferredWorker(e.target.value)} disabled={!service || workerNames.length === 0} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none disabled:opacity-50">
        <option value="">{lang === "ar" ? "أي شخص متاح" : "Any available"}</option>
        {workerNames.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <div className="grid sm:grid-cols-2 gap-4">
        <input aria-label="Date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" required />
        <select aria-label="Time" value={time} onChange={(e) => setTime(e.target.value)} disabled={timeDisabled} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none disabled:opacity-50" required>
          <option value="">{timePlaceholder}</option>
          {visibleSlots.map((s) => {
            const h = parseInt(s.slice(0, 2), 10);
            const base = h >= 24 ? `${String(h - 24).padStart(2, "0")}:${s.slice(3)} (+1)` : s;
            const taken = isTaken(s);
            return <option key={s} value={s} disabled={taken}>{taken ? `${base} — ${takenLabel}` : base}</option>;
          })}
        </select>
      </div>
      <textarea aria-label={tr.notes} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" placeholder={tr.notes} />

      <button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition disabled:opacity-60">{submitting ? (lang === "ar" ? "جارٍ الحجز..." : "Booking...") : tr.submit}</button>
    </form>
  );
}

const reviews = [
  { name: "Ahmed", time: "10 months ago", text: "My experience was great at the salon. I got a hair cut and a beard trim. In addition to, face mask and hair mask. Sherif was a real friendly and professional guy. I really appreciate him and his work. Thank you sherif." },
  { name: "Faisal Bakhsh", time: "3 months ago", text: "Soufiane did a really good job — very good haircut." },
  { name: "Omar", time: "3 months ago", text: "Suffyan cut my hair perfectly. Will definitely go back again." },
  { name: "Fahad Alalmai", time: "3 months ago", text: "Safwan the barber is soo good, he cut my hair good — I give him 5 stars." },
  { name: "sultan alghamdi", time: "5 months ago", text: "It was an excellent experience. The staff is respectful and helpful. Sayed was my hairstylist and he was great." },
  { name: "Abdulrahman Aljehani", time: "3 months ago", text: "Soufyan is really skillful and served us in an amazing manner — I really appreciate such a good treat!" },
  { name: "Hamza Alzaini", time: "3 months ago", text: "Very nice and good. I would like to thank my barber Sufyan — he is the best!" },
  { name: "Khalid Salman", time: "3 months ago", text: "Safwan is really good with cutting hair and I am one of his customers. He is very kind and helpful." },
  { name: "Youssif Abdellatif", time: "3 months ago", text: "Really nice place. Soufiane cut my hair and as always it turned out very good. Highly recommend visiting." },
  { name: "Rami Louai", time: "3 months ago", text: "Soufiane cut my hair and tbh I never felt more confident before — the place is really good. Highly recommended." },
  { name: "Dawood", time: "3 months ago", text: "Amazing service and very happy with my haircut. Sufyan is a very skilled and professional barber. Would definitely go again and definitely recommend!" },
  { name: "Mahmoud Alrifaiey", time: "4 months ago", text: "Recently visited this place and had a great experience. Special thanks to Sofyan — he's one of the best barbers, very professional, and always takes great care of his customers. Highly recommended!" },
  { name: "Amjad bukary", time: "4 months ago", text: "Sofyan is the best barber in Saudi. Very clean and professional barber shop. Hundred percent would recommend." },
  { name: "zumst y", time: "4 months ago", text: "Sofian is a really skilled barber who cares about his work and pays attention to the small details. You can tell he takes pride in what he does — highly recommend him." },
  { name: "fofo", time: "3 months ago", text: "Excellent place. My barber is Sofian. He really knows what he is doing — an expert in his field, with nice and gentle hands." },
  { name: "Jamal Abuzeid", time: "3 months ago", text: "Soufiane is a very good barber and has a good attitude." },
  { name: "Abdullah Alhout", time: "10 months ago", text: "I went here twice and one time with my 2 kids. They were lovely with them. Very elegant place, clean and super amazing team working there. I really loved it and wish them all the best." },
  { name: "Yazan Alrifaiey", time: "3 months ago", text: "Sufyan — best barber." },
  { name: "R Perera", time: "6 months ago", text: "Great service 👏" },
  { name: "F 92", time: "11 months ago", text: "Saif, not a mistake." },
  { name: "Ammar Bawedan", time: "a year ago", text: "10/10 👏" },
];

const moroccanBathBenefits = [
  { icon: Droplets, en: { title: "Deep Exfoliation", desc: "Removes weeks of built-up dead skin in a single session, revealing fresh, healthy skin beneath." }, ar: { title: "تقشير عميق", desc: "يشيل تراكم الجلد الميت من أسابيع بجلسة وحدة، ويطلّع بشرة جديدة وصحية." } },
  { icon: Sparkles, en: { title: "Clearer Pores", desc: "Steam and black soap unclog pores, helping prevent breakouts and ingrown hairs for smoother skin." }, ar: { title: "مسام نضيفة", desc: "البخار والصابون البلدي يفتحون المسام، ويساعدون يمنعون الحبوب والشعر الناشب — بشرة أنعم." } },
  { icon: Sun, en: { title: "Brighter, Softer Skin", desc: "Fresh skin improves tone, texture, and product absorption — your skincare works better afterward." }, ar: { title: "بشرة أنعم وأكثر إشراق", desc: "البشرة المتجدّدة تحسّن اللون والملمس وامتصاص المنتجات — كل عناية بعدها تبيّن أحلى." } },
  { icon: Heart, en: { title: "Improved Circulation", desc: "Heat and massage stimulate blood flow and lymphatic drainage, reducing puffiness and fatigue." }, ar: { title: "تنشيط الدورة الدموية", desc: "الحرارة والمساج ينشّطون الدورة الدموية ويقللون الانتفاخ والتعب." } },
  { icon: Wind, en: { title: "Relaxation & Stress Relief", desc: "The slow, sensory pacing of the ritual quiets the nervous system and melts away tension." }, ar: { title: "استرخاء وراحة من الضغط", desc: "الجو الهادئ في الجلسة يهدّي الأعصاب ويفك التكتيف اللي عليك." } },
  { icon: ShieldCheck, en: { title: "Better Grooming Results", desc: "Polished skin makes haircuts, beard care, and daily skincare visibly more effective." }, ar: { title: "نتائج عناية أحسن", desc: "البشرة النضيفة تخلي القصّة والعناية باللحية والروتين اليومي يبيّنون أحلى." } },
];

const team = [
  { name: { en: "Rasheed 🇲🇦", ar: "رشيد 🇲🇦" }, role: { en: "Moroccan Bath · Manicure · Pedicure — Moroccan", ar: "الحمام المغربي · المانيكير · الباديكير — مغربي أصيل" } },
  { name: { en: "Hamza", ar: "حمزة" }, role: { en: "Barber & Stylist", ar: "حلاق ومصفّف" } },
  { name: { en: "Sayed", ar: "سيد" }, role: { en: "Barber & Stylist", ar: "حلاق ومصفّف" } },
  { name: { en: "Soufyan", ar: "سفيان" }, role: { en: "Barber & Stylist", ar: "حلاق ومصفّف" } },
  { name: { en: "Yassine", ar: "ياسين" }, role: { en: "Barber & Stylist · Perm · Braids", ar: "حلاق ومصفّف · كيرلي · ضفاير" } },
];

function MoroccanBathBenefits({ globalLang }: { globalLang: Lang }) {
  const B = t[globalLang].moroccanBath;

  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="mb-16 max-w-2xl">
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{B.tag}</p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">{B.h}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{B.p}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {moroccanBathBenefits.map(({ icon: Icon, ...b }) => (
          <div key={b.en.title} className="bg-background p-10 group hover:bg-card transition-colors">
            <Icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.2} />
            <h3 className="font-serif text-xl mb-3">{b[globalLang].title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{b[globalLang].desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/moroccan-bath" className="inline-block text-xs tracking-[0.25em] uppercase text-primary hover:underline">
          {B.link}
        </Link>
      </div>
    </section>
  );
}

function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const L = t[lang];
  const toggle = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <div dir={L.dir} className="min-h-screen bg-background text-foreground font-sans">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="text-primary tracking-[0.3em] text-xs uppercase">Excellence</span>
            <span className="text-foreground tracking-[0.3em] text-xs uppercase">Zone</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-primary transition">{L.nav.services}</a>
            <a href="#reviews" className="hover:text-primary transition">{L.nav.reviews}</a>
            <a href="#about" className="hover:text-primary transition">{L.nav.about}</a>
            <a href="#contact" className="hover:text-primary transition">{L.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={toggle} aria-label="Toggle language" className="flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition">
              <Languages className="w-4 h-4" strokeWidth={1.5} />
              <span className={lang === "ar" ? "text-primary" : "text-muted-foreground"}>ع</span>
              <span className="text-muted-foreground/40">|</span>
              <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
            </button>
            <a href="#contact" className="text-xs tracking-[0.25em] uppercase border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition">{L.nav.book}</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg.url} alt="Excellence Zone Salon interior" width={1920} height={1080} fetchPriority="high" decoding="async" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-12 gap-12 items-end w-full">
          <div className="lg:col-span-8">
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">{L.hero.tag}</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              {L.hero.h1a} <em className="not-italic" style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{L.hero.h1b}</em> {L.hero.h1c}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">{L.hero.sub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.25em] uppercase hover:opacity-90 transition" style={{ boxShadow: "var(--shadow-luxe)" }}>{L.hero.cta1}</a>
              <a href="#services" className="border border-border text-foreground px-8 py-4 text-sm tracking-[0.25em] uppercase hover:border-primary hover:text-primary transition">{L.hero.cta2}</a>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 text-sm">
            <div className={`${L.dir === "rtl" ? "border-r-2 pr-4" : "border-l-2 pl-4"} border-primary`}>
              <p className="text-3xl font-serif text-primary">10+</p>
              <p className="text-muted-foreground tracking-widest text-xs uppercase mt-1">{L.hero.stat1}</p>
            </div>
            <div className={`${L.dir === "rtl" ? "border-r-2 pr-4" : "border-l-2 pl-4"} border-primary`}>
              <p className="text-3xl font-serif text-primary">4.9★</p>
              <p className="text-muted-foreground tracking-widest text-xs uppercase mt-1">{L.hero.stat2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section id="about" className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{L.about.tag}</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">{L.about.h}</h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">{L.about.p}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{L.services.tag}</p>
            <h2 className="font-serif text-4xl md:text-5xl">{L.services.h}</h2>
          </div>
          <p className="max-w-md text-muted-foreground">{L.services.p}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {servicesData.map(({ icon: Icon, ...s }) => {
            const link = s[lang].link;
            const Wrapper = link ? Link : "div";
            const wrapperProps = link ? { to: link, className: "block bg-background p-10 group hover:bg-card transition-colors cursor-pointer" } : { className: "bg-background p-10 group hover:bg-card transition-colors" };
            return (
              <Wrapper key={s.en.title} {...wrapperProps}>
                <Icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.2} />
                <h3 className="font-serif text-2xl mb-3">{s[lang].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{s[lang].desc}</p>
                <div className="mt-4 flex items-center gap-3 text-xs tracking-widest uppercase text-primary/80">
                  <span className="inline-flex items-center gap-2"><Clock className="w-3.5 h-3.5" strokeWidth={1.5} />{s[lang].duration}</span>
                  {s.price != null && (
                    <span className="text-primary">{lang === "ar" ? `${s.price} ر.س` : `${s.price} SAR`}</span>
                  )}
                </div>
                {link && (
                  <span className="mt-3 inline-block text-xs tracking-[0.25em] uppercase text-primary hover:underline">
                    Learn more →
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="max-w-7xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-2xl">
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{L.team.tag}</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">{L.team.h}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{L.team.p}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {team.map((m) => (
            <div key={m.name.en} className="bg-background p-10 hover:bg-card transition-colors">
              <p className="text-primary/40 font-serif text-5xl leading-none mb-6">
                {m.name[lang].charAt(0)}
              </p>
              <h3 className="font-serif text-2xl mb-2">{m.name[lang]}</h3>
              <p className="text-muted-foreground text-sm tracking-wide">{m.role[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MOROCCAN BATH BENEFITS */}
      <MoroccanBathBenefits globalLang={lang} />

      {/* CONTACT */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{L.contact.tag}</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">{L.contact.h}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">{L.contact.p}</p>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4"><MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" /><a href="https://maps.app.goo.gl/HSnRzyGAuKgQNWkNA" target="_blank" rel="noreferrer" className="hover:text-primary transition">{L.contact.maps}</a></li>
              <li className="flex items-start gap-4"><Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" /><a href="tel:+966599676709" dir="ltr" className="hover:text-primary transition">+966 59 967 6709</a></li>
              <li className="flex items-start gap-4"><Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" /><div><div>{L.contact.hours}</div><div>{L.contact.hoursFri}</div></div></li>

            </ul>
          </div>
          <BookingForm lang={lang} />

        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-7xl mx-auto px-6 py-28">
        <div className="mb-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{L.reviews.tag}</p>
            <h2 className="font-serif text-4xl md:text-5xl">{L.reviews.h}</h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" strokeWidth={0} />)}
            </div>
            <span className="tracking-widest uppercase text-xs">{L.reviews.rating}</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {reviews.map((r) => (
            <article key={r.name + r.text.slice(0, 20)} className="bg-background p-8 flex flex-col gap-4 hover:bg-card transition-colors">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary" strokeWidth={0} />)}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 flex-1" dir="ltr">"{r.text}"</p>
              <div className="pt-4 border-t border-border">
                <p className="font-serif text-base" dir="ltr">{r.name}</p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{r.time}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground tracking-widest uppercase">
          <p>© {new Date().getFullYear()} {L.footer.rights}</p>
          <p>{L.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
