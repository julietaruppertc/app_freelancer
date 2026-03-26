import { keccak256 } from 'ethers/lib/utils';

export function hashAgreement(agreementText: string): string {
    return keccak256(Buffer.from(agreementText, 'utf-8'));
}

export function hashWork(fileBytes: Uint8Array): string {
    return keccak256(fileBytes);
}