const fs = require('fs');

const fileName = './radar.txt';

// Day 1 function
function depthIncreases(array) {
    let numIncreases = 0;

    for (let i = 1; i < array.length; i++) {
        if (parseInt(array[i]) > parseInt(array[i - 1])) {
            numIncreases++;
        }
    }

    return numIncreases;
}

// Part 2 function
function depthIncreasesSlidingWindow(array, windowLength = 3) {
    let numIncreases = 0;

    for (let i = 0; i < array.length - windowLength; i++) {
        if (parseInt(array[i]) + parseInt(array[i + 1]) + parseInt(array[i + 2]) <
        parseInt(array[i + 1]) + parseInt(array[i + 2]) + parseInt(array[i + 3])) {
            numIncreases++;
        }
    }

    return numIncreases;
}

try {
    const fileData = fs.readFileSync(fileName, "UTF-8");

    const depthArray = fileData.split(/\r?\n/);

    // Part 1
    const numDepthIncreases = depthIncreases(depthArray);
    console.log("Day 1, Part 1: ", numDepthIncreases);

    // Part 2
    const numDepthIncreasesSlidingWindow = depthIncreasesSlidingWindow(depthArray, 3);
    console.log("Day 1, Part 2: ", numDepthIncreasesSlidingWindow);

} catch (error) {
    console.error(error);
}

