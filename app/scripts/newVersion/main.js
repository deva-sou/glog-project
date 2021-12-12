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
