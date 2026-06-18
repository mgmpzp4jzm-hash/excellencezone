import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ALLOWED_WORKERS = ["Hamza", "Sayed", "Yassine", "Rasheed", "Ali", "Saber"] as const;

const ALLOWED_SERVICES_EN = [
  "Haircut & Styling",
  "Beard Trimming",
  "Haircut & Beard",
  "Haircut, Beard & Facial Care",
  "Braids",
  "Perm — Long Lasting",
  "Perm — Classic",
  "Moroccan Bath — Classic",
  "Moroccan Bath — King",
  "Massage — Classic",
  "Massage — King",
  "Manicure",
  "Pedicure",
  "Facial & Skin Care",
] as const;

const ALLOWED_SERVICES_AR = [
  "قص وتصفيف الشعر",
  "تشذيب اللحية",
  "قص الشعر واللحية",
  "قص وتشذيب وعناية بالبشرة",
  "ضفاير",
  "كيرلي دائم",
  "كيرلي كلاسيك",
  "الحمام المغربي — كلاسيك",
  "الحمام المغربي — ملكي",
  "مساج — كلاسيك",
  "مساج — ملكي",
  "مانيكير",
  "باديكير",
  "العناية بالوجه والبشرة",
] as const;

const ALLOWED_SERVICES = new Set<string>([...ALLOWED_SERVICES_EN, ...ALLOWED_SERVICES_AR]);
const ALLOWED_WORKERS_SET = new Set<string>(ALLOWED_WORKERS);

const workerSchema = z
  .string()
  .min(1)
  .max(120)
  .refine((v) => ALLOWED_WORKERS_SET.has(v), { message: "Invalid worker" });

const createSchema = z.object({
  service: z
    .string()
    .min(1)
    .max(120)
    .refine((v) => ALLOWED_SERVICES.has(v), { message: "Invalid service" }),
  workers: z.array(workerSchema).min(1).max(20),
  startAt: z.string().min(1),
  durationMin: z
    .number()
    .int()
    .min(5)
    .max(8 * 60),
  customerName: z.string().min(1).max(120),
  customerPhone: z.string().min(3).max(40),
  notes: z.string().max(1000).optional().nullable(),
});

const takenSchema = z.object({
  workers: z.array(workerSchema).min(1).max(20),
  dayStart: z.string().min(1),
  dayEnd: z.string().min(1),
});

export const getTakenBookings = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => takenSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("bookings")
      .select("worker, start_at, end_at")
      .in("worker", data.workers)
      .gte("start_at", data.dayStart)
      .lt("start_at", data.dayEnd);
    if (error) {
      console.error("getTakenBookings failed", error);
      throw new Error("Unable to load availability. Please try again.");
    }
    return (rows ?? []).map((r) => ({ worker: r.worker, startAt: r.start_at, endAt: r.end_at }));
  });

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const start = new Date(data.startAt);
    if (isNaN(start.getTime())) {
      return { ok: false as const, error: "Invalid start time" };
    }

    // Convert to Saudi time (UTC+3)
    const saudiTime = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    const day = saudiTime.getUTCDay();
    const totalMinutes = saudiTime.getUTCHours() * 60 + saudiTime.getUTCMinutes();

    // Friday: 14:30 – 02:00 (Saturday). All other days: 10:00 – 02:00 (next day)
    const windowStart = day === 5 ? 14 * 60 + 30 : 10 * 60;
    const isEarlyMorning = totalMinutes < 2 * 60;
    if (!isEarlyMorning && totalMinutes < windowStart) {
      return { ok: false as const, error: "OUTSIDE_HOURS" };
    }

    const end = new Date(start.getTime() + data.durationMin * 60_000);

    const EXCLUDED_FROM_LOYALTY = new Set<string>([
      // All hair services are excluded from the 5th-free loyalty reward
      "Haircut & Styling",
      "Beard Trimming",
      "Haircut & Beard",
      "Haircut, Beard & Facial Care",
      "Braids",
      "Perm — Long Lasting",
      "Perm — Classic",
      "قص وتصفيف الشعر",
      "تشذيب اللحية",
      "قص الشعر واللحية",
      "قص وتشذيب وعناية بالبشرة",
      "ضفاير",
      "كيرلي دائم",
      "كيرلي كلاسيك",
    ]);

    let lastErr: string | null = null;
    for (const worker of data.workers) {
      // Defensive pre-check: does this worker already have an overlapping booking?
      const { data: overlapping, error: overlapErr } = await supabaseAdmin
        .from("bookings")
        .select("id")
        .eq("worker", worker)
        .lt("start_at", end.toISOString())
        .gt("end_at", start.toISOString())
        .limit(1);
      if (overlapErr) {
        console.error("createBooking overlap check failed", overlapErr);
        return { ok: false as const, error: "Booking failed. Please try again." };
      }
      if (overlapping && overlapping.length > 0) {
        lastErr = "SLOT_TAKEN";
        continue;
      }

      const { error } = await supabaseAdmin.from("bookings").insert({
        service: data.service,
        worker,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        notes: data.notes ?? null,
      });
      if (!error) {
        let isFree = false;
        if (!EXCLUDED_FROM_LOYALTY.has(data.service)) {
          const { count } = await supabaseAdmin
            .from("bookings")
            .select("id", { count: "exact", head: true })
            .eq("customer_phone", data.customerPhone)
            .eq("service", data.service);
          if (count && count > 0 && count % 5 === 0) {
            isFree = true;
          }
        }
        return { ok: true as const, worker, isFree };
      }
      if (error.code === "23P01" || /overlap|exclude/i.test(error.message)) {
        lastErr = "SLOT_TAKEN";
        continue;
      }
      console.error("createBooking insert failed", error);
      return { ok: false as const, error: "Booking failed. Please try again." };
    }
    return { ok: false as const, error: lastErr ?? "SLOT_TAKEN" };
  });
