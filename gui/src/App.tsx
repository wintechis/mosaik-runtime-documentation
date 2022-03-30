import React, { useEffect } from 'react';
import { Layer, Stage } from 'react-konva';
import { Shopfloor } from './features/shopfloor/Shopfloor';
import { Provider, ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import { Parser } from 'n3';
import { setSizeX, setSizeY } from './features/shopfloor/shopfloorSlice';
import { useAppDispatch } from './app/hooks';
import { setColor, setLocationX, setLocationY } from './features/stations/stationsSlice';
import { Stations } from './features/stations/Stations';

function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const ws = new WebSocket('ws://127.0.0.1:8081');
		const parser = new Parser({ format: 'N-Triples' });
		ws.onmessage = function(message) {
			parser.parse(message.data, (error, quad, prefixes) => {
				if(error) {
					console.error(error);
				}
				if(quad) {
					if(quad.subject.id === 'http://127.0.1.1:8080/shopfloor') {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#sizeX') {
							dispatch(setSizeX(parseInt(quad.object.value)));
							console.log('setSizeX ' + quad.object.value);
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#sizeY') {
							dispatch(setSizeY(parseInt(quad.object.value)));
							console.log('setSizeY ' + quad.object.value);
						}
					} else if(quad.subject.id.startsWith('http://127.0.1.1:8080/stations/')) {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#color') {
							dispatch(setColor([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
							console.log('setColor ' + quad.object.value);
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#locationX') {
							dispatch(setLocationX([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
							console.log('setLocationX ' + quad.object.value);
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#locationY') {
							dispatch(setLocationY([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
							console.log('setLocationY ' + quad.object.value);
						} 
					}
				}
			});
		};

		return () => {
			ws.close();
		}
	}, [dispatch]);
	return (
		<ReactReduxContext.Consumer>
			{((ctx: ReactReduxContextValue) => (
				<Stage width={1000} height={1000} offsetX={-1} offsetY={-1} style={{margin: '30px', maxWidth: '100%'}}>
					<Provider store={ctx.store}>
						<Layer>
							<Shopfloor />
							<Stations />
						</Layer>
					</Provider>
				</Stage>
			))}
		</ReactReduxContext.Consumer>
	);
}

export default App;