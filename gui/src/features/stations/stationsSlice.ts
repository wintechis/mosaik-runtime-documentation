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
}

const initialState: StationsState = {
  stations: [],
}

export const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<[string,string]>) => {
      let station = state.stations.find((station: StationState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.stations.push({
          uri: action.payload[0],
          color: action.payload[1],
          locationX: 0,
          locationY: 0,
        });
      } else {
        station.color = action.payload[1];
      }
    },
    setLocationX: (state, action: PayloadAction<[string,string]>) => {
      let station = state.stations.find((station: StationState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.stations.push({
          uri: action.payload[0],
          color: 'white',
          locationX: parseInt(action.payload[1]),
          locationY: 0,
        });
      } else {
        station.locationX = parseInt(action.payload[1]);
      }
    },
    setLocationY: (state, action: PayloadAction<[string,string]>) => {
      let station = state.stations.find((station: StationState): boolean => station.uri === action.payload[0]);
      if(station === undefined) {
        state.stations.push({
          uri: action.payload[0],
          color: 'white',
          locationX: 0,
          locationY: parseInt(action.payload[1]),
        });
      } else {
        station.locationY = parseInt(action.payload[1]);
      }
    },
  }
})

export const { setColor, setLocationX, setLocationY } = stationsSlice.actions

export const selectStations = (state: RootState) => state.stations.stations;
//export const selectSizeY = (state: RootState) => state.shopfloor.sizeY

export default stationsSlice.reducer