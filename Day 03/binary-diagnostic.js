const fs = require('fs');

const fileName = './diagnostic-report.txt';

try {
  const fileData = fs.readFileSync(fileName, 'UTF-8');
  const fileLines = fileData.split(/\r?\n/);

  //   Part 1
  const gammaRate = calculateGammaRate(fileLines);
  const ghettoEpsilonRate = gammaRate.map((bit) => (bit == 0 ? 1 : 0));
  const powerConsumption =
    parseInt(gammaRate.join(''), 2) * parseInt(ghettoEpsilonRate.join(''), 2);

  //   console.log('The Gamma Rate is: ', gammaRate);
  //   console.log('The Epsilon Rate is: ', ghettoEpsilonRate);
  console.log('The Power Consumption of the submarine is: ', powerConsumption);

  //   Part 2
  const oxygenRating = calculateOxygenGeneratorRating(fileLines);
  const scrubberRating = calculateScrubberRating(fileLines);
  const lifeSupportRating =
    parseInt(oxygenRating.join(''), 2) * parseInt(scrubberRating.join(''), 2);

  //   console.log('The Oxygen Generator Rating is: ', oxygenRating);
  //   console.log('The C02 Scrubber Generator Rating is: ', scrubberRating);
  console.log("The submarine's Life Support Rating is: ", lifeSupportRating);
} catch (error) {
  console.error(error);
}

function calculateGammaRate(fileLines) {
  const mostCommonBitArray = [];

  for (let bitIndex = 0; bitIndex < fileLines[0].length; bitIndex++) {
    mostCommonBitArray.push(mostCommonBit(fileLines, bitIndex));
  }

  return mostCommonBitArray;
}

// Given an array of bits, returns the most commonly occuring one
function mostCommonBit(array, bitIndex) {
  let numBinary0 = 0;
  let numBinary1 = 0;

  array.forEach((bit) => {
    if (bit[bitIndex] == 0) numBinary0++;
    else numBinary1++;
  });

  if (numBinary0 === numBinary1) return 1;
  return numBinary0 > numBinary1 ? 0 : 1;
}

// Given an array of bits, returns the most commonly occuring one
function leastCommonBit(array, bitIndex) {
  let numBinary0 = 0;
  let numBinary1 = 0;

  array.forEach((bit) => {
    if (bit[bitIndex] == 0) numBinary0++;
    else numBinary1++;
  });

  if (numBinary0 === numBinary1) return 0;
  return numBinary0 < numBinary1 ? 0 : 1;
}

// Part 2
function calculateOxygenGeneratorRating(fileLines) {
  // Determine most common value in current bit position
  // Keep only numbers with that bit in that position (keep 1 if 0 and 1 are tied)
  let bitArray = [...fileLines];

  while (bitArray.length > 1) {
    for (let bitIndex = 0; bitIndex < 12; bitIndex++) {
      let mostCommon = mostCommonBit(bitArray, bitIndex);

      bitArray = bitArray.filter((line) => {
        return line[bitIndex] == mostCommon;
      });

      if (bitArray.length === 1) return bitArray;
    }
  }

  return bitArray;
}

function calculateScrubberRating(fileLines) {
  // Determine least common value in current bit position
  // Keep only numbers with that bit (keep 0 if 0 and 1 are tied)
  let bitArray = [...fileLines];

  while (bitArray.length > 1) {
    for (let bitIndex = 0; bitIndex < 12; bitIndex++) {
      let leastCommon = leastCommonBit(bitArray, bitIndex);

      bitArray = bitArray.filter((line) => {
        return line[bitIndex] == leastCommon;
      });

      if (bitArray.length === 1) return bitArray;
    }
  }

  return bitArray;
}
