import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountInfo, PublicKey, ParsedAccountData } from '@solana/web3.js';
import { LoadingType, LoadingStateType } from '../types/global';

export interface TokenAccount {
  pubkey: PublicKey,
  account: AccountInfo<ParsedAccountData>
}

interface TokenAccountsStateInterface {
  data: TokenAccount[] | null;
  loading: LoadingStateType;
  error: any;
}

const initialState: TokenAccountsStateInterface = {
  data: null,
  loading: LoadingType.IDLE,
  error: null,
};

const tokenAccountsSlice = createSlice({
  name: 'tokenAccounts',
  initialState,
  reducers: {
    loading(state: TokenAccountsStateInterface) {
      if (state.loading === LoadingType.IDLE) {
        state.loading = LoadingType.LOADING;
      }
      state.error = null;
    },
    success(state: TokenAccountsStateInterface, action: PayloadAction<TokenAccount[]>) {
      if (state.loading === LoadingType.LOADING) {
        state.loading = LoadingType.IDLE;
      }
      state.data = action.payload;
      state.error = null;
    },
    failed(state: TokenAccountsStateInterface, action: PayloadAction<any>) {
      if (state.loading === LoadingType.LOADING) {
        state.loading = LoadingType.IDLE;
      }
      state.error = action.payload;
    },
  },
});

export const {
  loading, success, failed,
} = tokenAccountsSlice.actions;
export default tokenAccountsSlice.reducer;
