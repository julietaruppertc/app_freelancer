//src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Importamos el provider que creamos
import { WalletProvider } from "@/context/WalletContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koda",
  description: "La infraestructura definitiva para el arquitecto digital moderno. Matchmaking con IA y pagos seguros mediante Smart Contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* 2. Envolvemos el children para que TODO el sitio tenga acceso a la wallet */}
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}