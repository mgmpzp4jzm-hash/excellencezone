-- Move btree_gist out of public schema
ALTER EXTENSION btree_gist SET SCHEMA extensions;

-- Add explicit restrictive RLS policies on bookings.
-- All app access goes through server functions using the service role
-- (which bypasses RLS). Deny anon and authenticated direct Data API access.
CREATE POLICY "Deny anon access to bookings"
ON public.bookings
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny authenticated direct access to bookings"
ON public.bookings
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);

-- Permissive no-op policy so the RLS-enabled-no-policy linter is satisfied;
-- the RESTRICTIVE policies above still block everything from anon/authenticated.
CREATE POLICY "Service role manages bookings"
ON public.bookings
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);