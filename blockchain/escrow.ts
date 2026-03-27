// blockchain/escrow.ts

import { ethers } from 'ethers';
import EscrowJson from './out/Escrow.sol/Escrow.json';
import { getSigner } from './provider';
import deployData from './broadcast/DeployEscrow.s.sol/97/run-latest.json';

// blockchain/escrow.ts — línea 5
const ESCROW_ADDRESS = '0x3831Ebd363cd1ca6e5eF21d32397Cceb8533e573';

export const escrowContract = () => {
  const signer = getSigner();
  return new ethers.Contract(ESCROW_ADDRESS, EscrowJson.abi, signer);
};

// Crear un escrow — bloquea fondos on-chain
export async function createEscrow(
  freelancer: string,
  arbiter: string,
  deadline: number,
  agreementHash: string,
  amountEther: string
) {
  const contract = escrowContract();

  // Sanitizar addresses por si vienen con caracteres invisibles
  const cleanFreelancer = freelancer.trim().replace(/[^\x20-\x7E]/g, '');
  const cleanArbiter = arbiter.trim().replace(/[^\x20-\x7E]/g, '');

  // ─── DEBUG: copiá esto y mirá la consola del browser ───
  console.log("=== DEBUG createEscrow ===");
  console.log("freelancer:", cleanFreelancer);
  console.log("freelancer válida:", ethers.isAddress(cleanFreelancer));
  console.log("arbiter:", cleanArbiter);
  console.log("arbiter válida:", ethers.isAddress(cleanArbiter));
  console.log("deadline:", deadline, "→ fecha:", new Date(deadline * 1000).toISOString());
  console.log("agreementHash raw:", agreementHash);
  console.log("agreementHash length:", agreementHash.length);
  console.log("amountEther:", amountEther);
  console.log("parseEther resultado:", ethers.parseEther(amountEther).toString());

   let hashBytes32: string;
  try {
    hashBytes32 = ethers.zeroPadValue(agreementHash, 32);
    console.log("hashBytes32 OK:", hashBytes32);
  } catch (e) {
    console.error("ERROR al formatear hash:", e);
    throw new Error("agreementHash inválido: " + agreementHash);
  }

  const tx = await contract.createEscrow(
    cleanFreelancer,
    cleanArbiter,
    deadline,
    hashBytes32,
    { value: ethers.parseEther(amountEther) }
  );
  console.log("TX enviada:", tx.hash);
  const receipt = await tx.wait();
  console.log("Receipt:", receipt);
  console.log("Logs del contrato:", receipt.logs);

  return receipt;
 return tx.wait();
}

// Enviar trabajo (freelancer llama esto con el hash del entregable)
export async function submitWork(escrowId: number, workHash: string) {
  const contract = escrowContract();
  const hashBytes32 = ethers.zeroPadValue(workHash, 32);
  const tx = await contract.submitWork(escrowId, hashBytes32);
  return tx.wait();
}

// Aprobar trabajo — libera fondos al freelancer
export async function approveWork(escrowId: number) {
  const contract = escrowContract();
  const tx = await contract.approve(escrowId);
  return tx.wait();
}

// Rechazar entrega — mueve a estado Disputado
export async function rejectWork(escrowId: number) {
  const contract = escrowContract();
  const tx = await contract.reject(escrowId);
  return tx.wait();
}

// Resolver disputa (solo el árbitro)
// releaseToFreelancer: true → paga al freelancer, false → devuelve al cliente
export async function resolveEscrow(escrowId: number, releaseToFreelancer: boolean) {
  const contract = escrowContract();
  const tx = await contract.resolve(escrowId, releaseToFreelancer);
  return tx.wait();
}

// Leer datos de un escrow por ID
export async function getEscrow(escrowId: number) {
  const contract = escrowContract();
  return contract.getEscrow(escrowId);
}