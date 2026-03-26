import { XOConnectProvider } from 'xo-connect';
import { ethers } from 'ethers';

let xoProvider: XOConnectProvider;
let provider: ethers.providers.Web3Provider;
let signer: ethers.Signer;

export async function connectWallet() {
    xoProvider = new XOConnectProvider();
    provider = new ethers.providers.Web3Provider(xoProvider);
    signer = provider.getSigner();

    const accounts = await xoProvider.request({ method: 'eth_requestAccounts' });
    console.log('Connected account:', accounts[0]);
    return accounts[0];
}

export function getSigner() {
    if (!signer) throw new Error("Wallet not connected");
    return signer;
}

export function getProvider() {
    if (!provider) throw new Error("Wallet not connected");
    return provider;
}