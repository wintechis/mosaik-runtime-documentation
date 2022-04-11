import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProductsDelivered } from './statsSlice';

export function Stats() {
  const productsDelivered = useAppSelector(selectProductsDelivered);
  let pds = productsDelivered.map((pd, idx) => <div key={idx}>{pd.color}: {pd.count}</div>)

  return (
    <>
      {pds}
    </>
  )
}