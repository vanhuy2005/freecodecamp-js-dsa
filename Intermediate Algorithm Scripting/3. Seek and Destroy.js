function destroyer(arr, ...vals) {
  return arr.filter(item => !vals.includes(item));
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);