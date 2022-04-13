import React from "react";
import { Rect, Text } from "react-konva";
import { useAppSelector } from "../../app/hooks";
import { selectActiveColor, selectMarker } from "./shopfloorSlice";

interface TileProps {
	x: number,
	y: number,
	width: number,
}

export function Tile(props: TileProps) {
	let activeColor = useAppSelector(selectActiveColor);
	let stigValue = useAppSelector(selectMarker)(props.x, props.y, activeColor || 'red');
	let text;
	let color = 'white';
	if(activeColor) {
		stigValue = stigValue === undefined ? 20 : stigValue;
		let value: number = stigValue * 40;
		value = value > 255  ? 255 : value
		switch (activeColor) {
			case 'red':
				color = 'rgb(255,' + value + ',' + value + ')';
				break;
			case 'green':
				color = 'rgb(' + value + ',255,' + value + ')';
				break;
			case 'blue':
				color = 'rgb(' + value + ',' + value + ',255)';
				break;
			case 'yellow':
				color = 'rgb(255,255,' + value + ')';
				break;
			default:
				color = 'white';
				break;
		}
		text = <Text x={props.x * props.width + 2} y={props.y * props.width + 2} text={stigValue + ''} fontSize={8} />;
	}
	return (
		<>
			<Rect onClick={()=> window.open('http://127.0.1.1:8080/shopfloor/' + props.x + '/' + props.y, "_blank")} title="bla" x={props.x * props.width} y={props.y * props.width} width={props.width} height={props.width} stroke="black" fill={color}/>
			{text}
		</>
	);
}