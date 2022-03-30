import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectSizeX, selectSizeY } from './shopfloorSlice';
import { Tile } from './Tile';

export function Shopfloor() {
    const width = 80;
    const sizeX = useAppSelector(selectSizeX);
    const sizeY = useAppSelector(selectSizeY);
    let tiles = [];
    for(let i = 0; i < sizeX; i++) {
      for(let j = 0; j < sizeY; j++) {
        tiles.push(<Tile key={i * sizeY + j} x={i} y={j} width={width} />)
      }
    }

    return (
      <>
        {tiles}
      </>
    )
}