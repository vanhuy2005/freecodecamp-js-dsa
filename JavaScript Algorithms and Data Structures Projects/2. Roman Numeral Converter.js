/*
Roman Numeral Converter
Convert the given number into a roman numeral.
M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
All roman numerals answers should be provided in upper-case.
*/

function convertToRoman(num) {
  const romanSymbols = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  let result = "";

  for (let i = 0; i < romanSymbols.length; i++) {
    const [value, symbol] = romanSymbols[i];
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

convertToRoman(36);