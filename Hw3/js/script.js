/*
* File: script.js
* GUI1 Assignment: Creating an Interactive Dynamic Table
* Monineth Hang, UMass Lowell Computer Science, Monineth_hang@student.uml.edu
* Copyright (c) 2022 by Monineth Hang. All rights reserved. May be freely copied or
* excerpted for educational purposes with credit to the author.
* updated by Monineth Hang on June 17,2022 at 9:55pm
*/

/**
 *  The purpose of this function is to check the inputs and output 
 *  error as need then it will generate the correct table 
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

    // Declear other variable 
    let err, table, event;

    // Error class message 
    let lowValMes = '<div class="alert alert-danger" role="alert">Enter value is too low</div>';
    let highValMes = '<div class="alert alert-danger" role="alert">Value is too high</div>';
    let noValMes = '<div class="alert alert-danger" role="alert">Please enter a value</div>';
    let minMoreMax = '<div class="alert alert-danger" role="alert">Minimum cannot be greater than maximum</div>';

    // Declear and reset err
    event = document.getElementsByClassName('alert');
    err = false;
    while (event.length > 0) {
        event[0].parentNode.removeChild(event[0]);
    }

    // call checkBasicErr to err
    err = checkBasicErr(cMinVal, cMaxVal, cMin, lowValMes, err, rMinVal, rMaxVal, rMin, cMax, noValMes, rMax, highValMes);
    //check the input and print out error message
    if (!err) {
        if ((cMinVal > cMaxVal) ){
            cMax.insertAdjacentHTML('afterend', minMoreMax);
            err = true;
        }
        if (rMinVal > rMaxVal) {
            rMax.insertAdjacentHTML('afterend', minMoreMax);
            err = true;
        }
    }
    if (err) {
        return;
    }
    //generate the correst table
    table = generateNewTable(cMinVal, cMaxVal, rMinVal, rMaxVal);
    document.getElementById('muliTable').innerHTML = '';
    document.getElementById('muliTable').appendChild(table);

}
/**
 * The purpose of this function is to check the basic condition of the input
 * to make sure that there is an input and is in the range of -50-50
 * @returns err
 */
function checkBasicErr(cMinVal, cMaxVal, cMin, lowValMes, err, rMinVal, rMaxVal, rMin, cMax, noValMes, rMax, highValMes) {

    //check empty input
    if ((cMin.value == '') || (cMax.value == '')) {
        cMin.insertAdjacentHTML('afterend', noValMes);
        err = true;
    }
    if ((rMin.value == '') || (rMax.value == '')) {
        rMin.insertAdjacentHTML('afterend', noValMes);
        err = true;
    }

    //check less than -50 input
    if ((cMinVal < -50) || cMaxVal < -50) {
        cMin.insertAdjacentHTML('afterend', lowValMes);
        err = true;
    }
    if (rMinVal < -50 || rMaxVal < -50) {
        rMin.insertAdjacentHTML('afterend', lowValMes);
        err = true;
    }

    //check for more than 50 input
    if ((cMinVal > 50) || (cMaxVal > 50)) {
        cMin.insertAdjacentHTML('afterend', highValMes);
        err = true;
    }
    if ((rMinVal > 50) || (rMaxVal > 50)) {
        rMin.insertAdjacentHTML('afterend', highValMes);
        err = true;
    }
    return err;
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
