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
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  const prompt = `Eres un asistente técnico experto en tecnología y desarrollo de software.
Un cliente describe su necesidad: "${text}"

Tu tarea: extraer ÚNICAMENTE los nombres de tecnologías, lenguajes, frameworks, herramientas y skills técnicas mencionadas o claramente implicadas.
Reglas:
- Devuelve cada skill en MAYÚSCULAS (ej: "REACT", "SOLIDITY", "NODEJS", "PYTHON")
- Si el texto menciona "blockchain" o "DeFi", incluye "SOLIDITY" y "WEB3"
- No incluyas conceptos genéricos como "PROGRAMACIÓN" o "DESARROLLO"
- Devuelve SOLO el JSON array, sin texto extra.`;

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