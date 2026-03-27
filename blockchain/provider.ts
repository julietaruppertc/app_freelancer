// blockchain/provider.ts
import { ethers } from 'ethers';

// Agregá esto arriba de todo en provider.ts
declare global {
  interface Window {
    ethereum?: any;
  }
}
let provider: ethers.BrowserProvider | null = null;
let signer: ethers.JsonRpcSigner | null = null;

export async function connectWallet() {
    if (typeof window === "undefined" || !window.ethereum) {
        alert("Instalá MetaMask!");
        return;
    }
    
    // Conexión estándar EIP-1193 (MetaMask/TrustWallet)
    provider = new ethers.BrowserProvider(window.ethereum);
    
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    signer = await provider.getSigner();
    
    const address = await signer.getAddress();
    console.log('Connected to BNB Chain:', address);
    return address;
}

export function getSigner() {
    if (!signer) throw new Error("Conectá la wallet primero");
    return signer;
}