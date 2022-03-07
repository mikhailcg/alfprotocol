import { MAX_AMOUNT_OF_STAKERS } from '../../constants';
import { Pool } from '../index';

export const mockedPoolList: Pool[] = [
  {
    publicKey: 'cdsjkdfskjfdsjkfkdjskjfdsfsdkjjkdfs',
    poolInfo: {
      tokenMint: 'cdsjkdfskjfdsjkfkdjskjfdsfsdkjjkdfs',
      totalAmount: 19999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'vdsjkdfskjfjadjkfkdjskjfdsfsdkjjkdfs',
    poolInfo: {
      tokenMint: 'vdsjkdfskjfjadjkfkdjskjfdsfsdkjjkdfs',
      totalAmount: 299999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'mdskfhfskjfdsjkfkdjskjfdsfsdkjjkdfs',
    poolInfo: {
      tokenMint: 'mdskfhfskjfdsjkfkdjskjfdsfsdkjjkdfs',
      totalAmount: 499999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'ldsjkdfskjfdsjkjahjskjfdsfsdkjjkdfs',
    poolInfo: {
      tokenMint: 'ldsjkdfskjfdsjkjahjskjfdsfsdkjjkdfs',
      totalAmount: 599999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'kdsjkdfskflasjkfkdjskjfdsfsdkjjkdfs',
    poolInfo: {
      tokenMint: 'kdsjkdfskflasjkfkdjskjfdsfsdkjjkdfs',
      totalAmount: 699999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'jdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'jdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 799999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'hdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'hdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 999999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'gdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'gdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 999999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'fdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'fdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 259999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'ddsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'ddsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 59999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'cdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'cdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 889999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'bdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'bdsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 49999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
  {
    publicKey: 'adsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
    poolInfo: {
      tokenMint: 'adsjkdfskjfdsjkfkdjskjfdsfsdkjjfnfs',
      totalAmount: 89999999999,
      rewardPerTick: 154234200,
      maxAmountOfStakers: MAX_AMOUNT_OF_STAKERS,
    },
    stakers: [],
  },
];

export const mockedPoolAddress = (): string => (Math.random() + 1).toString(36);
