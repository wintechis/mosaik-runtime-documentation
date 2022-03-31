import React from "react";
import { Circle, Rect } from "react-konva";
import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "../products/productsSlice";

interface StationProps {
	x: number,
	y: number,
	color: string,
	product: string | undefined,
}

export function Station(props: StationProps) {
	let product = useAppSelector(selectProducts).find(p => p.uri === props.product);
	let productCircle = <Circle x={props.x * 80 + 40} y={props.y * 80 + 40} radius={10} stroke="black" fill={product?.color || "white"} />;
	return (
		<>
			<Rect x={props.x * 80 + 10} y={props.y * 80 + 10} width={60} height={60} stroke="black" fill={props.color} />
			{productCircle}
		</>
	);
}