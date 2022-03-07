import { mockedPoolAddress, mockedPoolList } from './mock';

export interface PoolInfo {
  totalAmount: number;
  tokenMint: string;
  rewardPerTick: number;
  maxAmountOfStakers: number;
}

export interface Staker {
  publicKey: string;
  farmAccumulatedBefore: number;
  stackedTimestamp: number;
  stackedAmount: number;
}

export interface Pool {
  publicKey: string;
  poolInfo: PoolInfo;
  stakers: Array<Staker>;
}

export class SPLStakingSDK {
  static pools = (): Promise<Pool[]> => (
    new Promise((resolve, reject) => {
      try {
        // mocked
        setTimeout(() => {
          resolve(mockedPoolList);
        }, 1500);
      } catch (error: any) {
        reject(error);
      }
    })
  );

  static create = (poolParams: PoolInfo): Promise<Pool> => (
    new Promise((resolve, reject) => {
      try {
        // mocked
        setTimeout(() => {
          resolve({
            publicKey: mockedPoolAddress(),
            poolInfo: poolParams,
            stakers: [],
          });
        }, 1000);
      } catch (error: any) {
        reject(error);
      }
    })
  );

  static stake = (pool: Pool, staker: Staker): Promise<Pool> => (
    new Promise((resolve, reject) => {
      try {
        // mocked
        setTimeout(() => {
          resolve({
            ...pool,
            poolInfo: {
              ...pool.poolInfo,
              totalAmount: Number(pool.poolInfo.totalAmount) + Number(staker.stackedAmount),
            },
            stakers: [...pool.stakers, staker],
          });
        }, 1000);
      } catch (error: any) {
        reject(error);
      }
    })
  );

  static claim = (pool: Pool, staker: Staker): Promise<Pool> => (
    new Promise((resolve, reject) => {
      try {
        // mocked
        setTimeout(() => {
          resolve({
            ...pool,
            poolInfo: {
              ...pool.poolInfo,
              // TODO calculate diff between totalAmount like 'total - allUserStakesInThisPull'
              totalAmount: Number(pool.poolInfo.totalAmount) - Number(staker.stackedAmount),
            },
            stakers: pool.stakers.filter((s) => s.publicKey !== staker.publicKey),
          });
        }, 1000);
      } catch (error: any) {
        reject(error);
      }
    })
  );
}
