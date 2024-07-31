const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

//defining a 'calculate' object to hold the operation functions
const calculate = {
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number) {
    // Replace current display value if waiting for next value, else add number
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // if current display value is 0, replace it. If not, add number to display
        const displayValue =  calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// ensuring only one decimal point can be added to a number
function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingNextValue) return;

    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// capturing the operator and storing the first value before the operator is applied.
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    //Prevent multiple operators from being pressed
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Store operator and await next value
    operatorValue = operator;
    awaitingNextValue = true;
}

//Calculating result when the equal sign is clicked
function calculateResult() {
    const currentValue = Number(calculatorDisplay.textContent);
    if(!operatorValue || awaitingNextValue) return;

    const result = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = result;
    firstValue = result;
    operatorValue = '';
}

//Reset Display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event listeners

// Event listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal'))
    {
        inputBtn.addEventListener('click', () => addDecimal());
    } else if(inputBtn.classList.contains('equal-sign')) {
        inputBtn.addEventListener('click', calculateResult);
    }
});
//Event listener for reset display
clearBtn.addEventListener('click', resetAll);