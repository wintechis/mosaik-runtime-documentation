import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface ShopfloorState {
  sizeX: number,
  sizeY: number,
  markers: MarkersState[],
  activeColor: string | null,
}

interface MarkersState {
  colors: MarkerState[],
}

interface MarkerState {
  color: string,
  value: number,
}

const initialState: ShopfloorState = {
  sizeX: 0,
  sizeY: 0,
  markers: [],
  activeColor: null, 
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
    setMarker: (state, action: PayloadAction<[number, number, string, number]>) => {
      let idx = action.payload[0] + action.payload[1] * state.sizeX;
      let markers = state.markers[idx];
      if(markers) {
        let marker = markers.colors.find(m => m.color === action.payload[2]);
        if(marker) {
          marker.value = action.payload[3];
        } else {
          markers.colors.push({
            color: action.payload[2],
            value: action.payload[3],
          });
        }
      } else {
        state.markers[idx] = {
          colors: [
            {
              color: action.payload[2],
              value: action.payload[3],
            }
          ]
        };
      }
    },
    setActiveColor: (state, action: PayloadAction<string|null>) => {
      state.activeColor = action.payload;
    },
  }
})

export const { setSizeX, setSizeY, setMarker, setActiveColor } = shopfloorSlice.actions

export const selectSizeX = (state: RootState) => state.shopfloor.sizeX;
export const selectSizeY = (state: RootState) => state.shopfloor.sizeY;
export const selectMarker = (state: RootState) => (x: number, y: number, color: string) => state.shopfloor.markers[x + y * state.shopfloor.sizeX]?.colors.find(m => m.color == color)?.value;
export const selectActiveColor = (state: RootState) => state.shopfloor.activeColor;

export default shopfloorSlice.reducer