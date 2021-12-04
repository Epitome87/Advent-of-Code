const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

// A Bingo card's length
const CARD_LENGTH = 5;

// Called numbers are found on the first line of the input file, and are separated by commas
const calledNumbers = input[0].split(',').map((num) => Number(num));

// We will fill the cards array later
const cards = [];

let foundWinner = false;
let numWinningCards = 0;

// Card input is found starting on line 3 (after line 1's bingo numbers and an empty line 2)
// We increment i by 6 because that is the length between the start of one board and the next
for (let i = 2; i < input.length - 4; i += CARD_LENGTH + 1) {
  const card = {
    values: [],
    checked: Array(CARD_LENGTH)
      .fill()
      .map(() => Array(CARD_LENGTH).fill(0)),
  };
  for (let j = 0; j < CARD_LENGTH; j++) {
    card.values.push(
      input[i + j]
        .split(' ')
        .filter((num) => num != '')
        .map(Number)
    );
  }
  cards.push(card);
}

// Part 1: Determine the winner
calledNumbers.some((num) => {
  cards.some((card) => {
    tickNumOnCard(card, num);

    if (hasBingo(card)) {
      const answer = getScore(card, num);
      console.log(
        'The 1st winning board is',
        card.values,
        'with a score of',
        answer
      );
      foundWinner = true;
    }
    return foundWinner;
  });

  return foundWinner;
});

// Part 2
calledNumbers.some((num) => {
  cards.forEach((card) => {
    if (card.won) {
      return;
    }

    tickNumOnCard(card, num);

    if (hasBingo(card)) {
      card.won = true;
      numWinningCards += 1;

      // If this is the the final card to score Bingo...
      if (numWinningCards == cards.length) {
        const answer = getScore(card, num);
        console.log('The last board to win will have a score of ', answer);
      }
    }
  });

  return numWinningCards == cards.length;
});

function hasBingo(card) {
  let bingo = false;

  // Check if Bingo in the rows
  card.checked.forEach((row) => {
    if (row.reduce((prev, curr) => prev + curr, 0) == CARD_LENGTH) {
      bingo = true;
    }
  });

  // Check if Bingo in the columns
  for (let i = 0; i < CARD_LENGTH; i++) {
    let columnSum = 0;

    for (let j = 0; j < CARD_LENGTH; j++) {
      columnSum += card.checked[j][i];
    }
    if (columnSum >= CARD_LENGTH) {
      bingo = true;
    }
  }

  return bingo;
}

function tickNumOnCard(card, num) {
  for (let row = 0; row < CARD_LENGTH; row++) {
    for (let col = 0; col < CARD_LENGTH; col++) {
      if (card.values[row][col] == num) {
        card.checked[row][col] = 1;
      }
    }
  }
}

function getScore(card, finalNumberCalled) {
  let sumUncheckedValues = 0;

  for (let row = 0; row < CARD_LENGTH; row++) {
    for (let col = 0; col < CARD_LENGTH; col++) {
      if (card.checked[row][col] == 0) {
        sumUncheckedValues += card.values[row][col];
      }
    }
  }
  return sumUncheckedValues * finalNumberCalled;
}
