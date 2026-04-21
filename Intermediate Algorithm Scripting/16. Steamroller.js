function steamrollArray(arr) {
  const flattenedArray = [];
  // Loop over array and check for nesting
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // Recursively flatten if element is an array
      flattenedArray.push(...steamrollArray(arr[i]));
    } else {
      // Push element if it's not an array
      flattenedArray.push(arr[i]);
    }
  }
  return flattenedArray;
}

steamrollArray([1, [2], [3, [[4]]]]);