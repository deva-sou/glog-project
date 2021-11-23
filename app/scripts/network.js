/* glabal d3 */
var graph = {
    nodes: [
        {name:"John", age:27},
        {name:"Dave", age:67},
        {name:"Phil", age:19},
        {name:"Lip", age:33},
        {name:"Conor", age:29},
        {name:"Beber", age:35},
        {name:"Padouchka", age:30}
    ],
    links: [
        {source: "John", target:"Dave"},
        {source: "Dave", target:"Phil"},
        {source: "Phil", target:"Padouchka"},
        {source: "Conor", target:"Beber"},
        {source: "Beber", target:"Padouchka"}
    ]
};

var canvas = d3.select("#network"),
    width = canvas.attr("width"),
    height = canvas.attr("height"),
    r=10,
    ctx = canvas.node().getContext("2d");
    simulation = d3.forceSimulation()
        .force("x", d3.forceX(width/2))
        .force("y", d3.forceY(height/2))
        .force("collide", d3.forceCollide(r+1))
        .force("charge", d3.forceManyBody()
            .strength(-20))
        .force("link", d3.forceLink()
            .id(function (d){return d.name;}))
        .on("tick", update);

simulation.nodes(graph.nodes);
simulation.force("link")
    .links(graph.links);

// graph.node.forEach(function (d)){
//     d.x = Math.random() * width;
//     d.y = Math.random() * height;
// }

function update() {
    ctx.clearRect(0,0,width,height);
    
    ctx.beginPath();
    graph.links.forEach(drawLink);
    ctx.stroke();

    ctx.beginPath();
    graph.nodes.forEach(drawNode);
    ctx.fill();
};

function drawNode(d){
    ctx.moveTo(d.x,d.y);
    ctx.arc(d.x,d.y,r,0,2*Math.PI);
}

function drawLink(l){
    ctx.moveTo(l.source.x,l.source.y);
    ctx.lineTo(l.target.x, l.target.y);
}

update();
