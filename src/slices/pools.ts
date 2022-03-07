import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pool } from '../sdk';
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
    create(state: PoolsStateInterface, action: PayloadAction<Pool>) {
      state.data = [action.payload, ...state.data];
    },
    stake(state: PoolsStateInterface, action: PayloadAction<Pool>) {
      state.data = state.data.map((p) => (p.publicKey === action.payload.publicKey ? action.payload : p));
    },
    claim(state: PoolsStateInterface, action: PayloadAction<Pool>) {
      state.data = state.data.map((p) => (p.publicKey === action.payload.publicKey ? action.payload : p));
    },
  },
});

export const {
  loading, success, create, stake, claim,
} = poolsSlice.actions;
export default poolsSlice.reducer;
