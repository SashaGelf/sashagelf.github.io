import { renderBoard, shuffleArray } from "./boardLogic.js";
import { nextDue, makeListTable, newCustomTask } from "./taskLogic.js";
import { displayScore, checkScoreDate, makeScoreBoard } from "./scoreLogic.js";

// DECLARE VARIABLES
export let taskActive = [];
export let taskInactive = [];
export let taskMatrix = [];
export let userTasks = [];

export let score = {square: 0, bingo: 0, board: 0};
export let scoreHistory = [];

export let rowWins = [];
export let colWins = [];
export let diagWinsGrave = false; // like an accent grave going \ that way, top left to bot right
export let diagWinsGrand = false; // like an accent grand going / that way, bot left to top right
export let boardWin = false;

// DOM ELEMENTS
const listButton = document.getElementById("list-button");
const popOutList = document.getElementById("full-list");
const activeTaskTable = document.getElementById("active-tasks");
const inactiveTaskTable = document.getElementById("inactive-tasks");
const newTaskCreate = document.getElementById("new-task-button");

const newTaskDiv = document.getElementById("new-task");
const ntName = document.getElementById("ntName");
const ntFreq = document.getElementById("ntFreq");
const newTaskConfirm = document.getElementById("ntConfirm");
const newTaskCancel = document.getElementById("ntCancel");

const scoreButton = document.getElementById("score-button");
const scoreMenuDiv = document.getElementById("score-menu");
const scoreCloseButton = document.getElementById("score-close");

const saveButton = document.getElementById("save-button");
const resetButton = document.getElementById("reset-button");
const boardClearedButton = document.getElementById("board-cleared");



// ON START
loadGame(); // local function

listButton.addEventListener("click", () => {
    if (listenerCheck()) {return;} // local function
    makeListTable(); // imported function
    popOutList.classList.add("visible");
    return;
});
scoreButton.addEventListener("click", () => {
    if (listenerCheck()) {return;} // local function
    makeScoreBoard(); // imported function
    scoreMenuDiv.classList.add("visible");
    return;
});
// make options menu button in header
// make about menu button in header

// SAVE MANUALLY BUTTON
saveButton.addEventListener("click", saveGame);

// RE-SHUFFLE BUTTON, re-shuffles the board with same local save data
resetButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset your board?")) {
        newGame(); // local function
        alert("Please refresh the page to view your new board");
        // can I refresh the page automatically with code?
        return;
    }
});

document.addEventListener("click", (event) => {
    // ignore buttons
    if (listButton.contains(event.target)) {return;}
    if (scoreButton.contains(event.target)) {return;}
    // make options button
    // make about button
    if (saveButton.contains(event.target)) {return;}
    if (resetButton.contains(event.target)) {return;}

    // CLICK INSIDE MENUS
    if (newTaskCreate.contains(event.target)) {
        popOutList.classList.remove("visible");
        newTaskDiv.classList.add("visible");
        return;
    }
    if (popOutList.contains(event.target)) {return fullListClick(event.target);}

    if (newTaskConfirm.contains(event.target)) {return newTaskClick();} // local function
    if (newTaskCancel.contains(event.target)) {return newTaskDiv.classList.remove("visible");}

    if (scoreCloseButton.contains(event.target)) {return scoreMenuDiv.classList.remove("visible");}
    if (scoreMenuDiv.contains(event.target)) {return;} // cos nothing in there is clickable

    // CLICK OUTSIDE MENU to close it
    if (popOutList.classList.contains("visible") && !popOutList.contains(event.target)) {return popOutList.classList.remove("visible");}
    if (newTaskDiv.classList.contains("visible") && !newTaskDiv.contains(event.target)) {return newTaskDiv.classList.remove("visible");}
    if (scoreMenuDiv.classList.contains("visible") && !scoreMenuDiv.contains(event.target)) {return scoreMenuDiv.classList.remove("visible");}
});

function fullListClick(target) {
    let clickedTr = target.closest("tr");
    let clickedName = clickedTr.cells[0].textContent;
    if (target.closest("table") === activeTaskTable) {
        if (confirm (`Mark "${clickedName}" as inactive?`)) {
            let clickedTaskIndex = taskActive.findIndex(item => item.task === clickedName);
            taskActive[clickedTaskIndex].active = false;
            nextDue(taskActive[clickedTaskIndex]); // imported function
        }
    }
    if (target.closest("table") === inactiveTaskTable) {
        if (confirm (`Mark "${clickedName}" as active?`)) {
            let clickedTaskIndex = taskInactive.findIndex(item => item.task === clickedName);
            taskInactive[clickedTaskIndex].active = true;
        }
    }
    makeListTable(); // imported function
    popOutList.classList.remove("visible");
    saveGame(); // local function
    return;
}
function newTaskClick() {
    if (!ntName.value || !ntFreq.value) {return;}
    let customName = ntName.value;
    let customFreq = ntFreq.value;
    newCustomTask(customName, customFreq); // imported function

    ntName.value = "";
    ntFreq.value = "";
    newTaskDiv.classList.remove("visible");
    return;
}

// BOARD FILLED BUTTON, becomes visible when board is full
export function clearedBoard() {
    boardClearedButton.style.display = "flex";
    // MAKE SURE THIS WORKS!!!!
}
function clearedBoardClicked() {
    boardClearedButton.style.display = "none";
    newGame(); // imported function
}

function listenerCheck() {
    if (popOutList.classList.contains("visible")) {return true;}
    if (newTaskDiv.classList.contains("visible")) {return true;}
    if (scoreMenuDiv.classList.contains("visible")) {return true;}
    
    if (boardClearedButton.style.display === "flex") {return true;}
    return false;
}



// FIRST GAME, starting with no local save data
function firstGame() {
    const savedFirstTasks = JSON.parse(localStorage.getItem("firstTasks"));
    taskActive = [...savedFirstTasks];
    console.log(taskActive);
    for (let i = 0; i < taskActive.length; i++) {
        taskActive[i].active = true;
        taskActive[i].due = undefined;
    }
    newGame(); // local function
}
// NEW GAME (either with data from local storage or data established in firstGame)
function newGame() {
    makeListTable(); // imported function
    let rowWins = [];
    let colWins = [];
    let diagWinsGrave = false; // like an accent grave going \ that way, top left to bot right
    let diagWinsGrand = false; // like an accent grand going / that way, bot left to top right
    let boardWin = false;
    shuffleArray(taskActive); // imported function

    taskMatrix = Array.from({ length: 5 }, () => Array(5).fill(null));
    let x = 0;
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (r === 2 && c === 2) {
                taskMatrix[r][c] = {text: "free space", marked: true};
            } else {
                taskMatrix[r][c] = {id: taskActive[x].id, text: taskActive[x].task, marked: false};
                x += 1;
            }
        }
    }
    saveGame(); // local function
    displayScore(); // imported function
}

// LOAD GAME from localStorage
function loadGame() {
    const savedActive = localStorage.getItem("taskActive");
    const savedInactive = localStorage.getItem("taskInactive");
    const savedMatrix = localStorage.getItem("taskMatrix");
    const savedUserTasks = localStorage.getItem("userTasks");
    if (savedActive && savedInactive && savedMatrix) {
        taskActive = JSON.parse(savedActive);
        taskInactive = JSON.parse(savedInactive);
        taskMatrix = JSON.parse(savedMatrix);
        if (savedUserTasks) {userTasks = JSON.parse(savedUserTasks);}
        loadScore(); // local function
        makeListTable(); // imported function
        displayScore(); // imported function
        renderBoard(); // imported function
    } else {
        location.replace("/firstTasks.html"); // make sure this works
        firstGame(); // local function
    }
}
// LOAD SCORE from localStorage
function loadScore() {
    const savedScore = localStorage.getItem("score");
    if (savedScore) {score = JSON.parse(savedScore);}
    const savedScoreHistory = localStorage.getItem("scoreHistory");
    scoreHistory = JSON.parse(savedScoreHistory);
    score = checkScoreDate(scoreHistory); // imported function
}

export function saveGame() {
    localStorage.setItem("taskActive", JSON.stringify(taskActive));
    localStorage.setItem("taskInactive", JSON.stringify(taskInactive));
    localStorage.setItem("taskMatrix", JSON.stringify(taskMatrix));
    localStorage.setItem("userTasks", JSON.stringify(userTasks));
    saveScore(); // local function
    console.log("data saved")
}
export function saveScore() {
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
    const today = new Date;
    localStorage.setItem("scoreDate", JSON.stringify(today));
}