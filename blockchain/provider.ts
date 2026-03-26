import { XOConnectProvider } from 'xo-connect';
import { ethers } from 'ethers';

let xoProvider: any;
let provider: ethers.BrowserProvider; 
let signer: ethers.JsonRpcSigner;

export async function connectWallet() {
    if (typeof window === "undefined") return;
    
    xoProvider = new XOConnectProvider();
    // BrowserProvider reemplaza a Web3Provider
    provider = new ethers.BrowserProvider(xoProvider);
    
    await xoProvider.request({ method: 'eth_requestAccounts' });
    signer = await provider.getSigner();
    
    const address = await signer.getAddress();
    console.log('Connected account:', address);
    return address;
}

export function getSigner() {
    if (!signer) throw new Error("Wallet not connected");
    return signer;
}

export function getProvider() {
    if (!provider) throw new Error("Wallet not connected");
    return provider;
}