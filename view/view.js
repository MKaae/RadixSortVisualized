"use strict"

import { getMaxDigit, getArray, clickBoard, autoBoard } from "../controller/controller.js"

buttonListeners();

let newDigit = 0;

function buttonListeners() {
    document.getElementById('btn-start').addEventListener('click', () => startView());
    document.getElementById('btn-reset').addEventListener('click', () => reset());
}
function startView() {
    document.getElementById('first-text').classList.add('hidden');
    document.getElementById('btn-start').classList.add("hidden");
    const btnMax = document.getElementById('btn-max');
    const currentArray = getArray();
    document.getElementById('current-array').textContent = `Array to be sorted: [${currentArray}]`;

    btnMax.classList.remove("hidden");
    btnMax.addEventListener('click', () => getMaxNumber());
}

function getMaxNumber() {
    document.getElementById('btn-max').classList.add("hidden");
    const maxDigit = document.getElementById('max-digit');
    newDigit = getMaxDigit();

    maxDigit.textContent = `Max digit is ${newDigit} numbers`;
    const btnSort = document.getElementById("btn-sort");
    btnSort.classList.remove("hidden");
    document.getElementById('btn-sort').addEventListener('click', () => viewBoard());
}

function viewBoard() {
    document.getElementById('second-text').classList.remove('hidden');
    const board = document.getElementById("board");
    document.getElementById('btn-sort').classList.add('hidden');
    board.classList.remove("hidden");
    document.getElementById('btn-play').addEventListener('click', () => clickUpdateView());
    document.getElementById('btn-auto').addEventListener('click', () => autoUpdateBoardView());
}

function clickUpdateView() {
    document.getElementById('btn-play').classList.add('hidden');
    document.getElementById('btn-auto').classList.add('hidden');
    document.getElementById('btn-next').classList.remove('hidden');
    document.getElementById('btn-reset').classList.remove('hidden');
    clickBoard();
}

function autoUpdateBoardView() {
    document.getElementById('btn-play').classList.add('hidden');
    document.getElementById('btn-reset').classList.remove('hidden');
    document.getElementById('btn-auto').classList.add('hidden');
    autoBoard();
}

let lastNumber;
let tempArray = [];

export function populateBoard(value, bucket, iteration, arrayLength, iterationsLength) {
    tempArray.push(value);
    
    if(lastNumber !== undefined){
        document.getElementById(`${lastNumber}`).classList.remove('redtext');
    }

    const divNumber = document.getElementById(`b-${bucket}`).firstElementChild; // Get a hold of the numbers div in buckets
    let divHTML = divNumber.innerHTML;
    divHTML += `<div id="number_${value}" class="redtext">${value}</div>`;
    lastNumber = `number_${value}`;
    divNumber.innerHTML = divHTML;

    if (tempArray.length === arrayLength) { //Every 10th iteration we display the new array
        displayNewArray(tempArray);
        tempArray = [];
        document.getElementById('current-iteration').textContent = `Current iteration: ${iteration + 1}`

        if (iteration !== iterationsLength - 1) { //We clear the elements everytime we have iterated through all elements, except the last iteration
            for (let i = 0; i < 10; i++) {
                document.getElementById(`b-${i}`).firstElementChild.innerHTML = "";
                lastNumber = undefined;
            }
        }
    }
}

export function displayNewArray(tempArray) {
    document.getElementById('new-array').textContent = `New array: [${tempArray}]`
}

export async function nextClick(){
    return new Promise(resolve => {
        document.getElementById('btn-next').addEventListener('click', () => {
            console.log("Next was clicked!");
            resolve();
        });
    });
}

function reset(){
    window.location.reload();
}