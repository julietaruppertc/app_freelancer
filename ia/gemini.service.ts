// ia/gemini.service.ts
import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai'; // ✨ Sumamos Schema acá
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 1. Prompt para extraer skills del cliente
export async function extractSkillsFromText(text: string): Promise<string[]> {
  
  // ✨ Le clavamos ": Schema" para que TypeScript deje de quejarse
  const schema: Schema = {
    description: "Lista de habilidades técnicas de programación en mayúsculas",
    type: SchemaType.ARRAY,
    items: { type: SchemaType.STRING },
  };

  const jsonModel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { 
        responseMimeType: "application/json", 
        responseSchema: schema 
    },
  });

  const prompt = `Un cliente busca un freelancer con este requerimiento: "${text}". Extrae un array con los nombres de las tecnologías clave (ej: "REACT", "SOLIDITY", "NODEJS").`;

  try {
    const result = await jsonModel.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Fallo Gemini extrayendo skills:", error);
    return [];
  }
}

// ... (dejá la función de generateFreelancerScore igual, pero también agregale ": Schema" al esquema)