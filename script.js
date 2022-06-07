// Initializing DOM query selectors and event listeners. 
const container = document.querySelector('.container');
const button = document.querySelector('button');
button.addEventListener('click', buttonClick);

// Declaring a 16x16 grid for initial webpage viewing.
let grid_columns = 16;
let grid_rows = 16;
let grid_area = grid_columns * grid_rows;

// Button clicks pass through this function. Currently, the function
// contains an 'if' statement that doesn't provide a secondary option since
// only 1 button exists on the webpage. This function can be modified if
// additional buttons are addded.
function buttonClick(e) {
    if (this.className == "grid-button") {
        modifyGrid();
    }
}

// Creates divs with a common class and unique ID that formulate each individual
// square in the grid layout. Class and IDs are used for further styling and 
// interactive behaviour. 
function createGrid() {
    cssColumnRowUpdate();
    for (i = 1; i < grid_area + 1; i++) {
        const square = document.createElement('div');
        square.className = "square";
        square.id = `s${i}`;
        container.appendChild(square);
    }
}

// Erases all square divs in HTML so that new grid can be created.
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

// Logic used to prompt user for new grid layout, and creates it based on the user's input.
function modifyGrid() {
    while (true) {
        input = prompt("Please input a new grid size of WIDTHxHEIGHT\nInput must include 'x' seperator.", "ex. 16x16");
        
        // Separates user string input into useable integers for calculating new grid.
        parseInput = input.split("x");
        columns = parseInt(parseInput[0]);
        rows = parseInt(parseInput[1]);

        // If statement ensures user has input the correct dimensional values. Will loop back to
        // beginning input prompt if user input was not properly formatted or contained errors.
        // Will break loop if input is correct, and further processes the input to generate new grid.
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

// Function used to determine if a grid cell within the grid has been hovered over.
function hoverGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener('mouseout', changeColor);
    });
}

// Function used to change the color of the hovered grid cell.
function changeColor(e) {
    const square = document.getElementById(this.id);
    square.className = "squareHover";
}

// Updates the HTML with CSS variables in order to properly size the grid container.
function cssColumnRowUpdate() {
    container.style.setProperty('--grid-columns', `${grid_columns}`);
    container.style.setProperty('--grid-rows', `${grid_rows}`);
}

// When called upon, creates the grid and adds hovering function to the DOM.
function updateGrid() {
    createGrid();
    hoverGrid();
}

// Initializes the grid & general web app upon loading the webpage.
updateGrid();