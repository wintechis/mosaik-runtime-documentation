import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface TransportersState {
  transporters: TransporterState[];
}

interface TransporterState {
  uri: string;
  idle: boolean;
  locationX: number;
  locationY: number;
	product: string | undefined;
}

const initialState: TransportersState = {
  transporters: [],
}

export const transportersSlice = createSlice({
  name: 'transporters',
  initialState,
  reducers: {
    setTransporterIdle: (state, action: PayloadAction<[string,string]>) => {
      let idle = action.payload[1] === 'https://solid.ti.rw.fau.de/public/ns/arena#idle';
      let station = state.transporters.find((station: TransporterState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.transporters.push({
          uri: action.payload[0],
          idle: idle,
          locationX: 0,
          locationY: 0,
          product: undefined,
        });
      } else {
        station.idle = idle;
      }
    },
    setTransporterLocationX: (state, action: PayloadAction<[string,string]>) => {
      let station = state.transporters.find((station: TransporterState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.transporters.push({
          uri: action.payload[0],
          idle: true,
          locationX: parseInt(action.payload[1]),
          locationY: 0,
          product: undefined,
        });
      } else {
        station.locationX = parseInt(action.payload[1]);
      }
    },
    setTransporterLocationY: (state, action: PayloadAction<[string,string]>) => {
      let station = state.transporters.find((station: TransporterState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.transporters.push({
          uri: action.payload[0],
          idle: true,
          locationX: 0,
          locationY: parseInt(action.payload[1]),
          product: undefined,
        });
      } else {
        station.locationY = parseInt(action.payload[1]);
      }
    },
    setTransporterProduct: (state, action: PayloadAction<[string,string]>) => {
      let transporter = state.transporters.find((station: TransporterState): boolean => station.uri === action.payload[0]);
      if(transporter === undefined) {
        state.transporters.push({
          uri: action.payload[0],
          idle: true,
          locationX: 0,
          locationY: 0,
          product: action.payload[1]
        });
      } else {
        transporter.product = action.payload[1];
      }
    },
  }
})

export const { setTransporterIdle, setTransporterLocationX, setTransporterLocationY, setTransporterProduct } = transportersSlice.actions

export const selectTransporters = (state: RootState) => state.transporters.transporters;

export default transportersSlice.reducer