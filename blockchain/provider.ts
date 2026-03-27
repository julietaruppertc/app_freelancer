// blockchain/provider.ts
import { ethers } from 'ethers';

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

  // BNB Mainnet (0x38 = 56)
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x38',
          chainName: 'BNB Smart Chain',
          nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
          rpcUrls: ['https://bsc-dataseed1.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com'],
        }],
      });
    } else {
      throw switchError;
    }
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  signer = await provider.getSigner();

  const address = await signer.getAddress();
  console.log('Connected to BNB Mainnet:', address);
  return address;
}

export function getSigner() {
  if (!signer) throw new Error("Conectá la wallet primero");
  return signer;
}