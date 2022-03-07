import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const convertFromLamports = (value: number): number => value / LAMPORTS_PER_SOL;

export const convertToLamports = (value: number): number => value * LAMPORTS_PER_SOL;

export const getSumByKey = (arr: any[], key: string): number => (
  arr.reduce((accumulator, current) => accumulator + Number(current[key]), 0)
);
