// design constraint:  no vertical lines with implied infinite slope

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y
  }
}

class Line {
  constructor(slope, yIntercept, xLo, xHi, yLo, yHi) {
    this.m = slope;
    this.b = yIntercept;
    this.domainLo = xLo;
    this.domainHi = xHi;
    this.rangeLo = yLo;
    this.rangeHi = yHi;
  }
}

class Polygon {
  constructor(arr) {
    this.shape = []
    for (let element of arr) {
      let point = new Point(element[0], element[1])
      this.shape.push(point);
    }
    this.lines = [];
    this.findAllLines(this.shape)
  }

  findLine = (point1, point2) => {
    let m = (point2.y - point1.y)/(point2.x - point1.x)
    let b = point1.y - m * point1.x
    let line = new Line(m, b, Math.min(point1.x, point2.x), Math.max(point1.x, point2.x),
      Math.min(point1.y, point2.y), Math.max(point1.y, point2.y))
    return line
  }

  findAllLines = (shape) => {
    for (let i =0; i < shape.length - 1; i++) {
      this.lines.push(this.findLine(shape[i], shape[i+1]))
    }
  }

  onPerimeter = (point, line) => {
    let yValue = Math.round(10000*(line.m * point.x + line.b)) / 10000;
    let xValue = Math.round(10000*(point.y - line.b) / line.m) / 10000;
    if ((point.x === xValue) && (point.x <= line.domainHi) && (point.x >= line.domainLo)
      && (point.y === yValue) && (point.y <= line.rangeHi) && (point.y >= line.rangeLo)) {
      return true;
    } else {
      return false;
    }
  }

  checkPerimeter = (point, lines = this.lines) => {
    let result = false;
    for (let line of lines) {
      if (this.onPerimeter(point, line)) {
        result = true;
      }
    }
    return result;
  }

  upDownCrossing = (point, line) => {
    let yValue = line.m * point.x + line.b;
    if ((point.y > yValue) && (point.x < line.domainHi) && (point.x > line.domainLo)) {
      return 1;
    } else {
      return 0;
    }
  }

  totalUpDownCrossings = (point, lines = this.lines) => {
    let total = 0
    for (let line of lines) {
      total += this.upDownCrossing(point, line)
    }
    console.log('up down total: ', total);
    return total;
  }

  leftRightCrossing = (point, line) => {
    let xValue = (point.y - line.b) / line.m;
    if ((point.x > xValue) && (point.y < line.rangeHi) && (point.y > line.rangeLo)) {
      return 1;
    } else {
      return 0;
    }
  }

  totalLeftRightCrossings = (point, lines = this.lines) => {
    let total = 0
    for (let line of lines) {
      total += this.leftRightCrossing(point, line)
    }
    console.log('left right total: ', total);
    return total;
  }

  inside = (point) => {
    if (this.checkPerimeter(point)) {
      return true;
    }
    if ((this.totalLeftRightCrossings(point) % 2 === 1) && (this.totalUpDownCrossings(point) % 2 === 1)) {
      return true;
    } else {
      return false;
    }
  }
}


// input = array of points that form the vertices of a polygon.  First and last point are always the same.
let arr = [[0,0], [4,3], [10,2], [9,8], [7,4], [3,6], [0,0]];
let polygon = new Polygon(arr);

// test cases
let coord1 = new Point(3,3); // inside left
console.log(coord1);
console.log(`${polygon.inside(coord1)} expect true \n`);
let coord2 = new Point(11,5); // outside right
console.log(coord2);
console.log(`${polygon.inside(coord2)} expect false \n`);
let coord3 = new Point(7,4); // on perimeter
console.log(coord3);
console.log(`${polygon.inside(coord3)} expect true \n`);
let coord4 = new Point(4,3); // on perimeter
console.log(coord4);
console.log(`${polygon.inside(coord4)} expect true \n`);
let coord5 = new Point(9,6); // inside upper right
console.log(coord5);
console.log(`${polygon.inside(coord5)} expect true \n`);
let coord6 = new Point(6,2); // outside below
console.log(coord6);
console.log(`${polygon.inside(coord6)} expect false \n`);

arr = [[0,0], [3,1], [4,3], [7,2], [4,6], [0,0]]
polygon = new Polygon(arr)
coord1 = new Point(2,1); // inside left
console.log(coord1);
console.log(`${polygon.inside(coord1)} expect true \n`);
coord2 = new Point(6,2); // outside right
console.log(coord2);
console.log(`${polygon.inside(coord2)} expect false \n`);
coord3 = new Point(7,2); // on perimeter
console.log(coord3);
console.log(`${polygon.inside(coord3)} expect true \n`);
coord4 = new Point(4,3); // on perimeter
console.log(coord4);
console.log(`${polygon.inside(coord4)} expect true \n`);
coord5 = new Point(5,3); // inside upper right
console.log(coord5);
console.log(`${polygon.inside(coord5)} expect true \n`);
coord6 = new Point(6,1); // outside below
console.log(coord6);
console.log(`${polygon.inside(coord6)} expect false \n`);
