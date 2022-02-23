/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createTransferInstruction, getOrCreateAssociatedTokenAccount } from '../../sdk';
import './poolList.scss';
import { Pool as PoolInterface } from '../../interfaces/pools';
import { Stake } from '../../interfaces/stake';
import { getPools } from '../../actions/pools';
import { useAppSelector } from '../../hooks';
import { LoadingType } from '../../types/global';
import Pool from './pool';
import NewPool from './newPool';

const PoolList = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  const poolsStore = useAppSelector((state) => state.pools);
  const stakeStore = useAppSelector((state) => state.stake);
  const walletStore = useAppSelector((state) => state.wallet);
  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSPLTransactionSend = useCallback(
    async (toPubkey: string, amount: number) => {
      if (!toPubkey || !amount) return;

      try {
        if (!publicKey || !signTransaction) throw new WalletNotConnectedError();
        const toPublicKey = new PublicKey(toPubkey);
        const mint = new PublicKey('Az9aJhfHg3WmrWdwXmTfqoDJRbuiFr8JpRKJrtF7LH7W');

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          publicKey,
          signTransaction,
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          toPublicKey,
          signTransaction,
        );

        const transaction = new Transaction().add(
          createTransferInstruction(
            fromTokenAccount.address, // source
            toTokenAccount.address, // dest
            publicKey,
            amount * LAMPORTS_PER_SOL,
            [],
            TOKEN_PROGRAM_ID,
          ),
        );

        const blockHash = await connection.getRecentBlockhash();
        transaction.feePayer = await publicKey;
        transaction.recentBlockhash = await blockHash.blockhash;
        const signed = await signTransaction(transaction);

        await connection.sendRawTransaction(signed.serialize());

        console.log('Transaction sent');
      } catch (error: any) {
        console.log(`Transaction failed: ${error.message}`);
      }
    },
    [publicKey, sendTransaction, connection],
  );

  useEffect(() => {
    getPools();
  }, []);

  return (
    <div className="pool-list">
      {poolsStore.loading === LoadingType.LOADING ? <p>Loading pools...</p> : (
        <>
          <div className="pool-list-title">
            <h1>List of pools</h1>
            {address ? (
              <NewPool />
            ) : null}
          </div>
          {poolsStore.data.map((p: PoolInterface) => {
            const stakesForPool = stakeStore.data.find((s: Stake) => (
              s.poolAddress === p.tokenMint && address === s.walletAddress
            ));
            return (
              <Pool
                pool={p}
                key={p.tokenMint}
                wallet={walletStore.data}
                address={address}
                stake={stakesForPool}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default PoolList;
