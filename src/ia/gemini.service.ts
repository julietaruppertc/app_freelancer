// src/ia/gemini.service.ts
import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Usa Gemini 2.5 Flash para extraer skills técnicas de un texto libre.
 * Devuelve un array de strings en MAYÚSCULAS, ej: ["REACT", "SOLIDITY", "NODEJS"]
 */
export async function extractSkillsFromText(text: string): Promise<string[]> {
  const schema: Schema = {
    description: 'Lista de habilidades técnicas de programación en mayúsculas',
    type: SchemaType.ARRAY,
    items: { type: SchemaType.STRING },
  };

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    // 🔥 MEJORA 1: Usar systemInstruction para definir la personalidad y reglas estrictas
    systemInstruction: `Eres un asistente técnico experto en reclutamiento IT y Web3.
Tu tarea es extraer ÚNICAMENTE los nombres de tecnologías, lenguajes, frameworks y skills técnicas de la solicitud del cliente.

REGLAS ESTRICTAS:
1. Devuelve cada skill en MAYÚSCULAS.
2. No incluyas conceptos genéricos como "PROGRAMACIÓN", "DESARROLLO" o "AYUDA".
3. MAPEO INTELIGENTE (Crucial para hacer match con la Base de Datos):
   - Si dice "blockchain", "contratos inteligentes", "defi" -> Agrega "SOLIDITY", "WEB3"
   - Si dice "diseño", "pantallas", "prototipos", "ui" -> Agrega "FIGMA", "UI/UX"
   - Si dice "solana", "phantom" -> Agrega "RUST", "SOLANA"
   - Si dice "frontend", "landing", "web" -> Agrega "REACT", "NEXT.JS"
   - Si dice "datos", "dashboard", "analítica" -> Agrega "PYTHON", "DATA ANALYSIS"

EJEMPLOS DE COMPORTAMIENTO ESPERADO:
Input: "Necesito alguien que me arme el diseño de una app crypto"
Output: ["FIGMA", "UI/UX", "WEB3"]

Input: "Busco un programador para un smart contract en binance"
Output: ["SOLIDITY", "WEB3"]`,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema,
      // 🔥 MEJORA 2: Temperatura casi en 0 para respuestas deterministas y precisas
      temperature: 0.1, 
    },
  });

  // 🔥 MEJORA 3: El prompt ahora solo recibe el texto puro del usuario
  const prompt = `Solicitud del cliente: "${text}"`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    if (Array.isArray(parsed) && parsed.every((s) => typeof s === 'string')) {
      return parsed.map((s: string) => s.toUpperCase().trim());
    }
    return [];
  } catch (error) {
    console.error('❌ Gemini error extrayendo skills:', error);
    throw new Error('No se pudo analizar el requerimiento con IA.');
  }
}