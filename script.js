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
        item => item.addEventListener('click', e => setOperands(e))
    );

    operators.forEach(
        item => item.addEventListener('click', e => setOperator(e))
    );

    equalBtn.addEventListener('click', setEqualBtn);
    clearBtn.addEventListener('click', setClearBtn);
    deleteBtn.addEventListener('click', setDeleteBtn);
    decimalBtn.addEventListener('click', setDecimalBtn);
    signBtn.addEventListener('click', setSignBtn);
    percentBtn.addEventListener('click', setPercentBtn);
    
}
function setOperands(e){
   if(!op){
        first += e.target.textContent;
        displayText += e.target.textContent;
        // console.log(`first: ${first}`);
    }else{
        second += e.target.textContent;
        displayText += e.target.textContent;
        // console.log(`second: ${second}`);
    }
    setResult(displayText);
}

function setOperator(e){
    let prevChar = displayText.charAt(displayText.length - 1);
    operator = e.target.textContent;
    if(op){
        calculate();
    }
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
    return +(Math.round(num + "e+3")  + "e-3");
}

function setEqualBtn() {
    if(first && second && op){
        first = round(operate(parseFloat(first),parseFloat(second), op));
        second = "";
        op = undefined;
        operator = "";
        displayText = `${first}`;
        setResult(displayText);
    }
}

function setClearBtn(){
    first = "";
    second = "";
    op = "";
    displayText = "";
    decPlacedFirst = false;
    decPlacedSecond = false;
    setResult(displayText);
}

function setDeleteBtn(){
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

function setDecimalBtn(){
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
        first = round(operate(parseFloat(first),parseFloat(second), op));
        second = "";
        displayText = `${first}`;
    }
}



function setResult(text){
    resultText.textContent = text;
}

window.onload = function(){
    setCalculator();
};