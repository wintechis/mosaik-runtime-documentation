import React from "react";
import { Rect } from "react-konva";

interface StationProps {
	x: number,
	y: number,
	color: string,
}

export function Station(props: StationProps) {
	return (
		<Rect x={props.x * 80 + 10} y={props.y * 80 + 10} width={60} height={60} stroke="black" fill={props.color} />
	);
}