import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const createSchema = z.object({
  service: z.string().min(1).max(120),
  worker: z.string().min(1).max(120),
  startAt: z.string().min(1), // ISO datetime
  durationMin: z.number().int().min(5).max(8 * 60),
  customerName: z.string().min(1).max(120),
  customerPhone: z.string().min(3).max(40),
  notes: z.string().max(1000).optional().nullable(),
});

const takenSchema = z.object({
  worker: z.string().min(1).max(120),
  dayStart: z.string().min(1), // ISO datetime (UTC) representing start of local day
  dayEnd: z.string().min(1),   // ISO datetime (UTC) end window
});

export const getTakenBookings = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => takenSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("bookings")
      .select("start_at, end_at")
      .eq("worker", data.worker)
      .gte("start_at", data.dayStart)
      .lt("start_at", data.dayEnd);
    if (error) throw new Error(error.message);
    return (rows ?? []).map((r) => ({ startAt: r.start_at, endAt: r.end_at }));
  });

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const start = new Date(data.startAt);
    if (isNaN(start.getTime())) {
      return { ok: false as const, error: "Invalid start time" };
    }
    const end = new Date(start.getTime() + data.durationMin * 60_000);

    const { error } = await supabaseAdmin.from("bookings").insert({
      service: data.service,
      worker: data.worker,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      customer_name: data.customerName,
      customer_phone: data.customerPhone,
      notes: data.notes ?? null,
    });

    if (error) {
      // Exclusion constraint violation = overlapping booking
      if (error.code === "23P01" || /overlap|exclude/i.test(error.message)) {
        return { ok: false as const, error: "SLOT_TAKEN" };
      }
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const };
  });
