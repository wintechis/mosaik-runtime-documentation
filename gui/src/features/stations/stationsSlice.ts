import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface StationsState {
  stations: StationState[];
}

interface StationState {
  uri: string;
  color: string;
  locationX: number;
  locationY: number;
  product: string | undefined;
}

const initialState: StationsState = {
  stations: [],
}

export const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    setStationColor: (state, action: PayloadAction<[string,string]>) => {
      let station = state.stations.find((station: StationState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.stations.push({
          uri: action.payload[0],
          color: action.payload[1],
          locationX: 0,
          locationY: 0,
          product: undefined,
        });
      } else {
        station.color = action.payload[1];
      }
    },
    setStationLocationX: (state, action: PayloadAction<[string,string]>) => {
      let station = state.stations.find((station: StationState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.stations.push({
          uri: action.payload[0],
          color: 'white',
          locationX: parseInt(action.payload[1]),
          locationY: 0,
          product: undefined,
        });
      } else {
        station.locationX = parseInt(action.payload[1]);
      }
    },
    setStationLocationY: (state, action: PayloadAction<[string,string]>) => {
      let station = state.stations.find((station: StationState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.stations.push({
          uri: action.payload[0],
          color: 'white',
          locationX: 0,
          locationY: parseInt(action.payload[1]),
          product: undefined,
        });
      } else {
        station.locationY = parseInt(action.payload[1]);
      }
    },
    setStationProduct: (state, action: PayloadAction<[string,string]>) => {
      let station = state.stations.find((station: StationState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.stations.push({
          uri: action.payload[0],
          color: 'white',
          locationX: 0,
          locationY: 0,
          product: action.payload[1],
        });
      } else {
        station.product = action.payload[1];
      }
    },
  }
})

export const { setStationColor, setStationLocationX, setStationLocationY, setStationProduct } = stationsSlice.actions

export const selectStations = (state: RootState) => state.stations.stations;

export default stationsSlice.reducer