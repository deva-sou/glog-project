/**
 * FileName: graph2.js
 * Description: Script specified on creating the graphic. It includes the pipeline for svg selection, element creactions and D3.js utilisation
 * Date: 2021/12
 * version: 0.0.1
 * authors:  
*/

/**
 * svg set up   
*/ 

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

/**
 * Color
 */
 var color = d3.scaleOrdinal(d3.schemeCategory20);

 //var legend = d3.legend

/*
 * define simulation forces 
*/

var simulation = d3.forceSimulation()
  //.force("forceX", d3.forceX().strength(.1).x(width * .1))
  //.force("forceY", d3.forceY().strength(.1).y(height * .1))
  .force("link", d3.forceLink().id(function(d) { return d.id; }))
  .force("charge", d3.forceManyBody()) //.strength(-5))
  .force("center", d3.forceCenter(width / 2, height / 2))

/**
 * drawing function   
*/

var radius = 5;

function graph(data){
  // Edges
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(data.edges)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(3); });
  // Nodes
  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
  
  var circles = node.append("circle")
    .attr("r", 5)
    .attr("fill", function(d) { return color(d.compartment.name); });

  // Create a drag handler and append it to the node object instead
  var drag_handler = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

  drag_handler(node);

  var lables = node.append("text")
      .text(function(d) {
        return d.name;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.name; });

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
 * Drag option 
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

/**
 * Zoom option 
 */

//create zoom handler 
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);
    
//specify what to do when zoom event listener is triggered 
function zoom_actions(){
  circles.attr("transform", d3.event.transform);
}

zoom_handler(svg);
