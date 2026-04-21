function dropElements(arr, func) {
  const index = arr.findIndex(func);
  return index === -1 ? [] : arr.slice(index);
}

dropElements([1, 2, 3], function(n) {return n < 3; });