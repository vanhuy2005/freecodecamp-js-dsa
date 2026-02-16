# 📘 ES6 (ECMAScript 2015) - Tổng hợp kiến thức chi tiết

> **29 bài học** từ freeCodeCamp JavaScript Algorithms and Data Structures
> Tài liệu hệ thống hóa: Key Takeaway, Ứng dụng thực tế, Lỗi thường gặp & Câu hỏi phỏng vấn

---

## Mục lục

| #     | Chủ đề                                                                | Nhóm              |
| ----- | --------------------------------------------------------------------- | ----------------- |
| 1     | [var vs let - Scope](#1-var-vs-let---scope)                           | Biến & Hằng       |
| 2     | [const với Array - Mutation](#2-const-với-array---mutation)           | Biến & Hằng       |
| 3     | [Object.freeze()](#3-objectfreeze---ngăn-chặn-mutation)               | Biến & Hằng       |
| 4     | [Arrow Functions](#4-arrow-functions)                                 | Functions         |
| 5     | [Arrow Functions with Parameters](#5-arrow-functions-with-parameters) | Functions         |
| 6     | [Default Parameters](#6-default-parameters)                           | Functions         |
| 7     | [Rest Parameter](#7-rest-parameter)                                   | Functions         |
| 8     | [Spread Operator](#8-spread-operator)                                 | Functions         |
| 9-14  | [Destructuring Assignment](#9-14-destructuring-assignment)            | Destructuring     |
| 15    | [Template Literals](#15-template-literals)                            | Strings & Objects |
| 16    | [Object Property Shorthand](#16-object-property-shorthand)            | Strings & Objects |
| 17    | [Concise Methods](#17-concise-declarative-functions)                  | Strings & Objects |
| 18    | [Class Syntax](#18-class-syntax)                                      | OOP               |
| 19    | [Getters & Setters](#19-getters--setters)                             | OOP               |
| 20-25 | [Modules (import/export)](#20-25-modules---importexport)              | Modules           |
| 26-29 | [Promises](#26-29-promises)                                           | Async             |

---

## NHÓM 1: BIẾN & HẰNG (Bài 1-3)

---

### 1. var vs let - Scope

**Bản chất:** `var` có **function scope**, `let` có **block scope** (giới hạn trong `{}`)

```js
// var - function scope (hoặc global nếu khai báo ngoài function)
for (var i = 0; i < 3; i++) {}
console.log(i); // 3 ← vẫn truy cập được!

// let - block scope
for (let j = 0; j < 3; j++) {}
console.log(j); // ReferenceError: j is not defined
```

**Vấn đề kinh điển với var trong closure:**

```js
// ❌ var - tất cả callback đều tham chiếu cùng 1 biến i
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(() => i);
}
console.log(funcs[0]()); // 3 (không phải 0!)
console.log(funcs[1]()); // 3 (không phải 1!)

// ✅ let - mỗi iteration tạo 1 biến i riêng
var funcs2 = [];
for (let i = 0; i < 3; i++) {
  funcs2.push(() => i);
}
console.log(funcs2[0]()); // 0 ✓
console.log(funcs2[1]()); // 1 ✓
```

**🔑 Key Takeaway:**

- `let` tạo biến mới cho mỗi iteration trong vòng lặp
- `var` bị **hoisting** lên đầu scope, `let` cũng hoisting nhưng nằm trong **Temporal Dead Zone** (TDZ) - không thể truy cập trước khi khai báo
- **Luôn dùng `let` thay `var`** trong code hiện đại

**⚠️ Lỗi thường gặp:**

- Dùng `var` trong `for` loop rồi reference biến đó trong callback/setTimeout → nhận giá trị cuối cùng
- Tưởng `let` không hoisting → thực ra có, nhưng nằm trong TDZ

**🏢 Ứng dụng thực tế:**

```js
// Event listener trong loop
const buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    console.log(`Button ${i} clicked`); // Đúng nhờ let
  });
}
```

---

### 2. const với Array - Mutation

**Bản chất:** `const` ngăn **gán lại** (reassign) biến, nhưng **KHÔNG ngăn thay đổi nội dung** (mutate) của object/array

```js
const s = [5, 6, 7];
s = [1, 2, 3]; // ❌ TypeError: Assignment to constant variable
s[2] = 45; // ✅ OK → [5, 6, 45]
s.push(8); // ✅ OK → [5, 6, 45, 8]
```

**🔑 Key Takeaway:**

- `const` bảo vệ **binding** (liên kết biến ↔ giá trị), không bảo vệ **value**
- Với primitive (number, string, boolean): `const` = không thay đổi được
- Với reference type (object, array): `const` = không gán lại được, nhưng nội dung vẫn thay đổi được
- **Best practice:** Dùng `const` mặc định, chỉ dùng `let` khi cần reassign

**⚠️ Lỗi thường gặp:**

```js
const arr = [1, 2, 3];
arr = [...arr, 4]; // ❌ TypeError - không thể reassign
// Đúng cách:
arr.push(4); // ✅ mutate trực tiếp
// Hoặc dùng let nếu cần reassign:
let arr2 = [1, 2, 3];
arr2 = [...arr2, 4]; // ✅
```

---

### 3. Object.freeze() - Ngăn chặn Mutation

**Bản chất:** `Object.freeze()` **đóng băng hoàn toàn** object → không thể thêm/sửa/xóa property

```js
const obj = { PI: 3.14, E: 2.718 };
Object.freeze(obj);

obj.PI = 99; // ❌ Silent fail (strict mode → TypeError)
obj.newProp = "hi"; // ❌ Silent fail
delete obj.PI; // ❌ Silent fail
console.log(obj); // { PI: 3.14, E: 2.718 } - không đổi
```

**🔑 Key Takeaway:**

- `Object.freeze()` chỉ **shallow freeze** → nested object bên trong vẫn mutable
- Muốn **deep freeze** → phải tự đệ quy hoặc dùng thư viện (lodash, immer)
- Kết hợp `const` + `Object.freeze()` = bất biến hoàn toàn (với object 1 cấp)

**⚠️ Lỗi thường gặp:**

```js
const config = {
  db: { host: "localhost", port: 3306 },
};
Object.freeze(config);
config.db.port = 5432; // ✅ Vẫn thay đổi được! (shallow freeze)

// Deep freeze thủ công:
function deepFreeze(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
}
```

**🏢 Ứng dụng thực tế:** Bảo vệ config, constants, API response không bị vô tình sửa đổi

---

## NHÓM 2: FUNCTIONS (Bài 4-8)

---

### 4. Arrow Functions

**Bản chất:** Cú pháp ngắn gọn cho anonymous function, đồng thời **không bind `this`** riêng

```js
// ES5
const myFunc = function () {
  return new Date();
};

// ES6 arrow function
const myFunc = () => new Date();

// Có tham số
const double = (x) => x * 2;
const double = (x) => x * 2; // 1 param → bỏ ()
const add = (a, b) => a + b; // 2+ params → giữ ()

// Nhiều dòng → cần {} và return
const calc = (a, b) => {
  const sum = a + b;
  return sum * 2;
};

// Return object literal → bọc trong ()
const makeObj = (name) => ({ name }); // ← lưu ý cặp ()
```

**🔑 Key Takeaway:**

- 1 expression, không `{}` → **tự return** (implicit return)
- Có `{}` → **phải viết `return`** (explicit return)
- Arrow function **KHÔNG có `this` riêng** → kế thừa `this` từ scope cha (lexical this)
- **KHÔNG dùng** làm method trong object literal (vì `this` sẽ không trỏ đến object)

**⚠️ Lỗi thường gặp:**

```js
// ❌ this trong arrow function không trỏ đến object
const person = {
  name: "Huy",
  greet: () => `Hello ${this.name}`, // this = window/undefined
};

// ✅ Dùng shorthand method
const person = {
  name: "Huy",
  greet() {
    return `Hello ${this.name}`;
  },
};
```

**🏢 Ứng dụng thực tế:**

```js
// Array methods - arrow function rất clean
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter((n) => n % 2 === 0);
const doubled = nums.map((n) => n * 2);
const sum = nums.reduce((acc, n) => acc + n, 0);

// Callback giữ đúng this
class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setInterval(() => {
      this.seconds++;
    }, 1000); // this = Timer instance
  }
}
```

---

### 5. Arrow Functions with Parameters

**Bản chất:** Truyền tham số vào arrow function — cú pháp linh hoạt tùy số lượng param

```js
// 1 tham số → có thể bỏ ()
const doubler = (item) => item * 2;
doubler(4); // 8

// 2+ tham số → bắt buộc có ()
const multiplier = (item, multi) => item * multi;
multiplier(4, 2); // 8

// Bài tập: rewrite myConcat bằng arrow function
const myConcat = (arr1, arr2) => {
  "use strict";
  return arr1.concat(arr2);
};
console.log(myConcat([1, 2], [3, 4, 5])); // [1, 2, 3, 4, 5]
```

**🔑 Key Takeaway:**

- 0 param: `() => ...` — bắt buộc `()`
- 1 param: `x => ...` — bỏ `()` được
- 2+ params: `(a, b) => ...` — bắt buộc `()`
- Arrow function dùng nhiều nhất trong `.map()`, `.filter()`, `.reduce()`, callback

**⚠️ Lỗi thường gặp:**

```js
// ❌ 2 params mà bỏ () → SyntaxError
const add = a, b => a + b; // SyntaxError
// ✅
const add = (a, b) => a + b;

// ❌ Destructure param mà bỏ () → SyntaxError
const fn = { name } => name; // SyntaxError
// ✅
const fn = ({ name }) => name;
```

---

### 6. Default Parameters

**Bản chất:** Gán giá trị mặc định cho tham số khi không truyền hoặc truyền `undefined`

```js
const increment = (number, value = 1) => number + value;

console.log(increment(5, 2)); // 7
console.log(increment(5)); // 6 (value mặc định = 1)
```

**🔑 Key Takeaway:**

- Default chỉ kích hoạt khi argument là `undefined` (không phải `null`, `0`, `""`, `false`)
- Default parameter có thể tham chiếu parameter trước nó: `(a, b = a * 2)`
- Đặt tham số có default **ở cuối** danh sách tham số

**⚠️ Lỗi thường gặp:**

```js
const fn = (a = 1, b) => a + b;
fn(undefined, 2); // 3 - phải truyền undefined để dùng default → code xấu
// ✅ Đặt default cuối: (b, a = 1)

// null KHÔNG trigger default
const fn2 = (x = 10) => x;
fn2(null); // null (không phải 10!)
fn2(); // 10
```

**🏢 Ứng dụng thực tế:**

```js
// API request với default options
function fetchData(
  url,
  method = "GET",
  headers = { "Content-Type": "application/json" },
) {
  return fetch(url, { method, headers });
}

// Component với default props
const Button = ({ text = "Click me", color = "blue", size = "md" }) => {
  /* ... */
};
```

---

### 7. Rest Parameter

**Bản chất:** `...args` gom **nhiều arguments** thành **1 array thực sự** (true array)

```js
const sum = (...args) => {
  return args.reduce((total, num) => total + num, 0);
};

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```

**🔑 Key Takeaway:**

- Rest parameter **phải ở cuối** danh sách tham số: `(a, b, ...rest)` ✅
- `...rest` tạo **Array thực** (khác `arguments` object trong ES5 - không phải array)
- Một function chỉ có **1 rest parameter**

**So sánh với `arguments` (ES5):**

```js
// ES5 - arguments là array-like, không có .map(), .filter()
function old() {
  return Array.from(arguments).reduce((a, b) => a + b);
}

// ES6 - rest là Array thực
const modern = (...nums) => nums.reduce((a, b) => a + b);
```

**🏢 Ứng dụng thực tế:**

```js
// Wrapper function
function log(level, ...messages) {
  console[level](...messages);
}
log("warn", "Disk space low", "Only 2GB remaining");

// Middleware pattern
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
const transform = pipe(double, addOne, square);
```

---

### 8. Spread Operator

**Bản chất:** `...` **trải** (unpack) array/iterable ra thành các phần tử riêng lẻ

```js
const arr1 = ["JAN", "FEB", "MAR"];
const arr2 = [...arr1]; // Copy array
console.log(arr2); // ['JAN', 'FEB', 'MAR']

// Truyền vào function
const nums = [6, 89, 3, 45];
Math.max(...nums); // 89 (thay vì Math.max.apply(null, nums))
```

**🔑 Key Takeaway:**

- **Spread** = trải ra (dùng ở phía phải `=`, trong `[]`, trong argument)
- **Rest** = gom lại (dùng ở phía trái `=`, trong parameter)
- Cùng cú pháp `...` nhưng **ngược nhau** về chức năng
- Spread tạo **shallow copy** (1 cấp)

**So sánh Rest vs Spread:**
| | Rest | Spread |
|---|------|--------|
| Vị trí | Parameter / destructuring | Argument / array literal |
| Chức năng | Gom nhiều → 1 array | Trải 1 array → nhiều |
| Ví dụ | `(...args) => {}` | `Math.max(...arr)` |

**🏢 Ứng dụng thực tế:**

```js
// Merge arrays
const all = [...frontend, ...backend];

// Merge objects
const merged = { ...defaults, ...userConfig };

// Clone + override
const updated = { ...user, name: "New Name" };

// Chuyển NodeList → Array
const divs = [...document.querySelectorAll("div")];
```

---

## NHÓM 3: DESTRUCTURING (Bài 9-14)

---

### 9-14. Destructuring Assignment

Destructuring là cú pháp **tách giá trị** từ object/array ra thành biến riêng.

#### 9. Extract từ Object (cơ bản)

```js
const user = { name: "John", age: 34 };

// ES5
const name = user.name;
const age = user.age;

// ES6 destructuring
const { name, age } = user;
// name = 'John', age = 34
```

#### 10. Đổi tên biến khi destructure

```js
const { name: userName, age: userAge } = user;
// userName = 'John', userAge = 34
// Đọc: "lấy user.name gán vào biến userName"
```

#### 11. Destructure Nested Object

```js
const forecast = {
  today: { low: 64, high: 77 },
};

const {
  today: { low: lowToday, high: highToday },
} = forecast;
// lowToday = 64, highToday = 77
```

#### 12. Destructure Array

```js
const [a, b] = [1, 2, 3, 4];
// a = 1, b = 2

// Bỏ qua phần tử bằng dấu phẩy
const [first, , , fourth] = [1, 2, 3, 4];
// first = 1, fourth = 4

// ⭐ Swap giá trị không cần biến tạm!
let x = 8,
  y = 6;
[x, y] = [y, x];
// x = 6, y = 8
```

#### 13. Destructure + Rest (Array)

```js
const [first, second, ...rest] = [1, 2, 3, 4, 5, 6];
// first = 1, second = 2, rest = [3, 4, 5, 6]

// Ứng dụng: bỏ 2 phần tử đầu (giống slice(2))
function removeFirstTwo(list) {
  const [, , ...shorterList] = list;
  return shorterList;
}
```

#### 14. Destructure trong Function Parameter

```js
// ❌ Truyền cả object rồi tách bên trong
const half = (stats) => (stats.max + stats.min) / 2;

// ✅ Destructure ngay tại parameter
const half = ({ max, min }) => (max + min) / 2;

// Kết hợp default
const greet = ({ name = "Guest", age = 0 } = {}) => {
  return `${name} is ${age}`;
};
```

**🔑 Key Takeaway:**

- Object destructuring: dùng `{}`, match theo **tên property**
- Array destructuring: dùng `[]`, match theo **vị trí index**
- Có thể kết hợp: đổi tên, default value, nested, rest
- Destructure tại parameter giúp code rõ ràng, chỉ lấy field cần thiết

**⚠️ Lỗi thường gặp:**

```js
// ❌ Quên khai báo let/const
{ name, age } = user; // SyntaxError
// ✅
const { name, age } = user;
// hoặc nếu biến đã tồn tại:
({ name, age } = user); // bọc trong ()

// ❌ Destructure từ undefined/null
const { a } = undefined; // TypeError
// ✅ Dùng default
const { a } = undefined || {};
```

**🏢 Ứng dụng thực tế:**

```js
// React component
const UserCard = ({ name, avatar, email }) => (
  <div>
    <img src={avatar} />
    <h2>{name}</h2>
    <p>{email}</p>
  </div>
);

// API response
const {
  data: { users, total },
  status,
} = await axios.get("/api/users");

// Import cụ thể từ module
const { useState, useEffect } = React;

// Swap biến
[arr[i], arr[j]] = [arr[j], arr[i]]; // Dùng trong sorting
```

---

## NHÓM 4: STRINGS & OBJECTS (Bài 15-17)

---

### 15. Template Literals

**Bản chất:** Dùng backtick `` ` `` thay cho quotes, hỗ trợ **nội suy biến** và **multi-line**

```js
const name = "Huy";
const age = 20;

// ES5
const msg = "Hello " + name + ", you are " + age + " years old.";

// ES6 template literal
const msg = `Hello ${name}, you are ${age} years old.`;

// Multi-line
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`;

// Expression trong ${}
const price = `Total: $${(100 * 1.1).toFixed(2)}`; // "Total: $110.00"
```

**Bài tập áp dụng:**

```js
const result = { failure: ["no-var", "var-on-top", "linebreak"] };
const failureItems = result.failure.map(
  (item) => `<li class="text-warning">${item}</li>`,
);
```

**🔑 Key Takeaway:**

- Dùng backtick `` ` `` (không phải `'` hay `"`)
- `${expression}` - có thể chứa biến, phép toán, gọi hàm, ternary
- Hỗ trợ multi-line tự nhiên, không cần `\n`
- **Tagged template literals** → nâng cao: `` html`<p>${text}</p>` `` (dùng trong styled-components, GraphQL)

**⚠️ Lỗi thường gặp:**

```js
// ❌ Dùng nháy đơn/kép thay backtick
const msg = "Hello ${name}"; // In ra đúng "${name}" chứ không nội suy!

// ❌ Quên backtick khi return object trong arrow function
const fn = (name) => `{ name: ${name} }`; // String, không phải object!
```

---

### 16. Object Property Shorthand

**Bản chất:** Khi tên biến trùng tên property → bỏ phần `: value`

```js
const name = "Huy",
  age = 20,
  gender = "male";

// ES5
const person = { name: name, age: age, gender: gender };

// ES6 shorthand
const person = { name, age, gender };
```

**🏢 Ứng dụng thực tế:**

```js
// Return object từ function
const getMousePosition = (x, y) => ({ x, y });

// State trong React
const [count, setCount] = useState(0);
return { count, setCount }; // thay vì { count: count, setCount: setCount }

// Module export
module.exports = { router, controller, middleware };
```

---

### 17. Concise Declarative Functions

**Bản chất:** Bỏ `: function` khi định nghĩa method trong object

```js
// ES5
const bike = {
  gear: 2,
  setGear: function (newGear) {
    this.gear = newGear;
  },
};

// ES6 concise method
const bike = {
  gear: 2,
  setGear(newGear) {
    this.gear = newGear;
  },
};
```

**🔑 Key Takeaway:**

- Ngắn gọn hơn, **dùng trong object literal và class**
- Method shorthand **CÓ `this` riêng** (khác arrow function)
- Là syntax mặc định trong class

---

## NHÓM 5: OOP - CLASS (Bài 18-19)

---

### 18. Class Syntax

**Bản chất:** `class` là **syntactic sugar** trên prototype-based inheritance của JS

```js
// ES5 constructor function
function Vegetable(name) {
  this.name = name;
}

// ES6 class
class Vegetable {
  constructor(name) {
    this.name = name;
  }
}

const carrot = new Vegetable("carrot");
console.log(carrot.name); // "carrot"
```

**Class đầy đủ:**

```js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} says ${this.sound}`;
  }

  static create(name, sound) {
    return new Animal(name, sound);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof"); // Gọi constructor cha
  }

  fetch(item) {
    return `${this.name} fetches ${item}`;
  }
}
```

**🔑 Key Takeaway:**

- `class` vẫn là function bên dưới (typeof Vegetable === 'function')
- `constructor()` chạy khi `new` → khởi tạo properties
- Convention: **PascalCase** cho tên class
- `class` **KHÔNG hoisting** (khác function declaration)
- `extends` để kế thừa, `super()` để gọi constructor cha

**⚠️ Lỗi thường gặp:**

```js
// ❌ Quên new
const v = Vegetable("carrot"); // TypeError: Cannot call a class as a function

// ❌ Quên super() trong subclass
class Dog extends Animal {
  constructor(name) {
    this.breed = "Lab"; // ❌ ReferenceError - phải gọi super() trước
    super(name, "Woof");
  }
}
```

---

### 19. Getters & Setters

**Bản chất:** `get`/`set` tạo "virtual property" - truy cập như property, nhưng thực chất là function

```js
class Thermostat {
  constructor(fahrenheit) {
    this._fahrenheit = fahrenheit; // _ convention = private
  }

  get temperature() {
    // Getter - đọc giá trị
    return (5 / 9) * (this._fahrenheit - 32);
  }

  set temperature(celsius) {
    // Setter - ghi giá trị
    this._fahrenheit = (celsius * 9.0) / 5 + 32;
  }
}

const thermos = new Thermostat(76); // 76°F
let temp = thermos.temperature; // 24.44°C (dùng getter)
thermos.temperature = 26; // Set 26°C (dùng setter)
temp = thermos.temperature; // 26°C
```

**🔑 Key Takeaway:**

- Getter/Setter cho phép **validation, computation, logging** khi đọc/ghi
- Truy cập bằng cú pháp property (không cần `()`): `obj.temperature`, không phải `obj.temperature()`
- Convention: prefix `_` cho biến "private" (chỉ là convention, vẫn truy cập được)
- ES2022+: dùng `#` cho **thật sự private**: `#fahrenheit`
- **Abstraction**: người dùng API không cần biết bên trong lưu °F hay °C

**🏢 Ứng dụng thực tế:**

```js
class User {
  #password;

  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }

  get password() {
    return "****"; // Không bao giờ expose password thật
  }

  set password(newPass) {
    if (newPass.length < 8) throw new Error("Password too short");
    this.#password = newPass;
  }
}
```

---

## NHÓM 6: MODULES (Bài 20-25)

---

### 20-25. Modules - Import/Export

ES6 Module cho phép **chia code thành file riêng**, chỉ chia sẻ phần cần thiết.

#### 20. Tạo Module Script (HTML)

```html
<script type="module" src="index.js"></script>
<!-- type="module" → cho phép dùng import/export -->
<!-- Mặc định strict mode, defer loading, có scope riêng -->
```

#### 21. Named Export

```js
// Cách 1: export inline
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Cách 2: export ở cuối file
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
export { add, subtract };
```

#### 22. Named Import

```js
import { add, subtract } from "./math.js";
// Chỉ import những gì cần → tree-shaking tốt hơn
```

#### 23. Import tất cả với `*`

```js
import * as math from "./math.js";
math.add(2, 3);
math.subtract(5, 3);
// Gom tất cả export vào 1 object
```

#### 24. Export Default

```js
// Mỗi file chỉ có 1 default export
export default function subtract(x, y) {
  return x - y;
}

// Hoặc anonymous
export default (x, y) => x - y;

// ❌ KHÔNG dùng default với var/let/const
// export default const fn = ... → SyntaxError
```

#### 25. Import Default

```js
import subtract from "./math.js";
// Không cần {}, tên tùy ý
import anyName from "./math.js"; // cũng OK

// Kết hợp default + named
import subtract, { add, multiply } from "./math.js";
```

**🔑 Key Takeaway:**

|               | Named Export                 | Default Export       |
| ------------- | ---------------------------- | -------------------- |
| Số lượng/file | Nhiều                        | Chỉ 1                |
| Import syntax | `{ name }`                   | `name` (không `{}`)  |
| Đổi tên       | `{ name as alias }`          | Tự do đặt tên        |
| Use case      | Utility functions, constants | Main component/class |

**⚠️ Lỗi thường gặp:**

```js
// ❌ Import default bằng {}
import { subtract } from "./math.js"; // undefined nếu là default export!

// ❌ Quên type="module" trong HTML
// <script src="app.js"></script> → import/export sẽ báo lỗi

// ❌ Quên đuôi .js trong browser (Node có thể bỏ)
import { add } from "./math"; // Lỗi trong browser
```

**🏢 Ứng dụng thực tế:**

```js
// React component pattern
// Button.jsx
export default function Button({ children }) {
  /* ... */
}
export const BUTTON_SIZES = { sm: "small", md: "medium", lg: "large" };

// App.jsx
import Button, { BUTTON_SIZES } from "./Button";
```

---

## NHÓM 7: PROMISES - ASYNC (Bài 26-29)

---

### 26-29. Promises

Promise đại diện cho **kết quả của một tác vụ bất đồng bộ** - có thể thành công hoặc thất bại trong tương lai.

#### 26. Tạo Promise

```js
const myPromise = new Promise((resolve, reject) => {
  // Tác vụ bất đồng bộ ở đây
});
```

#### 27. Resolve & Reject

```js
const serverRequest = new Promise((resolve, reject) => {
  const success = true; // Giả lập response từ server

  if (success) {
    resolve("We got the data"); // Thành công → fulfilled
  } else {
    reject("Data not received"); // Thất bại → rejected
  }
});
```

**3 trạng thái của Promise:**

```
pending (đang chờ) → fulfilled (thành công) qua resolve()
                   → rejected (thất bại) qua reject()
```

#### 28. `.then()` - Xử lý thành công

```js
serverRequest.then((result) => {
  console.log(result); // "We got the data"
});
```

#### 29. `.catch()` - Xử lý thất bại

```js
serverRequest.catch((error) => {
  console.log(error); // "Data not received"
});
```

**Chain đầy đủ:**

```js
fetch("/api/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    return data.users;
  })
  .then((users) => renderUsers(users))
  .catch((error) => showError(error))
  .finally(() => hideLoader()); // Luôn chạy dù success hay fail
```

**🔑 Key Takeaway:**

- Promise giải quyết **callback hell** (pyramid of doom)
- `.then()` return một Promise mới → **chainable**
- `.catch()` bắt lỗi từ **bất kỳ `.then()` nào trước đó**
- Luôn có `.catch()` để xử lý lỗi
- ES2017: `async/await` là syntactic sugar trên Promise

**⚠️ Lỗi thường gặp:**

```js
// ❌ Quên return trong .then() chain
fetch("/api")
  .then((res) => {
    res.json();
  }) // Quên return → next then nhận undefined
  .then((data) => console.log(data)); // undefined!

// ✅
fetch("/api")
  .then((res) => res.json()) // implicit return
  .then((data) => console.log(data));

// ❌ Quên .catch()
myPromise.then((data) => process(data)); // Lỗi sẽ bị nuốt

// ❌ Tạo Promise không cần thiết
const bad = () => new Promise((resolve) => resolve(42)); // Anti-pattern
const good = () => Promise.resolve(42); // Hoặc async () => 42
```

**🏢 Ứng dụng thực tế:**

```js
// Async/await (sugar trên Promise)
async function getUsers() {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed:", error);
  }
}

// Promise.all - chạy song song
const [users, posts, comments] = await Promise.all([
  fetch("/api/users").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
  fetch("/api/comments").then((r) => r.json()),
]);

// Promise.race - lấy kết quả nhanh nhất
const result = await Promise.race([
  fetch("/api/data"),
  new Promise((_, reject) => setTimeout(() => reject("Timeout"), 5000)),
]);
```

---

## 💼 CÂU HỎI PHỎNG VẤN THƯỜNG GẶP

### Cơ bản

**Q1: `var`, `let`, `const` khác nhau thế nào?**
| | var | let | const |
|---|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Có (init = undefined) | Có (TDZ) | Có (TDZ) |
| Reassign | ✅ | ✅ | ❌ |
| Redeclare | ✅ | ❌ | ❌ |

> **Trả lời ngắn:** `var` có function scope và hoisting, `let` có block scope và cho phép reassign, `const` có block scope và không cho reassign. Cả `let` và `const` đều có Temporal Dead Zone.

---

**Q2: Arrow function khác regular function thế nào?**

- Không có `this` riêng (lexical this)
- Không có `arguments` object
- Không thể dùng làm constructor (`new`)
- Không có `prototype` property
- Không thể dùng `yield` (không phải generator)

> **Trả lời ngắn:** Arrow function kế thừa `this` từ scope cha (lexical this), không có `arguments`, không thể `new`. Phù hợp cho callback, không phù hợp cho method cần `this`.

---

**Q3: Spread và Rest khác nhau thế nào?**

> Cùng cú pháp `...` nhưng: **Rest** gom nhiều thành 1 array (dùng ở parameter/destructuring), **Spread** trải 1 array thành nhiều (dùng ở argument/array literal).

---

**Q4: Destructuring là gì? Cho ví dụ?**

> Destructuring là cú pháp tách giá trị từ array/object thành biến riêng. Ví dụ: `const { name, age } = user` hoặc `const [first, ...rest] = arr`. Hỗ trợ nested, rename, default value.

---

### Trung bình

**Q5: `Object.freeze()` khác `const` thế nào?**

> `const` ngăn reassign biến, `Object.freeze()` ngăn mutate object. `const obj = {}; obj.a = 1` vẫn OK, nhưng `Object.freeze(obj); obj.a = 2` sẽ fail. Freeze chỉ shallow - nested object vẫn mutable.

---

**Q6: Template literal có thể làm gì ngoài string interpolation?**

> Multi-line strings, tagged templates (ví dụ styled-components: `` css`color: ${color}` ``), và có thể chứa expression/function call trong `${}`.

---

**Q7: Named export vs default export - khi nào dùng cái nào?**

> **Default**: khi file chỉ export 1 thứ chính (component, class). **Named**: khi export nhiều utilities, constants. Một file có thể kết hợp cả hai.

---

**Q8: Promise có mấy trạng thái? Giải thích?**

> 3 trạng thái: **pending** (đang chờ), **fulfilled** (thành công qua `resolve()`), **rejected** (thất bại qua `reject()`). Một khi đã settled (fulfilled/rejected) thì không thay đổi được nữa.

---

### Nâng cao

**Q9: Giải thích Temporal Dead Zone (TDZ)?**

> TDZ là khoảng thời gian từ khi vào scope đến khi biến `let`/`const` được khai báo. Truy cập biến trong TDZ → `ReferenceError`. Giúp phát hiện bug sớm hơn so với `var` (trả về `undefined`).

```js
console.log(a); // undefined (var hoisting)
var a = 1;

console.log(b); // ReferenceError (TDZ)
let b = 2;
```

---

**Q10: `Promise.all` vs `Promise.allSettled` vs `Promise.race` vs `Promise.any`?**
| Method | Resolve khi | Reject khi |
|--------|------------|------------|
| `all` | Tất cả fulfilled | Bất kỳ 1 rejected |
| `allSettled` | Tất cả settled | Không bao giờ reject |
| `race` | 1 cái settled đầu tiên | 1 cái settled đầu tiên (nếu reject) |
| `any` | 1 cái fulfilled đầu tiên | Tất cả rejected |

---

**Q11: Class trong JS có thật sự là class (như Java/C++) không?**

> Không. Class trong JS chỉ là **syntactic sugar** trên prototype chain. `typeof MyClass === 'function'`. Inheritance vẫn dựa trên prototype, không phải classical inheritance.

---

**Q12: Getter/Setter khác method thường thế nào?**

> Getter/setter truy cập bằng cú pháp property (`obj.prop`), không cần `()`. Cho phép tạo computed/virtual properties, thêm validation, logging mà consumer không biết.

---

## 📋 CHEAT SHEET TỔNG HỢP

```js
// 1. let/const thay var
let changeable = 1;
const fixed = 2;

// 2-3. Immutability
const arr = [1, 2, 3]; // Mutable content, immutable binding
Object.freeze(obj); // Immutable (shallow)

// 4. Arrow function
const fn = (a, b) => a + b;

// 5. Default params
const greet = (name = "World") => `Hello ${name}`;

// 6-7. Rest & Spread
const sum = (...nums) => nums.reduce((a, b) => a + b);
const copy = [...original];

// 8-13. Destructuring
const { a, b: renamed } = obj;
const [first, ...rest] = arr;
const fn = ({ x, y }) => x + y;

// 14. Template literals
const msg = `Hello ${name}, ${1 + 1} is two`;

// 15-16. Object shorthand
const obj = {
  name,
  age,
  greet() {
    return this.name;
  },
};

// 17-18. Class
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  get info() {
    return this._info;
  }
  set info(val) {
    this._info = val;
  }
}

// 20-25. Modules
export const fn = () => {};
export default class Main {}
import Main, { fn } from "./module.js";
import * as all from "./module.js";

// 26-29. Promise
new Promise((resolve, reject) => {
  /* ... */
})
  .then((data) => {
    /* ... */
  })
  .catch((err) => {
    /* ... */
  })
  .finally(() => {
    /* ... */
  });
```

---

> **Lời khuyên cuối:** ES6 là nền tảng bắt buộc trong JavaScript hiện đại. Hãy thực hành viết code ES6 hàng ngày - dùng `const/let`, arrow functions, destructuring, template literals trong mọi project. Khi phỏng vấn, không chỉ biết cú pháp mà phải hiểu **tại sao** ES6 giải quyết vấn đề tốt hơn ES5.
