import React from "react";
import { Circle, Rect, Text } from "react-konva";

interface TransporterProps {
	uri: string,
	x: number,
	y: number,
	idle: boolean,
}

export function Transporter(props: TransporterProps) {
	let color = props.idle ? 'grey' : 'lightgrey';
	let tid = props.uri.split('/').pop();
	return (
		<>
			<Rect x={props.x * 80 + 20} y={props.y * 80 + 20} width={40} height={40} stroke="black" fill={color} />
			<Text x={props.x * 80 + 22} y={props.y * 80 + 22} text={tid} />
			<Circle x={props.x * 80 + 40} y={props.y * 80 + 40} radius={10} stroke="black" />
		</>
	);
}