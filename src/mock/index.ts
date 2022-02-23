import { Pool } from '../interfaces/pools';
import { Stake } from '../interfaces/stake';

export const mockedPoolList: Pool[] = [
  {
    tokenMint: 'cdsjkdfskjfdsjkfkdjskjfdsfsdkjjkdfs',
    totalAmount: 19999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'vdsjkdfskjfjadjkfkdjskjfdsfsdkjjkdfs',
    totalAmount: 299999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'mdskfhfskjfdsjkfkdjskjfdsfsdkjjkdfs',
    totalAmount: 499999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'ldsjkdfskjfdsjkjahjskjfdsfsdkjjkdfs',
    totalAmount: 599999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'kdsjkdfskflasjkfkdjskjfdsfsdkjjkdfs',
    totalAmount: 699999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'jdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 799999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'hdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 999999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'gdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 999999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'fdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 259999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'ddsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 59999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'cdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 889999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'bdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 49999999999,
    rewardPerTick: 154234200,
  },
  {
    tokenMint: 'adsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    totalAmount: 89999999999,
    rewardPerTick: 154234200,
  },
];

export const mockedStakeList: Stake[] = [];

export const mockedPoolAddress = (): string => (Math.random() + 1).toString(36);
