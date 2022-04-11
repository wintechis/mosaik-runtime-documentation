import React from "react";
import { Circle, Rect, Text } from "react-konva";
import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "../products/productsSlice";

interface TransporterProps {
	uri: string,
	x: number,
	y: number,
	idle: boolean,
	product: string | undefined,
}


export function Transporter(props: TransporterProps) {
	let color = props.idle ? 'grey' : 'lightgrey';
	let tid = props.uri.split('/').pop();
	let product = useAppSelector(selectProducts).find(p => p.uri === props.product);
	let productCircle = <Circle x={props.x * 80 + 40} y={props.y * 80 + 40} radius={10} stroke="black" fill={product?.color || "white"} />;
	return (
		<>
			<Rect x={props.x * 80 + 20} y={props.y * 80 + 20} width={40} height={40} stroke="black" fill={color} />
			<Text x={props.x * 80 + 22} y={props.y * 80 + 22} text={tid} />
			{productCircle}
		</>
	);
}