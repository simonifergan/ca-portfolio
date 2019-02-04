var gDifficulty = {
    beginner: {
        boardSize: 4,
        mines: 2,
    },
    medium: {
        boardSize: 6,
        mines: 5,
    },
    expert: {
        boardSize: 8,
        mines: 15,
    },
};

var gBoard;
var gGame = {
    mineLocations: [],
    isOn: true,
    isFirstClick: true,
    stopwatch: null,
    hints: 3,
    isHintMode: false, // to declare whether the player is in hint mode
    isHintActive: false, // For revealing cells during hint mode
    intervalTimer: null,
    totalMines: null,
    cellsRevealed: 0,
    boardSize: 6,
    prevDifficulty: 'medium',
};

// CR - if main() only calls initGame(), better use initGame onload instead
function main() {
    initGame();
}

function initGame(difficulty = gGame.prevDifficulty) {
    if (gGame.intervalTimer) {
        clearInterval(gGame.intervalTimer);
        gGame.intervalTimer = null;
    }
    // Init variables
    gGame.isPlaying = true;
    gGame.isFirstClick = true;
    gGame.stopwatch = null;
    gGame.hints = 3;
    gGame.isHint = false;
    gGame.isHintActive = false
    gGame.isOn = true;
    gGame.cellsRevealed = 0;
    gGame.mineLocations = [];

    //Set difficulty
    gGame.prevDifficulty = difficulty;
    gGame.totalMines = gDifficulty[difficulty].mines;
    gGame.boardSize = gDifficulty[difficulty].boardSize;

    // Board generation
    gBoard = generateBoard(gGame.boardSize);
    // console.table(gBoard);

    // Preliminary DOM generation
    neutralSmile();
    renderBoard(gBoard);

    initDOM();
}

function initDOM() {
    // Initiate hint buttons if they were still active
    let elHintBtns = document.querySelectorAll('.hints');
    elHintBtns.forEach(btn => {
        btn.style.display = 'flex';
    });

    // Initiate timer
    document.querySelector('.stopwatch').innerHTML = '0';

    // Init leaderboard
    getBestScore();
}

function updateStopwatch() {
    document.querySelector('.stopwatch').innerHTML = ((Date.now() - gGame.stopwatch) / 1000);
}

// Left click that handles the board/main gameplay
function updateBoard(i, j) {
    // Game over
    if (!gGame.isOn) return;

    // First click
    if (gGame.isFirstClick) {
        gGame.isFirstClick = false;
        gGame.stopwatch = Date.now();
        gGame.intervalTimer = setInterval(updateStopwatch, 100);
        let firstCellCoords = { i: i, j: j };
        firstClickInit(firstCellCoords);
    }

    if (gGame.isHintActive) return;

    let cell = gBoard[i][j];
    cellCoords = { i: i, j: j };

    if (cell.isFlagged) return;
    if (cell.isRevealed) return;

    // If in Hint mode state - activate the function
    if (gGame.isHintMode) {
        activateHint(cellCoords);
        return;
    }

    revealCell(i, j);

    // Clicking on mine
    if (cell.isMine) {
        renderTrigger(i, j);
        revealMines();
        return;
    } else if (cell.peripheryMines === 0) {
        // Clicking on a safe cell
        revealEmptyCellChain(cellCoords);
    }
    cell.isRevealed = true;
    gGame.cellsRevealed++;

    happySmile();
    setTimeout(neutralSmile, 500);

    if (isVictorious()) gameWon();
}


// Flag or unflag a cell when right-mouse-button was clicked
function flagCell(i, j, event) {
    event.preventDefault(); // Stop default toolbar on right click
    let cell = gBoard[i][j];
    if (cell.isFlagged) {
        cell.isFlagged = false;
        document.querySelector(`.cell-${i}-${j} .cover`).innerHTML = '';
    }
    // CR - you can keep the code dry with var elCell = document.querySelector(.....) once and use it twice
    else {
        cell.isFlagged = true;
        document.querySelector(`.cell-${i}-${j} .cover`).innerHTML = `<div class="flag">${FLAG}</div> `
    };

    if (isVictorious()) gameWon();
}

// Reveals the cell that triggered the mines
function renderTrigger(i, j) {
    let elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.add('trigger');
}

// When one mine was triggered, activate a chain reaction
function revealMines() {
    let mineCoords = gGame.mineLocations;
    for (let idx = 0; idx < mineCoords.length; idx++) {
        let i = mineCoords[idx].i;
        let j = mineCoords[idx].j;
        revealCell(i, j);
    }
    gameOver();
}

// When empty cell was triggered - chain reaction for empty cells until facing a number (reveals a sea)
// recursive 
function revealEmptyCellChain(triggerCoords) {
    gBoard[triggerCoords.i][triggerCoords.j].isRevealed = true;
    revealCell(triggerCoords.i, triggerCoords.j);
    for (let i = triggerCoords.i - 1; i <= triggerCoords.i + 1; i++) {
        if (!gBoard[i]) continue;
        for (let j = triggerCoords.j - 1; j <= triggerCoords.j + 1; j++) {
            if (!gBoard[j]) continue;
            if (i === triggerCoords.i && j === triggerCoords.j) continue;
            let cell = gBoard[i][j]
            if (!cell.peripheryMines && !cell.isMine && !cell.isRevealed && !cell.isFlagged) {
                gGame.cellsRevealed++;
                gBoard[i][j].isRevealed = true;
                revealEmptyCellChain({ i: i, j: j });
            }
            else if (!cell.isMine && !cell.isRevealed && !cell.isFlagged) {
                gGame.cellsRevealed++;
                gBoard[i][j].isRevealed = true;
                revealCell(i, j);
            }
        }
    }
    // CR - no need return in the end of function
    return;
}

function isHintModeFlip() {
    if (gGame.isFirstClick) return;
    if (!gGame.isOn) return;

    if (!gGame.isHintMode) {
        gGame.isHintMode = true;
        hintSmile();
    }
    else {
        gGame.isHintMode = false;
        neutralSmile();
    }

    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (!gBoard[i][j].isRevealed && gGame.isHintMode &&
                !gBoard[i][j].isFlagged) renderHint(i, j, true);
            else renderHint(i, j, false);
        }
    }
}

// Renders the cell to display as clickable during hint-mode
function renderHint(i, j, active) {
    if (active) {
        let elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.classList.add('hint-mode');
    } else {
        let elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.classList.remove('hint-mode');
    }
}

// When player clicked a cell, initiate cell and its neighbours reveal
function activateHint(startCell) {
    if (gGame.hints) {
        let elHintBtn = document.querySelector(`.hint${gGame.hints}`);
        elHintBtn.style.display = "none";
    }
    gGame.hints--;
    let revealedCells = [];
    for (let i = startCell.i - 1; i <= startCell.i + 1; i++) {
        if (!gBoard[i]) continue;
        for (let j = startCell.j - 1; j <= startCell.j + 1; j++) {
            if (!gBoard[j]) continue;
            if (gBoard[i][j].isRevealed || gBoard[i][j].isFlagged) continue;
            revealCell(i, j);
            revealedCells.push({ i: i, j: j });
        }
    }

    // Reverse hint mode and switch it off.
    gGame.isHint = false;
    gGame.isHintActive = true;
    setTimeout(cancelHint, 1000, revealedCells);
}

function cancelHint(revealedCells) {
    gGame.isHintActive = false;
    isHintModeFlip();
    for (let idx = 0; idx < revealedCells.length; idx++) {
        let i = revealedCells[idx].i;
        let j = revealedCells[idx].j;
        let elCover = document.querySelector(`.cell-${i}-${j} .cover`);
        elCover.style.display = 'flex';
        let elSurface = document.querySelector(`.cell-${i}-${j} .surface`);
        elSurface.style.display = 'none';
    }
}



function isVictorious() {
    let isMinesFlagged = true;
    // Flagged mines do not apply to beginner difficulty
    if (gGame.prevDifficulty !== 'beginner') {
        let mineLocations = gGame.mineLocations;
        for (let i = 0; i < mineLocations.length; i++) {
            if (!gBoard[mineLocations[i].i][mineLocations[i].j].isFlagged) {
                isMinesFlagged = false;
                break;
            }
        }
    }
    let cellsToWin = gGame.boardSize ** 2 - gGame.totalMines;
    if (gGame.cellsRevealed === cellsToWin && isMinesFlagged) return true;
    return false;
}

function gameWon() {
    updateStopwatch(); // update last time in case interval did not update before
    let score = ((Date.now() - gGame.stopwatch) / 1000);
    updateScores(score);
    winSmile();
    clearInterval(gGame.intervalTimer);
    gGame.intervalTimer = null;
    gGame.isOn = false;
}

function gameOver() {
    gameOverSmile();
    clearInterval(gGame.intervalTimer);
    gGame.intervalTimer = null;
    gGame.isOn = false;
}