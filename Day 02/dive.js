const fs = require('fs');

const fileName = './movement.txt';

try {
  const fileData = fs.readFileSync(fileName, 'UTF-8');
  const fileLines = fileData.split(/\r?\n/);

  const [horizontalMovement, verticalMovement] = calculatePosition(fileLines);

  // Day 2, Part 1:
  console.log(
    `Submarine has travelled ${horizontalMovement} horizontally and ${verticalMovement} vertically`
  );
  console.log(
    `   If we multiply the final horizontal position by the final depth, we get: ${
      horizontalMovement * verticalMovement
    }`
  );

  //   Day 2, Part 2:
  const [horizontalMovementWithAim, verticalMovementWithAim] =
    calculatePositionWithAim(fileLines);

  console.log(
    `Taking "Aim" into consideration, the submarine has travelled ${horizontalMovementWithAim} horizontally and ${verticalMovementWithAim} vertically`
  );
  console.log(
    `   If we multiply this final horizontal position by the final depth, we get: ${
      horizontalMovementWithAim * verticalMovementWithAim
    }`
  );
} catch (error) {
  console.error(error);
}

// Returns the horizontal and vertical position (in an array) of the submarine
function calculatePosition(fileLines) {
  let horizontalMovement = 0;
  let verticalMovement = 0;

  fileLines.forEach((line) => {
    const [direction, amount] = line.split(' ');

    switch (direction) {
      case 'forward':
        horizontalMovement += parseInt(amount);
        break;
      case 'up':
        verticalMovement -= parseInt(amount);
        break;
      case 'down':
        verticalMovement += parseInt(amount);
        break;
    }
  });

  return [horizontalMovement, verticalMovement];
}

// Returns the horizontal and vertical position (in an array) of the submarine,
// using the newly-found concept of "aim"!
function calculatePositionWithAim(fileLines) {
  let horizontalMovement = 0;
  let verticalMovement = 0;
  let aim = 0;

  fileLines.forEach((line) => {
    const [direction, amount] = line.split(' ');

    switch (direction) {
      case 'forward':
        horizontalMovement += parseInt(amount);
        verticalMovement += parseInt(amount) * aim;
        break;
      case 'up':
        aim -= parseInt(amount);
        break;
      case 'down':
        aim += parseInt(amount);
        break;
    }
  });

  return [horizontalMovement, verticalMovement];
}
