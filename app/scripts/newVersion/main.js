/**
 * FileName: main.js
 * Description: main script, regroup dataprocessing and visualisation functions and interact with data throuth Fetch function.
 * Date: 2021/12
 * version: 0.0.1
 * authors:  
*/

const drawGraph = (filePath) => {
    fetch(filePath)
        .then((resp) => resp.json())
        .then((_data) => {
            // Data available here
            const network = processing(_data); // prepare data
            console.log("network\n", network);
            graph(network); // construct visualization
        });
}

drawGraph("scripts/newVersion/ff73.json");

