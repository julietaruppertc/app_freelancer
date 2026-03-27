# 🚀 Koda: Plataforma Web3 & IA para Freelancers

[cite_start]Koda es una plataforma de trabajo freelance donde la tecnología Blockchain garantiza la transparencia de las contrataciones[cite: 2]. [cite_start]Olvídate del modelo tradicional: aquí los clientes simplemente describen su problema, y la IA hace el matchmaking exacto con los servicios mejor calificados y verificados[cite: 3].

## ✨ Características Principales

* [cite_start]*Matchmaking Preciso:* El cliente no navega por un catálogo infinito[cite: 6]. [cite_start]Ingresa a la plataforma y detalla exactamente qué necesita[cite: 6]. [cite_start]La IA cruza este requerimiento con la base de datos, analizando credenciales y el "Score de Confianza" del freelancer[cite: 7].
* [cite_start]*Servicios con Evidencia Real:* El freelancer no solo crea un perfil, sino que carga servicios específicos (ej: "Auditoría en Solidity")[cite: 4]. [cite_start]Para publicarlo, debe adjuntar obligatoriamente un enlace de prueba (GitHub, Figma, CV)[cite: 5].
* [cite_start]*Acuerdos Inmutables:* La negociación inicial se realiza mediante una redirección a Telegram[cite: 10]. [cite_start]Una vez definidos los términos, el acuerdo final se convierte en un registro inalterable (un hash)[cite: 12]. 
* [cite_start]*Seguridad Web3 (Escrow):* El cliente conecta su wallet a la dApp y firma criptográficamente las condiciones[cite: 13]. [cite_start]Automáticamente, se depositan los fondos en un Contrato Inteligente de Escrow, donde el dinero queda bloqueado[cite: 14]. [cite_start]Esto elimina el riesgo de estafa para ambas partes[cite: 20]. [cite_start]Todo el proceso de selección y pago ocurre directamente en la dApp[cite: 8].

## 🛠️ Stack Tecnológico

La plataforma está construida utilizando las siguientes tecnologías:

* [cite_start]*Inteligencia Artificial:* Gemini [cite: 41]
* [cite_start]*Frontend:* Next.js con TypeScript [cite: 42]
* [cite_start]*Backend:* Supabase [cite: 43]
* [cite_start]*Web3:* Solidity (Smart Contracts de Escrow), Thirdweb (para integrar la conexión a la billetera en minutos) y BNB (sponsor) [cite: 44]

## 💼 Modelo de Negocio y Ventaja Competitiva

[cite_start]Se propone un entorno seguro y sin fricciones que elimina el "catálogo infinito" tradicional[cite: 38]. [cite_start]La plataforma generará ingresos directos a través de una pequeña comisión (fee) retenida automáticamente por el Smart Contract de Escrow únicamente cuando un trabajo finaliza con éxito y los fondos son liberados[cite: 39]. [cite_start]Al ser una arquitectura optimizada, esta comisión será drásticamente menor a la de plataformas Web2[cite: 39].

## ⚙️ Instalación y Dependencias

Para correr el entorno de desarrollo local, sigue estos pasos:

1. [cite_start]Clona el repositorio: git clone https://github.com/julietaruppertc/app_freelancer [cite: 50]
2. Instala las dependencias base de Next.js:
   ```bash
   npm install