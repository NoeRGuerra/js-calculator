const MAXDIGITS = 12;

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operand1, operator, operand2) {
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);
    let result;
    let decimalPlaces;
    switch (operator) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
            result = divide(operand1, operand2);
            break;
    }
    if (result.toString().length > 12) {
        decimalPlaces = MAXDIGITS - parseInt(result).toString().length;
        result = result.toFixed(decimalPlaces);
    }
    return result;
}

function isOperator(value) {
    return /[\-+*/]/.test(value);
}

function isNumber(value) {
    return /[0-9]/.test(value);
}

const buttons = document.querySelectorAll(".button-grid button");
const display = document.querySelector("#display");
let operationArray = [];
let clickedButton;
let previousButton;
let displayValue;
let result;
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        displayValue = display.textContent;
        clickedButton = event.target;
        if (isNumber(clickedButton.value)) {
            if (displayValue.length < 12) { // Check if clicked number must be appended or if it must replace the display value
                if (previousButton) {
                    display.textContent = (displayValue == "0" || isOperator(previousButton.value)) ? clickedButton.value : displayValue + clickedButton.value;
                }
                else {
                    display.textContent = (displayValue == "0") ? clickedButton.value : displayValue + clickedButton.value;
                }
            }
            if (previousButton && isOperator(previousButton.value)) { // Add displayed number to the array when clicking on number(s) afte clicking on operator
                display.textContent = clickedButton.value;
                operationArray.push(previousButton.value);
            }
        }
        else if (isOperator(clickedButton.value)) {
            if (previousButton && (isNumber(previousButton.value) || previousButton.value === "=")) {
                operationArray.push(displayValue);
            }
            if (operationArray.length === 3) {
                result = operate(...operationArray);
                operationArray = [result,];
                display.textContent = result;
            }
        }
        else if (clickedButton.value == "=") {
            if (!previousButton) {
                return;
            }
            if (isNumber(previousButton.value)) {
                operationArray.push(displayValue);
            }
            else if (isOperator(previousButton.value)) {
                operationArray.push(previousButton.value);
            }
            if (operationArray.length === 3) {
                result = operate(...operationArray);
            }
            else if (operationArray.length === 2) {
                result = operate(operationArray[0], operationArray[1], operationArray[0]);
            }
            if (result) {
                display.textContent = result;
                operationArray = [];
            }
        }
        else if (clickedButton.value == "clear") {
            display.textContent = "0";
            operationArray = [];
            previousButton = null;
        }
        else if (clickedButton.value == "sign") {
            if (displayValue != "0") {
                displayValue = parseFloat(displayValue) * -1;
                display.textContent = displayValue;
            }
        }
        previousButton = clickedButton;
    })
})