CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_no_worker_overlap;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_no_worker_overlap
  EXCLUDE USING gist (
    worker WITH =,
    tstzrange(start_at, end_at, '[)') WITH &&
  );