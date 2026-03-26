import { ethers } from 'ethers';
import EscrowJson from './out/Escrow.sol/Escrow.json'; // compilado de tu contrato
import { getSigner } from './provider';

const ESCROW_ADDRESS = '0xTuContratoDesplegado';

export const escrowContract = () => {
    const signer = getSigner();
    return new ethers.Contract(ESCROW_ADDRESS, EscrowJson.abi, signer);
};

// === Funciones ===

// Crear un escrow
export async function createEscrow(freelancer: string, arbiter: string, deadline: number, agreementHash: string, amountEther: string) {
    const contract = escrowContract();
    const tx = await contract.createEscrow(
        freelancer,
        arbiter,
        deadline,
        agreementHash,
        { value: ethers.parseEther(amountEther) }
    );
    return tx.wait(); // espera a que se mine
}

// Enviar trabajo
export async function submitWork(escrowId: number, workHash: string) {
    const contract = escrowContract();
    const tx = await contract.submitWork(escrowId, workHash);
    return tx.wait();
}

// Aprobar trabajo
export async function approveWork(escrowId: number) {
    const contract = escrowContract();
    const tx = await contract.approve(escrowId);
    return tx.wait();
}

// Rechazar (disputar)
export async function rejectWork(escrowId: number) {
    const contract = escrowContract();
    const tx = await contract.reject(escrowId);
    return tx.wait();
}

// Resolver disputa
export async function resolveEscrow(escrowId: number, releaseToFreelancer: boolean) {
    const contract = escrowContract();
    const tx = await contract.resolve(escrowId, releaseToFreelancer);
    return tx.wait();
}

// Leer info del escrow
export async function getEscrow(escrowId: number) {
    const contract = escrowContract();
    return contract.getEscrow(escrowId);
}