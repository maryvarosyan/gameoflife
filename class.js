class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        //console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }
}
class Grasseater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        //console.log(newCell, this.multiply);
        if (this.energy >= 12 && newCell) {
            var newGrasseater = new Grasseater(newCell[0], newCell[1], this.index);
            grasseaterArr.push(newGrasseater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }
    move() {
        var newcell = random(this.chooseCell(0));
        if (newcell) {
            var newX = newcell[0];
            var newY = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat() {
        var newcell = random(this.chooseCell(1));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in grassArr) {
                if (newx == grassArr[i].x && newy == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 4;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Monster {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 7;
        this.directions = [
            [this.x - 1, this.y - 2],
            [this.x, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x + 4, this.y + 1],
            [this.x + 4, this.y + 1],
            [this.x + 3, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
            [this.x - 1, this.y + 2]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newcell = random(this.chooseCell(0));
        if (this.energy >= 8 && newcell) {
            var newmonster = new Monster(newcell[0], newcell[1], this.index);
            monsterArr.push(newmonster);
            matrix[newcell[1]][newcell[0]] = this.index;
            this.energy = 7;
        }
    }
    move() {
        var newCell1 = random(this.chooseCell(0));
        if (newCell1) {
            var newx = newCell1[0];
            var newy = newCell1[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            this.x = newx;
            this.y = newy;
            this.energy--;
        }
    }
    eat() {
        var newcell = random(this.chooseCell(2));
        var newcell2 = random(this.chooseCell(1));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in grasseaterArr) {
                if (newx == grasseaterArr[i].x && newy == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 3;
        }
        else if (newcell2) {
            var newx = newcell2[0];
            var newy = newcell2[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in grassArr) {
                if (newx == grassArr[i].x && newy == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 3;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in monsterArr) {
                if (this.x == monsterArr[i].x && this.y == monsterArr[i].y) {
                    monsterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Water {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newcell = random(this.chooseCell(0));
        if (this.energy >= 15 && newcell) {
            var newwat = new Water(newcell[0], newcell[1], this.index);
            waterArr.push(newwat);
            matrix[newcell[1]][newcell[0]] = this.index;
            this.energy = 5;
        }
    }
    move() {
        var newCell1 = random(this.chooseCell(0));
        if (newCell1) {
            var newx = newCell1[0];
            var newy = newCell1[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            this.x = newx;
            this.y = newy;
            this.energy--;
        }
    }
    eat() {
        var newcell = random(this.chooseCell(3));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in monsterArr) {
                if (newx == monsterArr[i].x && newy == monsterArr[i].y) {
                    monsterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 3;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in waterArr) {
                if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                    waterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Sun{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
        this.speed = 100;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newCell = random(this.chooseCell(0));
       
        if (this.energy >= 15 && newCell) {
            var newsun = new Sun(newCell[0], newCell[1], this.index);
            sunArr.push(newsun);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }
    move() {
        var newcell = random(this.chooseCell(0));
        if (newcell) {
            var newX = newcell[0];
            var newY = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            this.speed++;
            this.energy--;
        }
    }
    makeflower() {
        var flowCell = random(this.chooseCell(0));
        if (flowCell) {
            var newF = new Flower(flowCell[0], flowCell[1], this.index);
            flowerArr.push(newF);
            matrix[flowCell[1]][flowCell[0]] = this.index;
            this.energy += 7;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in sunArr) {
                if (this.x == sunArr[i].x && this.y == sunArr[i].y) {
                    sunArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Flower{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 9;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newCell = random(this.chooseCell(0));
     
        if (this.energy >= 15 && newCell) {
            var newsun = new Sun(newCell[0], newCell[1], this.index);
            sunArr.push(newsun);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 9;
        }
    }
    move() {
        var newcell = random(this.chooseCell(0));
        if (newcell) {
            var newX = newcell[0];
            var newY = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat() {
        var newcell = random(this.chooseCell(1));
        var newcell2 = random(this.chooseCell(2));
        var newcell3 = random(this.chooseCell(3));
        var newcell4 = random(this.chooseCell(4));
        var newcell5 = random(this.chooseCell(5));
        if (newcell) {
            var newx = newcell[0];
            var newy = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in grassArr) {
                if (newx == grassArr[i].x && newy == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 7;
        }
        else if (newcell2) {
            var newx = newcell2[0];
            var newy = newcell2[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in grasseaterArr) {
                if (newx == grasseaterArr[i].x && newy == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 7;
        }
        else if (newcell3) {
            var newx = newcell3[0];
            var newy = newcell3[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in monsterArr) {
                if (newx == monsterArr[i].x && newy == monsterArr[i].y) {
                    monsterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 7;
        }
        else if (newcell4) {
            var newx = newcell4[0];
            var newy = newcell4[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in waterArr) {
                if (newx == waterArr[i].x && newy == waterArr[i].y) {
                    waterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 7;
        }
        else if (newcell5) {
            var newx = newcell5[0];
            var newy = newcell5[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = this.index;
            for (var i in sunArr) {
                if (newx == sunArr[i].x && newy == sunArr[i].y) {
                   sunArr.splice(i, 1);
                    break;
                }
            }
            this.x = newx;
            this.y = newy;
            this.energy += 7;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in flowerArr) {
                if (this.x == flowerArr[i].x && this.y == flowerArr[i].y) {
                    flowerArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}