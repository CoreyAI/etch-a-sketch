const container = document.querySelector('.container');
const button = document.querySelector('button');
button.addEventListener('click', buttonClick);

let grid_columns = 16;
let grid_rows = 16;
let grid_area = grid_columns * grid_rows;

function buttonClick(e) {
    if (this.className == "grid-button") {
        modifyGrid();
    }
}

function createGrid() {
    cssColumnRowUpdate();
    for (i = 1; i < grid_area + 1; i++) {
        const square = document.createElement('div');
        square.className = "square";
        square.id = `s${i}`;
        container.appendChild(square);
    }
}

function clearGrid() {
    const squares = document.getElementsByClassName("square");
    const hoveredSquares = document.getElementsByClassName("squareHover");
    while (squares.length > 0) {
        squares[0].remove();
    }
    while (hoveredSquares.length > 0) {
        hoveredSquares[0].remove();
    }
}

function modifyGrid() {
    while (true) {
        input = prompt("Please input a new grid size of WIDTHxHEIGHT\nInput must include 'x' seperator.", "ex. 16x16");
        parseInput = input.split("x");
        columns = parseInt(parseInput[0]);
        rows = parseInt(parseInput[1]);

        if ((columns !== columns) || (rows !== rows)) {
            alert("Please input correct dimensions.")
        } else if (((columns <= 0) || (columns >= 101)) || ((rows <= 0) || (rows >= 101)))  {
            alert("Please choose a dimension between 1 and 100.")
        } else {
            grid_columns = columns;
            grid_rows = rows;
            grid_area = grid_columns * grid_rows;

            clearGrid();
            updateGrid();

            break;
        }
    }
}

function hoverGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener('mouseout', changeColor);
    });
}

function changeColor(e) {
    const square = document.getElementById(this.id);
    square.className = "squareHover";
}

function cssColumnRowUpdate() {
    container.style.setProperty('--grid-columns', `${grid_columns}`);
    container.style.setProperty('--grid-rows', `${grid_rows}`);
}

function updateGrid() {
    createGrid();
    hoverGrid();
}

updateGrid();