import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Station } from './Station';
import { selectStations } from './stationsSlice';

export function Stations() {
    const stationStates = useAppSelector(selectStations);
    stationStates.forEach(console.log)
    let stations = stationStates.map(s => <Station x={s.locationX} y={s.locationY} color={s.color} />)
 
    return (
      <>
        {stations}
      </>
    )
}