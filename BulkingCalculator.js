let tablecalpro = document.getElementById('caloriesandprotein');
let rowscalpro = tablecalpro.getElementsByTagName('tr');
let cellscal = document.getElementsByClassName('cal');
let cellspro = document.getElementsByClassName('pro');

/* Calculating Sums */

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

/* Adding Rows Button */

let addRowButton = document.getElementById('addrowbutton');
let lastRow = document.getElementById('total');

function addRow() {
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

addRowButton.onclick = addRow;

/* Calculating Remainders */

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

/* AutoSave Function */
/*
let CalAndPro1 = document.getElementsByClassName('numberinput')[0];

CalAndPro1.value = localStorage.getItem('CalAndPro1');

CalAndPro1.addEventListener("keyup", logAndShowData);

function logAndShowData() {
     localStorage.setItem('CalAndPro1', CalAndPro1.value);
     CalAndPro1.value = localStorage.getItem('CalAndPro1');
}
*/

let table = document.getElementById('caloriesandprotein');

function logData() {
  let CalAndProArray = [];
  let CalAndProData = document.getElementsByClassName('numberinput');
  for (let i = 0; i < CalAndProData.length; i++) {
    CalAndProArray.push(CalAndProData[i].value);
  }

localStorage.setItem('Data', JSON.stringify(CalAndProArray));
};

table.addEventListener("keyup", logData);

function loadData() {
    let inputs = document.getElementsByClassName('numberinput');

    if (localStorage.getItem('Data') === null) { 
       console.log('value null');
       return;
    }

    let retrievedData = JSON.parse(localStorage.getItem('Data')); 

    while (retrievedData.length > inputs.length) {
       addRow();
       for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = retrievedData[i];
       }
    }

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = retrievedData[i];
    }
}

loadData();

/* Reset Button */

let resetButton = document.getElementById('resetbutton');

resetButton.onclick = function resetData() {
    localStorage.clear();
    window.location.reload();
}

/* Make sure all sums are calculated if pulling from local Storage */

calculateSumPro();
calculateSumCal();

