# 🚀 Koda: Plataforma Web3 & IA para Freelancers

Koda es una plataforma de trabajo freelance donde la tecnología Blockchain garantiza la transparencia de las contrataciones.
Olvídate del modelo tradicional: aquí los clientes simplemente describen su problema, y la IA hace el matchmaking exacto con los servicios mejor calificados y verificados.

## ✨ Características Principales

* **Matchmaking Preciso:** El cliente no navega por un catálogo infinito. Ingresa a la plataforma y detalla exactamente qué necesita. La IA cruza este requerimiento con la base de datos, analizando credenciales y el "Score de Confianza" del freelancer.
* **Servicios con Evidencia Real:** El freelancer no solo crea un perfil, sino que carga servicios específicos (ej: "Auditoría en Solidity"). Para publicarlo, debe adjuntar obligatoriamente un enlace de prueba (GitHub, Figma, CV).
* **Acuerdos Inmutables:** La negociación inicial se realiza mediante una redirección a Telegram. Una vez definidos los términos, el acuerdo final se convierte en un registro inalterable (un hash).
* **Seguridad Web3 (Escrow):** El cliente conecta su wallet a la dApp y firma criptográficamente las condiciones. Automáticamente, se depositan los fondos en un Contrato Inteligente de Escrow, donde el dinero queda bloqueado. Esto elimina el riesgo de estafa para ambas partes. Todo el proceso de selección y pago ocurre directamente en la dApp.

## 🛠️ Stack Tecnológico

La plataforma está construida utilizando las siguientes tecnologías:

* **Inteligencia Artificial:** Gemini
* **Frontend:** Next.js con TypeScript
* **Backend:** Supabase
* **Web3:** Solidity (Smart Contracts de Escrow), Thirdweb (para integrar la conexión a la billetera en minutos) y BNB (sponsor)

## 💼 Modelo de Negocio y Ventaja Competitiva

Se propone un entorno seguro y sin fricciones que elimina el "catálogo infinito" tradicional. La plataforma generará ingresos directos a través de una pequeña comisión (fee) retenida automáticamente por el Smart Contract de Escrow únicamente cuando un trabajo finaliza con éxito y los fondos son liberados. Al ser una arquitectura optimizada, esta comisión será drásticamente menor a la de plataformas Web2.

## ⚙️ Instalación y Dependencias

Para correr el entorno de desarrollo local, sigue estos pasos:

1. Clona el repositorio y entra a la carpeta:
git clone https://github.com/julietaruppertc/app_freelancer
cd app_freelancer

2. Instala las dependencias base del proyecto y styled-components para la interfaz:
npm install
npm install styled-components

3. Inicia el servidor local de desarrollo:
npm run dev