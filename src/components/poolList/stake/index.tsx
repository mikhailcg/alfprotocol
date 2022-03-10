/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { AccountInfo, PublicKey, Transaction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getOrCreateAssociatedTokenAccount } from '../../../walletWrappers';
import { Pool as PoolInterface } from '../../../sdk';
import { convertFromLamports, convertToLamports } from '../../../utils/formatter';
import { stakeToPool } from '../../../actions/pools';
import { INPUT_AMOUNT_PATTERN } from '../../../constants';
import './stake.scss';

interface Props {
  wallet: AccountInfo<Buffer>;
  pool: PoolInterface;
  callback: () => void;
}

const Stake: React.FC<Props> = (props: Props) => {
  const {
    wallet, callback, pool,
  } = props;
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [amount, setAmount] = useState<number>();

  const valid = useCallback((): boolean => {
    // max length after comma validation
    if (amount && (wallet.lamports >= convertToLamports(amount))) {
      return true;
    }
    return false;
  }, [amount, wallet]);

  const onSPLTransactionSend = async (toPubkey: string) => {
    if (!toPubkey || !amount) return;
    try {
      if (!publicKey || !signTransaction) throw new WalletNotConnectedError();
      const toPublicKey = new PublicKey(toPubkey);
      const mint = new PublicKey(pool.poolInfo.tokenMint); // TODO Need to pass pool.poolInfo.tokenMint

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
          fromTokenAccount.address,
          toTokenAccount.address,
          publicKey,
          convertToLamports(amount),
          [],
          TOKEN_PROGRAM_ID,
        ),
      );

      const blockHash = await connection.getLatestBlockhash();
      transaction.feePayer = await publicKey;
      transaction.recentBlockhash = await blockHash.blockhash;
      const signed = await signTransaction(transaction);

      await connection.sendRawTransaction(signed.serialize());

      console.log('Transaction sent');
    } catch (error: any) {
      console.log(`Transaction failed: ${error}`);
    }
  };

  const handleStake = async () => {
    if (valid() && amount && publicKey) {
      stakeToPool(pool, {
        publicKey: publicKey.toBase58(),
        farmAccumulatedBefore: pool.poolInfo.totalAmount,
        stackedTimestamp: new Date().getTime(),
        stackedAmount: convertToLamports(amount),
      }).then(async () => {
        await onSPLTransactionSend(pool.publicKey); // TODO Need to pass pool.publicKey
        callback();
      });
    }
  };

  return (
    <div className="stake">
      <h3>Stake your token</h3>
      <p>{`Your wallet balance:  ${convertFromLamports(wallet.lamports)}`}</p>
      <label htmlFor="amount">
        Amount:
        <input
          type="number"
          name="amount"
          id="amount"
          lang="en"
          placeholder="0.00"
          min="0"
          pattern={INPUT_AMOUNT_PATTERN}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
        />
      </label>
      <button type="button" disabled={!valid()} onClick={handleStake}>Stake</button>
    </div>
  );
};

export default Stake;
