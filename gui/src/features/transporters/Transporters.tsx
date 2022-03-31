import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Transporter } from './Transporter';
import { selectTransporters } from './transportersSlice';

export function Transporters() {
  const transporterStates = useAppSelector(selectTransporters);
  let transporters = transporterStates.map((s, idx) => <Transporter key={idx} uri={s.uri} x={s.locationX} y={s.locationY} idle={s.idle} product={s.product} />)

  return (
    <>
      {transporters}
    </>
  )
}