

const
    MY_KILL_RANGE = 2000,
    MY_MOVE_RANGE = 1000,
    ZOMBIE_KILL_RANGE = 400,
    ZOMBIE_MOVE_RANGE = 400,
    PG_X = 16000,
    PG_Y = 9000,
    PI = Math.PI,
    RAND = Alea(),
    ANGLES = [0, PI / 4, PI / 2, (PI * 3) / 4, PI, (PI * 5) / 4, (PI * 6) / 4, (PI * 7) / 4];

let human = [],
    zombie = [],
    myX,
    myY;





function BB(x) {
    return JSON.stringify(x, null, 2);
}
function Mash() {
    let n = 0xefc8249d,
        mash = function (data) {
            data = String(data);
            for (let i = 0; i < data.length; i++) {
                n += data.charCodeAt(i);
                let h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };

    return mash;
}
function Alea() {
    return (function (args) {
        // Johannes Baagøe <baagoe@baagoe.com>, 2010
        let s0 = 0,
            s1 = 0,
            s2 = 0,
            c = 1;

        if (args.length === 0)
            args = [+new Date];

        let mash = Mash();

        s0 = mash(' ');
        s1 = mash(' ');
        s2 = mash(' ');

        for (let i = 0; i < args.length; i++) {
            s0 -= mash(args[i]);

            if (s0 < 0)
                s0 += 1;

            s1 -= mash(args[i]);

            if (s1 < 0)
                s1 += 1;

            s2 -= mash(args[i]);

            if (s2 < 0)
                s2 += 1;
        }
        mash = null;

        let random = function () {
            let t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
            s0 = s1;
            s1 = s2;
            return s2 = t - (c = t | 0);
        };
        random.uint32 = function () {
            return random() * 0x100000000; // 2^32
        };
        random.fract53 = function () {
            return random() +
                (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
        };
        random.version = 'Alea 0.9';
        random.args = args;
        return random;

    } (Array.prototype.slice.call(arguments)));
}
function rnd(n, b = 0) {
    return Math.round(RAND() * (b - n) + n);
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distSquare (point) {

        let x = this.x - point.x,
            y = this.y - point.y;

        return x * x + y * y;
    }
    dist (point) {
        return Math.sqrt(this.distSquare(point));
    }
}
class Sim extends Point {
    constructor(x, y) {
        super(x, y);
        this.cache = {};
    }
    save () {
        this.cache.x = this.x;
        this.cache.y = this.y;
    }
    load () {
        this.x = this.cache.x;
        this.y = this.cache.y;
    }
    update (x, y) {
        this.x = x;
        this.y = y;
    }
}
class Human extends Point {
    constructor(id, x, y) {
        super(x, y);
        this.id = id;
    }
}
class Zombie extends Point {
    constructor(id, x, y, nextX, nextY) {
        super(x, y);
        this.id = id;
        this.nextX = nextX;
        this.nextY = nextY;
    }
}
class Solution {
    constructor() {
        this.sol = [];
        this.score = -1;
    }
    solve () {

    }
    randomize () {
        let turn = rnd(7),
            magnitude = rnd(MY_MOVE_RANGE),
            x = magnitude * Math.cos(ANGLES[turn]),
            y = magnitude * Math.sin(ANGLES[turn]);
        this.sol.push({
            x: x,
            y: y
        });
    }
    evaluate () {

    }
}



// game loop
while (true) {

    let inputs = readline().split(' ');

    myX = parseInt(inputs[0]);
    myY = parseInt(inputs[1]);



    let humanCount = parseInt(readline());

    for (let i = 0; i < humanCount; i++) {
        let inputs = readline().split(' '),
            id = parseInt(inputs[0]),
            x = parseInt(inputs[1]),
            y = parseInt(inputs[2]);
        human.push(new Human(id, x, y));
    }

    let zombieCount = parseInt(readline());

    for (let i = 0; i < zombieCount; i++) {
        let inputs = readline().split(' '),
            id = parseInt(inputs[0]),
            x = parseInt(inputs[1]),
            y = parseInt(inputs[2]),
            nextX = parseInt(inputs[3]),
            nextY = parseInt(inputs[4]);
        zombie.push(new Zombie(id, x, y, nextX, nextY));
    }

    console.error(zombie[0].id);
    console.error(human[0].id);


    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    console.log('0 0');     // Your destination coordinates

}