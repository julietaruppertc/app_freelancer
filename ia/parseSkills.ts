// parseSkills.ts
export function extractSkills(text: string): string[] {
    // ejemplo simple con regex / keywords
    const keywords = ['NodeJS','Web3','Solidity','Testing','React','Figma'];
    return keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()));
}