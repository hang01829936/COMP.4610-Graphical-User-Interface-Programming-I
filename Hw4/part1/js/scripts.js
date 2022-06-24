
/*
* File: script.js
* GUI1 Assignment: Creating an Interactive Dynamic Table
* Monineth Hang, UMass Lowell Computer Science, Monineth_hang@student.uml.edu
* Copyright (c) 2022 by Monineth Hang. All rights reserved. May be freely copied or
* excerpted for educational purposes with credit to the author.
* updated by Monineth Hang on June 22,2022 at 9:55pm
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

//Validate submit botton
$ ("#submit").click(() => {
    if ($("#container").valid()) {
        $("#container").submit();
    }
});

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