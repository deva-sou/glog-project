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
    constructor(dataJson){
        this.data = dataJson;
        this.nodes = dataJson.nodes.map( (node , index) => node = new Node(node.id, node.name, node.compartment));
        this.edges = dataJson.edges.map( (edge, index) => edge = new Edge(edge.id, edge.source, edge.target, edge.compartment));
    };
}

const processing = (data) => {
    // Create the network object with data from JSON
    // TODO  
    return network;
}