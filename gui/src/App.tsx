import React, { useEffect } from 'react';
import { Layer, Stage } from 'react-konva';
import { Shopfloor } from './features/shopfloor/Shopfloor';
import { Provider, ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import { Parser } from 'n3';
import { setSizeX, setSizeY, setMarker } from './features/shopfloor/shopfloorSlice';
import { useAppDispatch } from './app/hooks';
import { setStationColor, setStationLocationX, setStationLocationY, setStationProduct } from './features/stations/stationsSlice';
import { Stations } from './features/stations/Stations';
import { Transporters } from './features/transporters/Transporters';
import { setTransporterIdle, setTransporterLocationX, setTransporterLocationY, setTransporterProduct } from './features/transporters/transportersSlice';
import { setProductColor } from './features/products/productsSlice';
import { Stats } from './features/stats/Stats';
import { setStatsProductsDelivered } from './features/stats/statsSlice';
import { ActiveColorChooser } from './features/shopfloor/ActiveColorChooser';

function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const ws = new WebSocket('ws://127.0.0.1:8081');
		const parser = new Parser({ format: 'N-Triples' });
		let port2StationMap: Map<string,string> = new Map();
		let port2ProductMap: Map<string,string> = new Map();
		let counter2ColorMap: Map<string,string> = new Map();
		let counter2CountMap: Map<string,string> = new Map();
		let counterList: string[] = [];
		ws.onmessage = function(message) {
			parser.parse(message.data, (error, quad, prefixes) => {
				if(error) {
					console.error(error);
				}
				if(quad) {
					let markerMatch = quad.subject.id.match('^http://127\\.0\\.1\\.1:8080/shopfloor/(\\d+)/(\\d+)/markers/(.+)$');
					if(markerMatch) {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#value') {
							dispatch(setMarker([parseInt(markerMatch[1]), parseInt(markerMatch[2]), markerMatch[3], parseInt(quad.object.value)]));
						}
					} else if(quad.subject.id === 'http://127.0.1.1:8080/shopfloor') {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#sizeX') {
							dispatch(setSizeX(parseInt(quad.object.value)));
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#sizeY') {
							dispatch(setSizeY(parseInt(quad.object.value)));
						}
					} else if(quad.subject.id.startsWith('http://127.0.1.1:8080/shopfloor/')) {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#sizeX') {
							dispatch(setSizeX(parseInt(quad.object.value)));
						}
					} else if(quad.subject.id.startsWith('http://127.0.1.1:8080/stations/')) {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#color') {
							dispatch(setStationColor([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#locationX') {
							dispatch(setStationLocationX([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#locationY') {
							dispatch(setStationLocationY([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#outputPort') {
							let product = port2ProductMap.get(quad.object.id);
							if(product) {
								dispatch(setStationProduct([quad.subject.id, product]));
							}
							port2StationMap.set(quad.object.id, quad.subject.id);
						} 
					} else if(quad.subject.id.startsWith('http://127.0.1.1:8080/transporters/')) {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#status') {
							dispatch(setTransporterIdle([quad.subject.id, quad.object.value]));
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#locationX') {
							dispatch(setTransporterLocationX([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#locationY') {
							dispatch(setTransporterLocationY([quad.subject.id, quad.object.value.replace('https://solid.ti.rw.fau.de/public/ns/arena#','')]));
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#products') {
							dispatch(setTransporterProduct([quad.subject.id, quad.object.value]));
						} 
					} else if(quad.subject.id.startsWith('http://127.0.1.1:8080/products/')) {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#color') {
							dispatch(setProductColor([quad.subject.id, quad.object.value]));
						} 
					} else if(quad.subject.id === 'http://127.0.1.1:8080/productsDelivered') {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#hasCounter') {
							let color = counter2ColorMap.get(quad.object.id);
							let count = counter2CountMap.get(quad.object.id);
							if(color && count) {
								dispatch(setStatsProductsDelivered([color, count]));
							}
							counterList.push(quad.object.id);
						} 
					} else if(quad.subject.termType === "BlankNode") {
						if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#products') {
							let station = port2StationMap.get(quad.subject.id);
							if(station) {
								dispatch(setStationProduct([station, quad.object.id]));
							}
							port2ProductMap.set(quad.subject.id, quad.object.id);
						} else if(quad.predicate.id === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#value') {
							let counter = counterList.find((c: string) => c === quad.subject.id)
							let color = counter2ColorMap.get(quad.subject.id);
							if(counter && color) {
								dispatch(setStatsProductsDelivered([color, quad.object.value]));
							}
							counter2CountMap.set(quad.subject.id, quad.object.value);
						} else if(quad.predicate.id === 'https://solid.ti.rw.fau.de/public/ns/arena#color') {
							let count = counter2CountMap.get(quad.subject.id);
							let counter = counterList.find((c: string) => c === quad.subject.id)
							if(counter && count) {
								dispatch(setStatsProductsDelivered([quad.object.value, count]));
							}
							counter2ColorMap.set(quad.subject.id, quad.object.value);
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
		<>
			<ActiveColorChooser />
			<ReactReduxContext.Consumer>
				{((ctx: ReactReduxContextValue) => (
					<Stage width={1000} height={1000} offsetX={-1} offsetY={-1} style={{margin: '30px', maxWidth: '100%'}}>
						<Provider store={ctx.store}>
							<Layer>
								<Shopfloor />
								<Stations />
								<Transporters />
							</Layer>
						</Provider>
					</Stage>
				))}
			</ReactReduxContext.Consumer>
		</>
	);
}

export default App;