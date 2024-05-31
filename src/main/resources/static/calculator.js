let activityTable = document.getElementById("activity-table").getElementsByTagName("tbody")[0];
let addRowButton = document.getElementById("add-row-btn");
let meanButton = document.getElementById("mean-btn");
let weightButton = document.getElementById("weight-btn");
let output = document.getElementById("results");

addRowButton.addEventListener("click", addRow);
meanButton.addEventListener("click", mean);
weightButton.addEventListener("click", weightedMean);

document.querySelectorAll(".achived-grade-input, .total-grade-input").forEach(input => {
    input.addEventListener("input", updatePercentage);
});

function addRow() {
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>Activity ${activityTable.rows.length + 1}</td>
    <td>A${activityTable.rows.length + 1}</td>
    <td><input type="text" name="weight" class="weight-input"></td>
    <td><input type="text" name="achived" class="achived-grade-input"> / <input type="text" name="total" class="total-grade-input"></td>
    <td class="percentage-output"></td>
    `;
    activityTable.append(newRow);


    newRow.querySelectorAll(".achived-grade-input, .total-grade-input").forEach(input => {
        input.addEventListener("input", updatePercentage);
    });
}

function updatePercentage() {
    let row = this.closest('tr');
    let achievedInput = row.querySelector(".achived-grade-input");
    let totalInput = row.querySelector(".total-grade-input");
    let percentageOutput = row.querySelector(".percentage-output");

    let achieved = parseFloat(achievedInput.value);
    let total = parseFloat(totalInput.value);

    if (!isNaN(achieved) && !isNaN(total) && total !== 0) {
        let percentage = ((achieved / total) * 100).toFixed(2);
        percentageOutput.innerText = `${percentage} / 100`;
    } else {
        percentageOutput.innerText = "";
    }
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

    let result = ((percentage / grades.length) * 100).toFixed(2);
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

    let result = ((percentage / totalWeight) * 100).toFixed(2);
    displayResults(result);
}

function displayResults(result) {
    if (isNaN(result) || result < 0) {
        output.innerText = `Results: Invalid entry`;
    } else {
        output.innerText = `Results: ${result} / 100`;
    }
}

updateAllPercentages();

function updateAllPercentages() {
    document.querySelectorAll(".achived-grade-input, .total-grade-input").forEach(input => {
        input.addEventListener("input", updatePercentage);
    });
}
