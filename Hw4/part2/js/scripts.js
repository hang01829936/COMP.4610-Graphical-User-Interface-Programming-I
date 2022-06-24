/*
* File: script.js
* GUI1 Assignment: Creating an Interactive Dynamic Table
* Monineth Hang, UMass Lowell Computer Science, Monineth_hang@student.uml.edu
* Copyright (c) 2022 by Monineth Hang. All rights reserved. May be freely copied or
* excerpted for educational purposes with credit to the author.
* updated by Monineth Hang on June 22,2022 at 12:30pm
*/

/**
 *  The purpose of this function is to check the inputs and output 
 */
 function generateTable() {

    // Declear inputs into local variables
    const cMin = document.getElementById("colMin");
    const cMax = document.getElementById("colMax");
    const rMin = document.getElementById("rowMin");
    const rMax = document.getElementById("rowMax");

    // take only number input and turn it into a variable 
    let cMinVal = Number(cMin.value);
    let cMaxVal = Number(cMax.value);
    let rMinVal = Number(rMin.value);
    let rMaxVal = Number(rMax.value);

    //generate the correst table
    let table = generateNewTable(cMinVal, cMaxVal, rMinVal, rMaxVal);
    document.getElementById('muliTable').innerHTML = '';
    document.getElementById('muliTable').appendChild(table);

}
/** The purpose of this fuction is to create the table after
 *  it had been check for the correct input
 * the params are all Number.value
 * @returns newTable
 */
function generateNewTable(minC, maxC,
    minR, maxR) {
    let newTable, tableRow, rBegin, cBegin, newCell, cellLabel;
    newTable = document.createElement('table');
    newTable.id = 'table';
    rBegin = true;
    cBegin = true;

    for (let i = minR - 1; i <= maxR; i++) {
        // Create the rows
        tableRow = document.createElement('tr'); 
        for (let j = minC - 1; j <= maxC; j++) {
            makeTableNoFristCol(i, j);
            cBegin = false;
            // Add cell to row
            tableRow.appendChild(newCell); 
        }
        cBegin = true;
        rBegin = false;
        newTable.appendChild(tableRow); 
    }
    return newTable;
/**
 * The purpose of this function is to make sure the first column 
 * and row is blank and create column and text
 *  
 */
    function makeTableNoFristCol(i, j) {
        if (!rBegin) {
            if (cBegin) {
                newCell = document.createElement('td');
                cellLabel = document.createTextNode(i);
                newCell.appendChild(cellLabel);
            } else {
                newCell = document.createElement('td');
                cellLabel = document.createTextNode(i * j);
                newCell.appendChild(cellLabel);
            }
        } else {
            newCell = document.createElement('td');
            if (!cBegin) {
                cellLabel = document.createTextNode(j);
                newCell.appendChild(cellLabel);
            }
        }
    }
}

/**
 * The purpose of this function is to validate user input
 *  and print out error
 */
 function validate(){
    
    // compare value of the input 
    $.validator.addMethod("compareVals", function (value, element, param) {
        let x = parseInt(value)
        let y = parseInt($(param).val())
        return x >= y
    },"Please enter a new value! The <b>Maximum</b> value must be <b>Greater</b> than the <b>Minimun</b> value");

    //validate form
    $("#container").validate({
        //form's rules
        rules: {
            colMin: {
                required: true,
                range: [-50, 50]
            },
            colMax: {
                required: true,
                range: [-50, 50],
                compareVals: $("#colMin")
            },
            rowMin: {
                required: true,
                range: [-50, 50]
            },
            rowMax: {
                required: true,
                range: [-50, 50],
                compareVals: $("#rowMin")
            }
        },

        //form's error messages 
        messages: {
            colMin: {
                required: "<b>Empty Input!</b> Please enter a number!",
                range: "<b>Out of range!</b> Please enter a value between -50 and 50!"
            },
            colMax: {
                required: "<b>Empty Input!</b> Please enter a number!",
                range: "<b>Out of range!</b> Please enter a value between -50 and 50!"
            },
            rowMin: {
                required: "<b>Empty Input!</b> Please enter a number!",
                range: "<b>Out of range!</b> Please enter a value between -50 and 50!"
            },
            rowMax: {
                required: "<b>Empty Input!</b> Please enter a number!",
                range: "<b>Out of range!</b> Please enter a value between -50 and 50!"
            }
        },
        //valid input then generate table 
        submitHandler: function() {
            generateTable();
            return false;
        },
        
        // print error message after it parent div
        errorPlacement(err, element) {
            err.insertAfter(element.parent('div'));
        }
    });
}

/**
 * The purpose of this function is to create sliders in the range of -50 to 50
 * update silder if the user decided to type instead
 */
function sliders() {

    // Column Minimum slider
    $("#colMin_slider").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#colMin").val(ui.value);
            validate();
            if($("#container").valid()){
                $("#container").submit();
            }
        }
    });
    $("#colMin").on("keyup", function() { //when type instead update slider
        $("#colMin_slider").slider("value", this.value);
        validate();
        if($("#container").valid()){
            $("#container").submit();
        }
    });

    //maximum column slider
    $("#colMax_slider").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#colMax").val(ui.value);
            validate();
            if($("#container").valid()){
                $("#container").submit();
            }
        }
    });
    $("#colMax").on("keyup", function() { //when type instead update slider
        $("#colMax_slider").slider("value", this.value);
        validate();
        if($("#container").valid()){
            $("#container").submit();
        }
    });
    //Minimun row slider
    $("#rowMin_slider").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#rowMin").val(ui.value);
            validate();
            if($("#container").valid()){
                $("#container").submit();
            }
        }
    });
    $("#rowMin").on("keyup", function() { //when type instead update slider
        $("#rowMin_slider").slider("value", this.value);
        validate();
        if($("#container").valid()){
            $("#container").submit();
        }
    });

    //maximum row slider
    $("#rowMax_slider").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#rowMax").val(ui.value);
            validate();
            if($("#container").valid()){
                $("#container").submit();
            }
        }
    });
    $("#rowMax").on("keyup", function() { //when type instead update slider
        $("#rowMax_slider").slider("value", this.value);
        validate();
        if($("#container").valid()){
            $("#container").submit();
        }
    });
}
/**
 * The purpose of this function is to load from the slider and delete tap 
 */
$(document).ready(function() {
    sliders();           // call slider
    deleteX();          //delete a tab when its x is clicked
    deleteCheck();     //delete checked tabs
});

/**
 * The purpose of this function is to delete x when click 
 */
 function deleteX() {
    const tabs = $("#tabs").tabs();
    tabs.on("click", "span.ui-icon-close", function () {
        let tableID = this.closest("li").querySelector("a").text;
        let checkedTable = document.getElementById(`${tableID}`);
        const child = checkedTable.querySelector(".tabTable");
        this.parentElement.remove();
        child.parentElement.remove();
        tabs.tabs("refresh");
    });
}

/**
 * The purpose of this function is to find the table of the selected tabs and then 
 * delete when click 
 */

function deleteCheck() {
    $("#delete").on("click", function () {
        const checkBox = document.querySelectorAll(".checkBox");
        checkBox.forEach(checkBoxChecked => {
            //finds the table
            let tableID = checkBoxChecked.closest("li").querySelector("a").text;
            const checkedTable = document.getElementById(`${tableID}`);
            const child = checkedTable.querySelector(".tabTable");

            if (checkBoxChecked.checked == true) {
                checkBoxChecked.parentElement.remove(); //remove when clicked
                child.parentElement.remove();
            }
        });
        $("#tabs").tabs("refresh");
    });
}
/**
 * The purpose of this function is to validate the submit button and 
 * create new Div for the tabs
 */
$("#submit").click(function(event){
    if($("#container").valid()) {
        $("#container").submit(); //validate the submit botton 
        //declear variables 
        let colMin = $("#colMin").val();
        let colMax = $("#colMax").val();
        let rowMin = $("#rowMin").val();
        let rowMax = $("#rowMax").val();
        const tableMatrixForm = `[${colMin},${colMax}]x[${rowMin},${rowMax}]`; //formate the tab
        //create the formate tabs 
        if(document.getElementById(tableMatrixForm) == null){
            const currentTable = document.querySelector("#muliTable table").outerHTML;
            const tabTable = $("#tabsElement");
            $("#listOfTabs").append(makeTab(tableMatrixForm));
            tabTable.append( `<div id='${tableMatrixForm}'><div class='tabTable'>${currentTable}</div></div>`);
            $("#tabs").tabs('refresh');
        }
    }
});

/**
 * The purpose of this fuction is to create list and make the tabs 
 * @param {} tableMatrixForm 
 * @returns li
 */
function makeTab(tableMatrixForm) {

    //create the variables for the list
    const link = document.createElement("a");
    const span = document.createElement("span");
    const input = document.createElement("input");
    const li = document.createElement("li");
    const br = document.createElement("br");
    //assign the variable 
    link.href = `#${tableMatrixForm}`;
    link.textContent = tableMatrixForm;
    span.textContent = "x";
    span.className += "ui-icon-close";
    input.className += "checkBox";
    input.type = "checkbox";
    // make the list 
    li.append(link);
    li.append(span);
    li.append(br);
    li.append(input);
    return li;
}


