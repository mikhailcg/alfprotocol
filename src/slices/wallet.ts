import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountInfo } from '@solana/web3.js';
import { LoadingType, LoadingStateType } from '../types/global';

interface WalletStateInterface {
  data: AccountInfo<Buffer> | null;
  loading: LoadingStateType;
  error: any;
}

const initialState: WalletStateInterface = {
  data: null,
  loading: LoadingType.IDLE,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    loading(state: WalletStateInterface) {
      if (state.loading === LoadingType.IDLE) {
        state.loading = LoadingType.LOADING;
      }
      state.error = null;
    },
    success(state: WalletStateInterface, action: PayloadAction<AccountInfo<Buffer>>) {
      if (state.loading === LoadingType.LOADING) {
        state.loading = LoadingType.IDLE;
      }
      state.data = action.payload;
      state.error = null;
    },
    failed(state: WalletStateInterface, action: PayloadAction<any>) {
      if (state.loading === LoadingType.LOADING) {
        state.loading = LoadingType.IDLE;
      }
      state.error = action.payload;
    },
    disconnect(state: WalletStateInterface) {
      state.data = null;
    },
  },
});

export const {
  loading, success, failed, disconnect,
} = walletSlice.actions;
export default walletSlice.reducer;
