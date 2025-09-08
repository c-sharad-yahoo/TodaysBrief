import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only initialize Supabase client if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('Supabase environment variables not configured. Using localStorage fallback.');
  // Create a mock client that will cause storage functions to fall back to localStorage
  export const supabase = null as any;
} else {
  export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any, operation: string) {
  console.error(`Supabase ${operation} error:`, error);
  throw new Error(`Failed to ${operation}: ${error.message}`);
}