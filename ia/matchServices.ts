// ia/matchServices.ts
import { supabase } from './supabaseClient';
import { extractSkillsFromText } from './gemini.service';

export async function matchServices(clientRequirement: string) {
  // 1. La IA interpreta el texto y saca el array ["REACT", "SOLIDITY"]
  const skills = await extractSkillsFromText(clientRequirement);
  
  if (skills.length === 0) {
      console.log("No se detectaron skills, devolviendo recomendados genéricos...");
      return []; // O podrías devolver los top rankeados generales
  }

  console.log(`Buscando freelancers con: ${skills.join(', ')}`);

  // 2. Supabase hace el match exacto basado en el array
  const { data, error } = await supabase.rpc('match_services_by_skills', { 
      skill_list: skills 
  });

  if (error) throw error;
  return data;
}