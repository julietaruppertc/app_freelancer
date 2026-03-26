// ia/gemini.service.ts
import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// -----------------------------
// 1. Extraer skills del cliente
// -----------------------------
export async function extractSkillsFromText(text: string): Promise<string[]> {
  // Esquema estricto: IA, devolveme un Array de Strings sí o sí.
  const schema: Schema = {
    description: "Lista de habilidades técnicas de programación en mayúsculas",
    type: SchemaType.ARRAY,
    items: { type: SchemaType.STRING },
  };

  // ⚡ Usamos el gemini-2.5-flash que pediste. Es una bestia para JSON.
  const jsonModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `Un cliente busca un freelancer con este requerimiento: "${text}". 
Extrae un array con los nombres de las tecnologías clave (ej: "REACT", "SOLIDITY", "NODEJS").
Devuelve SOLO el JSON, sin texto adicional.`;

  try {
    const result = await jsonModel.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());
    
    // Validación hackathon-proof: si no es array, devolvemos vacío para no romper map()
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (error) {
    console.error("❌ Fallo Gemini extrayendo skills:", error);
    return [];
  }
}

// --------------------------------------------
// 2. Función Score (Opcional, pero arreglada)
// --------------------------------------------
export async function generateFreelancerScore(
  freelancerText: string,
  clientSkills: string[]
): Promise<number> {
  const schema: Schema = {
    description: "Número del score de match entre freelancer y cliente",
    type: SchemaType.NUMBER,
  };

  const jsonModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { 
      responseMimeType: "application/json", 
      responseSchema: schema 
    },
  });

  const prompt = `Evaluá qué tan adecuado es este freelancer: "${freelancerText}" 
para un cliente que necesita estas skills: ${JSON.stringify(clientSkills)}. 
Devolvé solo un número entero entre 0 y 100 indicando el porcentaje de compatibilidad.`;

  try {
    const result = await jsonModel.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());
    
    // Validación: que sea un número posta
    if (typeof parsed === 'number') return parsed;
    return 0;
  } catch (error) {
    console.error("❌ Fallo Gemini generando score:", error);
    return 0;
  }
}