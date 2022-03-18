import React, { useState } from 'react';
import { Pool as PoolInterface, Staker } from '../../../sdk';
import { convertFromLamports, getSumByKey } from '../../../utils/formatter';
import { Modal } from '../../common';
import Stake from '../stake';
import { claimFromPool } from '../../../actions/pools';
import './pool.scss';
import { TokenAccount } from '../../../slices/tokenAccounts';

interface Props {
  pool: PoolInterface;
  tokenAccounts: TokenAccount[] | null;
  address: string | undefined;
}

const Pool: React.FC<Props> = (props: Props) => {
  const {
    pool, tokenAccounts, address,
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
      {openStake && address && address
        ? (
          <Modal onClose={() => setOpenStake(false)}>
            <Stake
              tokenAccounts={tokenAccounts || []}
              pool={pool}
              callback={() => setOpenStake(false)}
            />
          </Modal>
        )
        : null}
    </div>
  );
};

export default Pool;
