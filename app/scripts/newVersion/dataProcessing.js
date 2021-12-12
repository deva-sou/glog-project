/**
 * FileName: dataProcessing.js
 * Description: Data Processing 
 * Date: 2021/12
 * version: 0.0.1
 * authors:  
*/

/**
 * Classes Instance
 */

class Node {
    constructor(id, name, compartment){
        this.id = id;
        this.name = name;
        this.compartment = compartment;
    }
}

class Edge {
    constructor(id, source, target, compartment){
        this.id = id;
        this.source = source;
        this.target = target;
        this.compartment = compartment;
    }
}

class Network {
    constructor(id, dataJson){
        this.id = id;
        this.data = dataJson;
        if (id === 'general'){
            this.nodes = dataJson.nodes.map( (node , index) => node = new Node(node.id, node.name, dataJson.compartments.find( element => element.id === node.id_compartment)));
            this.edges = dataJson.edges.map( (edge, index) => edge = new Edge(edge.id, edge.source, edge.target, dataJson.compartments.find( element => element.id === edge.id_compartment)));
        } else {
            this.nodes = dataJson.nodes.filter(node => node.id_compartment === id).map( (node , index) => node = new Node(node.id, node.name, dataJson.compartments.find( element => element.id === node.id_compartment)));
            let nodeComp = dataJson.nodes.filter( node => node.id_compartment === id).map( node => node.id); // list of node's id in selected compartment
            this.edges = dataJson.edges.filter( edge => edge.id_compartment === id)
                .filter( edge => nodeComp.includes(edge.source) && nodeComp.includes(edge.target)) // remove edges where target is outside compartment -- else it break the graph
                .map( edge => edge = new Edge(edge.id, edge.source, edge.target, edge.id_compartment));
        }
    };
}

const processing = (id, data) => {
    return new Network(id, data);
}
