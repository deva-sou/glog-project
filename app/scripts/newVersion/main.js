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
        .then((_data) => {// Data available here
            // # add option do drop down list 
            creatDropDownList(_data);
            //console.log(_data);
            // # default graph --> General network => All metabolic pathway
            graph('general', _data);
            // # Event => Update graph when a compartment is selected
            const compSelected = document.getElementById("network-select");
            compSelected.addEventListener('change', (compSelected) => restart(compSelected.target.value, _data));
        });
}

const creatDropDownList = (data) => {
    let select = document.getElementById("network-select");
            data.compartments.map(comp => {
                let opt = document.createElement("option");
                opt.value = comp.id;
                opt.text = comp.name;
                select.add(opt, null);
            })
};

// ## Run the main function 
drawGraph("scripts/newVersion/protein_translation3.json");
