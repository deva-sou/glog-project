/**
 * FileName: main.js
 * Description: main script, regroup dataprocessing and visualisation functions and interact with data throuth Fetch function.
 * Date: 2021/12
 * version: 0.0.1
 * authors:  
*/
//import { saveAs } from 'file-saver';

const drawGraph = (filePath) => {
    fetch(filePath)
        .then((resp) => resp.json())
        .then((_data) => {
            // Data available here
            var select = document.getElementById("network-select");
            _data.compartments.map(comp => {
                //('#network-select').append(new Option(comp.name, comp.id))
                let opt = document.createElement("option");
                opt.value = comp.id;
                opt.text = comp.name;
                select.add(opt, null);
            })
            const network = processing(_data); // prepare data
            console.log("network\n", network);
            graph(network); // construct visualization
        });
}

drawGraph("scripts/newVersion/protein_translation3.json");
// import d3ToPng from 'd3-svg-to-png';
// function modifyText() {
//     console.log("ok")
//     d3ToPng('network', 'savedSVG');
// }
  
  // Add event listener to table
//document.getElementById("saveButton").addEventListener("click", console.log("ok"));





// document.getElementById("saveButton").addEventListener("click", function(){
//     modifyText();
// //     var canvas = document.getElementById("network");
// //     canvas.toBlob(function(blob) {
// //     saveAs(blob, "pretty image.png");
// });
// })

/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */


//Save
// d3.select('#saveButton').on('click', function(){
//     console.log("save");
// 	var svgString = getSVGString(d3.select('svg').node());
// 	svgString2Image( svgString, 2*width, 2*height, 'png', save ); // passes Blob and filesize String to the callback

// 	function save( dataBlob, filesize ){
// 		saveAs( dataBlob, 'D3 vis exported to PNG.png' ); // FileSaver.js function
// 	}
// });

// function getSVGString( svgNode ) {
// 	svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
// 	var cssStyleText = getCSSStyles( svgNode );
// 	appendCSS( cssStyleText, svgNode );

// 	var serializer = new XMLSerializer();
// 	var svgString = serializer.serializeToString(svgNode);
// 	svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
// 	svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

// 	return svgString;

// 	function getCSSStyles( parentElement ) {
// 		var selectorTextArr = [];

// 		// Add Parent element Id and Classes to the list
// 		selectorTextArr.push( '#'+parentElement.id );
// 		for (var c = 0; c < parentElement.classList.length; c++)
// 				if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
// 					selectorTextArr.push( '.'+parentElement.classList[c] );

// 		// Add Children element Ids and Classes to the list
// 		var nodes = parentElement.getElementsByTagName("*");
// 		for (var i = 0; i < nodes.length; i++) {
// 			var id = nodes[i].id;
// 			if ( !contains('#'+id, selectorTextArr) )
// 				selectorTextArr.push( '#'+id );

// 			var classes = nodes[i].classList;
// 			for (var c = 0; c < classes.length; c++)
// 				if ( !contains('.'+classes[c], selectorTextArr) )
// 					selectorTextArr.push( '.'+classes[c] );
// 		}

// 		// Extract CSS Rules
// 		var extractedCSSText = "";
// 		for (var i = 0; i < document.styleSheets.length; i++) {
// 			var s = document.styleSheets[i];
			
// 			try {
// 			    if(!s.cssRules) continue;
// 			} catch( e ) {
// 		    		if(e.name !== 'SecurityError') throw e; // for Firefox
// 		    		continue;
// 		    	}

// 			var cssRules = s.cssRules;
// 			for (var r = 0; r < cssRules.length; r++) {
// 				if ( contains( cssRules[r].selectorText, selectorTextArr ) )
// 					extractedCSSText += cssRules[r].cssText;
// 			}
// 		}
		

// 		return extractedCSSText;

// 		function contains(str,arr) {
// 			return arr.indexOf( str ) === -1 ? false : true;
// 		}

// 	}

// 	function appendCSS( cssText, element ) {
// 		var styleElement = document.createElement("style");
// 		styleElement.setAttribute("type","text/css"); 
// 		styleElement.innerHTML = cssText;
// 		var refNode = element.hasChildNodes() ? element.children[0] : null;
// 		element.insertBefore( styleElement, refNode );
// 	}
// }

// function svgString2Image( svgString, width, height, format, callback ) {
// 	var format = format ? format : 'png';

// 	var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

// 	var canvas = document.createElement("canvas");
// 	var context = canvas.getContext("2d");

// 	canvas.width = width;
// 	canvas.height = height;

// 	var image = new Image();
// 	image.onload = function() {
// 		context.clearRect ( 0, 0, width, height );
// 		context.drawImage(image, 0, 0, width, height);

// 		canvas.toBlob( function(blob) {
// 			var filesize = Math.round( blob.length/1024 ) + ' KB';
// 			if ( callback ) callback( blob, filesize );
// 		});

		
// 	};

// 	image.src = imgsrc;
// }