import React from "react";
import { Rect } from "react-konva";

interface TileProps {
	x: number,
	y: number,
	width: number,
}

export function Tile(props: TileProps) {
	return (
		<Rect x={props.x * props.width} y={props.y * props.width} width={props.width} height={props.width} stroke="black" />
	);
}