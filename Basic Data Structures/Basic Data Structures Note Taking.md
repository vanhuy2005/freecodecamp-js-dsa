# 📘 Basic Data Structures - Tổng hợp kiến thức chi tiết

> **20 bài học** từ freeCodeCamp JavaScript Algorithms and Data Structures
> Tài liệu hệ thống hóa: Key Takeaway, Code mẫu, Lỗi thường gặp & Ứng dụng thực tế

---

## Mục lục

| #   | Chủ đề                                                                            | Nhóm               |
| --- | --------------------------------------------------------------------------------- | ------------------ |
| 1   | [Array cơ bản & Lưu trữ dữ liệu](#1-array-cơ-bản--lưu-trữ-dữ-liệu)                | Mảng cơ bản        |
| 2   | [Truy cập phần tử với Bracket Notation](#2-truy-cập-phần-tử-với-bracket-notation) | Mảng cơ bản        |
| 3-4 | [push/unshift & pop/shift](#3-4-thêm--xóa-phần-tử-ở-đầucuối-mảng)                 | Thêm & Xóa phần tử |
| 5-6 | [splice() — Xóa & Thêm](#5-6-splice--xóa-và-thêm-phần-tử-ở-bất-kỳ-vị-trí)         | Thêm & Xóa phần tử |
| 7   | [slice() — Sao chép một phần mảng](#7-slice--sao-chép-một-phần-mảng)              | Sao chép & Kết hợp |
| 8   | [Spread Operator — Copy mảng](#8-spread-operator--copy-toàn-bộ-mảng)              | Sao chép & Kết hợp |
| 9   | [Spread Operator — Kết hợp mảng](#9-spread-operator--kết-hợp-mảng)                | Sao chép & Kết hợp |
| 10  | [indexOf() — Tìm phần tử](#10-indexof--kiểm-tra-sự-tồn-tại-của-phần-tử)           | Tìm kiếm & Duyệt   |
| 11  | [Duyệt mảng với for loop](#11-duyệt-mảng-với-for-loop)                            | Tìm kiếm & Duyệt   |
| 12  | [Mảng đa chiều](#12-mảng-đa-chiều-multi-dimensional-arrays)                       | Tìm kiếm & Duyệt   |
| 13  | [Thêm key-value vào Object](#13-thêm-key-value-pairs-vào-object)                  | Object cơ bản      |
| 14  | [Object lồng nhau (Nested)](#14-modify-object-lồng-nhau)                          | Object cơ bản      |
| 15  | [Bracket Notation với Object](#15-truy-cập-property-bằng-bracket-notation)        | Object cơ bản      |
| 16  | [delete — Xóa property](#16-delete--xóa-property-khỏi-object)                     | Object cơ bản      |
| 17  | [Kiểm tra property tồn tại](#17-kiểm-tra-object-có-property-hay-không)            | Kiểm tra & Duyệt   |
| 18  | [for...in — Duyệt Object](#18-forin--duyệt-qua-các-key-của-object)                | Kiểm tra & Duyệt   |
| 19  | [Object.keys()](#19-objectkeys--lấy-tất-cả-key-thành-mảng)                        | Kiểm tra & Duyệt   |
| 20  | [Modify Array trong Object](#20-modify-array-stored-trong-object)                 | Kiểm tra & Duyệt   |

---

## NHÓM 1: MẢNG CƠ BẢN (Bài 1-2)

---

### 1. Array cơ bản & Lưu trữ dữ liệu

**Bản chất:** Array là cấu trúc dữ liệu lưu trữ **danh sách có thứ tự** các phần tử. Có thể chứa **mọi kiểu dữ liệu** (string, number, boolean, object, array khác...).

```js
// Mảng 1 chiều — chứa nhiều kiểu dữ liệu
let simpleArray = ["one", 2, "three", true, false, undefined, null];
console.log(simpleArray.length); // 7

// Mảng đa chiều — chứa cả object
let complexArray = [
  [
    { one: 1, two: 2 },
    { three: 3, four: 4 },
  ],
  [
    { a: "a", b: "b" },
    { c: "c", d: "d" },
  ],
];
```

**🔑 Key Takeaway:**

- Mọi array đều có property `.length` → trả về số phần tử
- Array có thể chứa **hỗn hợp** kiểu dữ liệu, kể cả array khác và object
- **1 chiều** (one-dimensional) vs **đa chiều** (multi-dimensional) tùy theo độ lồng nhau

---

### 2. Truy cập phần tử với Bracket Notation

**Bản chất:** JavaScript array là **zero-indexed** — phần tử đầu tiên ở vị trí `0`. Dùng `[]` để **đọc** và **ghi** giá trị.

```js
let ourArray = ["a", "b", "c"];

// Đọc giá trị
let first = ourArray[0]; // "a"

// Ghi (thay đổi) giá trị
ourArray[1] = "not b anymore";
// ourArray → ["a", "not b anymore", "c"]
```

**🔑 Key Takeaway:**

- Index bắt đầu từ `0`, phần tử cuối ở index `length - 1`
- Bracket notation vừa **đọc** vừa **ghi** được
- Gán giá trị mới cho index = **thay thế** phần tử tại vị trí đó (mutate mảng gốc)

**⚠️ Lỗi thường gặp:**

```js
let arr = ["a", "b", "c"];
arr[3]; // undefined — không có phần tử ở index 3!
arr[-1]; // undefined — JS không hỗ trợ negative index như Python
```

---

## NHÓM 2: THÊM & XÓA PHẦN TỬ (Bài 3-6)

---

### 3-4. Thêm & Xóa phần tử ở đầu/cuối mảng

**Bản chất:** 4 method cơ bản để thao tác đầu/cuối mảng. Tất cả đều **mutate** mảng gốc.

```
              unshift → [ ... ] ← push
              shift   ← [ ... ] → pop
```

```js
let arr = [1, 2, 3];

// THÊM phần tử
arr.push(4, 5); // Thêm vào CUỐI  → [1, 2, 3, 4, 5]
arr.unshift(-1, 0); // Thêm vào ĐẦU   → [-1, 0, 1, 2, 3, 4, 5]

// XÓA phần tử
let last = arr.pop(); // Xóa phần tử CUỐI → trả về 5
let first = arr.shift(); // Xóa phần tử ĐẦU  → trả về -1
```

**🔑 Key Takeaway:**

| Method      | Vị trí | Hành động | Tham số              | Trả về          |
| ----------- | ------ | --------- | -------------------- | --------------- |
| `push()`    | Cuối   | Thêm      | 1 hoặc nhiều phần tử | Độ dài mảng mới |
| `unshift()` | Đầu    | Thêm      | 1 hoặc nhiều phần tử | Độ dài mảng mới |
| `pop()`     | Cuối   | Xóa       | Không có             | Phần tử bị xóa  |
| `shift()`   | Đầu    | Xóa       | Không có             | Phần tử bị xóa  |

- `push/unshift` có thể thêm **nhiều** phần tử cùng lúc
- `pop/shift` chỉ xóa **một** phần tử mỗi lần, và **trả về** phần tử bị xóa

**⚠️ Lỗi thường gặp:**

```js
let arr = [1, 2, 3];
let result = arr.push(4); // result = 4 (length), KHÔNG phải mảng mới!
```

---

### 5-6. splice() — Xóa và Thêm phần tử ở bất kỳ vị trí

**Bản chất:** `splice()` là "dao đa năng" — có thể **xóa**, **thêm**, hoặc **thay thế** phần tử ở **bất kỳ vị trí nào**. **Mutate** mảng gốc.

**Cú pháp:** `array.splice(startIndex, deleteCount, item1, item2, ...)`

```js
// XÓA phần tử (2 tham số)
let arr = ["today", "was", "not", "so", "great"];
let removed = arr.splice(2, 2); // Bắt đầu từ index 2, xóa 2 phần tử
// arr     → ['today', 'was', 'great']
// removed → ['not', 'so']  ← trả về mảng phần tử bị xóa

// THÊM phần tử (3+ tham số)
const numbers = [10, 11, 12, 12, 15];
numbers.splice(3, 1, 13, 14); // Xóa 1, thêm 13 và 14 tại index 3
// numbers → [10, 11, 12, 13, 14, 15]

// CHỈ THÊM (không xóa) — deleteCount = 0
let colors = ["red", "blue"];
colors.splice(1, 0, "green"); // Chèn 'green' tại index 1
// colors → ['red', 'green', 'blue']
```

**🔑 Key Takeaway:**

- Tham số 1: **vị trí bắt đầu** (startIndex)
- Tham số 2: **số phần tử cần xóa** (deleteCount)
- Tham số 3+: **phần tử mới** được chèn vào tại startIndex
- Luôn **trả về mảng** chứa các phần tử bị xóa (mảng rỗng nếu không xóa gì)
- **Mutate** mảng gốc — nếu cần giữ nguyên mảng gốc, dùng `slice()` thay thế

**⚠️ Lỗi thường gặp:**

```js
// Nhầm lẫn: tham số thứ 2 là SỐ LƯỢNG xóa, KHÔNG phải endIndex
let arr = [0, 1, 2, 3, 4];
arr.splice(1, 3); // Xóa 3 phần tử từ index 1 → [0, 4]
// KHÔNG phải xóa từ index 1 đến index 3!
```

---

## NHÓM 3: SAO CHÉP & KẾT HỢP MẢNG (Bài 7-9)

---

### 7. slice() — Sao chép một phần mảng

**Bản chất:** `slice()` **trích xuất** một phần mảng thành mảng mới. **KHÔNG mutate** mảng gốc (immutable).

**Cú pháp:** `array.slice(startIndex, endIndex)` — lấy từ `start` đến `end - 1`

```js
let weather = ["rain", "snow", "sleet", "hail", "clear"];

let todaysWeather = weather.slice(1, 3);
// todaysWeather → ['snow', 'sleet']  (index 1 và 2, KHÔNG bao gồm 3)
// weather       → vẫn nguyên không đổi
```

**🔑 Key Takeaway:**

- `slice()` **không thay đổi** mảng gốc → tạo **shallow copy**
- `endIndex` là **exclusive** (không bao gồm phần tử tại endIndex)
- Không truyền tham số: `arr.slice()` → copy toàn bộ mảng

**⚠️ Lỗi thường gặp: splice() vs slice()**

| Tiêu chí    | `splice()`        | `slice()`            |
| ----------- | ----------------- | -------------------- |
| Mutate gốc? | ✅ Có             | ❌ Không             |
| Tham số 2   | Số lượng xóa      | endIndex (exclusive) |
| Mục đích    | Xóa/Thêm/Thay thế | Trích xuất (copy)    |

---

### 8. Spread Operator — Copy toàn bộ mảng

**Bản chất:** Cú pháp `...` (ES6) **trải** tất cả phần tử của mảng ra → dùng để **copy** mảng nhanh gọn.

```js
let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
// thatArray → [true, true, undefined, false, null]
// thisArray vẫn nguyên — đây là 2 mảng KHÁC NHAU trong bộ nhớ
```

**🔑 Key Takeaway:**

- `[...arr]` tạo **shallow copy** — phần tử primitive được copy giá trị, phần tử reference (object/array) chỉ copy tham chiếu
- Cú pháp ngắn gọn hơn `arr.slice()` hoặc `Array.from(arr)`

**⚠️ Lỗi thường gặp:**

```js
// Shallow copy — nested object vẫn chia sẻ tham chiếu!
let original = [{ a: 1 }, { b: 2 }];
let copy = [...original];
copy[0].a = 99;
console.log(original[0].a); // 99 ← bị ảnh hưởng!
```

---

### 9. Spread Operator — Kết hợp mảng

**Bản chất:** Spread `...` có thể **chèn** toàn bộ phần tử của 1 mảng vào **bất kỳ vị trí** trong mảng khác.

```js
let herbs = ["sage", "rosemary", "parsley", "thyme"];
let spices = ["basil", "cilantro", ...herbs, "coriander"];
// spices → ['basil', 'cilantro', 'sage', 'rosemary', 'parsley', 'thyme', 'coriander']
```

**🔑 Key Takeaway:**

- Linh hoạt hơn `concat()` — chèn ở đầu, giữa, cuối đều được
- Có thể kết hợp **nhiều mảng** cùng lúc: `[...arr1, ...arr2, ...arr3]`

**🏢 Ứng dụng thực tế:**

```js
// Merge danh sách từ nhiều nguồn
const localUsers = ["Alice", "Bob"];
const remoteUsers = ["Charlie", "Dave"];
const allUsers = [...localUsers, ...remoteUsers]; // ['Alice', 'Bob', 'Charlie', 'Dave']
```

---

## NHÓM 4: TÌM KIẾM & DUYỆT MẢNG (Bài 10-12)

---

### 10. indexOf() — Kiểm tra sự tồn tại của phần tử

**Bản chất:** `indexOf()` tìm vị trí (index) **đầu tiên** của phần tử trong mảng. Trả về `-1` nếu không tìm thấy.

```js
let fruits = ["apples", "pears", "oranges", "peaches", "pears"];

fruits.indexOf("dates"); // -1  (không tồn tại)
fruits.indexOf("oranges"); // 2
fruits.indexOf("pears"); // 1   (trả về vị trí ĐẦU TIÊN tìm thấy)
```

**🔑 Key Takeaway:**

- Trả về **index đầu tiên** tìm thấy, hoặc **-1** nếu không có
- Dùng để kiểm tra nhanh: `arr.indexOf(x) !== -1` → phần tử tồn tại
- So sánh bằng **strict equality** (`===`)

**🏢 Ứng dụng thực tế:**

```js
// Kiểm tra phần tử có tồn tại không
function quickCheck(arr, elem) {
  return arr.indexOf(elem) !== -1;
  // Hoặc ES6+: return arr.includes(elem);
}
```

---

### 11. Duyệt mảng với for loop

**Bản chất:** Dùng vòng lặp `for` để duyệt qua từng phần tử, kết hợp điều kiện lọc để tạo mảng mới.

```js
// Lọc mảng — loại bỏ phần tử có giá trị cụ thể
function filteredArray(arr, elem) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(elem) === -1) {
      newArr.push(arr[i]); // Chỉ thêm nếu KHÔNG chứa elem
    }
  }
  return newArr;
}
```

**🔑 Key Takeaway:**

- `for` loop + `push()` là pattern cơ bản để **lọc/biến đổi** mảng
- Với mảng lồng nhau, cần duyệt cả mảng con bên trong
- ES6+: Có thể thay thế bằng `.filter()`, `.map()`, `.forEach()`

---

### 12. Mảng đa chiều (Multi-dimensional Arrays)

**Bản chất:** Array có thể chứa array → tạo thành **nhiều tầng lồng nhau**. Truy cập bằng **bracket notation liên tiếp**.

```js
let nestedArray = [
  ["deep"], // Cấp 2
  [["deeper"], ["deeper"]], // Cấp 3
  [
    [["deepest"], ["deepest"]], // Cấp 4
    [[["deepest-est?"]]],
  ], // Cấp 5
];

// Truy cập phần tử sâu nhất
console.log(nestedArray[2][1][0][0][0]); // "deepest-est?"

// Thay đổi giá trị
nestedArray[2][1][0][0][0] = "deeper still";
```

**🔑 Key Takeaway:**

- Mỗi cặp `[]` đi sâu thêm **1 cấp**
- Mảng ngoài cùng = cấp 1, mỗi lần lồng thêm `[]` = thêm 1 cấp
- Dùng bracket notation liên tiếp `[i][j][k]` để truy cập phần tử ở bất kỳ độ sâu

**⚠️ Lỗi thường gặp:**

```js
// Đếm nhầm cấp — mảng ngoài cùng đã là cấp 1!
let arr = [[[["deep"]]]]; // 'deep' ở cấp 4, KHÔNG phải cấp 3
```

---

## NHÓM 5: OBJECT CƠ BẢN (Bài 13-16)

---

### 13. Thêm Key-Value Pairs vào Object

**Bản chất:** Object lưu trữ dữ liệu dạng **key-value**. Thêm property bằng **dot notation** hoặc **bracket notation**.

```js
const character = {
  player: "Hwoarang",
  fightingStyle: "Tae Kwon Doe",
  human: true,
};

// Dot notation — key đơn giản (không có dấu cách, ký tự đặc biệt)
character.origin = "South Korea";

// Bracket notation — key có dấu cách hoặc dùng biến
character["hair color"] = "dyed orange";

// Dùng biến làm key
const eyes = "eye color";
character[eyes] = "brown";
```

**🔑 Key Takeaway:**

- **Dot notation** `obj.key`: dùng khi key là identifier hợp lệ (không có dấu cách, bắt đầu bằng chữ)
- **Bracket notation** `obj['key']`: dùng khi key có dấu cách, ký tự đặc biệt, hoặc là **biến**
- Nếu key chưa tồn tại → tự động **tạo mới**; nếu đã tồn tại → **ghi đè**

---

### 14. Modify Object lồng nhau

**Bản chất:** Object có thể chứa object khác → truy cập bằng **chuỗi dot notation**.

```js
let nestedObject = {
  id: 28802695164,
  date: "December 31, 2016",
  data: {
    totalUsers: 99,
    online: 80,
    onlineStatus: {
      active: 67,
      away: 13,
      busy: 8,
    },
  },
};

// Truy cập và thay đổi property lồng sâu
nestedObject.data.onlineStatus.busy = 10;
```

**🔑 Key Takeaway:**

- Nối dot notation liên tiếp: `obj.level1.level2.level3`
- Có thể kết hợp dot + bracket: `obj.data['online status']`
- Cấu trúc lồng nhau rất phổ biến trong JSON và API response

---

### 15. Truy cập Property bằng Bracket Notation

**Bản chất:** Bracket notation cho phép truy cập property **động** (dynamic) — key được xác định lúc runtime qua biến.

```js
const foods = { apples: 25, oranges: 32, plums: 28 };

// Key cố định
let count = foods["apples"]; // 25

// Key ĐỘNG — giá trị từ biến
let selectedFood = "oranges";
let inventory = foods[selectedFood]; // 32
```

**🔑 Key Takeaway:**

- Bracket notation **bắt buộc** khi dùng biến làm key
- Nếu key không tồn tại → trả về `undefined`
- Rất hữu ích trong vòng lặp, callback, và khi property name đến từ user input

**🏢 Ứng dụng thực tế:**

```js
// Tra cứu inventory động
function checkInventory(scannedItem) {
  return foods[scannedItem]; // Key được truyền vào lúc runtime
}
```

---

### 16. delete — Xóa Property khỏi Object

**Bản chất:** Dùng `delete` để **xóa hoàn toàn** một key-value pair khỏi object.

```js
const foods = { apples: 25, oranges: 32, plums: 28, strawberries: 15 };

delete foods.oranges;
delete foods.plums;
delete foods.strawberries;
// foods → { apples: 25 }
```

**🔑 Key Takeaway:**

- `delete obj.key` xóa cả key **lẫn** value
- Trả về `true` nếu xóa thành công (hoặc key không tồn tại)
- Sau khi xóa, truy cập key đó sẽ trả về `undefined`

---

## NHÓM 6: KIỂM TRA & DUYỆT OBJECT (Bài 17-20)

---

### 17. Kiểm tra Object có Property hay không

**Bản chất:** 2 cách kiểm tra: `hasOwnProperty()` và toán tử `in`.

```js
const users = { Alan: { online: true }, Jeff: { online: false } };

// Cách 1: hasOwnProperty() — chỉ kiểm tra property TRỰC TIẾP
users.hasOwnProperty("Alan"); // true

// Cách 2: in — kiểm tra cả property trong prototype chain
"Alan" in users; // true
```

**🔑 Key Takeaway:**

- `hasOwnProperty()`: chỉ kiểm tra **own property** (không tìm trong prototype)
- `in`: kiểm tra **cả prototype chain**
- Cả hai đều trả về `boolean`

**⚠️ Lỗi thường gặp:**

```js
// Nhầm lẫn hasOwnProperty vs in với prototype
let obj = Object.create({ inherited: true });
obj.own = true;

obj.hasOwnProperty("inherited"); // false ← không thấy property kế thừa
"inherited" in obj; // true  ← thấy trong prototype chain
```

---

### 18. for...in — Duyệt qua các Key của Object

**Bản chất:** `for...in` lặp qua **tất cả các key** (enumerable properties) của object.

```js
const refrigerator = { milk: 1, eggs: 12 };

for (const food in refrigerator) {
  console.log(food, refrigerator[food]);
}
// "milk" 1
// "eggs" 12
```

**🔑 Key Takeaway:**

- Biến trong `for (const key in obj)` nhận **tên key** (string), không phải value
- Truy cập value bằng `obj[key]` (bracket notation)
- Object **KHÔNG đảm bảo thứ tự** key như array
- `for...in` duyệt cả **inherited properties** → dùng `hasOwnProperty()` để lọc nếu cần

**🏢 Ứng dụng thực tế:**

```js
// Đếm user online
function countOnline(allUsers) {
  let count = 0;
  for (const user in allUsers) {
    if (allUsers[user].online === true) {
      count++;
    }
  }
  return count;
}
```

---

### 19. Object.keys() — Lấy tất cả Key thành mảng

**Bản chất:** `Object.keys(obj)` trả về **mảng các key** (own property) của object.

```js
const users = { Alan: {}, Jeff: {}, Sarah: {} };
console.log(Object.keys(users)); // ["Alan", "Jeff", "Sarah"]
```

**🔑 Key Takeaway:**

- Trả về **mảng string** chứa tên các key
- Chỉ lấy **own enumerable properties** (không lấy từ prototype)
- Thứ tự key không được đảm bảo
- Hữu ích khi cần `.length`, `.map()`, `.filter()` trên các key

**🏢 Ứng dụng thực tế:**

```js
// Đếm số lượng property
const numKeys = Object.keys(obj).length;

// Kiểm tra object rỗng
const isEmpty = Object.keys(obj).length === 0;
```

---

### 20. Modify Array Stored trong Object

**Bản chất:** Object thường chứa array bên trong → truy cập bằng chuỗi dot notation rồi dùng các phương thức array bình thường.

```js
const user = {
  name: "Kenneth",
  age: 28,
  data: {
    username: "kennethCodesAllDay",
    joinDate: "March 26, 2016",
    organization: "freeCodeCamp",
    friends: ["Sam", "Kira", "Tomo"],
    location: { city: "San Francisco", state: "CA", country: "USA" },
  },
};

// Thêm bạn vào mảng friends bên trong object
function addFriend(userObj, friend) {
  userObj.data.friends.push(friend);
  return userObj.data.friends;
}
addFriend(user, "Pete"); // ['Sam', 'Kira', 'Tomo', 'Pete']
```

**🔑 Key Takeaway:**

- Object và Array có thể **lồng nhau tự do** → tạo cấu trúc dữ liệu phức tạp
- Truy cập: `obj.prop1.prop2[index]` — kết hợp dot notation và bracket notation
- Mọi method của array (`push`, `pop`, `splice`...) đều dùng được trên array nằm trong object

---

## 📋 Bảng tổng hợp nhanh — Array Methods

| Method      | Mutate? | Tham số                      | Trả về                  | Mục đích          |
| ----------- | ------- | ---------------------------- | ----------------------- | ----------------- |
| `push()`    | ✅      | Phần tử mới                  | Độ dài mảng mới         | Thêm vào cuối     |
| `pop()`     | ✅      | Không                        | Phần tử bị xóa          | Xóa phần tử cuối  |
| `unshift()` | ✅      | Phần tử mới                  | Độ dài mảng mới         | Thêm vào đầu      |
| `shift()`   | ✅      | Không                        | Phần tử bị xóa          | Xóa phần tử đầu   |
| `splice()`  | ✅      | start, deleteCount, ...items | Mảng phần tử bị xóa     | Xóa/Thêm/Thay thế |
| `slice()`   | ❌      | start, end                   | Mảng mới (shallow copy) | Trích xuất        |
| `indexOf()` | ❌      | Phần tử cần tìm              | Index hoặc -1           | Tìm kiếm          |
| `...spread` | ❌      | —                            | Phần tử được trải ra    | Copy/Kết hợp mảng |

## 📋 Bảng tổng hợp nhanh — Object Operations

| Thao tác     | Cú pháp                     | Ghi chú                      |
| ------------ | --------------------------- | ---------------------------- |
| Thêm/Sửa     | `obj.key = value`           | Dot notation                 |
| Thêm/Sửa     | `obj[key] = value`          | Bracket notation (key động)  |
| Xóa          | `delete obj.key`            | Xóa cả key và value          |
| Kiểm tra     | `obj.hasOwnProperty('key')` | Chỉ own property             |
| Kiểm tra     | `'key' in obj`              | Cả prototype chain           |
| Duyệt keys   | `for (const k in obj)`      | Duyệt tất cả enumerable keys |
| Lấy all keys | `Object.keys(obj)`          | Trả về mảng string           |
