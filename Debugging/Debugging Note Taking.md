# Debugging — Tổng hợp kiến thức & Interview Notes

> Phần tổng hợp từ 12 bài học **Debugging** của freeCodeCamp.  
> Hệ thống hóa: Key Takeaway, Code mẫu, Lỗi thường gặp & Câu hỏi phỏng vấn.

---

## Mục lục

| #   | Chủ đề                                                                                | Nhóm          |
| --- | ------------------------------------------------------------------------------------- | ------------- |
| 1   | [Console.log — Kiểm tra giá trị biến](#1-consolelog--kiểm-tra-giá-trị-biến)           | Công cụ debug |
| 2   | [freeCodeCamp Console vs Browser Console](#2-freecodecamp-console-vs-browser-console) | Công cụ debug |
| 3   | [typeof — Kiểm tra kiểu dữ liệu](#3-typeof--kiểm-tra-kiểu-dữ-liệu)                    | Công cụ debug |
| 4   | [Lỗi sai chính tả tên biến/hàm](#4-lỗi-sai-chính-tả-tên-biếnhàm)                      | Lỗi cú pháp   |
| 5   | [Thiếu đóng ngoặc, dấu ngoặc, quotes](#5-thiếu-đóng-ngoặc-brackets-braces-và-quotes)  | Lỗi cú pháp   |
| 6   | [Lẫn lộn Single & Double Quotes](#6-lẫn-lộn-single--double-quotes)                    | Lỗi cú pháp   |
| 7   | [Nhầm = (gán) với == (so sánh)](#7-nhầm--gán-với--so-sánh)                            | Lỗi logic     |
| 8   | [Thiếu () khi gọi hàm](#8-thiếu--khi-gọi-hàm)                                         | Lỗi logic     |
| 9   | [Truyền sai thứ tự tham số](#9-truyền-sai-thứ-tự-tham-số)                             | Lỗi logic     |
| 10  | [Off By One Error (OBOE)](#10-off-by-one-error-oboe)                                  | Lỗi logic     |
| 11  | [Reinitialize biến trong vòng lặp](#11-reinitialize-biến-trong-vòng-lặp)              | Lỗi vòng lặp  |
| 12  | [Vòng lặp vô hạn & Terminal Condition](#12-vòng-lặp-vô-hạn--terminal-condition)       | Lỗi vòng lặp  |

---

## 1. Console.log — Kiểm tra giá trị biến

### Khái niệm

`console.log()` là công cụ debug **cơ bản nhất** — in giá trị ra console để kiểm tra biến tại mọi thời điểm trong chương trình.

### Cách dùng

```js
let a = 5;
let b = 1;
a++;

console.log(a); // 6 — kiểm tra giá trị sau khi tăng
let sumAB = a + b;
console.log(sumAB); // 7 — kiểm tra kết quả phép tính
```

### Chiến lược debug với console.log

```js
// 1. Đặt ở ĐẦU hàm → kiểm tra input
function calculate(x, y) {
  console.log("Input:", x, y);

  // 2. Đặt ở GIỮA → kiểm tra quá trình
  let result = x * y + 10;
  console.log("After calc:", result);

  // 3. Đặt TRƯỚC return → kiểm tra output
  console.log("Final:", result);
  return result;
}
```

**🔑 Key Takeaway:**

- `console.log()` = **"print debugging"** — đơn giản nhưng cực hiệu quả
- Đặt ở **điểm chiến lược**: đầu hàm (input), giữa (quá trình), cuối (output)
- Luôn **dự đoán trước** kết quả → so sánh với thực tế → phát hiện bug

---

## 2. freeCodeCamp Console vs Browser Console

### Sự khác biệt

| Đặc điểm          | freeCodeCamp Console     | Browser Console (DevTools)                  |
| ----------------- | ------------------------ | ------------------------------------------- |
| Hiển thị          | Chỉ `console.log()`      | Tất cả (`log`, `warn`, `error`, `clear`...) |
| Khi code thay đổi | Tự động chạy lại         | Cần refresh                                 |
| Xóa console       | Tự động xóa mỗi lần chạy | Dùng `console.clear()`                      |

### Code mẫu

```js
let output =
  "Get this to show once in the freeCodeCamp console and not at all in the browser console";
console.log(output);
console.clear(); // Xóa browser console, freeCodeCamp console vẫn hiển thị
```

### Các method hữu ích khác của console

```js
console.log("Thông tin thường"); // ℹ️ Log thường
console.warn("Cảnh báo"); // ⚠️ Warning (vàng)
console.error("Lỗi nghiêm trọng"); // ❌ Error (đỏ)
console.table([{ a: 1 }, { a: 2 }]); // 📊 Hiển thị dạng bảng
console.time("timer");
/* code */ console.timeEnd("timer"); // ⏱️ Đo thời gian
console.clear(); // 🧹 Xóa toàn bộ console
```

**🔑 Key Takeaway:**

- Dùng **Browser DevTools** (F12) để debug đầy đủ hơn
- `console.clear()` xóa browser console, nhưng freeCodeCamp console **không bị ảnh hưởng**
- Ngoài `log`, hãy tận dụng `warn`, `error`, `table` cho debug chuyên nghiệp hơn

---

## 3. typeof — Kiểm tra kiểu dữ liệu

### Khái niệm

`typeof` trả về **string** mô tả kiểu dữ liệu của biến. Rất hữu ích khi nghi ngờ **type mismatch**.

### Kiểu dữ liệu trong JavaScript

```js
console.log(typeof ""); // "string"
console.log(typeof 0); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"  ← BUG lịch sử của JS!
console.log(typeof []); // "object"  ← Array cũng là object
console.log(typeof {}); // "object"
console.log(typeof NaN); // "number"  ← NaN vẫn là number!
console.log(typeof Symbol()); // "symbol"
```

### 7 kiểu nguyên thủy (Primitive) + 1 kiểu tham chiếu

| Kiểu       | typeof trả về | Ví dụ               |
| ---------- | ------------- | ------------------- |
| Boolean    | `"boolean"`   | `true`, `false`     |
| Null       | `"object"` ⚠️ | `null`              |
| Undefined  | `"undefined"` | `undefined`         |
| Number     | `"number"`    | `42`, `3.14`, `NaN` |
| String     | `"string"`    | `"hello"`           |
| Symbol     | `"symbol"`    | `Symbol("id")`      |
| BigInt     | `"bigint"`    | `9007199254740991n` |
| **Object** | `"object"`    | `{}`, `[]`, `null`  |

### Ví dụ debug thực tế

```js
let seven = 7;
let three = "3"; // ← Lỗi: string thay vì number!

console.log(seven + three); // "73" — nối chuỗi, không phải cộng!
console.log(typeof seven); // "number"
console.log(typeof three); // "string" ← Phát hiện bug!
```

**⚠️ Bẫy thường gặp:**

- `typeof null === "object"` — đây là **bug lịch sử** của JavaScript, không phải tính năng
- `typeof []` cũng trả `"object"` → dùng `Array.isArray([])` để kiểm tra mảng
- `typeof NaN === "number"` → dùng `Number.isNaN()` để kiểm tra NaN

**🔑 Key Takeaway:**

- `typeof` giúp phát hiện **type error** — đặc biệt khi làm việc với dữ liệu bên ngoài (API, JSON)
- Cẩn thận: `typeof null`, `typeof []`, `typeof NaN` cho kết quả **không trực quan**

---

## 4. Lỗi sai chính tả tên biến/hàm

### Vấn đề

JavaScript **phân biệt hoa/thường** (case-sensitive). Viết sai tên biến hoặc hàm → `ReferenceError`.

### Ví dụ

```js
// ❌ Bug: sai chính tả
let receivables = 10;
let payables = 8;
let netWorkingCapital = recievables - payable; // ReferenceError!
//                      ^^^^^^^^^^   ^^^^^^^^
//                      thiếu "a"    thiếu "s"

// ✅ Fix: đúng chính tả
let netWorkingCapital = receivables - payables;
console.log(`Net working capital is: ${netWorkingCapital}`); // 2
```

### Các loại lỗi chính tả phổ biến

| Loại lỗi         | Ví dụ sai      | Đúng             |
| ---------------- | -------------- | ---------------- |
| Thiếu/thừa ký tự | `recievables`  | `receivables`    |
| Sai hoa/thường   | `Myfunction()` | `myFunction()`   |
| Hoán đổi ký tự   | `funciton`     | `function`       |
| Thiếu ký tự cuối | `getElemen`    | `getElementById` |

### Cách phòng tránh

1. **Dùng IDE** với autocomplete (VS Code, WebStorm)
2. **Đặt tên biến** theo convention (`camelCase`)
3. **Bật ESLint** — phát hiện lỗi chính tả tự động
4. **Khai báo biến** bằng `let`/`const` — lỗi sẽ hiện ngay (thay vì tạo global variable ngầm)

**🔑 Key Takeaway:**

- JS case-sensitive: `myVar` ≠ `MyVar` ≠ `myvar`
- Lỗi chính tả → `ReferenceError: xxx is not defined`
- IDE + linter = phòng chống tốt nhất

---

## 5. Thiếu đóng ngoặc, Brackets, Braces và Quotes

### Vấn đề

Mọi dấu mở `(`, `[`, `{`, `"`, `'` đều cần có dấu **đóng tương ứng**. Thiếu → `SyntaxError`.

### Ví dụ

```js
// ❌ Bug: thiếu dấu đóng
let myArray = [1, 2, 3;                          // Thiếu ]
let arraySum = myArray.reduce((previous, current) =>  previous + current;  // Thiếu )

// ✅ Fix
let myArray = [1, 2, 3];
let arraySum = myArray.reduce((previous, current) => previous + current);
console.log(`Sum of array values is: ${arraySum}`); // 6
```

### Các cặp dấu cần nhớ

| Mở      | Đóng    | Tên gọi         | Dùng cho                     |
| ------- | ------- | --------------- | ---------------------------- |
| `(`     | `)`     | Parentheses     | Gọi hàm, nhóm biểu thức      |
| `[`     | `]`     | Square brackets | Mảng, truy cập phần tử       |
| `{`     | `}`     | Curly braces    | Object, block code, template |
| `"`     | `"`     | Double quotes   | String                       |
| `'`     | `'`     | Single quotes   | String                       |
| `` ` `` | `` ` `` | Backticks       | Template literal             |

### Cách phòng tránh

1. **Gõ cặp dấu trước**, rồi viết nội dung bên trong
2. **IDE tự động** đóng ngoặc (hầu hết editor hiện đại)
3. **Indent đúng** → dễ nhìn thấy ngoặc chưa đóng
4. **Dùng formatter** (Prettier) → tự format và phát hiện lỗi

**🔑 Key Takeaway:**

- Lỗi thiếu đóng ngoặc → `SyntaxError: Unexpected token`
- **Nested constructs** (callback, object trong mảng...) rất dễ bị thiếu → cẩn thận khi nest sâu
- Tip: gõ cặp dấu trước rồi điền nội dung

---

## 6. Lẫn lộn Single & Double Quotes

### Vấn đề

JavaScript cho phép khai báo string bằng `'`, `"`, hoặc `` ` ``. Lẫn lộn → chuỗi bị đóng sớm → `SyntaxError`.

### Ví dụ

```js
// ❌ Bug: quote trong quote
const uhOh = 'I've had a wonderful evening'; // SyntaxError!
//               ^ quote đóng sớm!

// ✅ Fix 1: Dùng double quotes bao ngoài
const fix1 = "I've had a wonderful evening";

// ✅ Fix 2: Escape bằng backslash
const fix2 = 'I\'ve had a wonderful evening';

// ✅ Fix 3: Template literal
const fix3 = `I've had a wonderful evening`;
```

### Bài tập: HTML string

```js
// ❌ Bug: double quote bên trong double quote
let innerHtml = "<p>Click here to <a href="#Home">return home</a></p>";
//                                       ^ đóng sớm!

// ✅ Fix: dùng single quote cho attribute
let innerHtml = "<p>Click here to <a href='#Home'>return home</a></p>";
```

### Bảng chiến lược chọn Quote

| Tình huống                    | Nên dùng                 | Ví dụ                           |
| ----------------------------- | ------------------------ | ------------------------------- |
| Chuỗi có `'` (contraction)    | `"..."` hoặc `` `...` `` | `"I've done it"`                |
| Chuỗi có `"` (HTML attribute) | `'...'` hoặc `` `...` `` | `'<a href="link">'`             |
| Chuỗi có cả `'` và `"`        | `` `...` `` hoặc escape  | `` `She said "I've arrived"` `` |
| Có biến nội suy               | `` `...${var}` ``        | `` `Hello ${name}` ``           |

**🔑 Key Takeaway:**

- Chọn **quote bao ngoài khác** với quote bên trong
- **Template literal** (`` ` ``) giải quyết hầu hết vấn đề quote
- Khi bắt buộc dùng cùng loại → **escape** bằng `\`

---

## 7. Nhầm `=` (gán) với `==` (so sánh)

### Vấn đề

`=` là **phép gán**, `==`/`===` là **phép so sánh**. Nhầm lẫn trong `if` → luôn `true` hoặc logic sai.

### Ví dụ

```js
let x = 7;
let y = 9;
let result = "to come";

// ❌ Bug: dùng = thay vì ==
if ((x = y)) {
  // Gán x = 9, rồi kiểm tra 9 (truthy) → luôn true!
  result = "Equal!";
} else {
  result = "Not equal!";
}
console.log(result); // "Equal!" — SAI!

// ✅ Fix: dùng == hoặc ===
if (x == y) {
  // So sánh giá trị → false
  result = "Equal!";
} else {
  result = "Not equal!";
}
console.log(result); // "Not equal!" — ĐÚNG!
```

### So sánh 3 toán tử

| Toán tử | Tên             | Ý nghĩa                                     | Ví dụ                      |
| ------- | --------------- | ------------------------------------------- | -------------------------- |
| `=`     | Assignment      | **Gán** giá trị                             | `x = 5` → x nhận giá trị 5 |
| `==`    | Loose equality  | So sánh **giá trị** (có type coercion)      | `5 == "5"` → `true`        |
| `===`   | Strict equality | So sánh **giá trị + kiểu** (không coercion) | `5 === "5"` → `false`      |

### Cách phòng tránh

```js
// Tip 1: Luôn dùng === thay vì ==
if (x === y) { ... }

// Tip 2: Đặt literal bên trái (Yoda condition)
if (7 === x) { ... }   // Nếu nhầm thành = → SyntaxError ngay!

// Tip 3: Bật ESLint rule "no-cond-assign"
```

**🔑 Key Takeaway:**

- `=` gán, `==` so sánh lỏng, `===` so sánh nghiêm ngặt
- Trong `if`, `while` → **luôn dùng `===`** để tránh cả bug lẫn type coercion
- `if (x = y)` → JS gán y cho x, rồi kiểm tra truthy/falsy → bug rất khó phát hiện

---

## 8. Thiếu `()` khi gọi hàm

### Vấn đề

Không có `()` → lấy **tham chiếu hàm** (function reference) thay vì **gọi hàm** (invoke).

### Ví dụ

```js
function getNine() {
  let x = 6;
  let y = 3;
  return x + y;
}

// ❌ Bug: thiếu ()
let result = getNine; // result = [Function: getNine] — lưu tham chiếu hàm!
console.log(result); // function getNine() { ... }
console.log(typeof result); // "function"

// ✅ Fix: thêm ()
let result = getNine(); // result = 9 — gọi hàm, nhận giá trị trả về
console.log(result); // 9
```

### Phân biệt rõ

```js
function greet() {
  return "Hello!";
}

// Tham chiếu (reference) — KHÔNG gọi, KHÔNG có ()
let ref = greet;
console.log(ref); // [Function: greet]
console.log(typeof ref); // "function"

// Gọi hàm (invoke) — CÓ ()
let val = greet();
console.log(val); // "Hello!"
console.log(typeof val); // "string"
```

### Khi nào CẦN dùng reference (không có `()`)?

```js
// Callback — truyền reference để hàm khác gọi sau
setTimeout(greet, 1000); // ✅ Đúng: truyền reference
setTimeout(greet(), 1000); // ❌ Sai: gọi ngay, truyền KẾT QUẢ

// Event listener
button.addEventListener("click", handleClick); // ✅ Reference
button.addEventListener("click", handleClick()); // ❌ Gọi ngay
```

**🔑 Key Takeaway:**

- `myFunc` = **tham chiếu** hàm (function object)
- `myFunc()` = **gọi** hàm và nhận giá trị trả về
- Lỗi rất khó phát hiện vì **không báo SyntaxError** — chỉ sai logic
- Debug bằng: `console.log(typeof result)` → nếu thấy `"function"` thì thiếu `()`

---

## 9. Truyền sai thứ tự tham số

### Vấn đề

Truyền tham số **sai vị trí** → logic sai, hoặc runtime error nếu khác type.

### Ví dụ

```js
function raiseToPower(b, e) {
  return Math.pow(b, e); // b^e
}

let base = 2;
let exp = 3;

// ❌ Bug: đảo thứ tự → tính 3^2 = 9 thay vì 2^3 = 8
let power = raiseToPower(exp, base);
console.log(power); // 9 — SAI!

// ✅ Fix: đúng thứ tự (base, exponent)
let power = raiseToPower(base, exp);
console.log(power); // 8 — ĐÚNG!
```

### Khi nào lỗi này nguy hiểm nhất?

```js
// Cùng kiểu → KHÔNG báo lỗi, chỉ sai logic
function subtract(a, b) {
  return a - b;
}
subtract(3, 10); // -7 thay vì 7 — sai nhưng không có error

// Khác kiểu → có thể báo runtime error
function processData(arr, num) {
  return arr.map((x) => x * num);
}
processData(5, [1, 2, 3]); // TypeError: arr.map is not a function
```

### Cách phòng tránh

```js
// 1. Đặt tên tham số rõ ràng
function createUser(firstName, lastName, age) { ... }

// 2. Dùng object thay vì nhiều tham số positional
function createUser({ firstName, lastName, age }) { ... }
createUser({ firstName: "John", lastName: "Doe", age: 25 }); // Thứ tự không quan trọng!

// 3. Console.log ngay đầu hàm
function raiseToPower(b, e) {
  console.log("base:", b, "exp:", e); // Debug check
  return Math.pow(b, e);
}
```

**🔑 Key Takeaway:**

- Truyền sai thứ tự tham số cùng kiểu → **không có error**, chỉ **sai logic** → rất khó phát hiện
- Phòng tránh: đặt tên rõ, dùng **object destructuring** cho hàm nhiều tham số
- Debug bằng `console.log` tham số ở đầu hàm

---

## 10. Off By One Error (OBOE)

### Vấn đề

Lỗi **lệch 1 đơn vị** — rất phổ biến khi dùng index hoặc vòng lặp. JS đánh index từ **0**.

### 3 trường hợp kinh điển

```js
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let len = alphabet.length; // 26

// ❌ Case 1: Lặp THỪA 1 lần (i <= len)
for (let i = 0; i <= len; i++) {
  console.log(alphabet[i]);
}
// → index 26 không tồn tại → in "undefined" ở lần cuối

// ❌ Case 2: Lặp THIẾU 1 lần (bắt đầu từ 1)
for (let j = 1; j < len; j++) {
  console.log(alphabet[j]);
}
// → bỏ qua index 0 → thiếu ký tự "a"

// ✅ Case 3: ĐÚNG (i = 0; i < len)
for (let k = 0; k < len; k++) {
  console.log(alphabet[k]);
}
// → index 0 đến 25 → đầy đủ 26 ký tự
```

### Bài tập

```js
function countToFive() {
  let firstFive = "12345";
  let len = firstFive.length; // 5

  // ✅ Fix: i = 0 (bắt đầu từ 0) và i <= len - 1 (hoặc i < len)
  for (let i = 0; i < len; i++) {
    console.log(firstFive[i]);
  }
}
countToFive(); // "1", "2", "3", "4", "5"
```

### Quy tắc vàng

| Muốn duyệt      | Điều kiện vòng lặp           | Index              |
| --------------- | ---------------------------- | ------------------ |
| Từ đầu đến cuối | `i = 0; i < arr.length`      | `0` → `length - 1` |
| Từ cuối về đầu  | `i = arr.length - 1; i >= 0` | `length-1` → `0`   |
| n phần tử đầu   | `i = 0; i < n`               | `0` → `n - 1`      |

### Lỗi OBOE với .slice(), .substring()

```js
let str = "Hello";

// .slice(start, end) — end là EXCLUSIVE (không bao gồm)
str.slice(0, 3); // "Hel" — index 0, 1, 2 (KHÔNG có 3)
str.slice(1, 4); // "ell" — index 1, 2, 3

// Muốn lấy từ index 1 đến cuối
str.slice(1); // "ello" ✅
str.slice(1, str.length); // "ello" ✅
```

**🔑 Key Takeaway:**

- JS index từ **0**, phần tử cuối là `length - 1`
- Dùng `i < length` (không dùng `i <= length`) khi duyệt từ 0
- Lỗi OBOE **không báo error** (chỉ trả `undefined`) → debug bằng `console.log` index
- `.slice(start, end)` — `end` là **exclusive**

---

## 11. Reinitialize biến trong vòng lặp

### Vấn đề

Khi vòng lặp lồng nhau, quên **khởi tạo lại** biến tạm ở mỗi vòng lặp ngoài → dữ liệu bị cộng dồn.

### Ví dụ

```js
// ❌ Bug: biến `row` khai báo NGOÀI vòng lặp → không reset
function zeroArray(m, n) {
  let newArray = [];
  let row = []; // ← Khai báo 1 lần, dùng chung cho mọi row

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      row.push(0); // ← Cộng dồn! Row 2 có 4 phần tử, row 3 có 6...
    }
    newArray.push(row);
  }
  return newArray;
}
zeroArray(3, 2);
// [[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]  ← SAI! Cùng 1 reference
```

```js
// ✅ Fix: khai báo `row` BÊN TRONG vòng lặp ngoài → reset mỗi iteration
function zeroArray(m, n) {
  let newArray = [];

  for (let i = 0; i < m; i++) {
    let row = []; // ← Reset mỗi lần lặp!
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    newArray.push(row);
  }
  return newArray;
}
zeroArray(3, 2);
// [[0, 0], [0, 0], [0, 0]]  ← ĐÚNG!
```

### Nguyên nhân sâu xa

```js
// ⚠ Array là kiểu REFERENCE → tất cả row cùng trỏ đến 1 object
let row = [];
let arr = [];
arr.push(row); // arr[0] = row
arr.push(row); // arr[1] = row (cùng reference!)
row.push(1);
console.log(arr); // [[1], [1]] — cả 2 bị ảnh hưởng!
```

### Quy tắc

| Biến                            | Khai báo ở đâu?    | Lý do                                 |
| ------------------------------- | ------------------ | ------------------------------------- |
| Biến **tích lũy** (accumulator) | **Ngoài** vòng lặp | Cần giữ lại giá trị qua các iteration |
| Biến **tạm** (mỗi iteration)    | **Trong** vòng lặp | Cần reset mỗi lần lặp                 |

**🔑 Key Takeaway:**

- Biến **tạm** phải khai báo **trong** body vòng lặp → tự động reset
- Bug này đặc biệt **nguy hiểm** với array/object (kiểu reference)
- Debug bằng `console.log()` ở **mỗi iteration** của vòng lặp ngoài

---

## 12. Vòng lặp vô hạn & Terminal Condition

### Vấn đề

Vòng lặp **không bao giờ dừng** → trình duyệt treo/crash. Nguyên nhân: terminal condition không bao giờ `false`.

### Ví dụ 1: Điều kiện không bao giờ đạt

```js
// ❌ Bug: i bắt đầu = 1, tăng 2, nhưng điều kiện dừng là i != 4
// i: 1 → 3 → 5 → 7... BỎ QUA 4 → vô hạn!
function myFunc() {
  for (let i = 1; i != 4; i += 2) {
    console.log("Still going!");
  }
}

// ✅ Fix: dùng <= thay vì !=
function myFunc() {
  for (let i = 1; i <= 4; i += 2) {
    console.log("Still going!");
  }
}
// i: 1 → 3 → 5 (5 > 4 → dừng) — chạy 2 lần
```

### Ví dụ 2: Quên cập nhật biến đếm

```js
// ❌ Bug: quên i++
let i = 0;
while (i < 5) {
  console.log(i);
  // quên i++ → i luôn = 0 → vô hạn!
}

// ✅ Fix
let i = 0;
while (i < 5) {
  console.log(i);
  i++; // ← PHẢI cập nhật biến đếm
}
```

### Ví dụ 3: Reset biến trong vòng lặp

```js
// ❌ Bug: reset biến đếm bên trong vòng lặp
for (let i = 0; i < 10; i++) {
  // ... code ...
  i = 0; // ← Reset lại! Vô hạn!
}
```

### 3 nguyên nhân phổ biến nhất

| #   | Nguyên nhân                           | Ví dụ                     |
| --- | ------------------------------------- | ------------------------- |
| 1   | Biến đếm **nhảy qua** giá trị dừng    | `i += 2` nhưng `i != 4`   |
| 2   | **Quên** tăng/giảm biến đếm           | Thiếu `i++` trong `while` |
| 3   | **Reset** biến đếm bên trong vòng lặp | `i = 0` trong body loop   |

### Cách phòng tránh

```js
// 1. Ưu tiên dùng < hoặc > thay vì != hoặc ==
for (let i = 0; i < 10; i++) { ... }  // ✅ An toàn

// 2. Luôn kiểm tra: biến đếm CÓ TIẾN về phía điều kiện dừng không?
// i bắt đầu 10, giảm 1, dừng khi > 0 → 10, 9, 8... 1, 0 → dừng ✅
for (let i = 10; i > 0; i--) { ... }

// 3. Thêm safety break khi develop
let count = 0;
while (someCondition) {
  // ... code ...
  count++;
  if (count > 10000) break;  // Safety net khi debug
}
```

**🔑 Key Takeaway:**

- Vòng lặp vô hạn = **terminal condition không bao giờ false**
- Dùng `<`, `<=`, `>`, `>=` **an toàn hơn** `!=`, `==` làm điều kiện lặp
- Luôn kiểm tra: biến đếm **tiến về phía** điều kiện dừng
- Khi debug → thêm `console.log(i)` + safety `break` tạm thời

---

## 13. Bảng tổng hợp nhanh — Debugging Cheat Sheet

### Công cụ Debug

| Công cụ             | Công dụng                   | Cú pháp               |
| ------------------- | --------------------------- | --------------------- |
| `console.log()`     | In giá trị biến             | `console.log(x)`      |
| `console.table()`   | In dạng bảng (array/object) | `console.table(arr)`  |
| `typeof`            | Kiểm tra kiểu dữ liệu       | `typeof x`            |
| `Array.isArray()`   | Kiểm tra có phải mảng       | `Array.isArray(x)`    |
| `console.trace()`   | In call stack               | `console.trace()`     |
| DevTools Breakpoint | Dừng code tại dòng cụ thể   | F12 → Sources → click |
| `debugger`          | Breakpoint trong code       | `debugger;`           |

### Phân loại Bug

| Nhóm lỗi     | Loại bug cụ thể              | Error type       | Khó phát hiện? |
| ------------ | ---------------------------- | ---------------- | -------------- |
| **Cú pháp**  | Sai chính tả tên biến/hàm    | `ReferenceError` | Dễ             |
| **Cú pháp**  | Thiếu đóng ngoặc/quotes      | `SyntaxError`    | Dễ             |
| **Cú pháp**  | Lẫn lộn single/double quotes | `SyntaxError`    | Trung bình     |
| **Logic**    | Nhầm `=` và `==`/`===`       | Không lỗi ⚠️     | **Khó**        |
| **Logic**    | Thiếu `()` khi gọi hàm       | Không lỗi ⚠️     | **Khó**        |
| **Logic**    | Sai thứ tự tham số           | Không lỗi ⚠️     | **Khó**        |
| **Logic**    | Off by one error             | `undefined`      | **Khó**        |
| **Vòng lặp** | Quên reinitialize biến       | Sai kết quả      | **Khó**        |
| **Vòng lặp** | Vòng lặp vô hạn              | Browser crash ⚠️ | Trung bình     |

### Quy trình Debug 5 bước

```
1. 🔍 REPRODUCE — Tái hiện bug (input nào gây lỗi?)
2. 📍 LOCATE    — Thu hẹp phạm vi (console.log ở đâu?)
3. 🧠 IDENTIFY  — Xác định nguyên nhân (sai logic gì?)
4. 🔧 FIX       — Sửa lỗi (thay đổi tối thiểu)
5. ✅ VERIFY    — Kiểm tra lại (test nhiều trường hợp)
```

---

## 14. Câu hỏi phỏng vấn thường gặp

### Q1: Các loại error trong JavaScript?

→ **3 loại chính**: (1) `SyntaxError` — lỗi cú pháp, code không chạy được. (2) `ReferenceError` — truy cập biến chưa khai báo. (3) `TypeError` — thao tác trên kiểu dữ liệu sai (vd: gọi `.map()` trên number). Ngoài ra còn `RangeError`, `URIError`.

### Q2: `typeof null` trả về gì? Tại sao?

→ `"object"` — đây là **bug lịch sử** từ phiên bản đầu tiên của JavaScript, không được sửa vì sợ break web. Để kiểm tra null → dùng `x === null`.

### Q3: Làm sao phân biệt Array và Object khi `typeof` đều trả `"object"`?

→ Dùng `Array.isArray(x)` trả `true` nếu x là mảng. Hoặc `x instanceof Array`. Hoặc `Object.prototype.toString.call(x)` trả `"[object Array]"`.

### Q4: `==` khác `===` như thế nào? Khi nào dùng `==`?

→ `==` so sánh **loose** (có type coercion): `5 == "5"` → `true`. `===` so sánh **strict** (cùng type + cùng value): `5 === "5"` → `false`. **Luôn dùng `===`** trừ khi cố ý muốn coercion. Trường hợp duy nhất nên dùng `==`: `x == null` (kiểm tra cả `null` lẫn `undefined`).

### Q5: Mô tả Off By One Error. Cách phòng tránh?

→ Lỗi lệch 1 đơn vị khi dùng index hoặc vòng lặp. JS đánh index từ 0, phần tử cuối là `length - 1`. Dùng `i < length` (không dùng `<=`). Với `.slice(start, end)`, `end` là exclusive.

### Q6: Làm sao debug vòng lặp vô hạn?

→ (1) Kiểm tra terminal condition: biến đếm có **tiến về phía** điều kiện dừng không? (2) Dùng `<`/`>` thay `!=`/`==`. (3) Thêm `console.log(counter)` trong loop. (4) Thêm safety `break` khi dev: `if (count > 10000) break;`.

### Q7: `myFunc` khác `myFunc()` như thế nào?

→ `myFunc` là **function reference** (con trỏ đến hàm). `myFunc()` **gọi** hàm và trả về giá trị. Lưu reference khi dùng callback: `setTimeout(myFunc, 1000)`. Gọi khi cần giá trị: `let result = myFunc()`.

### Q8: Tại sao nên dùng `let`/`const` thay vì `var` khi debug?

→ `var` có **function scope** + khai báo trùng không báo lỗi → bug khó phát hiện. `let`/`const` có **block scope** + khai báo trùng báo `SyntaxError` → phát hiện bug sớm. `const` còn ngăn **gán lại** → giảm bug do thay đổi biến ngoài ý muốn.

### Q9: Nêu quy trình debug hiệu quả?

→ 5 bước: **Reproduce** (tái hiện) → **Locate** (thu hẹp phạm vi bằng console.log) → **Identify** (xác định nguyên nhân gốc) → **Fix** (sửa tối thiểu) → **Verify** (test lại nhiều trường hợp). Dùng `console.log` ở điểm chiến lược: đầu hàm (input), giữa (quá trình), cuối (output).
