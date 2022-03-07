import { configureStore } from '@reduxjs/toolkit';
import pools from '../slices/pools';
import wallet from '../slices/wallet';

export const store = configureStore({
  reducer: {
    pools,
    wallet,
  },
});

export type RootState = ReturnType<typeof store.getState>;
