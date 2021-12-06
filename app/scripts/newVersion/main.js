/**
 * FileName: main.js
 * Description: main script, regroup dataprocessing and visualisation functions and interact with data throuth Fetch function.
 * Date: 2021/12
 * version: 0.0.1
 * authors:  
*/

fetch(filePath)
        .then((resp) => resp.json())
        .then((_data) => {
            // Data available here
            const network = processing(_data); // prepare data
            graph(network); // construct visualization
        });