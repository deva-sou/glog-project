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

// var simulation = d3.forceSimulation()
//   .force("link", d3.forceLink().id(function(d) { return d.id; }))
//   .force("charge", d3.forceManyBody()) 
//   .force("center", d3.forceCenter(width / 2, height / 2))
var simulation = d3.forceSimulation()
  .force("x",d3.forceX(width/2).strength(0.05))
  .force("y",d3.forceY(width/2).strength(0.05))
  .force("link", d3.forceLink().id(function(d) { return d.id; }))
  .force("charge", d3.forceManyBody().strength(-70))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collide",d3.forceCollide().radius(d => d.r * 5));
/**
 * drawing function   
*/

var g = svg.append("g")
    .attr("class", "everything");

function graph(data){
  // Edges
  var link = g.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(data.edges)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(3); });
  // Nodes
  var node = g.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
  
  var circles = node.append("circle")
    .attr("r", 5)
    .attr("fill", function(d) { return color(d.compartment.name); });

//     // Create a drag handler and append it to the node object instead
//   var drag_handler = d3.drag()
//     .on("start", dragstarted)
//     .on("drag", dragged)
//     .on("end", dragended);

    drag_handler(node);

    // //add zoom capabilities 
    // var zoom_handler = d3.zoom()
    // .on("zoom", zoom_actions);

    zoom_handler(svg); 

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

// Create a drag handler and append it to the node object instead
var drag_handler = d3.drag()
.on("start", dragstarted)
.on("drag", dragged)
.on("end", dragended);

/**
 * Zooming option
 */

//add zoom capabilities 
var zoom_handler = d3.zoom()
.on("zoom", zoom_actions);

//Zoom functions 
function zoom_actions(){
    g.attr("transform", d3.event.transform)
}

// Save function
// function downloadSVG() {
//     const svg = document.getElementById('container').innerHTML;
//     const blob = new Blob([svg.toString()]);
//     const element = document.createElement("a");
//     element.download = "w3c.svg";
//     element.href = window.URL.createObjectURL(blob);
//     element.click();
//     element.remove();
//     console.log("downloaded");
    
// }
// function download(){
//     document.getElementById("download").addEventListener("click", function() {
//         var svgSaver = new SvgSaver(window);
//         svgSaver.saveSvgAsPng(document.getElementById("network"), "network.png");

//        });
// }

// const { createCanvas, Image } = require("canvas");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
 
// const { window } = new JSDOM(`
//     <html>
//         <!-- So you can use local resources -->
//         <link rel="stylesheet" href="file://bootstrap.min.css">
//         <body></body>
//     </html>`, {
//     resources: "usable"
// });
 
// var backup = window.document.createElement;
// window.document.createElement = function (el) {
//     if (el === "canvas") {
//         return createCanvas(500, 500);
//     } else {
//         return backup.bind(window.document)(el);
//     }
// }
// window.Image = Image;

// const SvgSaver = require("svg-saver-node");
// const svgSaver = new SvgSaver(window);
 
// svgSaver.svgAsDataUri(window.document.getElementById("diagram"), {}, function(uri) {
// });
var svgSaver = new SvgSaver(window);
svgSaver.svgAsPngUri(document.getElementById("diagram"), {}, function(uri) {});

