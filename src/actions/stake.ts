import { store } from '../utils/store';
import {
  loading, success, add, remove,
} from '../slices/stake';
import { stake, retStake } from '../slices/pools';
import { decreaseBalance, increaseBalance } from '../slices/wallet';
import { mockedStakeList } from '../mock';
import { Stake as StakeInterface } from '../interfaces/stake';

export const getStakeInfo = async (publicKey: string) => (
  new Promise((resolve: any, reject: any) => {
    try {
      store.dispatch(loading());
      const result = mockedStakeList.filter((s: StakeInterface) => s.walletAddress === publicKey);
      store.dispatch(success(result));
      resolve();
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);

export const addStake = async (data: StakeInterface) => (
  new Promise((resolve: any, reject: any) => {
    try {
      store.dispatch(add(data));
      store.dispatch(stake({ address: data.poolAddress, amount: data.amount }));
      store.dispatch(decreaseBalance(data.amount));
      resolve();
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);

export const returnStake = async (data: StakeInterface) => (
  new Promise((resolve: any, reject: any) => {
    try {
      store.dispatch(remove(data));
      store.dispatch(retStake({ address: data.poolAddress, amount: data.amount }));
      store.dispatch(increaseBalance(data.amount));
      resolve();
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);
