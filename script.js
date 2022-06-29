'use strict'

let first = "";
let second = "";
let op = "";
let displayText = "";
let evaluate = false;
const buttons = document.querySelectorAll('button');
const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const signBtn = document.querySelector('.sign');
const deleteBtn = document.querySelector('.delete');
const decimalBtn = document.querySelector('.decimal');
const equalBtn = document.querySelector('.equal')

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
    // setDeleteBtn();
    // setDecimalBtn();
    // setSignBtn();
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
    let operator = e.target.textContent;
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
    displayText += operator;
    setResult(displayText);
}

function setEqualBtn() {
    if(first && second && op){
        first = operate(parseInt(first),parseInt(second), op);
        second = "";
        displayText = `${first}`;
        setResult(displayText);
    }
}

function calculate(){
    if(first && second && op){
        first = operate(parseInt(first),parseInt(second), op);
        second = "";
        displayText = `${first}`;
    }
}

function setClearBtn(){
    first = "";
    second = "";
    op = "";
    displayText = "";
    setResult(displayText);
}

function setResult(text){
    resultText.textContent = text;
}

window.onload = function(){
    setCalculator();
};