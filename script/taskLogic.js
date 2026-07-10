import { taskActive, taskInactive, userTasks, saveGame } from "./script.js";

export function nextDue(taskObject) {
    let objFreq = taskObject.freq;
    if (typeof objFreq === "string") {objFreq = parseInt(objFreq);}
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + objFreq);
    taskObject.due = nextDate;
}

function checkDate() {
    const today = new Date();
    for (let i = 0; i < taskInactive.length; i++) {
        let dueDate = new Date(taskInactive[i].due);
        if (today > dueDate) {
            taskInactive[i].active = true;
            taskInactive[i].due = undefined;
        }
    }
}
function pushActiveInactive() {
    // move active tasks from taskInactive into taskActive
    for (let i = (taskInactive.length - 1); i >= 0; i--) {
        if (taskInactive[i].active == true && !taskActive.includes(taskInactive[i])) {
            taskActive.push(taskInactive[i]);
        }
        if (taskInactive[i].active == true && taskActive.includes(taskInactive[i])) {
            taskInactive.splice(i, 1);
        }
        // also just in case:
//        if (taskInactive[i].active == false && taskInactive[i].due == undefined) {
//            console.error("schedule error");
//            alert("schedule error");
//        }
// make this make sense lol
    }
    // move inactive tasks from taskActive to taskInactive
    for (let i = (taskActive.length - 1); i >=0; i --) {
        if (taskActive[i].active == false && !taskInactive.includes(taskActive[i])) {
            taskInactive.push(taskActive[i]);
        }
        if (taskActive[i].active == false && taskInactive.includes(taskActive[i])) {
            taskActive.splice(i, 1);
        }
    }
    if (taskActive.length < 24) {
        console.error("not enough active tasks");
        alert("not enough active tasks");
        // MAKE SOMETHING BETTER THAN THIS
        // LIKE GIVE THE USER A PROMPT TO MAKE OR CHOOSE MORE TASKS
        // INSTEAD OF JUST POPPING AN ALERT
    }
}

const activeTable = document.getElementById("active-tasks");
const inactiveTable = document.getElementById("inactive-tasks");
export function makeListTable() {
    checkDate(); // local function
    pushActiveInactive(); // local function
    activeTable.innerHTML = ""; // clear out any items to prevent duplicates
    listActiveTasks(); // local function
    inactiveTable.innerHTML = ""; // clear out any items to prevent duplicates
    listInactiveTasks(); // local function
}
function listActiveTasks() {
    taskActive.forEach(item => {
        let newTaskRow = samesies(item); // local function
        newTaskRow.classList.add("active");
        activeTable.appendChild(newTaskRow);
    });
}
function listInactiveTasks() {
    taskInactive.forEach(item => {
        let newTaskRow = samesies(item); // local function

        let dueCell = document.createElement("td");
        dueCell.innerHTML = "next: ";
        let tableDueDate = new Date(item.due);
        dueCell.innerHTML += tableDueDate.toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"});
        newTaskRow.appendChild(dueCell);

        newTaskRow.classList.add("inactive");
        inactiveTable.appendChild(newTaskRow);
    });
}
function samesies(item) {
    let newTaskRow = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.innerHTML = item.task;
    newTaskRow.appendChild(nameCell);

    let freqCell = document.createElement("td");
    freqCell.innerHTML = `every ${item.freq} days`;
    if (item.freq === 7) {freqCell.innerHTML = "every week";}
    if (item.freq % 7 === 0) {freqCell.innerHTML = "every " + (item.freq / 7) + " weeks";}
    if (item.freq === 30 || item.freq === 31) {freqCell.innerHTML = "every month";}
    // dividing by days in a month is too complicated so we're just gonna leave it at that
    newTaskRow.appendChild(freqCell);

    return newTaskRow;
}

export function newCustomTask (name, freq) {
    let customTask = {id: 0, task: "", freq: 0, active: true, due: undefined};
    customTask.id = (userTasks.length + 100); // so custom tasks will be in their own "100 series". 100, 101, 102, etc.
    customTask.task = name;
    customTask.freq = parseInt(freq);
    userTasks.push(customTask);
    taskActive.push(customTask);
    makeListTable(); // local function
    saveGame(); // imported function
}