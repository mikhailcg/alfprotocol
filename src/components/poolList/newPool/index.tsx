import React, { useCallback, useState } from 'react';
import { createPool } from '../../../actions/pools';
import { INPUT_AMOUNT_PATTERN, MIN_POOL_REWARD, MIN_POOL_SIZE } from '../../../constants';
import { convertToLamports } from '../../../utils/formatter';
// import { convertFromLamports } from '../../../utils/formatter';
import { Modal } from '../../common';
import './newPool.scss';

const NewPool: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [rewardPerTick, setRewardPerTick] = useState<number>();

  const valid = useCallback((): boolean => {
    // max length after comma validation
    const validTotalAmount: boolean = !!(totalAmount && totalAmount >= MIN_POOL_SIZE);
    const validRewardPerTick: boolean = !!(rewardPerTick && rewardPerTick >= MIN_POOL_REWARD);

    if (validTotalAmount && validRewardPerTick) {
      return true;
    }
    return false;
  }, [totalAmount, rewardPerTick]);

  const dropState = () => {
    setTotalAmount(undefined);
    setRewardPerTick(undefined);
    setOpen(false);
  };

  const handleCreate = () => {
    if (totalAmount && rewardPerTick && valid) {
      createPool(convertToLamports(totalAmount), convertToLamports(rewardPerTick));
    }
    dropState();
  };

  return (
    <div className="new-pool">
      <button type="button" onClick={() => setOpen(!open)}>+</button>
      {open
        ? (
          <Modal onClose={() => dropState()}>
            <div className="new-pool-form">
              <h3>Create new pool</h3>
              <label htmlFor="totalAmount">
                Pool size:
                <input
                  type="number"
                  name="totalAmount"
                  id="totalAmount"
                  lang="en"
                  placeholder={`Minimum ${String(MIN_POOL_SIZE)}`}
                  min={MIN_POOL_SIZE}
                  pattern={INPUT_AMOUNT_PATTERN}
                  value={totalAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalAmount(Number(e.target.value))}
                />
              </label>
              <label htmlFor="rewardPerTick">
                Reward per tick:
                <input
                  type="number"
                  name="rewardPerTick"
                  id="rewardPerTick"
                  lang="en"
                  placeholder={`Minimum ${String(MIN_POOL_REWARD)}`}
                  min={MIN_POOL_REWARD}
                  pattern={INPUT_AMOUNT_PATTERN}
                  value={rewardPerTick}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRewardPerTick(Number(e.target.value))}
                />
              </label>
              <button type="button" disabled={!valid()} onClick={handleCreate}>Create</button>
            </div>
          </Modal>
        )
        : null}
    </div>
  );
};

export default NewPool;
