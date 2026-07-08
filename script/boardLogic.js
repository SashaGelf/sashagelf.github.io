import { taskActive, taskMatrix, score, clearedBoard, saveGame } from "./script.js";
import { rowWins, colWins, diagWinsGrand, diagWinsGrave, boardWin } from "./script.js";
import { nextDue, makeListTable } from "./taskLogic.js";
import { displayScore } from "./scoreLogic.js";

const board = document.getElementById("bingo-board");
export function renderBoard() {
    board.innerHTML = "";
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const taskItem = taskMatrix[r][c];
            const bingoSquare = document.createElement("div");
            bingoSquare.classList.add("cell");
            bingoSquare.innerHTML = taskItem.text;
            if (r === 2 && c === 2) {
                bingoSquare.classList.add("free");
            } else if (taskItem.marked) {
                bingoSquare.classList.add("marked");
            }
            bingoSquare.addEventListener("click", () => toggleCell(r, c)); // local function
            board.appendChild(bingoSquare);
        }
    }
}

function toggleCell(row, col) {
    if (row === 2 && col === 2) {return;} // prevent altering free space
    const cell = taskMatrix[row][col];
    if (cell.marked == true) {return;} // prevent altering marked squares
    cell.marked = !cell.marked // this flips the "marked" value from true to false or vice versa
    score.square += 1;
    displayScore(); // imported function
    let clickedID = parseInt(cell.id);
    let arrayID = taskActive.findIndex(task => task.id === clickedID);
    taskActive[arrayID].active = false;
    nextDue(taskActive[arrayID]); // imported function
    makeListTable(); // imported function
    saveGame(); // imported function
    renderBoard(); // local function
    checkWinCondition(); // local function
}

function checkWinCondition() {
    // check rows
    for (let r = 0; r < 5; r++) {
        if (taskMatrix[r].every(cell => cell.marked) && !rowWins[r]) {rowWins[r] = true;}
    }
    // check columns
    for (let c = 0; c < 5; c++) {
        if (taskMatrix.every(row => row[c].marked) && !colWins[c]) {colWins[c] = true;}
    }
    // tally wins, then make them un-re-countable
    for (let i = 0; i < 5; i++) {
        // we'll use the same for loop for both arrays
        if (rowWins[i] == true) {
            score.bingo += 1;
            rowWins[i] = "scored"; // so it doesn't get pinged again
        }
        if (colWins[i] == true) {
            score.bingo += 1;
            colWins[i] = "scored"; // so it doesn't get pinged again
        }
    }
    // Check Diagonal Top-Left to Bottom-Right
    if (taskMatrix.every((row, i) => row[i].marked) && diagWinsGrave == false) {
        diagWinsGrave = true;
        score.bingo += 1;
    }
    // Check Diagonal Top-Right to Bottom-Left
    if (taskMatrix.every((row, i) => row[4 - i].marked) && diagWinsGrand == false) {
        diagWinsGrand = true;
        score.bingo += 1;
    }
    // check entire board
    if (taskMatrix.flat().every(sq => sq.marked) && boardWin == false) {
        boardWin = true;
        score.board += 1;
        clearedBoard(); // imported function
    }
}

// Fisher-Yates Shuffle Engine
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}