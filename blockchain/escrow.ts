// blockchain/escrow.ts

import { ethers } from 'ethers';
import EscrowJson from './out/Escrow.sol/Escrow.json';
import { getSigner } from './provider';

const ESCROW_ADDRESS = '0xTuContratoDesplegado';

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

  // Asegurar que el hash esté formateado como bytes32 válido
  const hashBytes32 = ethers.zeroPadValue(agreementHash, 32);

  const tx = await contract.createEscrow(
    cleanFreelancer,
    cleanArbiter,
    deadline,
    hashBytes32,
    { value: ethers.parseEther(amountEther) }
  );
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