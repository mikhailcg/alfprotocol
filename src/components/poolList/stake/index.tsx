import React, { useCallback, useState } from 'react';
import { AccountInfo } from '@solana/web3.js';
import { Pool as PoolInterface } from '../../../sdk';
import { convertFromLamports, convertToLamports } from '../../../utils/formatter';
import { stakeToPool } from '../../../actions/pools';
import { INPUT_AMOUNT_PATTERN } from '../../../constants';
import './stake.scss';

interface Props {
  wallet: AccountInfo<Buffer>;
  pool: PoolInterface;
  callback: () => void;
  address: string;
}

const Stake: React.FC<Props> = (props: Props) => {
  const {
    wallet, callback, pool, address,
  } = props;
  const [amount, setAmount] = useState<number>();

  const valid = useCallback((): boolean => {
    // max length after comma validation
    if (amount && (wallet.lamports >= convertToLamports(amount))) {
      return true;
    }
    return false;
  }, [amount, wallet]);

  const handleStake = async () => {
    if (valid() && amount) {
      stakeToPool(pool, {
        publicKey: address,
        farmAccumulatedBefore: pool.poolInfo.totalAmount,
        stackedTimestamp: new Date().getTime(),
        stackedAmount: convertToLamports(amount),
      }).then(() => callback());
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
