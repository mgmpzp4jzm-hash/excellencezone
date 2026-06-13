CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE public.bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service text NOT NULL,
  worker text NOT NULL,
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT bookings_time_valid CHECK (end_at > start_at),
  CONSTRAINT bookings_no_overlap EXCLUDE USING gist (
    worker WITH =,
    tstzrange(start_at, end_at, '[)') WITH &&
  )
);

CREATE INDEX bookings_worker_start_idx ON public.bookings (worker, start_at);

GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
-- No policies: all access goes through trusted server functions using the service role.
