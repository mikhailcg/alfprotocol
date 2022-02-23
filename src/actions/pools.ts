import { store } from '../utils/store';
import { loading, success, add } from '../slices/pools';
import { mockedPoolAddress, mockedPoolList } from '../mock';

export const getPools = () => (
  new Promise((resolve: any, reject: any) => {
    try {
      store.dispatch(loading());
      setTimeout(() => {
        store.dispatch(success(mockedPoolList));
        resolve(mockedPoolList);
      }, 1500);
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);

export const createPool = (totalAmount: number, rewardPerTick: number) => (
  new Promise((resolve: any, reject: any) => {
    try {
      store.dispatch(add({
        totalAmount,
        rewardPerTick,
        tokenMint: mockedPoolAddress(),
      }));
      resolve();
    } catch (error: any) {
      console.error(error);
      reject(error);
    }
  })
);
