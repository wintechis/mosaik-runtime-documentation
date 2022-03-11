import React, { Component } from 'react';
import { Group, Stage, Layer, Rect, Line, Circle, Text } from 'react-konva';
import Konva from 'konva';
import { Bindings } from '@comunica/bus-query-operation';
import { DataFactory } from 'rdf-data-factory';
const N3 = require('n3');
const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();
const factory = new DataFactory();

//const baseURI = 'https://localhost:8443/arena2036/'

class Grid extends React.Component {
  render() {
    let lines = []
    for(let i = 0; i <= this.props.width * 30; i += 30) {
        lines.push(<Line key={i + 1} points={[i,0,i,this.props.height * 30]} stroke="black" strokeWidth={0.5} />)
    }
    for(let j = 0; j <= this.props.height * 30; j += 30) {
      lines.push(<Line key={-j - 1} points={[0,j,this.props.width * 30,j]} stroke="black" strokeWidth={0.5} />)
    }
    return (
      <Layer>
        {lines}
      </Layer>
    )
  }
}

class ProductStack extends React.Component {
  render() {
    return (
      <Group>
        <Circle
          x={this.props.x * 30 + 15}
          y={this.props.y * 30 + 15}
          radius={10}
          fill='orange'
          stroke='black'
          strokeWidth={1.5}
        />
        <Text x={this.props.x * 30 + 11} y={this.props.y * 30 + 10} fontSize={14} align="center" text={this.props.ps.length} />
      </Group>
    )
  }
}

class Port extends React.Component {
  render() {
    let color = this.props.input === 'true' ? 'green' : 'red';
    return (
      <Group>
        <Rect
          x={this.props.x * 30}
          y={this.props.y * 30}
          width={30}
          height={30}
          fill={color}
          opacity={0.5}
        />
      </Group>
    )
  }
}


class Gear extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rotation: 0
    }
    this.anim = new Konva.Animation(frame => this.setState({
      rotation: this.state.rotation + frame.timeDiff / 5
    }))
  }

  componentDidUpdate(oldProps) {
    if(oldProps.on !== this.props.on) {
      if(this.props.on) {
        this.anim.start();
      } else {
        this.anim.stop();
      }
    }
  }

  render() {
    return (
      <Group>
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={6}
          fill='grey'
          stroke='black'
          strokeWidth={1.5}
        />
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={4}
          height={5}
          offsetX={2}
          offsetY={-3}
          rotation={this.state.rotation}
          fill='grey'
          stroke='black'
          strokeWidth={1.5}
        />
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={4}
          height={5}
          offsetX={2}
          offsetY={-3}
          rotation={this.state.rotation + 60}
          fill='grey'
          stroke='black'
          strokeWidth={1.5}
        />
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={4}
          height={5}
          offsetX={2}
          offsetY={-3}
          rotation={this.state.rotation + 120}
          fill='grey'
          stroke='black'
          strokeWidth={1.5}
        />
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={4}
          height={5}
          offsetX={2}
          offsetY={-3}
          rotation={this.state.rotation + 180}
          fill='grey'
          stroke='black'
          strokeWidth={1.5}
        />
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={4}
          height={5}
          offsetX={2}
          offsetY={-3}
          rotation={this.state.rotation + 240}
          fill='grey'
          stroke='black'
          strokeWidth={1.5}
        />
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={4}
          height={5}
          offsetX={2}
          offsetY={-3}
          rotation={this.state.rotation + 300}
          fill='grey'
          stroke='black'
          strokeWidth={1.5}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={5}
          fill='grey'
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={2}
          fill={this.props.background}
          stroke='black'
          strokeWidth={1.5}
        />
      </Group>
    );
  }
}

class Station extends React.Component {
  colorMap = {
    'memoryStorage': '#4680b9',
    'cpuStorage': '#0080ff',
    'boardStorage': '#4040bf',
    'soldering': '#0000ff',
    'fixing': '#00ffff',
    'portStorage': '#4db3b3',
    'metalStorage': '#bfbf40',
    'metalCasting': '#ffff00',
    'plasticStorage': '#bf9f40',
    'plasticCasting': '#ffbf00',
    'bolting': '#46b946',
    'communicationStorage': '#4000ff',
    'sensorStorage': '#8000ff',
    'batteryCellStorage': '#b34db3',
    'combining': '#ff00ff',
    'gluing': '#ff0000',
    'delivery': '#ff9999',
    'glasStorage': '#cc3333',
    'lcdStorage': '#990000',
  }
  render() {
    return (
      <Group>
        <Rect
          x={this.props.x1 * 30}
          y={this.props.y1 * 30}
          width={(this.props.x2 - this.props.x1 + 1) * 30}
          height={(this.props.y2 - this.props.y1 + 1) * 30}
          fill={this.colorMap[this.props.skill]}
          stroke='black'
          strokeWidth={1.5}
        />
        <Text
          x={this.props.x1 * 30 + 5}
          y={this.props.y1 * 30 + 5}
          width={50}
          text={this.props.skill}
          wrap='char'
        />
        <Gear x={this.props.x1 * 30 + 45} y={this.props.y1 * 30 + 45} on={this.props.running} background={this.colorMap[this.props.skill]}/>
      </Group>
    )
  }
}

class Transporter extends React.Component {
  render() {
    return (
      <Group>
        <Rect
          x={this.props.x * 30}
          y={this.props.y * 30}
          width={30}
          height={30}
          fill='#bbbbbb'
          stroke='black'
          strokeWidth={1.5}
        />
        <Circle
          x={this.props.x * 30 + 15}
          y={this.props.y * 30 + 15}
          radius={10}
          fill='#e4e4e4'
          stroke='black'
          strokeWidth={1.5}
        />
      </Group>
    )
  }
}

/*
class Order extends React.Component {
  render() {
    let uri = baseURI + 'orders/' + this.props.entity + '/#order'
    return (
      <div
        onMouseEnter={() => this.props.setHoverUri(uri)}
        onMouseLeave={() => this.props.setHoverUri('')}
        onMouseUp={() => window.open(uri, '_blank')}
        style={{
          border: '2pt solid',
          padding: '10pt',
          fontSize: 'smaller',
          marginTop: '25px'
        }}
      >
        <h2 style={{margin: '5pt', paddingLeft: '1pt'}}>Order {this.props.entity}</h2>
        <table style={{margin: '5pt', width: '100%'}}>
          <tbody>
            <tr>
              <th style={{textAlign: 'left'}}>RAM:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.ram} GB
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>CPU:</th>
              <td>
                {this.props.requirements.cpu.split('#')[1]}
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>Memory:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.memory} GB
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>Ports:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.ports.map(p => p.split('#')[1]).join(', ')}
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>Case:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.case.split('#')[1]}
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>Com. Units:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.communication.map(c => c.split('#')[1]).join(', ')}
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>Sensor Units:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.sensor.map(s => s.split('#')[1]).join(', ')}
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>Battery:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.battery} mAh
              </td>
            </tr>
            <tr>
              <th style={{textAlign: 'left'}}>Display Size:</th>
              <td style={{textAlign: 'left'}}>
                {this.props.requirements.display}''
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
*/

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
    this.updateProducts = this.updateProducts.bind(this);
  }

  componentDidMount() {
    this.updateProducts();
  }

  componentDidUpdate(oldProps) {
    if(oldProps.step !== this.props.step) {
      this.updateProducts();
    }
  }

  updateProducts() {
    // Get products to App state via Comunica
    myEngine.query(`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX arena: <http://arena2036.example.org/>
      PREFIX sim: <http://ti.rw.fau.de/sim#>

      SELECT *
      WHERE {
        GRAPH ?product {
          ?product a arena:Product ;
            arena:kind ?kind ;
            arena:locationX ?locationX ;
            arena:locationY ?locationY .
        }
      } 
      `, {
      sources: [`http://localhost:8000/modularSmartphone-${this.props.step}.trig`],
    }).then((result) => {
      let products = []
      result.bindingsStream.on('data', (binding) => {
        products.push({
          'id': binding.get('?product').value,
          'kind': binding.get('?kind').value,
          'x': binding.get('?locationX').value,
          'y': binding.get('?locationY').value,
        })
      });
      result.bindingsStream.on('end', () => this.setState({'products': products}));
    }).catch(console.error);
  }

  render() {
    console.log('Render products')
    let prod = [...this.state.products];
    let stacks = [];
    let i = 0;
    while(prod.length > 0) {
      let p = prod.pop();
      let ps = [...prod.filter(pro => pro.x === p.x && pro.y === p.y), p];
      stacks.push(<ProductStack key={i} x={p.x} y={p.y} ps={ps}/>)
      prod = prod.filter(pro => !(pro.x === p.x && pro.y === p.y))
      i++;
    }
    return (
      <>
        {stacks}
      </>
    )
  }
}

class Ports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ports: []
    }
    this.updatePorts = this.updatePorts.bind(this);
  }

  componentDidMount() {
    this.updatePorts();
  }

  componentDidUpdate(oldProps) {
    if(oldProps.step !== this.props.step) {
      this.updatePorts();
    }
  }

  updatePorts() {
    // Get ports to App state via Comunica
    myEngine.query(`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX arena: <http://arena2036.example.org/>
      PREFIX sim: <http://ti.rw.fau.de/sim#>

      SELECT *
      WHERE {
        GRAPH ?station {
          {
            ?station arena:inputPort ?port .

            BIND (TRUE AS ?input)
          } UNION {
            ?station arena:outputPort ?port .

            BIND (FALSE AS ?input)
          }

          ?port a arena:Port ;
            arena:locationX ?locationX ;
            arena:locationY ?locationY .
        }
      } 
      `, {
      sources: [`http://localhost:8000/modularSmartphone-${this.props.step}.trig`],
    }).then((result) => {
      let ports = []
      result.bindingsStream.on('data', (binding) => {
        ports.push({
          'id': binding.get('?port').value,
          'x': binding.get('?locationX').value,
          'y': binding.get('?locationY').value,
          'input': binding.get('?input').value,
        })
      });
      result.bindingsStream.on('end', () => this.setState({'ports': ports}));
    }).catch(console.error);
  }

  render() {
    console.log('Render ports')
    let ports = this.state.ports.map((t) => <Port key={t.id} id={t.id} input={t.input} x={t.x} y={t.y} />)
    return (
      <>
        {ports}
      </>
    )
  }
}

class Stations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: []
    }
    this.updateStations = this.updateStations.bind(this);
  }

  componentDidMount() {
    this.updateStations();
  }

  componentDidUpdate(oldProps) {
    if(oldProps.step !== this.props.step) {
      this.updateStations();
    }
  }

  updateStations() {
    // Get stations to App state via Comunica
    myEngine.query(`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX arena: <http://arena2036.example.org/>
      PREFIX sim: <http://ti.rw.fau.de/sim#>

      SELECT *
      WHERE {
        GRAPH ?station {
          ?station a arena:Workstation ;
            arena:skills ?skill ;
            arena:status ?status ;
            arena:locationX1 ?locationX1 ;
            arena:locationY1 ?locationY1 ;
            arena:locationX2 ?locationX2 ;
            arena:locationY2 ?locationY2 .

          OPTIONAL {
            ?station sim:simulatedRemainingTime ?simTime .
          }
        }
      } 
      `, {
      sources: [`http://localhost:8000/modularSmartphone-${this.props.step}.trig`],
    }).then((result) => {
      let stations = []
      result.bindingsStream.on('data', (binding) => {
        stations.push({
          'id': binding.get('?station').value,
          'skill': binding.get('?skill').value,
          'running': binding.get('?simTime') !== undefined,
          'x1': binding.get('?locationX1').value,
          'y1': binding.get('?locationY1').value,
          'x2': binding.get('?locationX2').value,
          'y2': binding.get('?locationY2').value,
        })
      });
      result.bindingsStream.on('end', () => this.setState({'stations': stations}));
    }).catch(console.error);
  }

  render() {
    console.log('Render stations')
    let stations = this.state.stations.map((t) => <Station
      key={t.id}
      id={t.id}
      skill={t.skill.substring(t.skill.lastIndexOf('/') + 1)}
      running={t.running}
      x1={t.x1}
      y1={t.y1}
      x2={t.x2}
      y2={t.y2}
    />)
    return (
      <>
        {stations}
      </>
    )
  }
}

class Transporters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transporters: []
    }
    this.updateTransporters = this.updateTransporters.bind(this);
  }

  componentDidMount() {
    this.updateTransporters();
  }

  componentDidUpdate(oldProps) {
    if(oldProps.step !== this.props.step) {
      this.updateTransporters();
    }
  }

  updateTransporters() {
    // Get transporters to App state via Comunica
    myEngine.query(`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX arena: <http://arena2036.example.org/>
      PREFIX sim: <http://ti.rw.fau.de/sim#>

      SELECT *
      WHERE {
        GRAPH ?transporter {
          ?transporter a arena:Transporter ;
            arena:locationX ?locationX ;
            arena:locationY ?locationY .
        }
      } 
      `, {
      sources: [`http://localhost:8000/modularSmartphone-${this.props.step}.trig`],
    }).then((result) => {
      let transporters = []
      result.bindingsStream.on('data', (binding) => {
        transporters.push({
          'id': binding.get('?transporter').value,
          'x': binding.get('?locationX').value,
          'y': binding.get('?locationY').value,
        })
      });
      result.bindingsStream.on('end', () => this.setState({'transporters': transporters}));
    }).catch(console.error);
  }

  render() {
    console.log('Render transporter')
    let transporters = this.state.transporters.map((t) => <Transporter key={t.id} id={t.id} x={t.x} y={t.y}/>)
    return (
      <>
        {transporters}
      </>
    )
  }
}

class SelectedRDF extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'text':''
    }
  }

  componentDidUpdate(oldProps) {
    if((JSON.stringify(oldProps.selectedItems) !== JSON.stringify(this.props.selectedItems) || oldProps.step !== this.props.step) && this.props.selectedItems.length > 0) {
      // Get descriptions of items
      myEngine.query(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX arena: <http://arena2036.example.org/>
        PREFIX sim: <http://ti.rw.fau.de/sim#>

        CONSTRUCT {
          ?s ?p ?o .
        } WHERE {
          GRAPH ?g {
            ?s ?p ?o .
          }
        }
        `, {
        sources: [`http://localhost:8000/modularSmartphone-${this.props.step}.trig`],
        initialBindings: new Bindings({
          '?s': factory.namedNode(this.props.selectedItems[0]),
        }), 
      }).then((result) => {
        const writer = new N3.Writer({'prefixes': {
          'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          'xsd': 'http://www.w3.org/2001/XMLSchema#',
          'arena': 'http://arena2036.example.org/',
          'sim': 'http://ti.rw.fau.de/sim#',
          '': 'http://127.0.1.1:8080/'
        }});
        result.quadStream.on('data', (q) => {
          writer.addQuad(factory.quad(q.subject, q.predicate, q.object))
        })
        result.quadStream.on('end', () => {
          writer.end((error, result) => {
            this.setState({
              'text': result.split('\n').filter((t) => !t.startsWith('@prefix')).join('\n')
            })
          })
        })
        /*
        let things = []
        result.bindingsStream.on('data', (binding) => {
          things.push(binding.get('?thing').value);
        });
        result.bindingsStream.on('end', () => this.props.updateSelectedItems(things));
        */
      }).catch(console.error);
    }
  }
  render() {
    //let items = this.props.selectedItems.map(i => <li key={i}><a href={i}>{i}</a></li>);
    return (
      <div>
        <div
          style={{
            'fontSize': '10pt',
            backgroundColor: 'white',
          }}
        >
          <pre
            style={{
              'overflow': 'auto',
              'margin': '10px'
            }}
          >
            {this.state.text}
          </pre>
        </div>
      </div>
    )
  }
}

class Selection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ids: []
    }
    this.updateSelection = this.updateSelection.bind(this);
  }

  componentDidMount() {
    this.updateSelection();
  }

  componentDidUpdate(oldProps) {
    if(oldProps.step !== this.props.step || oldProps.x !== this.props.x || oldProps.y !== this.props.y) {
      this.updateSelection();
    }
  }

  updateSelection() {
    // Get everything that is in the selected location
    myEngine.query(`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX arena: <http://arena2036.example.org/>
      PREFIX sim: <http://ti.rw.fau.de/sim#>

      SELECT *
      WHERE {
        GRAPH ?g {
          {
            ?thing arena:locationX ?locationX ;
              arena:locationY ?locationY .
          } UNION {
            ?thing arena:locationX1 ?locationX1 ;
              arena:locationY1 ?locationY1 ;
              arena:locationX2 ?locationX2 ;
              arena:locationY2 ?locationY2 .
              
              FILTER(?locationX1 <= ?locationX && ?locationY1 <= ?locationY && ?locationX2 >= ?locationX && ?locationY2 >= ?locationY)
          }
        }
      } 
      `, {
      sources: [`http://localhost:8000/modularSmartphone-${this.props.step}.trig`],
      initialBindings: new Bindings({
        '?locationX': factory.literal(this.props.x, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
        '?locationY': factory.literal(this.props.y, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer'))
      }), 
    }).then((result) => {
      let things = []
      result.bindingsStream.on('data', (binding) => {
        things.push(binding.get('?thing').value);
      });
      result.bindingsStream.on('end', () => this.props.updateSelectedItems(things));
    }).catch(console.error);
  }

  render() {
    return (
      <Layer>
        <Rect
          x={this.props.x * 30}
          y={this.props.y * 30}
          width={30}
          height={30}
          stroke='red'
          strokeWidth={1.5}
        />
      </Layer>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      autoplay: false,
      zoom: 0,
      selection: {'x': 0, 'y': 0, 'items': []},
      gridWidth: 0,
      gridHeight: 0,
    }
    this.updateAutoplay = this.updateAutoplay.bind(this);
    this.updateSelectedItems = this.updateSelectedItems.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getZoomValue = this.getZoomValue.bind(this);
  }

  componentDidMount() {
    // Get grid size via Comunica
    myEngine.query(`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX arena: <http://arena2036.example.org/>
      PREFIX sim: <http://ti.rw.fau.de/sim#>

      SELECT *
      WHERE {
        GRAPH ?shopfloor {
          ?shopfloor a arena:Shopfloor ;
            arena:sizeX ?width ;
            arena:sizeY ?height .
        }
      } 
      `, {
      sources: [`http://localhost:8000/modularSmartphone-${this.state.step}.trig`],
    }).then((result) => {
      result.bindingsStream.on('data', (binding) => this.setState({
        'gridWidth': parseInt(binding.get('?width').value),
        'gridHeight': parseInt(binding.get('?height').value)
      }));
    }).catch(console.error);
  }

  updateAutoplay() {
    let newAuto = !this.state.autoplay;
    this.setState({'autoplay': newAuto});
    if(newAuto) {
      this.autoplay = setInterval(
        () => this.setState({'step': parseInt(this.state.step) + 1}),
        1000
      );
    } else {
      clearInterval(this.autoplay);
    }
  }

  updateSelectedItems(selectedItems) {
    this.setState({'selection': {'x': this.state.selection.x, 'y': this.state.selection.y, 'items': selectedItems}});
  }

  handleClick(event) {
    let x = Math.floor(event.evt.offsetX / (30 * this.getZoomValue()));
    let y = Math.floor(event.evt.offsetY / (30 * this.getZoomValue()));
    if(x < this.state.gridWidth && y < this.state.gridHeight) {
      this.setState({'selection': {'x': x, 'y': y, 'items': []}});
    }
  }

  getZoomValue() {
    return Math.pow(1.1, this.state.zoom) * 1.1
  }

  render() {
    let playOrStop = this.state.autoplay ? 'Stop' : 'Play';
    return (
      <div
        style={{
          display: 'flex'
        }}
      >
        <div
          style={{
            float: 'left',
            width: '71%',
            height: '99vh',
            display: 'flex',
            overflow: 'scroll'
          }}
        >
          <div>
            <Stage width={Math.ceil(1502.5 * this.getZoomValue() * (this.state.gridWidth / 50))} height={Math.ceil(1502.5 * this.getZoomValue() * (this.state.gridHeight / 50))} offsetX={-1} offsetY={-1} style={{margin: '30px', maxWidth: '100%'}} scaleX={this.getZoomValue()} scaleY={this.getZoomValue()} onClick={this.handleClick}>
              <Grid width={this.state.gridWidth} height={this.state.gridHeight} />
              <Layer>
                <Transporters step={this.state.step} />
              </Layer>
              <Layer>
                <Products step={this.state.step} />
              </Layer>
              <Layer>
                <Stations step={this.state.step} />
                <Ports step={this.state.step} />
              </Layer>
              <Selection step={this.state.step} x={this.state.selection.x} y={this.state.selection.y} updateSelectedItems={this.updateSelectedItems} />
            </Stage>
          </div>
        </div>
        <div
          style={{
            float: 'left',
            width: '29%',
            backgroundColor: 'lightgrey',
            minHeight: '100%'
          }}
        >
          <div
            style={{
              margin: '30px'
            }}
          >
            <p>
              <label htmlFor="zoom_input">Zoom:</label>
            </p>
            <input style={{width: '100px', marginRight: '20px'}} id="zoom_input" type="number" value={this.state.zoom} onChange={(event) => this.setState({'zoom': event.target.value})} />
          </div>
          <div
            style={{
              margin: '30px'
            }}
          >
            <p>
              <label htmlFor="step_input">Step:</label>
            </p>
            <input style={{width: '100px', marginRight: '20px'}} id="step_input" type="number" value={this.state.step} min={0} onChange={(event) => this.setState({'step': event.target.value})} />
            <button style={{marginRight: '20px'}} onClick={this.updateAutoplay}>{playOrStop}</button>
            <a target="_blank" rel="noopener noreferrer" href={`http://localhost:8000/modularSmartphone-${this.state.step}.trig`}>RDF</a>
          </div>
          <div
            style={{
              margin: '30px'
            }}
          >
            <p>
              <label>Selected Cell:</label>
            </p>
            <p>
              {this.state.selection.x}, {this.state.selection.y}
            </p>
          </div>
          <div
            style={{
              margin: '30px'
            }}
          >
            <p>
              <label htmlFor="step_input">Artifacts in Selected Cell:</label>
            </p>
            <SelectedRDF step={this.state.step} selectedItems={this.state.selection.items} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
