import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import shopfloorReducer from '../features/shopfloor/shopfloorSlice';
import stationsReducer from '../features/stations/stationsSlice';
import transportersReducer from '../features/transporters/transportersSlice';

export const store = configureStore({
  reducer: {
    shopfloor: shopfloorReducer,
    stations: stationsReducer,
    transporters: transportersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;