// src/ia/matchServices.ts
import { supabase } from './supabaseClient';
import { extractSkillsFromText } from './gemini.service';

/**
 * Resultado que devuelve la RPC match_services_by_skills.
 * Asegurate de que tu función SQL devuelva estas columnas.
 */
export interface MatchedFreelancer {
  id_usuario: number;
  nombre: string;
  wallet: string;
  score_confianza: number;
  id_servicio: number;
  titulo: string;
  descripcion: string;
  precio_base: number;
  skills: string[];       // nombres de skills del servicio
  matched_skills: string[]; // skills que coincidieron con el pedido
  match_score: number;    // porcentaje de match 0-100
}

/**
 * Pipeline completo:
 * 1. Gemini extrae skills del texto libre
 * 2. Supabase RPC busca servicios que coincidan
 * 3. Devuelve lista ordenada por match_score DESC
 */
export async function getMatchedFreelancers(query: string): Promise<MatchedFreelancer[]> {
  // 1. IA → skills requeridas
  const requiredSkills = await extractSkillsFromText(query);

  if (requiredSkills.length === 0) {
    console.warn('⚠️ Gemini no detectó skills en el texto.');
    return [];
  }

  console.log(`🧠 Skills detectadas: ${requiredSkills.join(', ')}`);

  // 2. Supabase RPC → match real contra BD
  const { data, error } = await supabase.rpc('match_services_by_skills', {
    skill_list: requiredSkills,
  });

  if (error) {
    console.error('❌ Error en RPC match_services_by_skills:', error);
    throw new Error(`Error en base de datos: ${error.message}`);
  }

  if (!data || data.length === 0) return [];

  // 3. Ordenar por match_score (la RPC debería devolver esto, pero lo garantizamos)
  return (data as MatchedFreelancer[]).sort((a, b) => b.match_score - a.match_score);
}