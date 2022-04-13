import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectActiveColor, setActiveColor } from './shopfloorSlice';

export function ActiveColorChooser() {
	const activeColor = useAppSelector(selectActiveColor);
	const dispatch = useAppDispatch();
	return (
		<>
			<p>Select active color:</p>
			<div>
				<input type="radio" id="none" name="None" value="null" checked={activeColor === null} onChange={() => dispatch(setActiveColor(null))} />
				<label htmlFor="none">None</label>
				<input type="radio" id="red" name="Red" value="red" checked={activeColor === 'red'} onChange={() => dispatch(setActiveColor('red'))} />
				<label htmlFor="red">Red</label>
				<input type="radio" id="green" name="Green" value="green" checked={activeColor === 'green'} onChange={() => dispatch(setActiveColor('green'))} />
				<label htmlFor="green">Green</label>
				<input type="radio" id="blue" name="Blue" value="blue" checked={activeColor === 'blue'} onChange={() => dispatch(setActiveColor('blue'))} />
				<label htmlFor="blue">Blue</label>
				<input type="radio" id="yellow" name="Yellow" value="yellow" checked={activeColor === 'yellow'} onChange={() => dispatch(setActiveColor('yellow'))} />
				<label htmlFor="yellow">Yellow</label>
			</div>
		</>
	)
}