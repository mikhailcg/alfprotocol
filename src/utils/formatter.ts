import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const convertLamports = (value: number): number => value / LAMPORTS_PER_SOL;

export default { convertLamports };
