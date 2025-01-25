const gridCells = document.querySelectorAll('.grid-cell');
const gridSize = 4;
let grid = [];

function init() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    addRandomTile();
    addRandomTile();
    updateGrid();
}

function addRandomTile() {
    const emptyCells = [];
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell === 0) {
                emptyCells.push({ x: rowIndex, y: cellIndex });
            }
        });
    });

    if (emptyCells.length) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    gridCells.forEach((cell, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const value = grid[row][col];
        cell.className = 'grid-cell';
        if (value !== 0) {
            cell.classList.add(`value${value}`);
            cell.textContent = value;
        } else {
            cell.textContent = '';
        }
    });
}

function move(direction) {
    switch (direction) {
        case 'up':
            moveUp();
            break;
        case 'down':
            moveDown();
            break;
        case 'left':
            moveLeft();
            break;
        case 'right':
            moveRight();
            break;
    }
    addRandomTile();
    updateGrid();
}

function moveUp() {
    for (let col = 0; col < gridSize; col++) {
        let currentRow = 0;
        for (let row = 1; row < gridSize; row++) {
            if (grid[row][col] !== 0) {
                if (grid[currentRow][col] === 0) {
                    grid[currentRow][col] = grid[row][col];
                    grid[row][col] = 0;
                } else if (grid[currentRow][col] === grid[row][col]) {
                    grid[currentRow][col] *= 2;
                    grid[row][col] = 0;
                    currentRow++;
                } else {
                    currentRow++;
                    grid[currentRow][col] = grid[row][col];
                    if (currentRow !== row) {
                        grid[row][col] = 0;
                    }
                }
            }
        }
    }
}

function moveDown() {
    for (let col = 0; col < gridSize; col++) {
        let currentRow = gridSize - 1;
        for (let row = gridSize - 2; row >= 0; row--) {
            if (grid[row][col] !== 0) {
                if (grid[currentRow][col] === 0) {
                    grid[currentRow][col] = grid[row][col];
                    grid[row][col] = 0;
                } else if (grid[currentRow][col] === grid[row][col]) {
                    grid[currentRow][col] *= 2;
                    grid[row][col] = 0;
                    currentRow--;
                } else {
                    currentRow--;
                    grid[currentRow][col] = grid[row][col];
                    if (currentRow !== row) {
                        grid[row][col] = 0;
                    }
                }
            }
        }
    }
}

function moveLeft() {
    for (let row = 0; row < gridSize; row++) {
        let currentCol = 0;
        for (let col = 1; col < gridSize; col++) {
            if (grid[row][col] !== 0) {
                if (grid[row][currentCol] === 0) {
                    grid[row][currentCol] = grid[row][col];
                    grid[row][col] = 0;
                } else if (grid[row][currentCol] === grid[row][col]) {
                    grid[row][currentCol] *= 2;
                    grid[row][col] = 0;
                    currentCol++;
                } else {
                    currentCol++;
                    grid[row][currentCol] = grid[row][col];
                    if (currentCol !== col) {
                        grid[row][col] = 0;
                    }
                }
            }
        }
    }
}

function moveRight() {
    for (let row = 0; row < gridSize; row++) {
        let currentCol = gridSize - 1;
        for (let col = gridSize - 2; col >= 0; col--) {
            if (grid[row][col] !== 0) {
                if (grid[row][currentCol] === 0) {
                    grid[row][currentCol] = grid[row][col];
                    grid[row][col] = 0;
                } else if (grid[row][currentCol] === grid[row][col]) {
                    grid[row][currentCol] *= 2;
                    grid[row][col] = 0;
                    currentCol--;
                } else {
                    currentCol--;
                    grid[row][currentCol] = grid[row][col];
                    if (currentCol !== col) {
                        grid[row][col] = 0;
                    }
                }
            }
        }
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});

init();
