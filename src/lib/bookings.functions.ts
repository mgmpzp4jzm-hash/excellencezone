import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const createSchema = z.object({
  service: z.string().min(1).max(120),
  workers: z.array(z.string().min(1).max(120)).min(1).max(20),
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
  workers: z.array(z.string().min(1).max(120)).min(1).max(20),
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
    if (error) throw new Error(error.message);
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
    const SAUDI_OFFSET_MS = 3 * 60 * 60 * 1000;
    const saudiTime = new Date(start.getTime() + SAUDI_OFFSET_MS);
    const day = saudiTime.getUTCDay();
    const totalMinutes = saudiTime.getUTCHours() * 60 + saudiTime.getUTCMinutes();

    // Business hours in Saudi time:
    // Friday: 14:30 – 02:00 (Saturday)
    // All other days: 10:00 – 02:00 (next day)
    const isFriday = day === 5;
    const windowStart = isFriday ? 14 * 60 + 30 : 10 * 60;
    const isEarlyMorning = totalMinutes < 2 * 60;
    const outsideHours = !isEarlyMorning && totalMinutes < windowStart;
    if (outsideHours) {
      return { ok: false as const, error: "OUTSIDE_HOURS" };
    }

    const end = new Date(start.getTime() + data.durationMin * 60_000);

    // Try each eligible worker until one accepts (exclusion constraint enforces no overlap)
    let lastErr: string | null = null;
    for (const worker of data.workers) {
      const { error } = await supabaseAdmin.from("bookings").insert({
        service: data.service,
        worker,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        notes: data.notes ?? null,
      });
      if (!error) return { ok: true as const, worker };
      if (error.code === "23P01" || /overlap|exclude/i.test(error.message)) {
        lastErr = "SLOT_TAKEN";
        continue;
      }
      return { ok: false as const, error: error.message };
    }
    return { ok: false as const, error: lastErr ?? "SLOT_TAKEN" };
  });
