"use strict";
import { populateBoard, nextClick } from "../view/view.js"

// Array that will be sorted.
const testArr = [0, 1, 382, 32, 49, 20, 2133, 34825, 123, 9, 4294];
// const testArr = [226, 27, 278, 1, 283, 211, 590, 5171, 2523, 2185];
// const testArr = [9, 2, 1, 5, 6, 7, 3, 4 ,0, 8]
let iterations = []; // This contains every iteration of the algorithm so we can visualise it later on.
let timeOutValue = 300; // This controls how fast our tickrate is.

export function startRadixSort() {
    radixSort(testArr);
}

export function getMaxDigit() { // This returns the length of the longest number in the array. It will control how many iterations we will run.
    return mostDigits(testArr);
}

function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10; //Math.abs make sure its always positive number, entire algo makes it count digits from back in arraystyle.
}

function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1; //Calculates the amount of times it is uplifted with 10 number logaritme.
}

function mostDigits(nums) {
    let maxDigits = 0;

    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i])); //Checks the array for the highest possible length of a number so we count from correct position.
    }

    return maxDigits;
}

function radixSort(arrOfNums) {
    let maxDigitCount = mostDigits(arrOfNums);

    for (let k = 0; k < maxDigitCount; k++) {
        // Outerloops runs as many times as the largest number has digits
        let digitBuckets = Array.from({ length: 10 }, () => []); // creates a new array of buckets
        for (let i = 0; i < arrOfNums.length; i++) {
            let digit = getDigit(arrOfNums[i], k); // Get the digit to evaluate
            digitBuckets[digit].push(arrOfNums[i]); // pushes the number to the correct bucket
        }
        iterations.push(digitBuckets);
        arrOfNums = [].concat(...digitBuckets); // flattens the buckets into a new arraylist
    }

    return arrOfNums; // returns the finished array
}

export function getArray() { // This returns the array to the view
    return testArr;
}

export function autoBoard() {
    startRadixSort(); //Sorts the test array, we dont use it just  for show.
    for (let i = 0; i < iterations.length; i++) {
        const buckets = iterations[i]; //All the buckets in the current iteration

        for (let j = 0; j < buckets.length; j++) {
            const bucketArray = buckets[j] //The array within that bucket

            for (let k = 0; k < bucketArray.length; k++) {
                const value = bucketArray[k]; //The value within that bucket array
                setTimeout(() => {
                    populateBoard(value, j, i, testArr.length, iterations.length); //Timeout for animating the view
                }, timeOutValue);
                timeOutValue += 300;
            }
        }
    }
}
    // TODO : Remove either play or auto button on use. Change last element to red text and turn it black when new element arrives.
    // TOOD : Finish clickboard with await async.
    // TODO : More CSS styling. 
    
export async function clickBoard() {

    startRadixSort(); //Sorts the test array, we dont use it just  for show.
    for (let i = 0; i < iterations.length; i++) {
        const buckets = iterations[i]; //All the buckets in the current iteration

        for (let j = 0; j < buckets.length; j++) {
            const bucketArray = buckets[j] //The array within that bucket

            for (let k = 0; k < bucketArray.length; k++) {
                const value = bucketArray[k]; //The value within that bucket array
                await nextClick();
                populateBoard(value, j, i, testArr.length, iterations.length);
            }
        }
    }
}
