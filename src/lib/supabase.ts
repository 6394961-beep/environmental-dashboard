import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// This prevents the "Url is required" crash by only initializing if keys exist
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;