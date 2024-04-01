"use strict"

import { getMaxDigit, getArray, clickBoard, autoBoard } from "../controller/controller.js"

buttonListeners();

let newDigit = 0;

function buttonListeners() {
    document.getElementById('btn-start').addEventListener('click', () => startView());
}
function startView() {
    document.getElementById('btn-start').classList.add("hidden");
    const btnMax = document.getElementById('btn-max');
    const currentArray = getArray();
    document.getElementById('current-array').textContent = `[${currentArray}]`;

    btnMax.classList.remove("hidden");
    btnMax.addEventListener('click', () => getMaxNumber());
}

function getMaxNumber() {
    document.getElementById('btn-max').classList.add("hidden");
    const maxDigit = document.getElementById('max-digit');
    newDigit = getMaxDigit();

    maxDigit.textContent = `Max digit = ${newDigit}`;
    const btnSort = document.getElementById("btn-sort");
    btnSort.classList.remove("hidden");
    document.getElementById('btn-sort').addEventListener('click', () => viewBoard());
}

function viewBoard() {
    const board = document.getElementById("board");

    board.classList.remove("hidden");
    document.getElementById('btn-play').addEventListener('click', () => clickUpdateView());
    document.getElementById('btn-auto').addEventListener('click', () => autoUpdateBoardView());
}

function clickUpdateView() {
    clickBoard();
}

function autoUpdateBoardView() {
    autoBoard();
}

let lastNumber;
let tempArray = [];

export function populateBoard(value, bucket, iteration, arrayLength, iterationsLength) {
    lastNumber = value;
    tempArray.push(lastNumber);

    const divNumber = document.getElementById(`b-${bucket}`).firstElementChild; // Get a hold of the numbers div in buckets
    let divHTML = divNumber.innerHTML;
    divHTML += `<div id="number">${value}</div>`;

    divNumber.innerHTML = divHTML;

    if (tempArray.length === arrayLength) { //Every 10th iteration we display the new array
        displayNewArray(tempArray);
        tempArray = [];
        document.getElementById('current-iteration').textContent = `Current iteration: ${iteration + 1}`

        if (iteration !== iterationsLength - 1) { //We clear the elements everytime we have iterated through all elements, except the last iteration
            for (let i = 0; i < 10; i++) {
                document.getElementById(`b-${i}`).firstElementChild.innerHTML = "";
            }
        }
    }
}

export function displayNewArray(tempArray) {
    document.getElementById('new-array').textContent = `[${tempArray}]`
}