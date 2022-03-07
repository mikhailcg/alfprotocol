import { store } from '../utils/store';
import {
  loading, success, create, stake, claim,
} from '../slices/pools';
import { decreaseBalance, increaseBalance } from '../slices/wallet';
import {
  SPLStakingSDK, PoolInfo, Pool, Staker,
} from '../sdk';

export const getPools = () => (
  new Promise((resolve: any, reject: any) => {
    try {
      store.dispatch(loading());
      SPLStakingSDK.pools().then((pools) => {
        store.dispatch(success(pools));
        resolve(pools);
      });
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);

export const createPool = (poolInfo: PoolInfo) => (
  new Promise((resolve: any, reject: any) => {
    try {
      SPLStakingSDK.create(poolInfo).then((pool) => {
        store.dispatch(create(pool));
        resolve(pool);
      });
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);

export const stakeToPool = (pool: Pool, staker: Staker) => (
  new Promise((resolve: any, reject: any) => {
    try {
      SPLStakingSDK.stake(pool, staker).then((p) => {
        store.dispatch(stake(p));
        store.dispatch(decreaseBalance(Number(staker.stackedAmount)));
        resolve(pool);
      });
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);

export const claimFromPool = (pool: Pool, staker: Staker) => (
  new Promise((resolve: any, reject: any) => {
    try {
      SPLStakingSDK.claim(pool, staker).then((p) => {
        store.dispatch(claim(p));
        store.dispatch(increaseBalance(Number(staker.stackedAmount)));
        resolve(pool);
      });
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);
