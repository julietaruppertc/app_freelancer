// ia/test-match.ts
import { matchServices } from './matchServices';

async function test() {
    console.log("🚀 Iniciando test de Matchmaking...\n");

    // Simulamos lo que escribiría un cliente real
    const promptCliente = "Tengo una idea para una dApp. Necesito un loco que me arme el smart contract en Solidity, lo despliegue en BNB Chain y me arme un frontend rápido con React y Tailwind.";
    
    console.log(`👤 Cliente dice: "${promptCliente}"`);
    console.log("🤖 Consultando a Gemini para extraer skills...");

    try {
        const resultados = await matchServices(promptCliente);
        
        console.log("\n✅ MATCH COMPLETADO. Resultados desde Supabase:");
        if (resultados.length === 0) {
            console.log("⚠️ No se encontraron freelancers. (Fijate si tenés datos de prueba en tu base de datos!)");
        } else {
            console.table(resultados); // console.table queda hermoso para ver datos de DB en la terminal
        }

    } catch (error) {
        console.error("\n❌ Explotó algo:", error);
    }
}

test();