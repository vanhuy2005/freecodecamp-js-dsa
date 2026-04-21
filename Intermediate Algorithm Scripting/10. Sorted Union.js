function uniteUnique(...arrays) {
  return [...new Set(arrays.flat())];
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);