const DIGITS = 12;

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
    if (result.toString().length > 12){
        decimalPlaces = DIGITS - parseInt(result).toString().length;
        result = result.toFixed(decimalPlaces);
    }
    return result;
}

function isOperator(value) {
    return /[\-+*/]/.test(value);
}

function isNumber(value){
    return /[0-9]/.test(value);
}

const buttons = document.querySelectorAll(".button-grid button");
const regexp = /[0-9+\-*/]/
const display = document.querySelector("#display");
let operationArray = [];
let result = 0;
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        let pushedButton = event.target.value;
        let displayValue = display.textContent;

        if (isNumber(pushedButton)){
            if (isNumber(displayValue) && displayValue.length < 12){
                display.textContent = (displayValue == "0" || operationArray[0] == "=") ? pushedButton : displayValue + pushedButton;
            }
            else if (isOperator(displayValue)){
                if (operationArray.length == 3){
                    result = operate(...operationArray);
                    operationArray = [];
                    operationArray.push(result);
                }
                operationArray.push(displayValue);
                display.textContent = pushedButton;
            }
        }
        else if (isOperator(pushedButton)){
            if (isNumber(displayValue) && displayValue != "0"){
                operationArray.push(displayValue);
            }
            else if (displayValue == "0"){
                return;
            }
            display.textContent = pushedButton;
        }
        else if (pushedButton == "="){
            if (operationArray.length < 1)
                return;
            if (isNumber(displayValue))
                operationArray.push(displayValue);
            result = operate(...operationArray);
            display.textContent = result;
            operationArray = [];
            operationArray.push("=");
            console.log(operationArray);
        }
        else if (pushedButton == "clear"){
            operationArray = [];
            display.textContent = "0";
        }
        else if (pushedButton == "sign"){
            if (isNumber(displayValue) && displayValue != "0")
                display.textContent = parseFloat(displayValue)*-1;
        }
        console.log(operationArray);
        console.log(`Last pushed: ${pushedButton}`);
    })
})