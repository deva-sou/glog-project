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
 * define somulation forces 
*/

var simulation = d3.forceSimulation()
// TODO

/**
 * drawing function   
*/

function graph(data){
    // TODO
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