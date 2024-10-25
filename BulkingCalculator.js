let tablecalpro = document.getElementById('caloriesandprotein');
let rowscalpro = tablecalpro.getElementsByTagName('tr');
let cellscal = document.getElementsByClassName('cal');
let cellspro = document.getElementsByClassName('pro');

function calculateSumPro() {
    const inputs = document.querySelectorAll('.pro');
    let sum = 0;
    inputs.forEach(input => {
        sum += parseInt(input.value) || 0;
    });
    document.getElementById('totalprotein').value = sum;
    if (document.getElementsByClassName('goalpro')[0].innerText === "") {
        calculateRemainingPro();
        }
}

function calculateSumCal() {
    const inputs = document.querySelectorAll('.cal');
    let sum = 0;
    inputs.forEach(input => {
        sum += parseInt(input.value) || 0;
    });
    document.getElementById('totalcalories').value = sum;
    if (document.getElementsByClassName('goalcal')[0].innerText === "") {
    calculateRemainingCal();
    }
}


let addRowButton = document.getElementById('addrowbutton');
let lastRow = document.getElementById('total');



addRowButton.onclick = function addRow() {
    let newRow = document.createElement('tr');
    newRow.classList.add('newrow');
    lastRow.parentNode.insertBefore(newRow, lastRow);
    for (let i=0; i < 3; i++) {
    let newCell = document.createElement('td');
    let newInput = document.createElement('input');
    if (i === 0) {
    newCell.classList.add('notopborder');
    } else if (i === 1) {
    newInput.setAttribute('oninput', 'calculateSumCal()');
    newInput.setAttribute('type', 'number');
    newInput.classList.add('numberinput' , 'cal');
    } else if (i === 2) {
    newInput.setAttribute('oninput', 'calculateSumPro()');
    newInput.setAttribute('type', 'number');
    newInput.classList.add('numberinput' , 'pro');
    };
    newRow.appendChild(newCell);
    if (newCell.classList.contains('notopborder')) {
    newCell.style.color = 'black';
    } else {
    newCell.appendChild(newInput);
    };
    };
};

function calculateRemainingCal() {
    let remainCal = document.getElementById('remainingcal');
    let calGoal = document.getElementsByClassName('goalcal')[0];
    let totalCal = document.getElementById('totalcalories');
    
    if (calGoal.value !== "" && totalCal.value !== "") {
        let remainder = parseInt(calGoal.value) - parseInt(totalCal.value);
    remainCal.value = remainder;
    } else if (calGoal.value !== "") { 
        document.getElementById('remainingcal').innerText = "Enter Calories";
    } else {
        document.getElementById('remainingcal').innerText = "Enter Goal";
    };
}

function calculateRemainingPro() {
    let remainPro = document.getElementById('remainingpro');
    let proGoal = document.getElementsByClassName('goalpro')[0];
    let totalPro = document.getElementById('totalprotein');
    
    if (proGoal.value !== "" && totalPro.value !== "") {
        let remainder = parseInt(proGoal.value) - parseInt(totalPro.value);
    remainPro.value = remainder;
    } else if (proGoal.value !== "") { 
        document.getElementById('remainingpro').innerText = "Enter Protein";
    } else {
        document.getElementById('remainingpro').innerText = "Enter Goal";
    };
}


