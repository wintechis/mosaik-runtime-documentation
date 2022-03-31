import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface ProductsState {
  products: ProductState[];
}

interface ProductState {
  uri: string;
	color: string;
}

const initialState: ProductsState = {
  products: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductColor: (state, action: PayloadAction<[string,string]>) => {
      let station = state.products.find((station: ProductState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.products.push({
          uri: action.payload[0],
          color: action.payload[1].replace('https://solid.ti.rw.fau.de/public/ns/arena#', ''),
        });
      } else {
        station.color = action.payload[1].replace('https://solid.ti.rw.fau.de/public/ns/arena#', '');
      }
    },
  }
})

export const { setProductColor } = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer