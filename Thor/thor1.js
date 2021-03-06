/*
let inputs = readline().split(' ');
const a = parseInt(inputs[0]); // the X position of the light of power
const b = parseInt(inputs[1]); // the Y position of the light of power
const c = parseInt(inputs[2]); // Thor's starting X position
const d = parseInt(inputs[3]); // Thor's starting Y position
*/
let [a, b, c, d] = readline().split(' ');
class Direction {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveNorth () {
        this.y--
    }
    moveSouth () {
        this.y++;
    }
    moveEast () {
        this.x++
    }
    moveWest () {
        this.x--
    }
}

let thor = new Direction(c, d);

// game loop
while (true) {

    let remainingTurns = parseInt(readline()); // The remaining amount of r Thor can move. Do not remove this line.

    let xMove = '',
        yMove = '';

    //console.error(`light: ${a}, ${b} Thor: ${thor.x} ${thor.y}`);
    console.error(remainingTurns);

    if (b < thor.y)
        console.error(`${b} ${thor.y}`);


    if (a < thor.x) {
        xMove = 'W';
        thor.moveWest();
    } else if (a > thor.x) {
        xMove = 'E';
        thor.moveEast();
    }

    if (b < thor.y) {
        yMove = 'N';
        thor.moveNorth()
    } else if (b > thor.y) {
        yMove = 'S';
        thor.moveSouth();
    }

    let answer = yMove.concat(xMove);

    // A single line providing the move to be made: N NE E SE S SW W or NW
    console.log(answer);
}
