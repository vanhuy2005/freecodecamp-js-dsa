# Basic JavaScript — Tổng hợp kiến thức & Interview Notes

> Phần tổng hợp từ 78 bài (33–110) sau khi học **Basic JavaScript** của freeCodeCamp.  

---

## Mục lục

1. [Strings & Bracket Notation](#1-strings--bracket-notation)
2. [Arrays — CRUD & Methods](#2-arrays--crud--methods)
3. [Functions — Scope & Return](#3-functions--scope--return)
4. [Conditional Logic](#4-conditional-logic)
5. [Switch Statements](#5-switch-statements)
6. [Objects — CRUD & Nesting](#6-objects--crud--nesting)
7. [Loops — for / while / do…while](#7-loops--for--while--dowhile)
8. [Recursion](#8-recursion)
9. [Utility: Math, parseInt, Ternary](#9-utility-math-parseint-ternary)
10. [Interview Cheat Sheet](#10-interview-cheat-sheet)

---

## 1. Strings & Bracket Notation

### Truy cập ký tự

```js
const str = "Lovelace";
str[0]; // "L"  — ký tự đầu
str[2]; // "v"  — ký tự thứ 3 (zero-indexed)
str[str.length - 1]; // "e"  — ký tự cuối
str[str.length - 2]; // "c"  — ký tự kế cuối
```

### ⚠️ String Immutability — Điểm hay bị sai

```js
let s = "Jello World";
s[0] = "H"; // ❌ KHÔNG thay đổi được — string là immutable
s = "Hello World"; // ✅ Gán lại toàn bộ chuỗi mới
```

**Câu hỏi phỏng vấn:**  
_"String trong JS là mutable hay immutable?"_  
→ **Immutable.** Không thể thay đổi từng ký tự bằng bracket notation. Phải tạo string mới.

### String Concatenation

```js
const result = myNoun + " " + myAdjective + " " + myVerb + " " + myAdverb;
// Hoặc dùng template literals (ES6): `${myNoun} ${myAdjective}...`
```

---

## 2. Arrays — CRUD & Methods

### Khai báo

```js
const myArray = ["text", 8]; // mixed types OK
const nested = [
  ["a", 1],
  ["b", 2],
]; // multi-dimensional
```

### Truy cập phần tử

```js
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [[10, 11, 12], 13, 14],
];
arr[2][1]; // 8
arr[3][0][1]; // 11  — nested deep access
```

### 4 Methods quan trọng — push / pop / shift / unshift

| Method          | Vị trí   | Hành động | Trả về         |
| --------------- | -------- | --------- | -------------- |
| `push(item)`    | **cuối** | Thêm      | Chiều dài mới  |
| `pop()`         | **cuối** | Xoá       | Phần tử bị xoá |
| `unshift(item)` | **đầu**  | Thêm      | Chiều dài mới  |
| `shift()`       | **đầu**  | Xoá       | Phần tử bị xoá |

```js
const arr = [
  ["John", 23],
  ["cat", 2],
];
arr.push(["dog", 3]); // thêm cuối
arr.pop(); // xoá cuối, return ["dog", 3]
arr.shift(); // xoá đầu, return ["John", 23]
arr.unshift(["Paul", 35]); // thêm đầu
```

### ⚠️ Điểm dễ nhầm

- `push` / `unshift` trả về **length mới**, không phải array.
- `pop` / `shift` trả về **phần tử bị xoá**, không phải array.
- `const arr = [1,2,3]` — vẫn có thể `push/pop` vì `const` chỉ khoá reference, không khoá nội dung.

### Queue pattern (Stand-in-Line)

```js
function nextInLine(arr, item) {
  arr.push(item); // thêm cuối hàng
  return arr.shift(); // lấy người đầu hàng ra
}
```

---

## 3. Functions — Scope & Return

### Khai báo & gọi hàm

```js
function reusableFunction() {
  console.log("Hi World");
}
reusableFunction();

function add(a, b) {
  return a + b;
}
const result = add(1, 2); // 3
```

### ⚠️ Scope — Điểm phỏng vấn cực kỳ quan trọng

#### Local Scope

```js
function myFunc() {
  let myVar = "local";
  console.log(myVar); // ✅ "local"
}
console.log(myVar); // ❌ ReferenceError — không truy cập được bên ngoài
```

#### Global vs Local Scope

```js
const outerWear = "T-Shirt"; // global

function myOutfit() {
  let outerWear = "sweater"; // local — shadowing
  return outerWear; // "sweater"
}

myOutfit(); // "sweater"
console.log(outerWear); // "T-Shirt" — global không bị ảnh hưởng
```

**Quy tắc:** Biến local ưu tiên hơn global cùng tên (shadowing).

### ⚠️ undefined Return

```js
function addThree() {
  sum = sum + 3;
  // không có return → trả về undefined
}
let result = addThree(); // undefined
```

**Câu hỏi phỏng vấn:**  
_"Hàm không có return trả về gì?"_  
→ `undefined`

### Return Early Pattern

```js
function abTest(a, b) {
  if (a < 0 || b < 0) return; // thoát sớm, return undefined
  return Math.round(Math.pow(Math.sqrt(a) + Math.sqrt(b), 2));
}
```

---

## 4. Conditional Logic

### == vs === (Equality vs Strict Equality)

| Operator | So sánh                | Type coercion       |
| -------- | ---------------------- | ------------------- |
| `==`     | Giá trị                | **Có** — tự ép kiểu |
| `===`    | Giá trị + Kiểu         | **Không**           |
| `!=`     | Khác giá trị           | **Có**              |
| `!==`    | Khác giá trị hoặc kiểu | **Không**           |

```js
3 == "3"; // true   — string "3" bị ép thành number 3
3 === "3"; // false  — khác kiểu
3 !== "3"; // true
```

### ⚠️ Điểm cực kỳ hay hỏi phỏng vấn

**Luôn dùng `===` và `!==`** trừ khi có lý do cụ thể dùng `==`.  
Lý do: `==` có bảng type coercion phức tạp, dễ gây bug.

```js
0 == ""; // true  ← bất ngờ!
0 == "0"; // true
"" == "0"; // false ← mâu thuẫn!
null == undefined; // true
NaN == NaN; // false ← NaN không bằng chính nó!
```

### Comparison Operators

```js
// >, >=, <, <= — tất cả đều có type coercion
"7" > 5; // true — "7" ép thành 7
```

### Logical Operators

```js
// AND (&&) — cả hai điều kiện phải đúng
if (val >= 25 && val <= 50) {
  return "Yes";
}

// OR (||) — một trong hai đúng là đủ
if (val < 10 || val > 20) {
  return "Outside";
}
```

### if / else if / else

```js
// ⚠️ THỨ TỰ RẤT QUAN TRỌNG — kiểm tra từ chặt đến lỏng
if (val < 5) {
  return "Less than 5";
} else if (val < 10) {
  return "Less than 10";
} // 5-9
else {
  return "10 or more";
}
```

**Sai phổ biến:** Đặt điều kiện lỏng trước → điều kiện chặt không bao giờ chạy tới.

---

## 5. Switch Statements

### Cú pháp cơ bản

```js
switch (val) {
  case 1:
    answer = "alpha";
    break; // ⚠️ PHẢI có break, nếu không sẽ fall-through
  case 2:
    answer = "beta";
    break;
  default:
    answer = "stuff";
}
```

### Fall-through — Nhóm nhiều case

```js
switch (val) {
  case 1:
  case 2:
  case 3:
    return "Low"; // 1, 2, 3 đều vào đây
  case 4:
  case 5:
  case 6:
    return "Mid";
}
```

### ⚠️ Điểm hay sai

- **Quên `break`** → code chạy tiếp sang case bên dưới (fall-through).
- **Switch dùng `===`** (strict comparison), không phải `==`.
- Khi nào dùng switch thay if/else: **≥ 3 giá trị cố định** → switch sạch hơn.

---

## 6. Objects — CRUD & Nesting

### Tạo Object

```js
const myDog = {
  name: "Coder",
  legs: 4,
  tails: 1,
  friends: ["freeCodeCamp Campers"],
};
```

### Truy cập Properties

```js
// Dot notation — tên property là identifier hợp lệ
myDog.name; // "Coder"

// Bracket notation — tên có khoảng trắng hoặc ký tự đặc biệt
testObj["an entree"]; // dùng khi key có space

// Bracket + variable — truy cập động
const prop = "name";
myDog[prop]; // "Coder" — KHÔNG dùng được dot notation ở đây
```

### ⚠️ Dot vs Bracket — Khi nào dùng gì?

| Trường hợp                    | Dùng            |
| ----------------------------- | --------------- |
| Key là identifier đơn giản    | `obj.key`       |
| Key có space / ký tự đặc biệt | `obj["my key"]` |
| Key nằm trong biến            | `obj[variable]` |
| Key là số                     | `obj[42]`       |

### Thêm / Sửa / Xoá properties

```js
myDog.name = "Happy Coder"; // Sửa
myDog.bark = "woof"; // Thêm bằng dot
myDog["eat"] = "guh"; // Thêm bằng bracket
delete myDog.tails; // Xoá
```

### Kiểm tra property tồn tại

```js
obj.hasOwnProperty("prop"); // true / false
// Hoặc: "prop" in obj
```

### Object Lookup (thay thế if/else chain)

```js
function phoneticLookup(val) {
  const lookup = {
    alpha: "Adams",
    bravo: "Boston",
    charlie: "Chicago",
  };
  return lookup[val]; // ✅ sạch hơn if/else
}
```

### Nested Objects & Arrays

```js
// Nested object
myStorage.car.inside["glove box"]; // "maps"

// Array of objects
myPlants[1].list[1]; // "pine"
```

### Record Collection — Pattern phức hợp

```js
function updateRecords(records, id, prop, value) {
  if (value === "") {
    delete records[id][prop];
  } else if (prop !== "tracks") {
    records[id][prop] = value;
  } else {
    if (!records[id].hasOwnProperty("tracks")) {
      records[id].tracks = []; // tạo mảng nếu chưa có
    }
    records[id].tracks.push(value);
  }
  return records;
}
```

### Profile Lookup — Kết hợp loop + object

```js
function lookUpProfile(name, prop) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].firstName === name) {
      if (contacts[i].hasOwnProperty(prop)) {
        return contacts[i][prop];
      }
      return "No such property";
    }
  }
  return "No such contact"; // ⚠️ Phải ở NGOÀI vòng for
}
```

**⚠️ Sai phổ biến:** Đặt `return "No such contact"` bên trong vòng for → chỉ check phần tử đầu tiên rồi thoát.

---

## 7. Loops — for / while / do…while

### for loop

```js
for (let i = 0; i < 5; i++) {
  // initialization; condition; increment
}

// Đếm ngược
for (let i = 9; i > 0; i -= 2) { ... }

// Duyệt mảng
for (let i = 0; i < arr.length; i++) {
  total += arr[i];
}
```

### Nested loops (mảng 2 chiều)

```js
function multiplyAll(arr) {
  let product = 1;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      product *= arr[i][j];
    }
  }
  return product;
}
```

### while loop

```js
let i = 5;
while (i >= 0) {
  myArray.push(i);
  i--;
}
```

### do…while loop

```js
let i = 10;
do {
  myArray.push(i);
  i++;
} while (i < 10);
// myArray = [10] — chạy ÍT NHẤT 1 LẦN dù điều kiện sai ngay
```

### ⚠️ while vs do…while

|                       | while              | do…while         |
| --------------------- | ------------------ | ---------------- |
| Kiểm tra điều kiện    | **Trước** khi chạy | **Sau** khi chạy |
| Số lần chạy tối thiểu | 0                  | **1**            |

**Câu hỏi phỏng vấn:**  
_"Sự khác nhau giữa while và do…while?"_  
→ `do…while` luôn chạy ít nhất 1 lần, `while` có thể không chạy lần nào.

---

## 8. Recursion

### Khái niệm

Hàm gọi chính nó, cần **base case** để dừng.

### Thay thế loop bằng recursion

```js
// Loop version
function sum(arr, n) {
  let total = 0;
  for (let i = 0; i < n; i++) total += arr[i];
  return total;
}

// Recursive version
function sum(arr, n) {
  if (n <= 0) return 0; // base case
  return sum(arr, n - 1) + arr[n - 1]; // recursive case
}
```

### Countdown

```js
function countdown(n) {
  if (n < 1) return []; // base case
  const arr = countdown(n - 1);
  arr.unshift(n);
  return arr;
}
// countdown(5) → [1, 2, 3, 4, 5]
```

### Range of Numbers (dùng spread operator)

```js
function rangeOfNumbers(startNum, endNum) {
  if (startNum === endNum) return [startNum];
  return [startNum, ...rangeOfNumbers(startNum + 1, endNum)];
}
// rangeOfNumbers(3, 5) → [3, 4, 5]
```

### ⚠️ Lưu ý Recursion

- **Luôn phải có base case** → không có sẽ vô hạn → Stack Overflow.
- Recursion dùng **call stack** → tốn bộ nhớ hơn loop với input lớn.
- JavaScript **không hỗ trợ tail call optimization** trong thực tế (trừ Safari).

---

## 9. Utility: Math, parseInt, Ternary

### Math.random()

```js
Math.random(); // [0, 1) — không bao gồm 1
Math.floor(Math.random() * 10); // 0-9
Math.floor(Math.random() * (max - min + 1)) + min; // [min, max]
```

### parseInt()

```js
parseInt("56"); // 56
parseInt("abc"); // NaN
parseInt("10011", 2); // 19 — tham số thứ 2 là radix (hệ cơ số)
```

**⚠️ Luôn truyền radix** khi dùng `parseInt` để tránh behavior không mong muốn:

```js
parseInt("08"); // Có thể trả về 0 ở engine cũ (octal)
parseInt("08", 10); // 8 — an toàn
```

### Ternary Operator

```js
// Thay if/else đơn giản
condition ? valueIfTrue : valueIfFalse;

// Chaining (thay if/else if/else)
num > 0 ? "positive" : num < 0 ? "negative" : "zero";
```

**⚠️ Không lạm dụng nested ternary** — khó đọc. Chỉ nên chain tối đa 2 tầng.

---

## 10. Interview Cheat Sheet

### Top câu hỏi HR / Technical Screening hay hỏi

| #   | Câu hỏi                                | Đáp án ngắn                                                                                 |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1   | `==` vs `===`                          | `==` ép kiểu, `===` không. Luôn dùng `===`.                                                 |
| 2   | `var` vs `let` vs `const`              | `var` function-scoped + hoisting. `let` block-scoped. `const` block-scoped + không gán lại. |
| 3   | String có mutable không?               | Không. Phải tạo string mới.                                                                 |
| 4   | `null` vs `undefined`                  | `undefined` = chưa gán giá trị. `null` = gán giá trị "rỗng" có chủ ý.                       |
| 5   | Hàm không return trả về gì?            | `undefined`                                                                                 |
| 6   | `push` trả về gì?                      | Chiều dài mới của mảng, **không phải** mảng.                                                |
| 7   | `NaN === NaN`?                         | `false`. Dùng `Number.isNaN()` để check.                                                    |
| 8   | while vs do…while?                     | `do…while` chạy ít nhất 1 lần.                                                              |
| 9   | Khi nào dùng bracket vs dot notation?  | Bracket khi key là biến, có space, hoặc ký tự đặc biệt.                                     |
| 10  | Recursion cần gì để không loop vô hạn? | Base case (điều kiện dừng).                                                                 |

### Những lỗi phổ biến cần tránh

```
❌  s[0] = "H"                    → String immutable, không thay đổi được
❌  Quên break trong switch        → Fall-through không mong muốn
❌  return trong for loop quá sớm  → Không duyệt hết mảng
❌  == thay vì ===                 → Type coercion gây bug ẩn
❌  if (val < 10) trước if (val < 5)  → Điều kiện chặt không bao giờ chạy
❌  const arr = []; arr = [1]      → TypeError (reassign const)
✅  const arr = []; arr.push(1)    → OK (mutate nội dung, không reassign)
❌  parseInt("08") không có radix  → Kết quả không nhất quán
❌  Recursion không có base case   → Maximum call stack size exceeded
```

---

_Tài liệu được tổng hợp từ freeCodeCamp — Basic JavaScript (bài 33–110)_
