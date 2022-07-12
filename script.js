'use strict'

let first = "";
let second = "";
let op = undefined;
let operator = "";
let displayText = "";
let decPlacedFirst = false;
let decPlacedSecond = false;
let evaluate = false;
const buttons = document.querySelectorAll('button');
const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const signBtn = document.querySelector('.sign');
const deleteBtn = document.querySelector('.delete');
const decimalBtn = document.querySelector('.decimal');
const equalBtn = document.querySelector('.equal')
const percentBtn = document.querySelector('.percent');

const resultText = document.querySelector('.result-text');
function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function operate(a,b,op){
    return op(a,b);
}

function setCalculator(){
    operands.forEach(
        item => item.addEventListener('click', e => appendNumber(e.target.textContent))
    );

    operators.forEach(
        item => item.addEventListener('click', e => setOperator(e.target.textContent))
    );

    equalBtn.addEventListener('click', setEqualBtn);
    clearBtn.addEventListener('click', clear);
    deleteBtn.addEventListener('click', erase);
    decimalBtn.addEventListener('click', appendDecimal);
    signBtn.addEventListener('click', setSignBtn);
    percentBtn.addEventListener('click', setPercentBtn);
    window.addEventListener('keydown', setKeyboardInput);
}

function setKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendDecimal()
  if (e.key === '=' || e.key === 'Enter') setEqualBtn()
  if (e.key === 'Backspace') erase()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperator(e.key)
}

function appendNumber(number){
   if(!op){
        first += number;
        displayText += number;
    }else{
        second += number;
        displayText += number;
    }
    setResult(displayText);
}

function setOperator(newOp){
    let prevChar = displayText.charAt(displayText.length - 1);
    if(op){
        calculate();
    }
    operator = newOp;
    switch (operator){
        case "+":
            op = add;
            break; 
        case "-":
            op = subtract;
            break; 
        case "*":
            op = multiply;
            break; 
        case "/":
            op = divide;
            break; 
    }
    if(prevChar !== op){
        displayText = `${first}${operator}`;
    }
    setResult(displayText);
}

function round(num){
    if(num.toString().includes('.') && !num.toString().includes('e') && num.toString().split('.')[1].length > 6){
        return +(Math.round(num + "e+3")  + "e-3");
    }else if(num.toString().includes('.') && num.toString().split('.')[1].length > 6){
        return num
    }

    return num;
}

function setEqualBtn() {
    calculate()
}

function clear(){
    first = "";
    second = "";
    op = undefined;
    operator = "";
    displayText = "";
    decPlacedFirst = false;
    decPlacedSecond = false;
    setResult(displayText);
}

function erase(){
    let prevChar = displayText.charAt(displayText.length - 1);
    displayText = displayText.slice(0,displayText.length - 1);
    setResult(displayText);
    if(prevChar === '.'){
        if(!op){
            decPlacedFirst = false;
        }else if(op && second){
            decPlacedSecond = false;
        }
    }

    if(!op){
        first = first.slice(0, first.length -1);
    }else if(op && !second){
        op ="";
    }else if(op && second){
        second = second.slice(0, second.length -1);
    }
}

function appendDecimal(){
    let prevChar = displayText.charAt(displayText.length - 1);
    if(!op && !decPlacedFirst){
        first+= '.';
        displayText += '.';
        setResult(displayText);
        decPlacedFirst = true;
    }else if(op && prevChar !== op && !decPlacedSecond){
        second+= '.';
        displayText += '.';
        setResult(displayText);
        decPlacedSecond = true;
    }
}

function setSignBtn(){
    let prevChar = displayText.charAt(displayText.length - 1);
    if(!op || prevChar === op){
        first = -(Number(first));
        displayText = `${first}`;
    }else if(op && prevChar !== op){
        second = -(Number(second));
        displayText = `${first}${operator}${second}`;
    }
    setResult(displayText);
}

function setPercentBtn(){
    if(!op || prevChar === op){
        first = Number(first) / 100;
        displayText = `${first * 100}%`;
    }else if(op && prevChar !== op){
        second = Number(second) / 100;
        displayText = `${first}${operator}${second * 100}%`;
    }
    setResult(displayText);
}

function calculate(){
    if(first && second && op){
        if(operator === '/' && Number(second) === 0){
            clear();
            setResult('MATH ERROR');
        }else {
            first = round(operate(parseFloat(first),parseFloat(second), op));
            second = "";
            op = undefined;
            operator = "";
            displayText = `${first}`;
            setResult(displayText);
        }
    }
}



function setResult(text){
    if(text === "NaN"){
        clear();
    }
    resultText.textContent = text;
}

window.onload = function(){
    setCalculator();
};