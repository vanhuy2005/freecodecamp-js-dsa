const squareList = arr => {
  // Only change code below this line
  return arr
    .filter(num => num > 0 && Number.isInteger(num))
    .map(num => num * num);
  // Only change code above this line
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers);