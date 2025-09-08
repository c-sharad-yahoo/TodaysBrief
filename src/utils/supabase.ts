import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Declare the supabase variable at the top level
let supabase: any;

// Only initialize Supabase client if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('Supabase environment variables not configured. Using localStorage fallback.');
  // Create a mock client that will cause storage functions to fall back to localStorage
  supabase = null as any;
} else {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Export the supabase client
export { supabase };

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any, operation: string) {
  console.error(`Supabase ${operation} error:`, error);
  throw new Error(`Failed to ${operation}: ${error.message}`);
}