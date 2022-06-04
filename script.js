const container = document.querySelector('.container');

function createGrid() {
    let grid_columns = 16;
    let grid_rows = 16;
    let grid_area = grid_columns * grid_rows;

    for (i = 1; i < grid_area + 1; i++) {
        const square = document.createElement('div');
        square.className = "square";
        square.id = `s${i}`;
        container.appendChild(square);
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

createGrid();
hoverGrid();
