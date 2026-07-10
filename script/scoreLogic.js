import { score, scoreHistory, saveScore } from "./script.js";

const scoreDisplaySquare = document.getElementById("square-score");
const scoreDisplayBingo = document.getElementById("bingo-score");
const scoreDisplayBoard = document.getElementById("board-score");
export function displayScore() {
    scoreDisplaySquare.textContent = score.square;
    scoreDisplayBingo.textContent = score.bingo;
    scoreDisplayBoard.textContent = score.board;
    saveScore(); // imported function
}

export function checkScoreDate(histArr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const savedScoreDate = localStorage.getItem("scoreDate");
    const lastLoggedScoreDate = JSON.parse(savedScoreDate);
    const llsd = new Date(lastLoggedScoreDate);
    llsd.setHours(0, 0, 0, 0); // maybe redundant?

    if (today > llsd) {
        let newHistObj = {...score, date: llsd};
        histArr.push(newHistObj);
        saveScore(); // imported function
        let resetScore = {square: 0, bingo: 0, board: 0};
        return resetScore;
    } else {return score;}
}

const highScoreTable = document.getElementById("high-score");
const highDateDiv = document.getElementById("high-date");
const lastScoreTable = document.getElementById("last-score");
const lastDateDiv = document.getElementById("last-date");
const todayScoreTable = document.getElementById("today-score");
const todayDateDiv = document.getElementById("today-date");

export function makeScoreBoard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (scoreHistory.length > 0) {
        let highestScore = scoreHistory.reduce((max, item) => item.square > max.square ? item : max) // make sure this works now
        putEmUp(highScoreTable, highestScore); // local function
        let highDay = new Date(highestScore.date);
        highDateDiv.innerHTML = "from " + highDay.toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"});
        highDay.setHours(0, 0, 0, 0);
        let diffStr = dateDiffString(today, highDay); // local function
        highDateDiv.innerHTML += diffStr;

        let lastindex = (scoreHistory.length - 1);
        let lastone = scoreHistory[lastindex];
        putEmUp(lastScoreTable, lastone); // local function
        let lastday = new Date(lastone.date);
        lastDateDiv.innerHTML = "from " + lastday.toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"});
        lastday.setHours(0, 0, 0, 0);
        let diffStringAdtn = dateDiffString(today, lastday); // local function
        lastDateDiv.innerHTML += diffStringAdtn;
    }

    putEmUp(todayScoreTable, score); // local function
    todayDateDiv.innerHTML = today.toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"});
    lookAtThisGraph(); // local function
}
function putEmUp(table, array) {
    table.rows[0].cells[1].textContent = array.square;
    table.rows[0].cells[2].textContent = array.bingo;
    table.rows[0].cells[3].textContent = array.board;
}
function dateDiffString(date1, date2) {
    let msDiff = Math.abs(date1 - date2);
    let diff = Math.round(msDiff / (1000*60*60*24)); // msecs/day
    if (diff < 7) {
        let diffStringAdtn = ", " + diff + " days ago";
        return diffStringAdtn;
    } else if (diff < 31) {
        let diffWeek = Math.round(diff / 7);
        let diffStringAdtn = ", ~" + diffWeek + " weeks ago";
        return diffStringAdtn;
    } else if (diff < 365) {
        let diffMo = Math.round(diff / 30.5);
        let diffStringAdtn = ", ~" + diffMo + " months ago";
        return diffStringAdtn;
    } else {
        let diffYear = Math.round(diff / 365);
        let diffStringAdtn = ", ~" + diffYear + " years ago";
        return diffStringAdtn;
    }
}
// I could MAKE it so that it says "1 week ago" instead of "1 weeks ago" etc etc
// but that would be a lot of work for little payoff
// maybe save that for later

const squarePath = document.getElementById("squarePath");
const bingoPath = document.getElementById("bingoPath");
const boardPath = document.getElementById("boardPath");
const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");
const day4 = document.getElementById("day4");
const day5 = document.getElementById("day5");

function lookAtThisGraph() {
    // every time I do it makes me laugh
    if (scoreHistory.length < 5) {return;}
    if (!scoreHistory[0].square) {return;}
    // for if there's no data or not enough data
    // make this work later
    
    const fiveDayHist = scoreHistory.slice(-5);

    const fiveDaySquare = fiveDayHist.map(item => item.square);
    const fiveDayBingo = fiveDayHist.map(item => item.bingo);
    const fiveDayBoard = fiveDayHist.map(item => item.board);

    const recentHigh = fiveDaySquare.reduce((max, item) => item > max ? item : max);
    const yInterval = Math.floor(400 / recentHigh);
    // using square high score as max for all bc it's always largest

    const dStringSquare = getPathString(yInterval, fiveDaySquare);
    const dStringBingo = getPathString(yInterval, fiveDayBingo);
    const dStringBoard = getPathString(yInterval, fiveDayBoard);

    squarePath.setAttribute("d", dStringSquare);
    bingoPath.setAttribute("d", dStringBingo);
    boardPath.setAttribute("d", dStringBoard);

    setDayLabels(fiveDayHist); // local array
}
function getPathString(yInt, array) {
    const x = [50, 250, 450, 650, 850];
    const xm = [150, 350, 550, 750];

    const y = array.map(n => (450 - (yInt * n)));

    const dStr = `M ${x[0]} ${y[0]} C ${x[0]} ${y[0]} ${xm[0]} ${y[1]} ${x[1]} ${y[1]} S ${xm[1]} ${y[2]} ${x[2]} ${y[2]} S ${xm[2]} ${y[3]} ${x[3]} ${y[3]} S ${xm[3]} ${y[4]} ${x[4]} ${y[4]}`;
    // translated into human: M (x0, y0); C (x0, y0) (xm0, y1) (x1, y1); S (xm1, y2) (x2, y2); S (xm2, y3) (x3, y3); S (xm3, y4) (x4, y4)

    return dStr;
}
function setDayLabels(array) {
    const elements = [day1, day2, day3, day4, day5];
    for (let i = 0; i < 5; i++) {
        elements[i].innerHTML = labelDays(array[i]); // local array
    }
}
function labelDays(obj) {
    let thisDate = obj.date;
    let wd = thisDate.getDay();
    if (wd === 0 || wd === 6) {return "S";}
    if (wd === 1) {return "M";}
    if (wd === 2 || wd === 4) {return "T";}
    if (wd === 3) {return "W";}
    if (wd === 5) {return "F";}
}