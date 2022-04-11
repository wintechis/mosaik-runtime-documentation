import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface StatsState {
  productsDelivered: ProductDeliveredState[];
}

interface ProductDeliveredState {
  color: string;
  count: number;
}

const initialState: StatsState = {
  productsDelivered: [],
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStatsProductsDelivered: (state, action: PayloadAction<[string,string]>) => {
      let pd = state.productsDelivered.find((pd: ProductDeliveredState): boolean => pd.color === action.payload[0].replace('https://solid.ti.rw.fau.de/public/ns/arena#', ''));
      if(pd === undefined) {
        state.productsDelivered.push({
          color: action.payload[0].replace('https://solid.ti.rw.fau.de/public/ns/arena#', ''),
          count: parseInt(action.payload[1]),
        });
      } else {
        pd.count = parseInt(action.payload[1]);
      }
    },
  }
})

export const { setStatsProductsDelivered } = statsSlice.actions

export const selectProductsDelivered = (state: RootState) => state.stats.productsDelivered;

export default statsSlice.reducer