// src/ia/matchServices.ts
import { supabase } from './supabaseClient';
import { extractSkillsFromText } from './gemini.service';

export interface MatchedFreelancer {
  id_usuario: number;
  nombre: string;
  wallet: string;
  score_confianza: number;
  id_servicio: number;
  titulo: string;
  descripcion: string;
  precio_base: number;
  skills: string[];
  matched_skills: string[];
  match_score: number;
}

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

  let results = data as MatchedFreelancer[];

  // 🚀 PARCHE HACKATHON: Como la RPC no trae el nombre del usuario, lo buscamos en la tabla 'usuario'
  if (results.length > 0) {
    console.log("Buscando nombres de los freelancers...");
    
    // Sacamos todos los IDs únicos de los freelancers que devolvió la IA
    const userIds = [...new Set(results.map(r => r.id_usuario))];
    
    // Hacemos una consulta rapidísima a tu tabla 'usuario'
    const { data: usersData, error: userError } = await supabase
      .from('usuario')
      .select('id_usuario, nombre')
      .in('id_usuario', userIds);
      
    if (!userError && usersData) {
      // Le inyectamos el nombre real de Satoshi Dev, Vitalik Front, etc. a las tarjetas
      results = results.map(r => {
        const user = usersData.find(u => u.id_usuario === r.id_usuario);
        return {
          ...r,
          // Si encuentra el usuario le pone el nombre, si no le pone "Freelancer Anónimo"
          nombre: user && user.nombre ? user.nombre : 'Freelancer Anónimo',
        };
      });
    }
  }

  // 3. Ordenar por match_score
  return results.sort((a, b) => b.match_score - a.match_score);
}