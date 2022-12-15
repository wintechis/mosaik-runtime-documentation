# mosaik-runtime-documentation
## Overview
This project contains a demonstrator using MOSAIK for a decentralized transportation system. We built the decentralized transportation system according to the paradigms of stigmergy and Read-Write Linked Data, fulfilling the demands of Industry 4.0 for an agent-based system on state-of-the-art web technologies.

It consists of transporters, which are reactive machines (called artifacts), and transporter agents, which control these transporter via Semantic Web technologies, e.g. RDF as data model and HTTP and REST for communication. 
These transporters shall sort colored items, produced by distributed stations, to the respective colored station, by exploration and usage of local information. 

You can find the API description [in our MOSAIK API repo](https://github.com/wintechis/mosaik-api). Note that the tutorial here describes a smaller scenario, a decentralized transportation system, that is a subset of the API's capabilites, a modular manufacturing scenario.

## Content

* [documentation.pdf](documentation.pdf) contains the overall documentation for this project.

* [bold/](bold/) contains all files for the [BOLD simulator](https://github.com/bold-benchmark/bold-server), e.g.:
  * Initial data and endpoints of BOLD (bold/data/shopfloor.trig)
  * File sim.ttl which has to be PUT to BOLD's /sim endpoint to start the simulation (bold/data/sim.ttl)
  * Initiale SPARQL queries that are run after starting (bold/queries/init.rq)
  * Behaviour of workstation (bold/queries/update-stations.rq)
  * Behaviour of transporters (bold/queries/update-transporters.rq)
  * Script to send an HTTP PUT of sim.ttl to BOLD to start the simulation (bold/run.sh)
  * Properties file to confugre BOLD (bold/simple-transport.properties)

* [ldfu/](ldfu/) contains files for the controlling [ldfu agent](https://linked-data-fu.github.io/):
  * An agent that uses stigmergy to route transporters to stations (ldfu/followMarkers.n3)
  * An agent that uses only random movement for transporters (ldfu/moveRandom.n3)
  * A script to execute ldfu in a loop, pre-set with a pause of 2 seconds (ldfu/ldfu-loop.sh)

* [gui/](gui/) contains files for a React app to visualize the simulation in your browser

## Usage

1. Start BOLD via `./bin/bold-server simple-transport.properties` (or any other respective config file you choose for this scenario)
2. To start the simulation, run `run.sh` or `curl -X "PUT" -H "Content-Type: text/turtle" --data-binary @data/sim.ttl http://localhost:8080/sim`
3. You can reach BOLD's endpoints at `127.0.1.1:8080`, see manual of BOLD
    * For visualization, consider [RDF Browser](https://github.com/kianschmalenbach/rdf-browser) for Firefox
4. To start the agent, run e.g. `ldfu -p followMarkers.n3 -n 2000` or `ldfu-loop.sh`
5. Visualization is available after running the React app, see Readme and respective steps in /gui/
6. To end the simulation, run `run.sh` again 

## Further Information

* [Demo on Youtube](https://youtu.be/3XJqU43tN0k)
* [Performance comparison of Simple Reflex Agents Using Stigmergy with Model-Based Agents in Self-Organizing Transportation](https://github.com/wintechis/Model_Based_VS_SRA_Stigmergy)

## Acknowledgments

This work was partially funded by the German Federal Ministry of Education and Research through the MOSAIK project (grant no. 01IS18070A).
