import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Station } from './Station';
import { selectStations } from './stationsSlice';

export function Stations() {
    const stationStates = useAppSelector(selectStations);
    let stations = stationStates.map((s, idx) => <Station key={idx} x={s.locationX} y={s.locationY} color={s.color} />)
 
    return (
      <>
        {stations}
      </>
    )
}