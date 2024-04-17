import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bvttwoglfprfoynqkqqb.supabase.co'; // Supabase URL

// Supabase Key - anon public key (safe in browsers as long as you have RLS enabled)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dHR3b2dsZnByZm95bnFrcXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNzYwNDEsImV4cCI6MjAyODY1MjA0MX0.dT1L-B_hejEIfDWbk9pE1uiFcXMk-hub3A3NBHFRdSE'

const supabase = createClient(supabaseUrl, supabaseKey); // Create a Supabase client

export { supabase }
