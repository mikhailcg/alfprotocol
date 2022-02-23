import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pool } from '../interfaces/pools';
import { LoadingType, LoadingStateType } from '../types/global';

interface PoolsStateInterface {
  data: Pool[];
  loading: LoadingStateType;
}

const initialState: PoolsStateInterface = {
  data: [],
  loading: LoadingType.IDLE,
};

const poolsSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    loading(state: PoolsStateInterface) {
      if (state.loading === LoadingType.IDLE) {
        state.loading = LoadingType.LOADING;
      }
    },
    success(state: PoolsStateInterface, action: PayloadAction<Pool[]>) {
      if (state.loading === LoadingType.LOADING) {
        state.loading = LoadingType.IDLE;
      }
      state.data = action.payload;
    },
    stake(state: PoolsStateInterface, action: PayloadAction<{ address: string, amount: number }>) {
      state.data = state.data.map((p: Pool) => (
        p.tokenMint === action.payload.address ? { ...p, totalAmount: p.totalAmount + action.payload.amount } : p
      ));
    },
    add(state: PoolsStateInterface, action: PayloadAction<Pool>) {
      state.data = [action.payload, ...state.data];
    },
    retStake(state: PoolsStateInterface, action: PayloadAction<{ address: string, amount: number }>) {
      state.data = state.data.map((p: Pool) => (
        p.tokenMint === action.payload.address ? { ...p, totalAmount: p.totalAmount - action.payload.amount } : p
      ));
    },
  },
});

export const {
  loading, success, stake, retStake, add,
} = poolsSlice.actions;
export default poolsSlice.reducer;
