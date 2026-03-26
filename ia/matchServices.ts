// ia/matchServices.ts
import { supabase } from './supabaseClient';

export async function matchServices(skills: string[]) {
  if (skills.length === 0) return [];

  const { data, error } = await supabase.rpc('match_services_by_skills', { skill_list: skills });

  if (error) throw error;
  return data;
}