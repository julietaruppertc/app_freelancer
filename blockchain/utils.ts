//src/blockchain/utils.ts

import { keccak256, toUtf8Bytes, zeroPadValue, hexlify } from 'ethers';

export function hashAgreement(agreementText: string): string {
  // Devuelve bytes32 correctamente formateado para el contrato
  return keccak256(toUtf8Bytes(agreementText));
  // keccak256 ya devuelve 32 bytes (64 hex chars + 0x) — está bien
}

export function hashWork(fileBytes: Uint8Array): string {
  return keccak256(fileBytes);
}