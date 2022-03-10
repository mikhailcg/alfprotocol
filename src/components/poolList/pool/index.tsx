import React, { useState } from 'react';
import { AccountInfo } from '@solana/web3.js';
import { Pool as PoolInterface, Staker } from '../../../sdk';
import { convertFromLamports, getSumByKey } from '../../../utils/formatter';
import { Modal } from '../../common';
import Stake from '../stake';
import { claimFromPool } from '../../../actions/pools';
import './pool.scss';

interface Props {
  pool: PoolInterface;
  wallet: AccountInfo<Buffer> | null;
  address: string | undefined;
}

const Pool: React.FC<Props> = (props: Props) => {
  const {
    pool, wallet, address,
  } = props;
  const [openStake, setOpenStake] = useState<boolean>(false);

  const accountStakes = address ? pool.stakers.filter((s: Staker) => s.publicKey === address) : [];
  const totalStakedAmount = getSumByKey(accountStakes, 'stackedAmount');

  return (
    <div className="pool">
      <p>
        Pool size
        <span>{convertFromLamports(pool.poolInfo.totalAmount)}</span>
      </p>
      <p>
        Reward per tick
        <span>{convertFromLamports(pool.poolInfo.rewardPerTick)}</span>
      </p>
      <p>
        {accountStakes.length ? (
          <>
            Staked
            <span>{convertFromLamports(totalStakedAmount)}</span>
          </>
        ) : null}
      </p>
      {address ? (
        <div className="pool-actions">
          <div className="pool-actions">
            {accountStakes.length ? (
              <button type="button" onClick={() => claimFromPool(pool, accountStakes[0])}>
                Return your stake
              </button>
            ) : (
              <button type="button" onClick={() => setOpenStake(!openStake)}>
                Stake
              </button>
            )}
          </div>
        </div>
      ) : null}
      {openStake && address && wallet && address
        ? (
          <Modal onClose={() => setOpenStake(false)}>
            <Stake pool={pool} wallet={wallet} callback={() => setOpenStake(false)} />
          </Modal>
        )
        : null}
    </div>
  );
};

export default Pool;
