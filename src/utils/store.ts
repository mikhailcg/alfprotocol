import { configureStore } from '@reduxjs/toolkit';
import pools from '../slices/pools';
import wallet from '../slices/wallet';
import tokenAccounts from '../slices/tokenAccounts';

export const store = configureStore({
  reducer: {
    pools,
    wallet,
    tokenAccounts,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: false,
    })
  ),
});

export type RootState = ReturnType<typeof store.getState>;
