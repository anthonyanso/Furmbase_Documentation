import { createClient } from "@supabase/supabase-js";

// This project only ever READS from Supabase, using the public anon key —
// Row Level Security (see project.sql) restricts that key to published blog
// posts only. Never put a service-role key in this project's environment;
// that key bypasses RLS entirely and this repo is public.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && process.env.NODE_ENV !== "test") {
  // Not thrown — a missing config shouldn't take the whole site down, just
  // the blog. See src/lib/blog-data.ts, which fails safe to an empty list.
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set — the blog will render with no posts until they're configured. See .env.example."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
