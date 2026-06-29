import { createFileRoute, Link } from "@tanstack/react-router";
import { Scissors, Sparkles, Hand, Flower2, Waves, Clock, MapPin, Phone, Star, Languages, Droplets, Sun, Heart, Wind, ShieldCheck, Gift } from "lucide-react";
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

const toArDigits = (s: string | number) => String(s).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

const servicesData: Array<{
  icon: any;
  price?: number;
  priceLabel?: { en: string; ar: string };
  en: { title: string; desc: string; duration: string; link?: string };
  ar: { title: string; desc: string; duration: string; link?: string };
}> = [
  { icon: Scissors, price: 30, en: { title: "Haircut & Styling", desc: "Precision cuts and refined styling shaped by expert barbers using the latest tools and techniques.", duration: "40 min" }, ar: { title: "قص وتصفيف الشعر", desc: "قصّات مظبوطة وتصفيف على الذوق على يد حلاقين خبرة، بأحدث الأدوات.", duration: "٤٠ دقيقة" } },
  { icon: Star, price: 25, en: { title: "Beard Trimming", desc: "Sharp line-ups, hot-towel shaves, and beard sculpting tailored to your face shape.", duration: "30 min" }, ar: { title: "تشذيب اللحية", desc: "تشذيب اللحية وتفصيل على شكل وجهك.", duration: "٣٠ دقيقة" } },
  { icon: Scissors, price: 55, en: { title: "Haircut & Beard", desc: "The full grooming package — a fresh cut paired with a sharp beard shape-up and shave.", duration: "1 hour" }, ar: { title: "قص الشعر واللحية", desc: "الباقة الكاملة — قصّة شعر نظيفة مع تشذيب اللحية وحلاقة مرتبة.", duration: "ساعة" } },
  { icon: Sparkles, price: 100, en: { title: "Haircut, Beard & Facial Care", desc: "Full grooming session — haircut, beard shaping, and a refreshing facial & skin care treatment.", duration: "90 min" }, ar: { title: "قص وتشذيب وعناية بالبشرة", desc: "جلسة عناية كاملة — قصّة شعر، تشذيب لحية، وجلسة عناية بالوجه والبشرة.", duration: "٩٠ دقيقة" } },
  { icon: Sparkles, priceLabel: { en: "220–330 SAR", ar: "٢٢٠–٣٣٠ ر.س" }, en: { title: "Braids", desc: "Stylish braiding tailored to your hair length and look — clean, neat, and long-lasting.", duration: "1 hour" }, ar: { title: "ضفاير", desc: "ضفاير مرتبة على ذوقك، تناسب طول شعرك وستايلك — نضيفة وتدوم.", duration: "ساعة" } },
  { icon: Sparkles, priceLabel: { en: "200–310 SAR", ar: "٢٠٠–٣١٠ ر.س" }, en: { title: "Perm — Long Lasting", desc: "A long-lasting perm treatment that gives your hair lasting texture and shape.", duration: "75 min" }, ar: { title: "كيرلي دائم", desc: "جلسة كيرلي تدوم طويلاً، تمنح الشعر ملمساً وشكلاً يبقى معاك.", duration: "٧٥ دقيقة" } },
  { icon: Sparkles, price: 100, en: { title: "Perm — Classic", desc: "A classic perm treatment to add volume and soft waves to your hair.", duration: "25 min" }, ar: { title: "كيرلي كلاسيك", desc: "كيرلي كلاسيكي يضيف كثافة وموجات ناعمة للشعر.", duration: "٢٥ دقيقة" } },
  { icon: Flower2, price: 150, en: { title: "Moroccan Bath — Classic", desc: "A deeply cleansing body ritual using authentic black soap and kessa exfoliation.", duration: "35 min", link: "/moroccan-bath" }, ar: { title: "الحمام المغربي — كلاسيك", desc: "جلسة تنظيف عميق للجسم بالصابون البلدي الأصلي وتقشير الكيسة.", duration: "٣٥ دقيقة", link: "/moroccan-bath" } },
  { icon: Flower2, price: 250, en: { title: "Moroccan Bath — King", desc: "The full royal Hammam experience — extended exfoliation, relaxation, and care.", duration: "1 hour", link: "/moroccan-bath" }, ar: { title: "الحمام المغربي — ملكي", desc: "تجربة الحمام الملكي الكاملة — استرخاء وعناية بطريقة ملكية.", duration: "ساعة", link: "/moroccan-bath" } },
  { icon: Waves, price: 150, en: { title: "Massage — Classic", desc: "Specialized techniques to stimulate circulation, relieve tension, and restore radiance.", duration: "40 min" }, ar: { title: "مساج — كلاسيك", desc: "تقنيات متخصصة تنشّط الدورة الدموية وترجّع نشاطك.", duration: "٤٠ دقيقة" } },
  { icon: Waves, price: 180, en: { title: "Massage — King", desc: "An extended, deeply restorative massage session for full-body relaxation and renewal.", duration: "1 hour" }, ar: { title: "مساج — ملكي", desc: "جلسة مساج ممتدة وعميقة للاسترخاء الكامل وتجديد حيوية الجسم.", duration: "ساعة" } },
  { icon: Hand, priceLabel: { en: "70–90 SAR", ar: "٧٠–٩٠ ر.س" }, en: { title: "Manicure", desc: "Meticulous hand care with attention to nail health, cuticles, and a clean finish.", duration: "30 min" }, ar: { title: "مانيكير", desc: "عناية دقيقة باليدين — صحة الأظافر، الجلد الزائد، ولمسة نهائية نضيفة.", duration: "٣٠ دقيقة" } },
  { icon: Hand, price: 100, en: { title: "Pedicure", desc: "Thorough foot care including exfoliation, nail grooming, and skin health.", duration: "30 min" }, ar: { title: "باديكير", desc: "عناية شاملة بالقدمين — تقشير، ترتيب الأظافر، وصحة البشرة.", duration: "٣٠ دقيقة" } },
  { icon: Hand, price: 150, en: { title: "Manicure & Pedicure", desc: "Complete hand and foot care in one session — nails, skin, and a polished finish.", duration: "1 hour" }, ar: { title: "مانيكير وباديكير", desc: "عناية كاملة باليدين والقدمين في جلسة واحدة — أظافر، بشرة، ولمعة نهائية.", duration: "ساعة" } },
  { icon: Sparkles, price: 50, en: { title: "Facial & Skin Care", desc: "Tailored facial treatments to keep skin fresh, balanced, and radiant.", duration: "30 min" }, ar: { title: "العناية بالوجه والبشرة", desc: "جلسات وجه مخصّصة لك، تخلي بشرتك منتعشة ومتوازنة ومشرقة.", duration: "٣٠ دقيقة" } },
];

// Phone numbers for booking notifications
const OWNER_BOOKING_PHONE = "966599676709";
const WORKER_PHONES: Record<string, string> = {
  "Rasheed": "966538660714",
  "Ali": "966538660714",
  
  "Sayed": "966559504681",
  "Hamza": "966504278509",
  "Saber": "966573567941",
};

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
    contact: { tag: "Visit Us", h: "Book your moment of excellence.", p: "Walk-ins welcome. Reservations recommended for the full signature experience.", maps: "Find us on Google Maps", hours: "Sat–Thu · 10:00 AM — 02:00 AM", hoursFri: "Fri · 02:30 PM — 02:00 AM" },
    form: { title: "Request an Appointment", name: "Full name", phone: "Phone", selectService: "Select a service", selectWorker: "Preferred specialist", notes: "Notes (optional)", submit: "Send Request", greeting: "Hello, I would like to book an appointment at Excellence Zone Salon.", lName: "Name", lPhone: "Phone", lService: "Service", lWorker: "Specialist", lDate: "Date/Time", lNotes: "Notes" },
    moroccanBath: { tag: "Signature Ritual", h: "Benefits of a Moroccan Bath", p: "More than a cleanse — the Hammam is a full-body renewal that leaves your skin smoother, your mind calmer, and your grooming routine more effective.", link: "Explore the full ritual →" },
    reviews: { tag: "Guest Words", h: "Loved by our clients", rating: "4.9 · 217 Google reviews" },
    offer: { tag: "Loyalty Reward", title: "Your 5th visit is on us", desc: "Book the same service 4 times and the 5th is free — excludes all hair & beard services." },
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
    about: { tag: "فكرتنا", h: "مكان مخصص لكل ضيف يبغى الأحسن.", p: "في صالون منطقة التميز نهتم بأدق التفاصيل — من أول ما تطّل علينا لين تشوف نفسك بالمراية — عشان نطلّعك بتجربة مرتبة تجمع الفخامة والراحة. مستوانا ثابت، وراحتك هي الأهم عندنا." },
    services: { tag: "قائمة الخدمات", h: "خدماتنا المميزة", p: "كل خدمة نقدّمها بأدوات دقيقة ومنتجات فاخرة، وبراحة تستاهلها من غير استعجال." },
    gallery: { tag: "المكان", h: "من داخل منطقة التميز" },
    team: { tag: "الفريق", h: "تعرّف على فريقنا", p: "فريق متخصص من الحلاقين والمعالجين، كل واحد محترف في شغله." },
    contact: { tag: "زورونا", h: "احجز لك لحظة تميّز.", p: "تقدر تجي من غير موعد، بس يفضّل تحجز عشان تاخذ راحتك الكاملة.", maps: "موقعنا على قوقل ماب", hours: "السبت–الخميس · 10:00 صباحاً — 02:00 صباحاً", hoursFri: "الجمعة · 02:30 مساءً — 02:00 صباحاً" },
    form: { title: "اطلب موعد", name: "الاسم الكامل", phone: "رقم الجوال", selectService: "اختر الخدمة", selectWorker: "المختص المفضل", notes: "ملاحظات (اختياري)", submit: "إرسال الطلب", greeting: "السلام عليكم ورحمة الله وبركاته،\nأرغب في حجز موعد لدى صالون منطقة التميّز.", lName: "الاسم", lPhone: "رقم الجوال", lService: "الخدمة المطلوبة", lWorker: "المختص المفضّل", lDate: "التاريخ والوقت", lNotes: "ملاحظات إضافية" },
    moroccanBath: { tag: "طقس مميز", h: "فوائد الحمام المغربي", p: "أكثر من مجرد استحمام — الحمام المغربي يجدّد جسمك من راسك لرجلك، بشرتك تطلع أنعم، بالك يرتاح، وكل عناية بعدها تبيّن أحلى.", link: "شوف الطقس كامل ←" },
    reviews: { tag: "كلام الزباين", h: "زباينّا يحبّونا", rating: "4.9 · 217 تقييم على قوقل" },
    offer: { tag: "مكافأة الولاء", title: "الزيارة الخامسة علينا", desc: "احجز نفس الخدمة 4 مرات والخامسة مجاناً — باستثناء جميع خدمات الشعر واللحية." },
    footer: { rights: "منطقة التميز", tagline: "بصنعة وذوق · للعناية بالرجال" },
  },
};

const bookingServices: Record<Lang, { value: string; duration: number; comingSoon?: boolean }[]> = {
  en: [
    { value: "Haircut & Styling", duration: 40 },
    { value: "Beard Trimming", duration: 30 },
    { value: "Haircut & Beard", duration: 60 },
    { value: "Haircut, Beard & Facial Care", duration: 90 },
    { value: "Braids", duration: 60, comingSoon: true },
    { value: "Perm — Long Lasting", duration: 75, comingSoon: true },
    { value: "Perm — Classic", duration: 25, comingSoon: true },
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
    { value: "قص وتشذيب وعناية بالبشرة", duration: 90 },
    { value: "ضفاير", duration: 60, comingSoon: true },
    { value: "كيرلي دائم", duration: 75, comingSoon: true },
    { value: "كيرلي كلاسيك", duration: 25, comingSoon: true },
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
  "Haircut & Styling": ["Hamza", "Sayed", "Saber"],
  "Beard Trimming": ["Hamza", "Sayed", "Saber"],
  "Haircut & Beard": ["Hamza", "Sayed", "Saber"],
  "Haircut, Beard & Facial Care": ["Hamza", "Sayed", "Saber"],
  "Braids": ["Hamza", "Sayed", "Saber"],
  "Perm — Long Lasting": ["Hamza", "Sayed", "Saber"],
  "Perm — Classic": ["Hamza", "Sayed", "Saber"],
  "Moroccan Bath — Classic": ["Rasheed"],
  "Moroccan Bath — King": ["Rasheed"],
  "Massage — Classic": ["Ali"],
  "Massage — King": ["Ali"],
  "Manicure": ["Rasheed"],
  "Pedicure": ["Rasheed"],
  "Facial & Skin Care": ["Rasheed"],
};

// Shop hours: 10:00 → 02:00 next day (16 hours). Slots step by the service duration.
const OPEN_MIN = 10 * 60;
const CLOSE_MIN = OPEN_MIN + 16 * 60;

// Per-worker working hours (minutes from local midnight; end may exceed 24*60).
// Closed Fridays for all workers.
const WORKER_HOURS: Record<string, { start: number; end: number }> = {
  Hamza:   { start: 10 * 60,      end: 21 * 60 },
  Sayed:   { start: 12 * 60,      end: 23 * 60 },
  Saber:   { start: 15 * 60,      end: 26 * 60 },
  Rasheed: { start: 14 * 60,      end: 26 * 60 },
  Ali:     { start: 14 * 60,      end: 24 * 60 },
  
};

function slotStartMin(slotHHMM: string): number {
  const [h, m] = slotHHMM.split(":").map(Number);
  return h * 60 + m;
}

// Absolute minutes from the start of the session day. Wrapped overnight slots
// (e.g. "01:00" meaning the next-day early-morning session) get +24h.
function slotAbsMin(slotHHMM: string): number {
  const s = slotStartMin(slotHHMM);
  return s < OPEN_MIN ? s + 24 * 60 : s;
}

const FRIDAY_OPEN = 14 * 60 + 30; // Fridays open at 14:30 (2:30 PM)

function workerCoversSlot(workerEn: string, slotHHMM: string, duration: number, friday = false): boolean {
  const s = slotAbsMin(slotHHMM);
  if (friday) {
    if (!(workerEn in WORKER_HOURS)) return false;
    return s >= FRIDAY_OPEN && s + duration <= CLOSE_MIN;
  }
  const wh = WORKER_HOURS[workerEn];
  if (!wh) return false;
  return s >= wh.start && s + duration <= wh.end;
}

// "Now" in Saudi local time, expressed as minutes from midnight on `dateStr`.
// Returns null when `dateStr` is in the future (no past-filtering needed).
function saudiNowMinutesForDate(dateStr: string): number | null {
  if (!dateStr) return null;
  const today = saudiTodayISO();
  if (dateStr !== today) {
    return dateStr < today ? Number.POSITIVE_INFINITY : null;
  }
  const now = new Date();
  const saudi = new Date(now.getTime() + SAUDI_OFFSET_MIN * 60_000);
  return saudi.getUTCHours() * 60 + saudi.getUTCMinutes();
}

function buildSlots(duration: number, friday = false): string[] {
  if (!duration) return [];
  const slots: string[] = [];
  const startMin = friday ? FRIDAY_OPEN : OPEN_MIN;
  const lastStart = CLOSE_MIN - duration;
  for (let m = startMin; m <= lastStart; m += duration) {
    const h = Math.floor(m / 60) % 24;
    const mm = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}


// Saudi Arabia is UTC+3, no DST. All booking date/time inputs are interpreted
// as Saudi local time so client and server agree regardless of the visitor's
// browser timezone.
const SAUDI_OFFSET_MIN = 3 * 60;

// Build a UTC Date representing the given Saudi-local Y-M-D hh:mm.
function saudiLocalToUTC(Y: number, M: number, D: number, hh: number, mm: number): Date {
  return new Date(Date.UTC(Y, M - 1, D, hh, mm) - SAUDI_OFFSET_MIN * 60_000);
}

// Today's date in Saudi local time, formatted YYYY-MM-DD.
function saudiTodayISO(): string {
  const now = new Date();
  const saudi = new Date(now.getTime() + SAUDI_OFFSET_MIN * 60_000);
  return saudi.toISOString().slice(0, 10);
}

function isFriday(dateStr: string): boolean {
  if (!dateStr) return false;
  const [Y, M, D] = dateStr.split("-").map(Number);
  // Use UTC weekday to avoid being shifted by the browser's local timezone.
  return new Date(Date.UTC(Y, M - 1, D)).getUTCDay() === 5;
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
  // Map localized worker name → English name (for hours lookup and server payload).
  const nameToEn: Record<string, string> = {};
  const enToName: Record<string, string> = {};
  for (const m of availableTeam) {
    nameToEn[m.name[lang]] = m.name.en;
    enToName[m.name.en] = m.name[lang];
  }
  const workerNames = availableTeam.map((m) => m.name[lang]);
  const toEnList = (names: string[]) => names.map((n) => nameToEn[n] ?? n);
  const duration = selectedService?.duration ?? 0;
  const isFridayDate = date ? isFriday(date) : false;
  const slots = buildSlots(duration, isFridayDate);

  // A worker can work this slot if their hours cover [start, start+duration].
  const workersCoveringSlot = (slotHHMM: string): string[] =>
    workerNames.filter((n) => {
      const en = nameToEn[n];
      return en ? workerCoversSlot(en, slotHHMM, duration, isFridayDate) : false;
    });

  // Block slots whose start time has already passed in Saudi local time.
  const nowMin = saudiNowMinutesForDate(date);
  const isPastSlot = (slotHHMM: string) =>
    nowMin !== null && slotAbsMin(slotHHMM) <= nowMin;

  // Hide slots when no eligible worker is on duty, when the preferred worker is
  // off-duty for that slot, or the slot is in the past.
  const visibleSlots = slots.filter((s) => {
    if (isPastSlot(s)) return false;
    const covering = workersCoveringSlot(s);
    if (covering.length === 0) return false;
    if (preferredWorker && !covering.includes(preferredWorker)) return false;
    return true;
  });

  // Workers to query/insert against. With "Any available" we restrict to workers
  // actually on duty for the chosen slot. With a preferred worker we send only them.
  const orderedWorkerNames = (() => {
    if (!time) return preferredWorker ? [preferredWorker] : workerNames;
    const covering = workersCoveringSlot(time);
    if (preferredWorker) {
      return covering.includes(preferredWorker) ? [preferredWorker] : [];
    }
    return covering;
  })();

  const slotTimes = (slotHHMM: string) => {
    if (!date || !selectedService) return null;
    const [hh, mm] = slotHHMM.split(":").map(Number);
    const [Y, M, D] = date.split("-").map(Number);
    // Wrapped overnight slots (00:00–02:00) belong to the NEXT calendar day.
    const dayOffset = slotAbsMin(slotHHMM) >= 24 * 60 ? 1 : 0;
    const start = saudiLocalToUTC(Y, M, D + dayOffset, hh, mm).getTime();
    const end = start + selectedService.duration * 60_000;
    return { start, end };
  };


  const isTaken = (slotHHMM: string) => {
    if (isPastSlot(slotHHMM)) return true;
    const t = slotTimes(slotHHMM);
    if (!t) return false;
    const covering = workersCoveringSlot(slotHHMM);
    if (covering.length === 0) return true;
    // A worker is "available" if on-duty AND has no overlapping booking.
    const busy = new Set<string>();
    for (const b of taken) {
      const bs = new Date(b.startAt).getTime();
      const be = new Date(b.endAt).getTime();
      if (t.start < be && t.end > bs) busy.add(enToName[b.worker] ?? b.worker);
    }
    // If a specific worker is preferred, the slot is taken when THEY are busy/off-duty.
    if (preferredWorker) {
      return !covering.includes(preferredWorker) || busy.has(preferredWorker);
    }
    return covering.every((n) => busy.has(n));
  };

  const refreshTaken = async (workers: string[], d: string) => {
    if (workers.length === 0 || !d) {
      setTaken([]);
      return;
    }
    const [Y, M, D] = d.split("-").map(Number);
    // Query a window in Saudi-local terms so it matches what the server stores.
    const dayStart = saudiLocalToUTC(Y, M, D, 0, 0).toISOString();
    const dayEnd = saudiLocalToUTC(Y, M, D + 2, 0, 0).toISOString();
    try {
      const rows = await fetchTaken({ data: { workers: toEnList(workers), dayStart, dayEnd } });
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
    const localPhone = phone.replace(/\D/g, "").replace(/^0+/, "").replace(/^966/, "");
    if (localPhone.length < 8) {
      toast.error(lang === "ar" ? "رقم الجوال غير صحيح" : "Please enter a valid phone number");
      return;
    }
    const fullPhone = `+966${localPhone}`;
    const t = slotTimes(time);
    if (!t) return;
    setSubmitting(true);
    try {
      const res = await createBookingFn({
        data: {
          service,
          workers: toEnList(orderedWorkerNames),
          startAt: new Date(t.start).toISOString(),
          durationMin: selectedService.duration,
          customerName: name,
          customerPhone: fullPhone,
          notes: notes || null,
        },
      });
      if (!res.ok) {
        if (res.error === "SLOT_TAKEN") {
          toast.error(lang === "ar" ? "هذا الوقت محجوز، اختر وقت ثاني" : "That time was just booked. Please pick another slot.");
          await refreshTaken(workerNames, date);
          setTime("");
        } else if (res.error === "OUTSIDE_HOURS") {
          toast.error(lang === "ar" ? "هذا الوقت خارج دوام المختص، اختر وقتاً آخر" : "That time is outside the specialist's working hours. Please pick another slot.");
          setTime("");
        } else {
          toast.error(res.error);
        }
        return;
      }
      // Always send the WhatsApp message in Arabic, regardless of the UI language.
      const workerAr: Record<string, string> = { Rasheed: "رشيد", Ali: "علي", Hamza: "حمزة", Sayed: "سيد", Saber: "صابر" };
      const serviceAr = serviceIdx >= 0 ? bookingServices.ar[serviceIdx].value : service;
      const [Y, M, D] = date.split("-").map(Number);
      const [hh, mm] = time.split(":").map(Number);
      const periodAr = hh >= 12 && hh < 24 ? "مساءً" : "صباحاً";
      const periodEn = hh >= 12 && hh < 24 ? "PM" : "AM";
      const h12 = hh % 12 === 0 ? 12 : hh % 12;
      const datetimeAr = `${String(D).padStart(2, "0")}-${String(M).padStart(2, "0")}-${Y} الساعة ${h12}:${String(mm).padStart(2, "0")} ${periodAr}`;
      const datetimeEn = `${String(D).padStart(2, "0")}-${String(M).padStart(2, "0")}-${Y} at ${h12}:${String(mm).padStart(2, "0")} ${periodEn}`;
      const freeAr = res.isFree ? " — مجاناً 🎁 (الحجز الخامس)" : "";
      const freeEn = res.isFree ? " — Free 🎁 (5th booking)" : "";
      const lines = [
        "--- Arabic / العربية ---",
        "أرغب بحجز موعد في صالون منطقة التميز.",
        `الاسم: ${name}`,
        `رقم الجوال: ${fullPhone}`,
        `الخدمة: ${serviceAr}${freeAr}`,
        `الأخصائي: ${res.worker ? (workerAr[res.worker] ?? res.worker) : ""}`,
        `التاريخ والوقت: ${datetimeAr}`,
        notes ? `ملاحظات: ${notes}` : "",
        "",
        "--- English / الإنجليزية ---",
        "I would like to book an appointment at Excellence Zone Salon.",
        `Name: ${name}`,
        `Phone: ${fullPhone}`,
        `Service: ${service}${freeEn}`,
        `Specialist: ${res.worker ?? ""}`,
        `Date & Time: ${datetimeEn}`,
        notes ? `Notes: ${notes}` : "",
      ].filter(Boolean);
      const text = encodeURIComponent(lines.join("\n"));
      const specialistPhone = res.worker ? WORKER_PHONES[res.worker] : undefined;
      // Send the booking message only to the specialist's WhatsApp.
      if (specialistPhone) {
        window.location.href = `https://wa.me/${specialistPhone}?text=${text}`;
      }
      toast.success(lang === "ar" ? "تم تأكيد الحجز" : "Booking confirmed");
    } finally {
      setSubmitting(false);
    }
  };


  const timePlaceholder = lang === "ar"
    ? (!service ? "اختر الخدمة أولاً" : !date ? "اختر التاريخ أولاً" : visibleSlots.length === 0 ? "لا يوجد وقت متاح في هذا اليوم" : "اختر الوقت")
    : (!service ? "Select a service first" : !date ? "Select a date first" : visibleSlots.length === 0 ? "No times available this day" : "Select time");

  const takenLabel = lang === "ar" ? "محجوز" : "Taken";
  const timeDisabled = !service || !date;
  const today = saudiTodayISO();

  return (
    <form className="bg-card border border-border p-10 space-y-6" onSubmit={handleSubmit} aria-label={tr.title}>
      <h3 className="font-serif text-2xl">{tr.title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <input aria-label={tr.name} value={name} onChange={(e) => setName(e.target.value)} className="bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" placeholder={tr.name} required />
        <div className="flex items-stretch bg-background border border-border focus-within:border-primary" dir="ltr">
          <span className="px-3 flex items-center text-sm text-muted-foreground border-r border-border select-none">+966</span>
          <input
            aria-label={tr.phone}
            value={phone}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "");
              if (v.startsWith("966")) v = v.slice(3);
              if (v.startsWith("0")) v = v.replace(/^0+/, "");
              setPhone(v.slice(0, 9));
            }}
            inputMode="numeric"
            type="tel"
            maxLength={9}
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            placeholder={lang === "ar" ? "5XXXXXXXX" : "5XXXXXXXX"}
            required
          />
        </div>
      </div>
      <select aria-label={tr.selectService} value={service} onChange={(e) => handleServiceChange(e.target.value)} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" required>
        <option value="">{tr.selectService}</option>
        {bookingServices[lang].map((s) => <option key={s.value} value={s.value} disabled={s.comingSoon}>{s.value}{s.comingSoon ? (lang === "ar" ? " (قريباً)" : " (Coming soon)") : ""}</option>)}
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
  { name: { en: "Baraa Abduljawad", ar: "براء عبدالجواد" }, time: { en: "6 days ago", ar: "قبل ٦ أيام" }, text: { en: "Mr. Sayed is one of the best people I've ever had a haircut with. He fears God in his work, has great manners, and truly understands what the client wants. All of you, go to Sayed.", ar: "الاستاذ سيد من احسن الناس الي حلقت عندهم ويراعي الله في شغله و خلوق و انسان فاهم العميل ايش يبغا بالربط، كلكم روحو لسيد" } },
  { name: { en: "F H", ar: "F H" }, time: { en: "1 week ago", ar: "قبل أسبوع" }, text: { en: "Mashallah, tabarakallah — the massage, the Moroccan bath, and the haircut are unmatched. Honestly, they were brilliant in their work. Thank you Excellence Zone.", ar: "مشاء الله تبارك الله المساج و الحمام المغربي و الحلاقة لا يعلا عليه صراحتا ابدعوو في شغلهم شكرا منطقة التميز" } },
  { name: { en: "R Hassan", ar: "ر. حسن" }, time: { en: "3 weeks ago", ar: "قبل ٣ أسابيع" }, text: { en: "Brother Rasheed didn't fall short — top-notch service and great manners.", ar: "الأخ رشيد ماقصر، خدمة عالية و أخلاق عالية" } },
  { name: { en: "Atef Kintab", ar: "عاطف قنطاب" }, time: { en: "3 weeks ago", ar: "قبل ٣ أسابيع" }, text: { en: "The best Moroccan bath you can have is with Rasheed. Mashallah, his work is tidy and very clean.", ar: "افضل حمام مغربي ممكن تسويه عند رشيد، ما شاء الله شغل مرتب ونظيف جداً" } },
  { name: { en: "Al-Tayeb Abdelwahab Al-Ghamdi", ar: "الطيب عبدالوهاب الغامدي" }, time: { en: "1 month ago", ar: "قبل شهر" }, text: { en: "Mashallah, tabarakallah — the service and treatment are very respectable, and the massage is wonderful. It was an amazing experience and one that must be repeated 🤍🫶🏻", ar: "ماشاء الله تبارك الله الخدمه والتعامل شي محترم والمساج جدا جميل كانت تجربة رائعه ولازم تتكرر 🤍🫶🏻" } },
  { name: { en: "Lord Kh", ar: "Lord Kh" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "I thank brother Rasheed — his manner is very classy and his work is clean and tidy.", ar: "اشكر الاخ رشيد اسلوبه راقي جدًا وشغله نظيف ومرتب" } },
  { name: { en: "Faisal Marghalani", ar: "فيصل مرغلاني" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "The best salon in Jeddah. Rasheed for the Moroccan bath and Sayed the barber are excellent — I highly recommend them 👍🏼", ar: "افضل صالون في جدة. الحمام المغربي رشيد والحلاق سيد ممتازييين جداً، اوصي بيهم وبقوة 👍🏼" } },
  { name: { en: "Marwan Almazrui", ar: "مروان المزروعي" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "The salon is clean and tidy and their services are varied. The staff are friendly. I got my haircut with brother Hamza — light-handed and his work is beautiful. Allah give you wellness.", ar: "الصالون نظيف ومرتب وخدماتهم متنوعه، الموظفين لطيفين فالتعامل قصيت عند الاخ حمزه يده خفيفه وشغله جميل، يعطيكم العافيه" } },
  { name: { en: "Nabeel Masrahi", ar: "نبيل مصرحي" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "Wonderful place and a professional team. Thanks to brother Rasheed for the distinguished service.", ar: "مكان رائع و طاقم محترف، وشكرا للأخ رشيد على الخدمة المميزة" } },
  { name: { en: "Faisal Masrahi", ar: "فيصل مصرحي" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "Thanks to Rasheed and Mohammed — the best Moroccan bath and massage.", ar: "شكرا لرشيد ومحمد، افضل حمام مغربي ومساج" } },
  { name: { en: "Aziz Ash", ar: "عزيز" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "A distinguished experience. Thanks Rasheed for your creativity and classy treatment. And thanks Mohammed.", ar: "تجربة مميزة ، شكرا رشيد على إبداعك و تعاملك الراقي. و شكرا محمد" } },
  { name: { en: "Ibrahim Alzhrani", ar: "إبراهيم الزهراني" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "Honestly, the best men's grooming salon in Jeddah. Mr. Rasheed is number one in Moroccan bath and the best. Many thanks to you — services and cleanliness, everything is top-level 🥇", ar: "للامانه افضل صالون عناية بالرجال في جدة الاستاذ راشد الاول في الحمام المغربي والأفضل اشكركم جزيل الشكر من خدمات ونظافة كلها على مستوى عالي 🥇" } },
  { name: { en: "mohammad aleid", ar: "محمد العيد" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "Wonderful hand and foot pedicure by staff member Rasheed 💯💯", ar: "بدكير يد و ارجل رائع من الموظف رشيد 💯💯" } },
  { name: { en: "abodyng1 Ghandoura", ar: "غندورة" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "Mashallah, a fully integrated place — very clean and staff with sweet spirits. The Moroccan bath is a winner — Allah give brother Bashir wellness, he's a professional. Of course I'll come back without thinking 👏👌👌👌", ar: "ما شاءالله محل متكاملللل الصلاة عالنبي نظييففف جدا و موظفين روحهم عسل و الحمام المغربي يفوزز يعطيه العافية اخ بشير بروفيشنال فيه و طبعا أعيده بدون تفكير 👏👌👌👌" } },
  { name: { en: "Ayman Jr98", ar: "أيمن" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "Five stars without flattery, mashallah. I recommend anyone who wants to change a haircut they're used to — they have a vision and styles that suit you.", ar: "خمسة نجوم بدون مجاملة مشاء الله و انصح اي احد حاب يغير قصة كان متعود عليها ، قصات تناسبك و عندهم نظرة" } },
  { name: { en: "Faris Alhaj", ar: "فارس الحاج" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "Excellent service — the guys are artists, mashallah.", ar: "خدمه ممتازه الشباب فنانين ما شاء الله" } },
  { name: { en: "abdullah alothaimeen", ar: "عبدالله العثيمين" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "The place is very clean and their services are excellent at the highest level — massage, Moroccan bath, pedicure, and haircut. If there were more than five stars I'd give them, especially the barber Hamza.", ar: "المكان جدا نظيف وخدماتهم ممتازه جدا على اعلى مستوى المساج و الحمام المغربي والبدكير والحلاقه لو فيه اكثر من خمسه نجوم أعطيتهم وخصوصا الحلاق حمزه" } },
  { name: { en: "TARIQ QASHLAN", ar: "طارق قشلان" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "Mashallah tabarakallah, the place is very clean and they care about the smallest details. The Moroccan bath is more than wonderful, the massage is very specialized and the work is precise, and the haircut with the artist Hamza is above rating.", ar: "مشاء الله تبارك الله المكان نظيف جدا ويهتمو في ادق التفاصيل الحمام المغربي اكثر من رائع والمساج مختص جدا وشغله متقن و الحلاقه عند الفنان حمزه فوق التقيم" } },
  { name: { en: "Rakan Abdulelah", ar: "راكان عبدالإله" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "I had a hand and foot pedicure and manicure with exfoliation and massage with brother Rasheed — the Moroccan. I thank him for his great service and recommend him.", ar: "عملت بدكير ومانكير يد و قدم مع تقشير ومساج عند الأخ/ رشيد- المغربي ، أشكره على خدمته الجيدة وأنصح به" } },
  { name: { en: "Levent Bilal Yıldırım", ar: "ليفنت بلال يلدرم" }, time: { en: "3 months ago", ar: "قبل ٣ أشهر" }, text: { en: "Excellent work. Special thanks to Mr. Rasheed.", ar: "شغل ممتاز، شكر خاص للاستاذ راشيد" } },
  { name: { en: "Mohammed s", ar: "محمد" }, time: { en: "4 months ago", ar: "قبل ٤ أشهر" }, text: { en: "The service is excellent from everyone. I want to thank Rasheed — distinguished in work and treatment.", ar: "الخدمة جدا ممتاز من الجميع وحابب اشكر رشيد مميز في العمل والتعامل" } },
  { name: { en: "Khalid Alharbi", ar: "خالد الحربي" }, time: { en: "2 weeks ago", ar: "قبل أسبوعين" }, text: { en: "Rasheed is a true professional — the Moroccan bath was incredible and the manicure was perfect. Highly recommended 🌟", ar: "رشيد محترف بكل معنى الكلمة، الحمام المغربي كان رائع والمانيكير ممتاز. أنصح فيه بشدة 🌟" } },
  { name: { en: "Sultan Bakr", ar: "سلطان بكر" }, time: { en: "3 weeks ago", ar: "قبل ٣ أسابيع" }, text: { en: "Brother Rasheed gave me a full Moroccan bath and pedicure session — clean work, gentle treatment, and a quiet, comfortable atmosphere. Thank you 🌿", ar: "الأخ رشيد سوى لي جلسة حمام مغربي وبدكير كاملة، شغل نظيف وتعامل لطيف وجو هادئ ومريح. شكراً 🌿" } },
  { name: { en: "Omar Bahaziq", ar: "عمر باحاذق" }, time: { en: "3 weeks ago", ar: "قبل ٣ أسابيع" }, text: { en: "The massage with Ali was the best I've had in Jeddah. Skilled hands and a very calm atmosphere — felt completely renewed afterwards 🙏", ar: "المساج عند علي افضل مساج جربته في جدة. يد ماهرة وجو هادئ جداً، حسيت بنشاط وراحة كاملة بعدها 🙏" } },
  { name: { en: "Tariq Bin Mahfouz", ar: "طارق بن محفوظ" }, time: { en: "1 month ago", ar: "قبل شهر" }, text: { en: "Ali is excellent at deep tissue massage — he hits the exact tense spots and the pressure is perfectly balanced. I left feeling lighter and relaxed.", ar: "علي ممتاز جداً في المساج العميق، يضبط الضغط على النقاط المشدودة بالظبط. طلعت من الجلسة مرتاح وخفيف." } },
  { name: { en: "Yousef Alamri", ar: "يوسف العامري" }, time: { en: "1 month ago", ar: "قبل شهر" }, text: { en: "Hamza is an artist with the scissors. The cut suited my face perfectly and the finish was clean. The place is also very tidy. 5 stars ⭐⭐⭐⭐⭐", ar: "حمزة فنان بالمقص، القصة جت على وجهي تمام والتشطيب نظيف. المكان كمان مرتب جداً. خمس نجوم ⭐⭐⭐⭐⭐" } },
  { name: { en: "Saad Alghamdi", ar: "سعد الغامدي" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "I've been going to Hamza for months — never let me down. He understands what suits you and his beard work is precise.", ar: "صار لي شهور أحلق عند حمزة، ولا مرة قصّر. يفهم اللي يناسبك وشغله باللحية دقيق جداً." } },
  { name: { en: "Abdullah Alzahrani", ar: "عبدالله الزهراني" }, time: { en: "1 month ago", ar: "قبل شهر" }, text: { en: "Mr. Sayed never disappoints — patient, polite, and listens to exactly what you want before he starts. One of the best barbers in Jeddah.", ar: "الاستاذ سيد ما يخيب الظن، صبور ومؤدب ويسمع شو تبغى قبل ما يبدأ. من احسن الحلاقين في جدة." } },
  { name: { en: "Anas Sindi", ar: "أنس سندي" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "Sayed is the only barber I trust with my hair. Clean fade, sharp lines, and a comfortable chat throughout. Highly recommended 💈", ar: "سيد الحلاق الوحيد اللي أأمنه على شعري. تدريج نظيف وخطوط حادة وتعامل مريح طول الجلسة. أنصح فيه بشدة 💈" } },
  { name: { en: "Majed Alqahtani", ar: "ماجد القحطاني" }, time: { en: "2 months ago", ar: "قبل شهرين" }, text: { en: "Got my haircut with Saber, mashallah — light hands, attentive to detail, and the styling was exactly what I asked for. Will definitely return 👌", ar: "حلقت عند صابر ماشاء الله، يده خفيفة ويهتم بالتفاصيل والتسريحة طلعت بالضبط زي ما طلبت. أكيد راجع له 👌" } },
  { name: { en: "Naif Alotaibi", ar: "نايف العتيبي" }, time: { en: "3 weeks ago", ar: "قبل ٣ أسابيع" }, text: { en: "Saber really cares about the details — perfect lines, neat finish around the ears and neck. Quiet guy, top-tier work 👍", ar: "صابر يهتم بالتفاصيل بشكل واضح، الخطوط مظبوطة والتشطيب حول الأذن والرقبة نظيف. شخص هادئ وشغله من فوق 👍" } },
];

const moroccanBathBenefits = [
  { icon: Droplets, en: { title: "Deep Exfoliation", desc: "Removes weeks of built-up dead skin in a single session, revealing fresh, healthy skin beneath." }, ar: { title: "تقشير عميق", desc: "يشيل تراكم الجلد الميت من أسابيع بجلسة وحدة، ويطلّع بشرة جديدة وصحية." } },
  { icon: Sparkles, en: { title: "Clearer Pores", desc: "Steam and black soap unclog pores, helping prevent breakouts and ingrown hairs for smoother skin." }, ar: { title: "مسام أنظف", desc: "البخار والصابون البلدي يفتحون المسام، ويساعدون يمنعون الحبوب — بشرة أنعم." } },
  { icon: Sun, en: { title: "Brighter, Softer Skin", desc: "Fresh skin improves tone, texture, and product absorption — your skincare works better afterward." }, ar: { title: "بشرة أنعم وأكثر إشراق", desc: "البشرة المتجدّدة تحسّن اللون والملمس وامتصاص المنتجات — كل عناية بعدها تبيّن أحلى." } },
  { icon: Wind, en: { title: "Relaxation & Stress Relief", desc: "The slow, sensory pacing of the ritual quiets the nervous system and melts away tension." }, ar: { title: "استرخاء وراحة من الضغط", desc: "الجو الهادئ في الجلسة يهدّي الأعصاب ويريّحك من ضغط اليوم." } },
  { icon: ShieldCheck, en: { title: "Better Grooming Results", desc: "Polished skin makes haircuts, beard care, and daily skincare visibly more effective." }, ar: { title: "نتائج عناية أحسن", desc: "البشرة النضيفة تخلي القصّة والعناية باللحية والروتين اليومي يبيّنون أحلى." } },
  { icon: Heart, en: { title: "Blood Circulation Stimulation", desc: "Moroccan bath helps stimulate blood circulation through heat and deep exfoliation, promoting better blood flow and leaving the body feeling refreshed and revitalized." }, ar: { title: "تنشيط الدورة الدموية", desc: "يساعد الحمام المغربي على تنشيط الدورة الدموية من خلال الحرارة والتقشير العميق، مما يعزز تدفق الدم ويمنح الجسم شعورًا بالحيوية والانتعاش." } },
];

const team = [
  { name: { en: "Rasheed", ar: "رشيد" }, nationality: { en: "Morocco", ar: "المغرب" }, role: { en: "Moroccan Bath · Manicure · Pedicure — Moroccan", ar: "الحمام المغربي · المانيكير · الباديكير — مغربي أصيل" } },
  { name: { en: "Ali", ar: "علي" }, nationality: { en: "Indonesia", ar: "إندونيسيا" }, role: { en: "Masseuse", ar: "أخصائي مساج" } },
  { name: { en: "Hamza", ar: "حمزة" }, nationality: { en: "Tunisia", ar: "تونس" }, role: { en: "Barber & Stylist", ar: "حلاق ومصفّف" } },
  { name: { en: "Sayed", ar: "سيد" }, nationality: { en: "Egypt", ar: "مصر" }, role: { en: "Barber & Stylist", ar: "حلاق ومصفّف" } },
  
  { name: { en: "Saber", ar: "صابر" }, nationality: { en: "Morocco", ar: "المغرب" }, role: { en: "Barber & Stylist", ar: "حلاق ومصفف" } },
  { name: { en: "Soufyan", ar: "سفيان" }, nationality: { en: "Morocco", ar: "المغرب" }, role: { en: "Barber & Stylist", ar: "حلاق ومصفّف" } },
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
            {lang === "ar" ? (
              <span className="text-primary tracking-[0.3em] text-xs uppercase">منطقة التميز</span>
            ) : (
              <>
                <span className="text-primary tracking-[0.3em] text-xs uppercase">Excellence</span>
                <span className="text-foreground tracking-[0.3em] text-xs uppercase">Zone</span>
              </>
            )}
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

      {/* LOYALTY OFFER */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="border border-primary/30 bg-card p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="shrink-0 w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center">
            <Gift className="w-7 h-7 text-primary" strokeWidth={1.2} />
          </div>
          <div className="flex-1">
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-2">{L.offer.tag}</p>
            <h3 className="font-serif text-2xl md:text-3xl mb-2">{L.offer.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{L.offer.desc}</p>
          </div>
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
                  {s.priceLabel ? (
                    <span className="text-primary">{s.priceLabel[lang]}</span>
                  ) : s.price != null && (
                    <span className="text-primary">{lang === "ar" ? `${toArDigits(s.price)} ر.س` : `${s.price} SAR`}</span>
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
              <h3 className="font-serif text-2xl mb-2 text-primary">{m.name[lang]} <span className="text-base text-primary">({m.nationality[lang]})</span></h3>
              <p className="text-muted-foreground text-sm tracking-wide">{m.role[lang]}</p>
              {"note" in m && m.note ? (
                <p className="mt-2 text-primary text-xs tracking-wide italic">{m.note[lang]}</p>
              ) : null}
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
              <li className="flex items-start gap-4"><MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" /><a href="https://maps.app.goo.gl/kmwYKQGPDSXYTtyy8" target="_blank" rel="noreferrer" className="hover:text-primary transition">{L.contact.maps}</a></li>
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
            <article key={r.name.en + r.text.en.slice(0, 20)} className="bg-background p-8 flex flex-col gap-4 hover:bg-card transition-colors">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary" strokeWidth={0} />)}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 flex-1" dir={lang === "ar" ? "rtl" : "ltr"}>"{r.text[lang]}"</p>
              <div className="pt-4 border-t border-border">
                <p className="font-serif text-base" dir={lang === "ar" ? "rtl" : "ltr"}>{r.name[lang]}</p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{r.time[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground tracking-widest uppercase">
          <p>© {new Date().getFullYear()} {L.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition">{lang === "ar" ? "الخصوصية" : "Privacy"}</Link>
            <p>{L.footer.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
