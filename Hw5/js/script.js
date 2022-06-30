//assign tile to value, letter and image 
const ScrabbleTiles =
    [
        { "letter": "A", "value": 1, "amount": 9, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_A.jpg" },
        { "letter": "B", "value": 3, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_B.jpg" },
        { "letter": "C", "value": 3, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_C.jpg" },
        { "letter": "D", "value": 2, "amount": 4, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_D.jpg" },
        { "letter": "E", "value": 1, "amount": 12, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_E.jpg" },
        { "letter": "F", "value": 4, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_F.jpg" },
        { "letter": "G", "value": 2, "amount": 3, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_G.jpg" },
        { "letter": "H", "value": 4, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_H.jpg" },
        { "letter": "I", "value": 1, "amount": 9, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_I.jpg" },
        { "letter": "J", "value": 8, "amount": 1, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_J.jpg" },
        { "letter": "K", "value": 5, "amount": 1, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_K.jpg" },
        { "letter": "L", "value": 1, "amount": 4, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_L.jpg" },
        { "letter": "M", "value": 3, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_M.jpg" },
        { "letter": "N", "value": 1, "amount": 6, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_N.jpg" },
        { "letter": "O", "value": 1, "amount": 8, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_O.jpg" },
        { "letter": "P", "value": 3, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_P.jpg" },
        { "letter": "Q", "value": 10, "amount": 1, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_Q.jpg" },
        { "letter": "R", "value": 1, "amount": 6, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_R.jpg" },
        { "letter": "S", "value": 1, "amount": 4, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_S.jpg" },
        { "letter": "T", "value": 1, "amount": 6, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_T.jpg" },
        { "letter": "U", "value": 1, "amount": 4, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_U.jpg" },
        { "letter": "V", "value": 4, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_V.jpg" },
        { "letter": "W", "value": 4, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_W.jpg" },
        { "letter": "X", "value": 8, "amount": 1, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_X.jpg" },
        { "letter": "Y", "value": 4, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_Y.jpg" },
        { "letter": "Z", "value": 10, "amount": 1, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_Z.jpg" },
        { "letter": "_", "value": 0, "amount": 2, "image": "graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg" }
    ];

//creating the board array
const ScrabbleBoard =
    [
        { "type": "Blank", "lMultiply": 1, "wMultiply": 1, "image": "graphics_data/blank.png" },
        { "type": "Blank", "lMultiply": 1, "wMultiply": 1, "image": "graphics_data/blank.png" },
        { "type": "Double", "lMultiply": 1, "wMultiply": 2, "image": "graphics_data/double.png" },
        { "type": "Blank", "lMultiply": 1, "wMultiply": 1, "image": "graphics_data/blank.png" },
        { "type": "Double", "lMultiply": 1, "wMultiply": 2, "image": "graphics_data/double.png" },
        { "type": "Blank", "lMultiply": 1, "wMultiply": 1, "image": "graphics_data/blank.png" },
        { "type": "Triple", "lMultiply": 1, "wMultiply": 3, "image": "graphics_data/triple.png" }
    ];

//start the game
$(document).ready(function () {
    dictionaryCheck();  //check the word
    for (let i = 0; i < 7; i++) {

        $("#gameBoard").append("<img id = 'boardtile" + i + "'class= 'gameBoard' index = '" +
            i + "'type = '" + ScrabbleBoard[i].type + "'src = '" + ScrabbleBoard[i].image + "' />");
    }
    reset(); //reset the board 
})

//declare variable
let highScore = 0, currentScore = 0, Letter = [], LetterArray = [], Dictionary = [], GenerateTile = [];

/**
 * The purpose of this function is to check word with dictionary 
 */
function dictionaryCheck() {
    $.ajax({
        url: "https://moni11.github.io/COMP.4610-Graphical-User-Interface-Programming-I/Hw5/dictionary.txt",
        success: function (result) {
            let words = result.split("\n");
            for (let i = 0; i < words.length; ++i) {
                Dictionary.push([words[i].toUpperCase()]);
            }
        }
    });
}
/**
 * The purpose of this functio ins to assign the array when it drag and on the board 
 * @param {} event 
 * @param {*} ui 
 */
function addLetter(event, ui) {
    const letter = ui.draggable.attr('Letter');
    const id = ui.draggable.attr('id');
    const index = $(this).attr('index');
    const type = $(this).attr('type');
    let empty = true;
    if (Letter.length != 0 && Letter !== undefined) {
        for (let i in Letter) {
            if (i) {
                empty = false;
                break;
            }
        }
    }
    let dupe = false;
    for (let i in Letter) {
        if (i) {
            if (Letter[i]['id'] == id) {
                delete Letter[i];
                dupe = true;
                break;
            }
        }
    }
    let valid = empty;
    if (!empty) {
        let skip = false;
        for (let i = 0; i < Letter.length; ++i) {
            if (Letter[i]) {
                if (index == i) {
                    skip = true;
                    break;
                }
            }
        }
        if (!skip) {
            for (let i = 0; i < Letter.length; ++i) {
                if (Letter[i]) {
                    if (index == i + 1 || index == i - 1) {
                        valid = true;
                        break;
                    }
                }
            }
        }
    }
    if (valid) {
        Letter[index] = { index, type, letter, id }
        if (!dupe) {
            for (let i = 0; i < LetterArray.length; ++i) {
                if (LetterArray[i]) {
                    if (LetterArray[i]['id'] == id) {
                        delete LetterArray[i];
                        break;
                    }
                }
            }
        }
        ui.draggable.position({
            of: $(this),
        })
    } else {
        ui.draggable.css({ "position": "relative", "top": "", "left": "" });
    }
}
/**
 * The purpose of this function is to remove letter from array 
 * @param {} event 
 * @param {*} ui 
 */

function removeLetter(event, ui) {
    const letter = ui.draggable.attr('Letter');
    const id = ui.draggable.attr('id');
    LetterArray[id] = { letter, id };
    for (let i = 0; i < Letter.length; ++i) {
        if (Letter[i]) {
            if (Letter[i]['id'] == id) {
                delete Letter[i];
                break;
            }
        }
    }
    ui.draggable.css({ "position": "relative", "top": "", "left": "" });
    dragDropTile();
}
/**
 * The purpose of this funtion and to create a drag and drop function of the tiles
 */
function dragDropTile() {
    $('#letterArray').droppable({
        accept: '.letterTile',
        drop: removeLetter,
    });
    $(".gameBoard").droppable({
        accept: '.letterTile',
        drop: addLetter,
    })
    $(".letterTile").draggable({
        snapMode: 'inner',
        revertDuration: 200,
        start: function (event, ui) {
            $(this).draggable("option", "revert", "invalid");
        }
    })
}
/**
 * The purpose of this function is to to score the word when the submit button is pressed
 */
function score() {
    let validWord = "";
    let blank = false;
    for (let j = 0; j < Letter.length; ++j) {
        if (Letter[j]) {
            let key = Letter[j]['letter'];
            validWord += key;
            if (key == "_")
                blank = true;
        } else {
            validWord += " ";
        }
    }
    validWord = validWord.trim();
    let i = 0;
    if (blank) {
        let words = [], b = false;
        for (j = 0; j <= 26; ++j) {
            words[j] = validWord.replace("_", ScrabbleTiles[j].letter);
        }
        for (j = 0; j <= 25; ++j) {
            for (i = 0; i < Dictionary.length; i++) {
                if (Dictionary[i][0] == words[j]) {
                    b = true;
                    break;
                }
            } if (b) break;
        }
    } else {
        for (i = 0; i < Dictionary.length; i++) {
            if (Dictionary[i][0] == validWord) {
                break;
            }
        }
    }
    let elements = document.getElementsByClassName('alert');
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    if (i == Dictionary.length) {
        document.getElementById('letterArray').insertAdjacentHTML('afterend',
            '<div class="alert alert-danger" role="alert">Not a valid word</div>');
    } else {
        calScoreBlock();
        if (highScore < currentScore) {
            highScore = currentScore;
        }
        clear();
        $("#Score").text(currentScore);
        $("#HighScore").text(highScore);
    }

    /**
     *  The purpose of this function is to calculate score of each
     */
    function calScoreBlock() {
        for (let j = 0; j < Letter.length; ++j) {
            if (Letter[j]) {
                let key = Letter[j]['letter'];
                const tiles = Letter[j]['type'];
                const value = ScrabbleTiles.filter((val) => val.letter == key)[0].value;

                if (tiles == 'Double') {
                    currentScore += value * 2;
                }
                else if (tiles == 'Triple') {
                    currentScore += value * 2;
                }
                else {
                    currentScore += value;
                }
            }
        }
    }
}
/**
 * the purpose of this function is to reset the board, score, tile amount and alter
 */
//function to reset everything
function reset() {
    currentScore = 0;
    Letter = [];
    LetterArray = [];
    GenerateTile = [];
    $("#Score").text("0");
    $("#letterArray").empty();

    for (let j = 0; j < 27; ++j) {
        for (let k = 0; k < ScrabbleTiles[j].amount; ++k) {
            GenerateTile.push([ScrabbleTiles[j].letter]);
        }
    }
    for (let i = 0; i <= 6; ++i) {
        const x = Math.floor(Math.random() * (100 - i));
        const letter = GenerateTile[x];
        const index = ScrabbleTiles.filter((val) => val.letter == letter)[0];
        const id = i;
        $("#letterArray").append(`<img id= '${i}' class = 'letterTile' letter= '${index.letter}' src= '${index.image}' />`);
        LetterArray[i] = { letter, id };
        GenerateTile.splice(x, 1);
    }

    $("#TilesAmount").text(GenerateTile.length);
    dragDropTile();
    clearAlert();
}
/**
 * The purpose of this function is to clear alert
 */
function clearAlert() {
    let elements = document.getElementsByClassName('alert');
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
/**
 * the purpose of this function of the this is to clear board in bewteen rounds
 */
function clear() {
    Letter = [];
    checkOrRegenerateArray();
    $("#TilesAmount").text(GenerateTile.length);
    dragDropTile();
}

/**
 * The purpose of this function is to check if a tile exists or not 
 * and decide wether to add tile or regenerate a new broad/array
 */
function checkOrRegenerateArray() {
    $("#letterArray").empty();
    for (let i = 0; i < 7; ++i) {

        if (LetterArray[i]) {
            const index = ScrabbleTiles.filter((val) => val.letter == LetterArray[i]['letter'])[0];
            $("#letterArray").append(`<img id= '${i}' class = 'letterTile' letter= '${index.letter}' src= '${index.image}' />`);
        } else {
            if (GenerateTile.length > 0) {
                const x = Math.floor(Math.random() * GenerateTile.length);
                const letter = GenerateTile[x];
                const id = i;
                const index = ScrabbleTiles.filter((val) => val.letter == letter)[0];
                $("#letterArray").append(`<img id= '${i}' class = 'letterTile' letter= '${index.letter}' src= '${index.image}' />`);
                LetterArray[i] = { letter, id };
                GenerateTile.splice(x, 1);
            }
        }
    }
}
