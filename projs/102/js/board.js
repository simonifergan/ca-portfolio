var EMPTY = ' ';
var MINE = '<img src="img/mine.png" alt-"Mine image"/>';
var FLAG = "⚑";

function generateBoard(size = 6) {
    let board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                peripheryMines: 0,
                isRevealed: false,
                isMine: false,
                isFlagged: false,
            };
        }
    }
    return board;
}

// Start generation from the first clicked cell
function firstClickInit(firstCell) {

    // Generate random mines
    generateMines(firstCell);

    // Generate peripherial numbers to mines
    generatePeriphery(gBoard);

    // Board started empty - now game begins.
    renderBoard(gBoard);
}

function generateMines(firstCell) {
    for (let idx = 0; idx < gGame.totalMines; idx++) {
        let i = getRandomIntInclusive(0, gBoard.length - 1);
        let j = getRandomIntInclusive(0, gBoard[i].length - 1);

        // Check whether random mine location is valid
        while ((i === firstCell.i && j === firstCell.j) || gBoard[i][j].isMine) {
            i = getRandomIntInclusive(0, gBoard.length - 1);
            j = getRandomIntInclusive(0, gBoard[i].length - 1);
        }
        gBoard[i][j].isMine = true;
        gGame.mineLocations.push({ i: i, j: j });
    }
}

function generatePeriphery(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) continue;
            let count = countPeripheryMines(board, { i: i, j: j });
            if (count) board[i][j].peripheryMines = count;
            else continue;
        }
    }
}

function countPeripheryMines(board, coords) {
    let count = 0;
    for (let i = coords.i - 1; i <= coords.i + 1; i++) {
        if (!board[i]) continue;
        for (let j = coords.j - 1; j <= coords.j + 1; j++) {
            if (!board[j]) continue;
            if (i === coords.i && j === coords.j) continue;
            if (board[i][j].isMine) count++;
        }
    }
    return count;
}

// Renders the board to the DOM
function renderBoard(board) {
    let colors = ['','blue','green','red','darkblue','brown','cyan','black'];
    let htmlStr = '';
    for (let i = 0; i < board.length; i++) {
        htmlStr += '<tr>';
        for (let j = 0; j < board[i].length; j++) {
            let cell = gBoard[i][j];
            let cellContent;
            if (cell.isMine) cellContent = MINE;
            else if (cell.peripheryMines) cellContent = `<span style="color: ${colors[cell.peripheryMines]};">${cell.peripheryMines}</span>`;
            else cellContent = EMPTY;
            let flaggedCell = '';
            if (cell.isFlagged) flaggedCell = `<div class="flag">${FLAG}</div>`;

            htmlStr += `<td class="cell cell-${i}-${j}" oncontextmenu="flagCell(${i}, ${j}, event)" 
                        onclick="updateBoard(${i}, ${j})">
                            <div class="surface">${cellContent}</div>
                            <div class="cover">${flaggedCell}</div>
                        </td>`;
        }
        htmlStr += '</tr>';
    }
    document.querySelector('.game-board').innerHTML = htmlStr;
}

// Renders the cell to the DOM
function revealCell(i, j) {
    let elCover = document.querySelector(`.cell-${i}-${j} .cover`);
    elCover.style.display = 'none';
    let elSurface = document.querySelector(`.cell-${i}-${j} .surface`);
    elSurface.style.display = 'flex';
}