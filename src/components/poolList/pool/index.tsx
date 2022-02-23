import React, { useState } from 'react';
import { AccountInfo } from '@solana/web3.js';
import { Pool as PoolInterface } from '../../../interfaces/pools';
import { Stake as StakeInterface } from '../../../interfaces/stake';
import { convertFromLamports } from '../../../utils/formatter';
import './pool.scss';
import { Modal } from '../../common';
import Stake from '../stake';
import { returnStake } from '../../../actions/stake';

interface Props {
  pool: PoolInterface;
  wallet: AccountInfo<Buffer> | null;
  address: string | undefined;
  stake: StakeInterface | undefined;
}

const Pool: React.FC<Props> = (props: Props) => {
  const {
    pool, wallet, address, stake,
  } = props;
  const [openStake, setOpenStake] = useState<boolean>(false);

  return (
    <div className="pool">
      <p>
        Pool size
        <span>{convertFromLamports(pool.totalAmount)}</span>
      </p>
      <p>
        Reward per tick
        <span>{convertFromLamports(pool.rewardPerTick)}</span>
      </p>
      <p>
        {stake ? (
          <>
            Staked
            <span>{convertFromLamports(stake.amount)}</span>
          </>
        ) : null}
      </p>
      {address ? (
        <div className="pool-actions">
          <div className="pool-actions">
            {stake ? (
              <button type="button" onClick={() => returnStake(stake)}>
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
            <Stake address={address} pool={pool} wallet={wallet} callback={() => setOpenStake(false)} />
          </Modal>
        )
        : null}
    </div>
  );
};

export default Pool;
