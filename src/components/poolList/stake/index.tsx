/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getOrCreateAssociatedTokenAccount } from '../../../walletWrappers';
import { Pool as PoolInterface } from '../../../sdk';
import { convertFromLamports, convertToLamports, getTokenAcountBalance } from '../../../utils/formatter';
import { stakeToPool } from '../../../actions/pools';
import { INPUT_AMOUNT_PATTERN } from '../../../constants';
import { TokenAccount } from '../../../slices/tokenAccounts';
import './stake.scss';
import { getTokenAccountInfo } from '../../../actions/tokenAccounts';

interface Props {
  pool: PoolInterface;
  tokenAccounts: TokenAccount[];
  callback: () => void;
}

const Stake: React.FC<Props> = (props: Props) => {
  const {
    callback, pool, tokenAccounts,
  } = props;
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [amount, setAmount] = useState<number>();
  const [tokenAccount, setTokenAccount] = useState<TokenAccount>();

  useEffect(() => {
    if (!tokenAccount && typeof amount === 'number') {
      setAmount(undefined);
    }
  }, [tokenAccount, amount]);

  const valid = useCallback((): boolean => {
    // max length after comma validation
    if (amount && tokenAccount && (getTokenAcountBalance(tokenAccount) >= convertToLamports(amount))) {
      return true;
    }
    return false;
  }, [amount]);

  const onSPLTransactionSend = async (toPubkey: string) => {
    if (!toPubkey || !amount || !tokenAccount) return;
    try {
      if (!publicKey || !signTransaction) throw new WalletNotConnectedError();
      const toPublicKey = new PublicKey(toPubkey);
      const mint = new PublicKey(tokenAccount?.account?.data?.parsed?.info?.mint);

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

      // refetch token accounts information to check correct balance
      setTimeout(() => {
        getTokenAccountInfo(publicKey, connection, TOKEN_PROGRAM_ID);
      }, 3000);
      console.log('Transaction sent');
    } catch (error: any) {
      console.log(`Transaction failed: ${error}`);
    }
  };

  const handleStake = async () => {
    if (valid() && amount && publicKey) {
      await onSPLTransactionSend(pool.publicKey); // TODO Need to pass pool.publicKey
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
      {tokenAccount ? (
        <>
          <h3>Stake your token</h3>
          <p>
            Your wallet balance:
            {' '}
            {convertFromLamports(getTokenAcountBalance(tokenAccount))}
          </p>
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
          <button type="button" onClick={() => setTokenAccount(undefined)}>Change token account</button>
          <button type="button" disabled={!valid()} onClick={handleStake}>Stake</button>
        </>
      ) : (
        <>
          <h3>Select token account</h3>
          {tokenAccounts.length ? (
            <ul>
              {tokenAccounts.map((ta) => (
                <li key={ta.pubkey.toBase58()} onClick={() => setTokenAccount(ta)} aria-hidden="true">
                  {ta.account.data.parsed.info.mint}
                  {' '}
                  {`(${ta.account.data.parsed.info.tokenAmount.uiAmount})`}
                </li>
              ))}
            </ul>
          )
            : (
              <p>You do not have SPL token accounts</p>
            )}
        </>
      )}
    </div>
  );
};

export default Stake;
