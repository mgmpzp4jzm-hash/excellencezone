    // Business hours restriction:
    // Friday: 14:30 – 02:00 (Saturday)
    // All other days: 10:00 – 02:00 (next day)
    const day = start.getDay();
    const totalMinutes = start.getHours() * 60 + start.getMinutes();
    const isFriday = day === 5;
    const windowStart = isFriday ? 14 * 60 + 30 : 10 * 60;
    const isEarlyMorning = totalMinutes < 2 * 60;
    const outsideHours = !isEarlyMorning && totalMinutes < windowStart;
    if (outsideHours) {
      return { ok: false as const, error: "OUTSIDE_HOURS" };
    }
