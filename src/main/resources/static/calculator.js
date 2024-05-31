let activityTable = document.getElementById("activity-table").getElementsByTagName("tbody")[0];
let addRowButton = document.getElementById("add-row-btn");
let meanButton = document.getElementById("mean-btn");
let weightButton = document.getElementById("weight-btn");
let output = document.getElementById("percentage-output");

addRowButton.addEventListener("click", addRow);
meanButton.addEventListener("click", mean);
weightButton.addEventListener("click", weightedMean);

function addRow() {
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>Activity ${activityTable.rows.length + 1}</td>
    <td>A${activityTable.rows.length + 1}</td>
    <td><input type="text" name="weight" class="weight-input"></td>
    <td><input type="text" name="achived" class="achived-grade-input"> / <input type="text" name="total" class="total-grade-input"></td>
    <td></td>
    `;
    activityTable.append(newRow);
}

function mean() {
    let grades = document.querySelectorAll(".achived-grade-input");
    let totals = document.querySelectorAll(".total-grade-input");
    let percentage = 0;

    grades.forEach((grade, index) => {
        let gradeInputs = parseFloat(grade.value);
        let totalInputs = parseFloat(totals[index].value);
        percentage += gradeInputs / totalInputs;

    });
    let result = ((percentage / grades.length) * 100).toFixed(2)
    displayResults(result);
}

function weightedMean() {
    let gradeArray = document.querySelectorAll(".achived-grade-input");
    let totalArray = document.querySelectorAll(".total-grade-input");
    let weightArray = document.querySelectorAll(".weight-input");
    let percentage = 0;
    let totalWeight = 0;

    gradeArray.forEach((grade, index) => {
        let gradeInputs = parseFloat(grade.value);
        let totalInputs = parseFloat(totalArray[index].value);
        let weightInputs = parseFloat(weightArray[index].value);

        percentage += (gradeInputs / totalInputs) * weightInputs;
        totalWeight += weightInputs;
    });
    let result = ((percentage / totalWeight) * 100).toFixed(2)
    displayResults(result);

}

function displayResults(result) {
    if (isNaN(result) || result < 0) {
        output.textContent = "Invalid entry";
    }
    else {
        output.textContent = result + " / 100";
    }
}