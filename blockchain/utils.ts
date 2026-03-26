import { keccak256, toUtf8Bytes } from 'ethers';

export function hashAgreement(agreementText: string): string {
    return keccak256(toUtf8Bytes(agreementText));
}

export function hashWork(fileBytes: Uint8Array): string {
    return keccak256(fileBytes);
}