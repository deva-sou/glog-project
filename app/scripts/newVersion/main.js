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
            creatDropDownList(_data);
            // select.addEventListener('click', function(){
            //     let optSelected = select.querySelectorAll
            // })
            //const listNetworks = processing(_data); // prepare data
            //console.log("listNetwork\n", listNetworks);
            // draw general graph 
            //graph(listNetworks)
            console.log(_data);
            graph('general', _data);

            const compSelected = document.getElementById("network-select");
            compSelected.addEventListener('change', (compSelected) => restart(compSelected.target.value, _data));
            //console.log(getSelectValue());
            
            
            // drawSelectedNetwork(listNetworks); // construct visualization
        });
}

const creatDropDownList = (data) => {
    let select = document.getElementById("network-select");
            data.compartments.map(comp => {
                //('#network-select').append(new Option(comp.name, comp.id))
                let opt = document.createElement("option");
                opt.value = comp.id;
                opt.text = comp.name;
                select.add(opt, null);
            })
};

// const drawSelectedNetwork = (listNetworks, compSelected) => {
//     //console.log(getSelectValue());
//     let networkSelected = listNetworks[compSelected.value];
//     graph(networkSelected);
// }

// const compartmentSelected = () => {
//     let selectedValue = document.getElementById("network-select").value;
//     return selectedValue;
// }

drawGraph("scripts/newVersion/protein_translation3.json");

