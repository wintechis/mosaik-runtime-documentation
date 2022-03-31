import React from "react";
import { Circle, Rect } from "react-konva";

interface StationProps {
	x: number,
	y: number,
	color: string,
}

export function Station(props: StationProps) {
	return (
		<>
			<Rect x={props.x * 80 + 10} y={props.y * 80 + 10} width={60} height={60} stroke="black" fill={props.color} />
			<Circle x={props.x * 80 + 40} y={props.y * 80 + 40} radius={10} stroke="black" />
		</>
	);
}