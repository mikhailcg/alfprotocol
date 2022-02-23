import { configureStore } from '@reduxjs/toolkit';
import pools from '../slices/pools';
import wallet from '../slices/wallet';
import stake from '../slices/stake';

export const store = configureStore({
  reducer: {
    pools,
    wallet,
    stake,
  },
});

export type RootState = ReturnType<typeof store.getState>;
