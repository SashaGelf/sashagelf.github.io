const savedTaskActive = JSON.parse(localStorage.getItem("taskActive"));
if (savedTaskActive) {
    if (savedTaskActive.length >= 24) {location.replace("/HTML/TaskBingoV3/index.html");}
    // change that url later obvi make
}

const firstTasks = [];

const ftHint = document.getElementById("first-tasks-hint");
const hintClose = document.getElementById("hint-close");
const ftUpload = document.getElementById("ft-upload-tasks");
const ftSubmit = document.getElementById("first-tasks-submit");

hintClose.addEventListener("click", () => {
    ftHint.style.display = "none";
});

ftSubmit.addEventListener("click", () => {
    const ftTables = document.getElementById("first-tasks-tables-both");
    const inputTextArr = Array.from(ftTables.querySelectorAll("input[type='text']"));
    const inputNumArr = Array.from(ftTables.querySelectorAll("input[type='number']"));
    const textValArr = inputTextArr.map(item => item.value);
    const numValArr = inputNumArr.map(item => item.value);
    
    for (let i = 0; i < 24; i++) {
        let ftName = textValArr[i];
        let ftFreq = numValArr[i];
        if (!ftName || !ftFreq) {return alert("You need 24 tasks to fill out a bingo board!");}
        
        let customTask = {id: 0, task: "", freq: 0, active: true, due: undefined};
        customTask.id = (firstTasks.length);
        customTask.task = ftName;
        customTask.freq = parseInt(ftFreq);

        firstTasks.push(customTask);
    }
    localStorage.setItem("firstTasks", JSON.stringify(firstTasks));
    location.replace("/HTML/TaskBingoV3/index.html");
    // make change that url later
});

ftUpload.addEventListener("change", () => {
    const uploadedTasks = ftUpload.files;
    for (let i = 0; i < uploadedTasks.length; i++) {
        const reader = new FileReader();
        reader.onload = function (ev) {
            const list = JSON.parse(ev.target.result);
            firstTasks.push(...list);

            if (firstTasks.length >= 24) {
                localStorage.setItem("firstTasks", JSON.stringify(firstTasks));
                location.replace("/HTML/TaskBingoV3/index.html");
                // change that url later make
            }
        }
        reader.readAsText(ftUpload.files[i]);
    }
});