// src/ia/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Next.js carga .env.local automáticamente — no necesitás dotenv
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Faltan variables de entorno: SUPABASE_URL y SUPABASE_KEY (o sus variantes NEXT_PUBLIC)');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);