"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet } from '@blockchain/provider';

interface WalletContextType {
  address: string | null;
  connecting: boolean;
  login: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

    const login = async () => {
        setConnecting(true);
        try {
        const addr = await connectWallet();
        // El fix: Si addr es undefined, seteamos null explícitamente
        setAddress(addr ?? null); 
        } catch (error) {
        console.error("Error connecting wallet", error);
        setAddress(null);
        } finally {
        setConnecting(false);
        }
    };

  return (
    <WalletContext.Provider value={{ address, connecting, login }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};