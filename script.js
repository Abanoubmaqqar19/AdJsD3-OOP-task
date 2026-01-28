function Shape(width, height) {
  if (this.constructor === Shape)
    throw new Error("You can't create instance from Abstract Shape");

  Object.defineProperties(this, {
    width: {
      value: width,
      writable: true,
      enumerable: true,
      configurable: true,
    },
    height: {
      value: height,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  });
}

Rectangle.numOfInstances = 0;
function Rectangle(width, height) {
  Shape.call(this, width, height);
  Rectangle.numOfInstances++;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function () {
  return this.width * this.height;
};
Rectangle.prototype.perimeter = function () {
  return 2 * (this.width + this.height);
};
Rectangle.prototype.toString = function () {
  return `Rectangle: width=${this.width}, height=${this.height}, area=${this.area()}, perimeter=${this.perimeter()}`;
};
Rectangle.prototype.valueOf = function () {
  return this.area();
};

Square.count = 0;
function Square(side) {
  Rectangle.call(this, side, side);
  Square.count++;

  Object.defineProperty(this, "side", {
    get: function () {
      return this.width;
    },
    set: function (value) {
      this.width = value;
      this.height = value;
    },
    enumerable: true,
    configurable: true,
  });
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.area = function () {
  return this.width * this.height;
};
Square.prototype.perimeter = function () {
  return 4 * this.side;
};
Square.prototype.toString = function () {
  return `Square: side=${this.side}, area=${this.area()}, perimeter=${this.perimeter()}`;
};
Square.prototype.valueOf = function () {
  return this.area();
};

// ====================
//* test
try {
  let s = new Shape(10, 20);
} catch (e) {
  console.log(e.message);
}

let r1 = new Rectangle(6, 10);
let r2 = new Rectangle(5, 7);
let sq1 = new Square(5);
let sq2 = new Square(6);

console.log(r1.toString());
console.log(r2.toString());
console.log(sq1.toString());
console.log(sq2.toString());

console.log(r1 + r2); // 95
console.log(r1 - r2); // 25
console.log(sq1 + sq2); // 61
console.log(sq2 - sq1); // 11

let shapes = [r1, r2, sq1, sq2];
let totalArea = shapes.reduce((sum, obj) => sum + obj, 0);
console.log("Total area of all shapes:", totalArea); // 156

console.log("Rectangle instances:", Rectangle.numOfInstances); // 2
console.log("Square instances:", Square.count); // 2

sq1.side = 10;
console.log(sq1.toString()); // side updated
console.log(
  "Updated total area:",
  shapes.reduce((sum, obj) => sum + obj, 0),
);
