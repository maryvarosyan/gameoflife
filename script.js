var matrix = [];
var side = 13;
var a = 50;
var grassArr = [];
var grasseaterArr = [];
var monsterArr = [];
var waterArr = [];
var sunArr = [];
var flowerArr= [];

function setup() {
    
    for (let y = 0; y < a; y++) {
        matrix[y] = [];
        for (let x = 0; x < a; x++) {
            matrix[y][x] = Math.round(random(6));
        }
    }
   
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var eater = new Grasseater(x, y, 2);
                grasseaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                var mon = new Monster(x, y, 3);
                monsterArr.push(mon);
            }
            else if (matrix[y][x] == 4) {
                var wat = new Water(x, y, 4);
                waterArr.push(wat);
            }
            else if (matrix[y][x] == 5) {
                var sun = new Sun(x, y, 5);
                sunArr.push(sun);
            }
            else if (matrix[y][x] == 6) {
                var flow = new Flower(x, y, 6);
                flowerArr.push(flow);
            }
        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("#00cc00");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("silver");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("#000099");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#ff6600");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#a64dff");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].eat();
        grasseaterArr[i].mul();
        grasseaterArr[i].die();
    }
    for (var i in monsterArr) {
        monsterArr[i].mul();
        monsterArr[i].move();
        monsterArr[i].eat();
        monsterArr[i].die();
    }
    for (var i in waterArr) {
        waterArr[i].mul();
        waterArr[i].move();
        waterArr[i].eat();
        waterArr[i].die();
    }
    for (var i in sunArr) {
        sunArr[i].mul();
        sunArr[i].move();
        sunArr[i].die();
    }
    for (var i in flowerArr) {
        flowerArr[i].mul();
        flowerArr[i].move();
        flowerArr[i].eat();
        flowerArr[i].die();
    }
}

