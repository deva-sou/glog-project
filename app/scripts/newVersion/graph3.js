/**
 * FileName: graph2.js
 * Description: Script specified on creating the graphic. It includes the pipeline for svg selection, element creactions and D3.js utilisation
 * Date: 2021/12
 * version: 0.0.2
 * authors:  
*/

/**
 * svg set up   
*/ 
var svg = d3.select("svg"),
    width = 0.7*window.innerWidth;
    height = 0.7*window.innerHeight;

/**
 * Color
 */
 var color = d3.scaleOrdinal(d3.schemeCategory20);

/*
 * define simulation forces 
*/

var simulation = d3.forceSimulation()
  .force("x",d3.forceX(width/2).strength(0.04))
  .force("y",d3.forceY(width/2).strength(0.04))
  .force("link", d3.forceLink().id(function(d) { return d.id; }))
  .force("charge", d3.forceManyBody().strength(-150))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collide",d3.forceCollide().radius(d => d.r * 2));

/**
 * drawing function   
*/

var g = svg.append("g")
    .attr("class", "everything");

function graph(id, dataJson){

  let data = processing(id, dataJson); // id = compartment's id selected

  // ### Edges
  var link = g.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(data.edges)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(3); });
  // ### Nodes
  var node = g.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
  
  var circles = node.append("circle")
    .attr("r", 5)
    .attr("fill", function(d) { return color(d.compartment.name); });

  // ### Interactive function with svg 
  // # dragability
  drag_handler(node);
  // # zoomability
  zoom_handler(svg); 

  // ### Node's labels
  var lables = node.append("text")
      .text(function(d) {
        return d.name;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.name; });

  // ### Complet simulation forces
  simulation
    .nodes(data.nodes)
    .on("tick", ticked);

  simulation.force("link")
      .links(data.edges);
  
  function ticked() {
    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
  }
  
  
}

/**
 * Drag option functions  
*/

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Create a drag handler and append it to the node object instead
var drag_handler = d3.drag()
.on("start", dragstarted)
.on("drag", dragged)
.on("end", dragended);

/**
 * Zoom option functions
*/

//add zoom capabilities 
var zoom_handler = d3.zoom()
.on("zoom", zoom_actions);

//Zoom functions 
function zoom_actions(){
    g.attr("transform", d3.event.transform)
}

/**
 * Update function  
*/ 

function restart (selectedComp, dataJson) {
  console.log("data\n", processing(selectedComp, dataJson));
  g.selectAll("*").remove();
  g.append("g").attr("class", "everything");
  simulation.alpha(0.5).restart();
  graph(selectedComp, dataJson);
}


//Save function
function svgToPng() {
    //  saveSvgAsPng 
    saveSvgAsPng(d3.select('svg').node(), 'network.png');
  }

