import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stake } from '../interfaces/stake';
import { LoadingType, LoadingStateType } from '../types/global';

interface StakeStateInterface {
  data: Stake[];
  loading: LoadingStateType;
}

const initialState: StakeStateInterface = {
  data: [],
  loading: LoadingType.IDLE,
};

const stakeSlice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    loading(state: StakeStateInterface) {
      if (state.loading === LoadingType.IDLE) {
        state.loading = LoadingType.LOADING;
      }
    },
    success(state: StakeStateInterface, action: PayloadAction<Stake[]>) {
      if (state.loading === LoadingType.LOADING) {
        state.loading = LoadingType.IDLE;
      }
      state.data = action.payload;
    },
    add(state: StakeStateInterface, action: PayloadAction<Stake>) {
      state.data = [...state.data, action.payload];
    },
    remove(state: StakeStateInterface, action: PayloadAction<Stake>) {
      state.data = state.data.filter((s: Stake) => (
        s.poolAddress !== action.payload.poolAddress && s.walletAddress !== action.payload.walletAddress
      ));
    },
  },
});

export const {
  loading, success, add, remove,
} = stakeSlice.actions;
export default stakeSlice.reducer;
