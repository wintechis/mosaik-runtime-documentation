import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface ShopfloorState {
  sizeX: number,
  sizeY: number,
}

const initialState: ShopfloorState = {
  sizeX: 0,
  sizeY: 0,
}

export const shopfloorSlice = createSlice({
  name: 'shopfloor',
  initialState,
  reducers: {
    setSizeX: (state, action: PayloadAction<number>) => {
      state.sizeX = action.payload;
    },
    setSizeY: (state, action: PayloadAction<number>) => {
      state.sizeY = action.payload;
    },
  }
})

export const { setSizeX, setSizeY } = shopfloorSlice.actions

export const selectSizeX = (state: RootState) => state.shopfloor.sizeX
export const selectSizeY = (state: RootState) => state.shopfloor.sizeY

export default shopfloorSlice.reducer