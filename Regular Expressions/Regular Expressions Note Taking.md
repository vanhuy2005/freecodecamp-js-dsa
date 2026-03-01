# Regular Expressions — Tổng hợp kiến thức & Interview Notes

> Phần tổng hợp từ 33 bài học **Regular Expressions** của freeCodeCamp.  
> Hệ thống hóa: Key Takeaway, Code mẫu, Lỗi thường gặp & Câu hỏi phỏng vấn.

---

## Mục lục

| #     | Chủ đề                                                                              | Nhóm             |
| ----- | ----------------------------------------------------------------------------------- | ---------------- |
| 1-2   | [Phương thức cơ bản: test() & match()](#1-phương-thức-cơ-bản-test--match)           | Cơ bản           |
| 3-4   | [Flags: i, g](#2-flags---cờ-regex)                                                  | Cơ bản           |
| 5     | [Alternation (OR)](#3-alternation--toán-tử-or)                                      | Pattern matching |
| 6     | [Wildcard Period (.)](#4-wildcard-period--dấu-chấm)                                 | Pattern matching |
| 7-10  | [Character Classes & Ranges](#5-character-classes--ranges)                          | Pattern matching |
| 11    | [Negated Character Sets](#6-negated-character-sets--tập-ký-tự-phủ-định)             | Pattern matching |
| 12-13 | [Quantifiers: + và \*](#7-quantifiers--bộ-định-lượng)                               | Quantifiers      |
| 14    | [Greedy vs Lazy Matching](#8-greedy-vs-lazy-matching)                               | Quantifiers      |
| 15    | [Thực hành: Find Criminals](#9-thực-hành-find-criminals)                            | Thực hành        |
| 16-17 | [Anchors: ^ và $](#10-anchors--neo-vị-trí)                                          | Position         |
| 18-24 | [Shorthand Character Classes](#11-shorthand-character-classes)                      | Shorthand        |
| 22    | [Thực hành: Restrict Possible Usernames](#12-thực-hành-restrict-possible-usernames) | Thực hành        |
| 25-27 | [Quantity Specifiers {}](#13-quantity-specifiers--bộ-định-lượng-chính-xác)          | Quantifiers      |
| 28    | [Check for All or None (?)](#14-check-for-all-or-none--toán-tử-)                    | Quantifiers      |
| 29    | [Lookaheads: (?=) và (?!)](#15-lookaheads--positive--negative)                      | Advanced         |
| 30    | [Mixed Grouping: ()](#16-mixed-grouping-of-characters)                              | Advanced         |
| 31    | [Capture Groups & Backreferences](#17-capture-groups--backreferences)               | Advanced         |
| 32    | [Search and Replace](#18-search-and-replace-với-capture-groups)                     | Advanced         |
| 33    | [Thực hành: Remove Whitespace](#19-thực-hành-remove-whitespace)                     | Thực hành        |

---

## 1. Phương thức cơ bản: test() & match()

### `.test()` — Kiểm tra pattern có tồn tại không

Trả về `true` hoặc `false`. Cú pháp: **regex gọi method, truyền string vào.**

```js
let testStr = "freeCodeCamp";
let testRegex = /Code/;
testRegex.test(testStr); // true
```

### `.match()` — Trích xuất kết quả khớp

Trả về **mảng các kết quả** hoặc `null`. Cú pháp: **string gọi method, truyền regex vào.**

```js
"Hello, World!".match(/Hello/); // ["Hello"]
"Regular expressions".match(/expressions/); // ["expressions"]
```

### ⚠️ Chú ý thứ tự gọi — Điểm dễ nhầm

```js
// test(): regex.test(string)
/regex/.test("string");

// match(): string.match(regex)  ← NGƯỢC với test
"string".match(/regex/);
```

**🔑 Key Takeaway:**

- `.test()` → chỉ cần biết **có hay không** → trả `boolean`
- `.match()` → cần **lấy ra giá trị** khớp → trả `array | null`
- Thứ tự gọi **ngược nhau**: `regex.test(str)` vs `str.match(regex)`

---

## 2. Flags — Cờ Regex

Flags được đặt **sau dấu `/` cuối** của regex: `/pattern/flags`

### Flag `i` — Ignore Case (không phân biệt hoa thường)

```js
let fccRegex = /freecodecamp/i;
fccRegex.test("freeCodeCamp"); // true
fccRegex.test("FREECODECAMP"); // true
fccRegex.test("FrEeCoDeCaMp"); // true
```

### Flag `g` — Global (tìm tất cả, không dừng ở kết quả đầu)

```js
let testStr = "Repeat, Repeat, Repeat";

// Không có flag g → chỉ trả kết quả đầu tiên
testStr.match(/Repeat/); // ["Repeat"]

// Có flag g → trả TẤT CẢ kết quả
testStr.match(/Repeat/g); // ["Repeat", "Repeat", "Repeat"]
```

### Kết hợp nhiều flags

```js
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /Twinkle/gi; // vừa ignore case, vừa global
twinkleStar.match(starRegex); // ["Twinkle", "twinkle"]
```

**🔑 Key Takeaway:**

| Flag | Ý nghĩa          | Khi nào dùng                           |
| ---- | ---------------- | -------------------------------------- |
| `i`  | Case-insensitive | Không quan tâm hoa/thường              |
| `g`  | Global search    | Muốn tìm **tất cả** kết quả khớp       |
| `gi` | Kết hợp cả hai   | Tìm tất cả, không phân biệt hoa/thường |

---

## 3. Alternation — Toán tử OR `|`

Dùng `|` để khớp **một trong nhiều pattern**.

```js
let petRegex = /dog|cat|bird|fish/;
petRegex.test("James has a pet cat."); // true
petRegex.test("I like turtles."); // false
```

```js
// Khớp nhiều khả năng
/yes|no|maybe/.test("maybe later"); // true
```

**⚠️ Lỗi thường gặp:**

- Không nhầm lẫn `|` (OR trong regex) với `||` (OR trong JS logic)
- `/cat|dog/` khác với `/[catdog]/` — cái đầu khớp cả từ "cat" hoặc "dog", cái sau khớp **từng ký tự** c, a, t, d, o, g

---

## 4. Wildcard Period — Dấu chấm `.`

Dấu `.` khớp với **bất kỳ một ký tự nào** (trừ newline).

```js
// /hu./ khớp: hug, huh, hut, hum, hu1, hu@, ...
let huRegex = /hu./;
huRegex.test("I'll hum a song"); // true
huRegex.test("Bear hug"); // true
```

```js
// /.un/ khớp: run, sun, fun, pun, nun, bun, ...
let unRegex = /.un/;
unRegex.test("Let's have fun"); // true
```

**🔑 Key Takeaway:**

- `.` = **any single character** (1 ký tự bất kỳ)
- Rất mạnh nhưng cũng rất "rộng" — nên cân nhắc dùng character class `[]` nếu muốn giới hạn

---

## 5. Character Classes & Ranges

### Character Class `[...]` — Tập ký tự cụ thể

Đặt các ký tự muốn khớp trong `[]`. Chỉ khớp **một ký tự** trong tập.

```js
let bgRegex = /b[aiu]g/;
"big".match(bgRegex); // ["big"] ✓
"bag".match(bgRegex); // ["bag"] ✓
"bug".match(bgRegex); // ["bug"] ✓
"bog".match(bgRegex); // null    ✗ (o không trong [aiu])
```

```js
// Tìm tất cả nguyên âm (hoa + thường)
let vowelRegex = /[aeiou]/gi;
"Beware of bugs".match(vowelRegex); // ["e", "a", "e", "o", "u"]
```

### Range `[a-z]` — Dải ký tự liên tiếp

Dùng `-` để định nghĩa **khoảng** thay vì liệt kê từng ký tự.

```js
// Khớp chữ cái a đến e + "at"
let bgRegex = /[a-e]at/;
"cat".match(bgRegex); // ["cat"] ✓
"bat".match(bgRegex); // ["bat"] ✓
"mat".match(bgRegex); // null    ✗ (m không trong [a-e])
```

```js
// Tất cả chữ cái (hoa + thường)
let alphabetRegex = /[a-z]/gi;
"The quick brown fox".match(alphabetRegex);
// ["T","h","e","q","u","i","c","k","b","r","o","w","n","f","o","x"]
```

### Kết hợp Range chữ + số

```js
// Chữ h-s VÀ số 2-6
let myRegex = /[h-s2-6]/gi;
"Blueberry 3.141592653s are delicious.".match(myRegex);
// ["l", "r", "r", "3", "4", "5", "2", "6", "5", "3", "s", "r", "l", "i", "i", "o", "s"]
```

```js
// Tổng hợp: chữ + số
let jennyStr = "Jenny8675309";
let myRegex = /[a-z0-9]/gi;
jennyStr.match(myRegex);
// ["J","e","n","n","y","8","6","7","5","3","0","9"]
```

**🔑 Key Takeaway:**

- `[abc]` — khớp **một trong** các ký tự liệt kê
- `[a-z]` — khớp **một ký tự** trong range a đến z
- `[a-z0-9]` — kết hợp nhiều range trong cùng `[]`
- Luôn nhớ thêm flag `i` nếu muốn match cả hoa lẫn thường, hoặc dùng `[a-zA-Z]`

---

## 6. Negated Character Sets — Tập ký tự phủ định

Đặt `^` **ngay sau `[`** để khớp tất cả ký tự **KHÔNG** nằm trong tập.

```js
// Khớp mọi thứ KHÔNG PHẢI nguyên âm
/[^aeiou]/gi.test("aeiou"); // false (toàn nguyên âm)
/[^aeiou]/gi.test("hello"); // true  (có h, l, l)

// Khớp mọi thứ KHÔNG PHẢI nguyên âm VÀ số
let myRegex = /[^aeiou0-9]/gi;
"3 blind mice.".match(myRegex);
// [" ", "b", "l", "n", "d", " ", "m", "c", "."]
```

**⚠️ Chú ý:** Ký tự `^` có **2 nghĩa khác nhau** tùy vị trí:

| Vị trí          | Ý nghĩa                                 | Ví dụ        |
| --------------- | --------------------------------------- | ------------ |
| Trong `[^...]`  | **Phủ định** — KHÔNG khớp các ký tự này | `/[^aeiou]/` |
| Ngoài `[]`: `^` | **Anchor** — khớp ĐẦU chuỗi             | `/^Hello/`   |

---

## 7. Quantifiers — Bộ định lượng

### `+` — Một hoặc nhiều lần (1+)

Ký tự/pattern phải xuất hiện **ít nhất 1 lần liên tiếp**.

```js
// Tìm chuỗi "s" liên tiếp trong Mississippi
let myRegex = /s+/gi;
"Mississippi".match(myRegex); // ["ss", "ss"]
// 2 match vì có 2 nhóm "ss" liên tiếp, cách nhau bởi "i"
```

```js
/a+/g.match("abc"); // ["a"]     — 1 lần
/a+/g.match("aabc"); // ["aa"]    — 2 lần liên tiếp
/a+/g.match("abab"); // ["a","a"] — 2 match riêng (không liên tiếp)
/a+/g.match("bcd"); // null      — không có "a"
```

### `*` — Không hoặc nhiều lần (0+)

Ký tự/pattern có thể **không xuất hiện**, hoặc xuất hiện bao nhiêu lần cũng được.

```js
let goRegex = /go*/;
"gooooooooal!".match(goRegex); // ["goooooooo"] — nhiều "o"
"gut feeling".match(goRegex); // ["g"]         — 0 lần "o" (vẫn match "g")
"over the moon".match(goRegex); // null          — không có "g"
```

```js
// Match "A" + 0 hoặc nhiều "a"
let chewieRegex = /Aa*/;
"Aaaaaaaaaaaaaaaarrrgh!".match(chewieRegex);
// ["Aaaaaaaaaaaaaaa"]
```

### So sánh `+` vs `*`

| Quantifier | Số lần khớp | Ví dụ `/go+/` vs `/go*/` với "g" |
| ---------- | ----------- | -------------------------------- |
| `+`        | **1+** lần  | `null` (cần ít nhất 1 "o")       |
| `*`        | **0+** lần  | `["g"]` (0 lần "o" vẫn OK)       |

---

## 8. Greedy vs Lazy Matching

### Greedy (mặc định) — Khớp DÀI nhất có thể

```js
let greedyRegex = /t[a-z]*i/;
"titanic".match(greedyRegex); // ["titani"] — dài nhất
```

### Lazy `?` — Khớp NGẮN nhất có thể

Thêm `?` **sau quantifier** (`*?`, `+?`) để chuyển sang lazy.

```js
let lazyRegex = /t[a-z]*?i/;
"titanic".match(lazyRegex); // ["ti"] — ngắn nhất
```

### Ví dụ thực tế — Parse HTML tag

```js
let text = "<h1>Winter is coming</h1>";

// ❌ Greedy: khớp từ < đầu đến > cuối
/<.*>/.exec(text); // ["<h1>Winter is coming</h1>"]

// ✅ Lazy: khớp từ < đến > gần nhất
/<.*?>/.exec(text); // ["<h1>"]
```

**🔑 Key Takeaway:**

| Loại   | Ký hiệu    | Hành vi                    | Mặc định? |
| ------ | ---------- | -------------------------- | --------- |
| Greedy | `*`, `+`   | Khớp **nhiều nhất** có thể | ✅ Có     |
| Lazy   | `*?`, `+?` | Khớp **ít nhất** có thể    | ❌ Không  |

**⚠️ Lưu ý:** Không nên dùng regex để parse HTML phức tạp. Nhưng dùng regex để match pattern trong chuỗi HTML đơn giản thì OK.

---

## 9. Thực hành: Find Criminals

Bài tập tổng hợp: Tìm nhóm tội phạm (ký tự `C`) đứng liên tiếp nhau.

```js
let reCriminals = /C+/; // Greedy: khớp 1 hoặc nhiều "C" liên tiếp

// Test
"C".match(reCriminals); // ["C"]
"CCCCCC".match(reCriminals); // ["CCCCCC"]
"ABCzzzz".match(reCriminals); // ["C"]
"CCCCabcCC".match(reCriminals); // ["CCCC"] (nhóm đầu tiên)
"".match(reCriminals); // null
"abcabc".match(reCriminals); // null
```

---

## 10. Anchors — Neo vị trí

### `^` — Đầu chuỗi (Beginning Anchor)

```js
let firstRegex = /^Ricky/;
firstRegex.test("Ricky is first"); // true  — Ricky ở đầu
firstRegex.test("You can't find Ricky"); // false — Ricky không ở đầu
```

```js
let calRegex = /^Cal/;
calRegex.test("Cal and Ricky"); // true
calRegex.test("Ricky and Cal"); // false
```

### `$` — Cuối chuỗi (Ending Anchor)

```js
let storyRegex = /story$/;
storyRegex.test("This is a never ending story"); // true  — "story" ở cuối
storyRegex.test("Sometimes a story will end"); // false — "story" không ở cuối
```

```js
let lastRegex = /caboose$/;
lastRegex.test("The last car is the caboose"); // true
```

### Kết hợp `^` và `$` — Khớp chính xác toàn bộ chuỗi

```js
/^hello$/.test("hello"); // true  — chuỗi chính xác là "hello"
/^hello$/.test("hello world"); // false — có thêm ký tự sau
/^hello$/.test("say hello"); // false — có thêm ký tự trước
```

**🔑 Key Takeaway:**

- `^pattern` → pattern phải ở **đầu** chuỗi
- `pattern$` → pattern phải ở **cuối** chuỗi
- `^pattern$` → chuỗi phải **chính xác** là pattern
- Nhớ: `^` trong `[^...]` là **phủ định**, `^` ngoài `[]` là **anchor đầu chuỗi**

---

## 11. Shorthand Character Classes

Các shortcut thay thế cho character class phổ biến:

### `\w` — Word character = `[A-Za-z0-9_]`

Khớp: chữ cái (hoa/thường) + số + gạch dưới `_`

```js
let alphabetRegexV2 = /\w/g;
"The five boxing wizards jump quickly.".match(alphabetRegexV2).length;
// 31 — đếm tất cả ký tự chữ/số
```

### `\W` — Non-word character = `[^A-Za-z0-9_]`

Khớp: tất cả những gì **KHÔNG** phải `\w` (dấu câu, khoảng trắng, ký tự đặc biệt…)

```js
let nonAlphabetRegex = /\W/g;
"The five boxing wizards jump quickly.".match(nonAlphabetRegex).length;
// 6 — 5 dấu cách + 1 dấu chấm
```

```js
"42%".match(/\W/); // ["%"]
"Coding!".match(/\W/); // ["!"]
```

### `\d` — Digit = `[0-9]`

Khớp: một chữ số (0–9)

```js
let numRegex = /\d/g;
"2001: A Space Odyssey".match(numRegex).length; // 4
```

### `\D` — Non-digit = `[^0-9]`

Khớp: tất cả những gì **KHÔNG** phải chữ số

```js
let noNumRegex = /\D/g;
"2001: A Space Odyssey".match(noNumRegex).length; // 17
```

### `\s` — Whitespace = `[\r\t\f\n\v ]`

Khớp: khoảng trắng, tab, xuống dòng, carriage return, form feed.

```js
let sample = "Whitespace is important in separating words";
let countWhiteSpace = /\s/g;
sample.match(countWhiteSpace);
// [" ", " ", " ", " ", " "] — 5 khoảng trắng
```

```js
"Hello World\tTab\nNewline".match(/\s/g);
// [" ", "\t", "\n"] — space, tab, newline
```

### `\S` — Non-whitespace = `[^\r\t\f\n\v ]`

Khớp: tất cả những gì **KHÔNG** phải whitespace.

```js
let sample = "Whitespace is important in separating words";
let countNonWhiteSpace = /\S/g;
sample.match(countNonWhiteSpace).length;
// 38 — tất cả ký tự không phải khoảng trắng
```

```js
"Hello World".match(/\S/g);
// ["H","e","l","l","o","W","o","r","l","d"]
```

### Bảng tổng hợp Shorthand

| Shorthand | Tương đương      | Khớp                         | Đối lập |
| --------- | ---------------- | ---------------------------- | ------- |
| `\w`      | `[A-Za-z0-9_]`   | Chữ, số, gạch dưới           | `\W`    |
| `\W`      | `[^A-Za-z0-9_]`  | Ký tự đặc biệt, khoảng trắng | `\w`    |
| `\d`      | `[0-9]`          | Chữ số                       | `\D`    |
| `\D`      | `[^0-9]`         | Không phải chữ số            | `\d`    |
| `\s`      | `[\r\t\f\n\v ]`  | Khoảng trắng (whitespace)    | `\S`    |
| `\S`      | `[^\r\t\f\n\v ]` | Không phải khoảng trắng      | `\s`    |

> **Quy tắc nhớ:** Viết thường = khớp loại đó. Viết HOA = khớp **ngược lại**.

---

## 12. Thực hành: Restrict Possible Usernames

Bài tập tổng hợp: Validate username theo các quy tắc:

1. Chỉ dùng ký tự **alphanumeric** (chữ + số)
2. Số chỉ được nằm ở **cuối** (0 hoặc nhiều)
3. Username **không được bắt đầu** bằng số
4. Chữ cái có thể **hoa hoặc thường**
5. Độ dài **ít nhất 2 ký tự** — nếu đúng 2 thì **cả 2 phải là chữ**

### Cách giải 1 — Dùng Alternation

```js
let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i;
```

**Phân tích:**

```
^[a-z][a-z]+\d*$    ← Nhánh 1: ≥2 chữ cái, rồi 0+ số
|                     ← HOẶC
^[a-z]\d\d+$         ← Nhánh 2: 1 chữ cái, rồi 2+ số
```

- Nhánh 1: username có **≥2 chữ cái** đầu, theo sau bởi **0 hoặc nhiều số**
- Nhánh 2: username có **1 chữ cái** đầu, theo sau bởi **2+ chữ số** (đảm bảo ≥2 ký tự)

### Cách giải 2 — Dùng Quantity Specifier

```js
const userCheck = /^[a-z]([0-9]{2,}|[a-z]+\d*)$/i;
```

**Phân tích:**

```
^[a-z]               ← Bắt đầu bằng 1 chữ cái
(                     ← Nhóm:
  [0-9]{2,}           ←   2+ chữ số (username ngắn: 1 chữ + 2+ số)
  |                   ←   HOẶC
  [a-z]+\d*           ←   1+ chữ cái + 0+ số (username dài)
)                     ← Kết thúc nhóm
$/i                   ← Cuối chuỗi, ignore case
```

### Test cases

```js
let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i;

userCheck.test("JackOfAllTrades"); // true  ✓ nhiều chữ, 0 số
userCheck.test("J"); // false ✗ chỉ 1 ký tự
userCheck.test("Jo"); // true  ✓ 2 chữ cái
userCheck.test("J8"); // false ✗ 2 ký tự nhưng có số
userCheck.test("J83"); // true  ✓ 1 chữ + 2 số
userCheck.test("Oceans11"); // true  ✓ nhiều chữ + số cuối
userCheck.test("007"); // false ✗ bắt đầu bằng số
userCheck.test("9abc"); // false ✗ bắt đầu bằng số
userCheck.test("A1"); // false ✗ 1 chữ + 1 số (cần ≥2 số)
```

**🔑 Key Takeaway:**

- Bài này kết hợp: **Anchors** `^$` + **Character Classes** `[a-z]` + **Quantifiers** `+`, `*`, `{n,}` + **Alternation** `|` + **Flag** `i`
- Khi bài toán phức tạp → chia thành nhiều nhánh bằng `|`, mỗi nhánh xử lý một trường hợp

---

## 13. Quantity Specifiers — Bộ định lượng chính xác

Ngoài `+` (1+) và `*` (0+), regex cho phép chỉ định **số lần lặp chính xác** bằng `{}`.

### `{min,max}` — Từ min đến max lần

```js
let A4 = "aaaah";
let A2 = "aah";
let multipleA = /a{3,5}h/;

multipleA.test(A4); // true  — 4 chữ "a" (trong khoảng 3-5)
multipleA.test(A2); // false — 2 chữ "a" (ít hơn 3)
```

```js
// Bài tập: Match "Oh no" khi có 3-6 chữ "h"
let ohRegex = /Oh{3,6}\sno/;

ohRegex.test("Ohhh no"); // true  ✓ 3 chữ h
ohRegex.test("Ohhhh no"); // true  ✓ 4 chữ h
ohRegex.test("Ohhhhhhh no"); // false ✗ 7 chữ h (quá 6)
ohRegex.test("Oh no"); // false ✗ 1 chữ h (ít hơn 3)
```

### `{n}` — Chính xác n lần

```js
let timRegex = /Tim{4}ber/;
timRegex.test("Timmmmber"); // true  — đúng 4 chữ "m"
timRegex.test("Timmmber"); // false — chỉ 3 chữ "m"
timRegex.test("Timmber"); // false — chỉ 2 chữ "m"
```

### `{min,}` — Ít nhất min lần (không giới hạn trên)

```js
let haRegex = /ha{3,}h/;
haRegex.test("haaah"); // true  — 3 lần
haRegex.test("haaaah"); // true  — 4 lần
haRegex.test("haah"); // false — chỉ 2 lần
```

### Bảng tổng hợp Quantity Specifiers

| Cú pháp | Ý nghĩa             | Ví dụ       | Match            |
| ------- | ------------------- | ----------- | ---------------- |
| `{3,5}` | Từ 3 đến 5 lần      | `/a{3,5}/`  | "aaa" → "aaaaa"  |
| `{3}`   | Chính xác 3 lần     | `/a{3}/`    | "aaa"            |
| `{3,}`  | Ít nhất 3 lần       | `/a{3,}/`   | "aaa", "aaaa"…   |
| `+`     | Tương đương `{1,}`  | `/a+/`      | "a", "aa"…       |
| `*`     | Tương đương `{0,}`  | `/a*/`      | "", "a", "aa"…   |
| `?`     | Tương đương `{0,1}` | `/colou?r/` | "color","colour" |

**⚠️ Chú ý:**

- `{3,5}` — **KHÔNG có khoảng trắng** giữa số: `{3, 5}` sẽ không hoạt động!
- `h{3}` chỉ áp dụng cho ký tự **ngay trước** nó (ở đây là `h`), không phải cả chuỗi

**🔑 Key Takeaway:**

- `{min,max}` cho phép kiểm soát **chính xác** số lần lặp
- `+`, `*`, `?` thực chất là shorthand của `{1,}`, `{0,}`, `{0,1}`
- Luôn nhớ: quantifier chỉ áp dụng cho **phần tử ngay trước** nó

---

## 14. Check for All or None — Toán tử `?`

Dùng `?` để đánh dấu phần tử trước nó là **tùy chọn** (optional) — khớp **0 hoặc 1 lần**.

### Ứng dụng: Khác biệt chính tả Anh-Mỹ

```js
let american = "color";
let british = "colour";
let rainbowRegex = /colou?r/;

rainbowRegex.test(american); // true  — "u" xuất hiện 0 lần
rainbowRegex.test(british); // true  — "u" xuất hiện 1 lần
```

```js
// Bài tập: Match cả "favorite" và "favourite"
let favRegex = /favou?rite/;
favRegex.test("favorite"); // true  ✓
favRegex.test("favourite"); // true  ✓
```

### Ví dụ thêm

```js
// Có hoặc không có "s" ở cuối (số ít / số nhiều)
/cars?/.test("car"); // true
/cars?/.test("cars"); // true

// Protocol http hoặc https
/https?:\/\//.test("http://example.com"); // true
/https?:\/\//.test("https://example.com"); // true
```

**🔑 Key Takeaway:**

- `?` = `{0,1}` — phần tử trước nó **có hoặc không** đều được
- **2 vai trò của `?`** trong regex:
  - Sau **ký tự/group**: optional (`colou?r`)
  - Sau **quantifier** (`*`, `+`): chuyển sang lazy matching (`*?`, `+?`)

---

## 15. Lookaheads — Positive & Negative

Lookahead "nhìn về phía trước" để kiểm tra pattern **mà không tiêu thụ** (consume) ký tự.

### Positive Lookahead `(?=...)` — Phải có phía trước

Khớp nếu phía trước **CÓ** pattern, nhưng **không bao gồm** pattern đó trong kết quả.

```js
let quit = "qu";
let quRegex = /q(?=u)/;
quit.match(quRegex); // ["q"] — khớp "q" vì phía sau có "u"
```

### Negative Lookahead `(?!...)` — Không được có phía trước

Khớp nếu phía trước **KHÔNG CÓ** pattern.

```js
let noquit = "qt";
let qRegex = /q(?!u)/;
noquit.match(qRegex); // ["q"] — khớp "q" vì phía sau KHÔNG có "u"
```

### Ứng dụng thực tế: Password Validator

Dùng **nhiều lookahead** để kiểm tra nhiều điều kiện trên cùng một chuỗi.

```js
// Simple: 3-6 ký tự, ít nhất 1 số
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test("abc123"); // true
checkPass.test("ab"); // false — quá ngắn
```

```js
// Bài tập: >5 ký tự, có 2 số liên tiếp
let pwRegex = /(?=\w{6})(?=\w*\d{2})/;

pwRegex.test("astronaut"); // false — không có 2 số liên tiếp
pwRegex.test("bana12"); // true  ✓ 6 ký tự, có "12"
pwRegex.test("abc123"); // true  ✓
pwRegex.test("ab1c2"); // false — 2 số không liên tiếp
pwRegex.test("12345"); // false — chỉ có 5 ký tự
pwRegex.test("astr1on11aut"); // true ✓
```

### Phân tích chi tiết `(?=\w{6})(?=\w*\d{2})`

```
(?=\w{6})     ← Lookahead 1: phải có ít nhất 6 word characters
(?=\w*\d{2})  ← Lookahead 2: ở đâu đó có 2 chữ số liên tiếp
              ← Cả 2 lookahead đều bắt đầu từ vị trí HIỆN TẠI
              ← Không tiêu thụ ký tự → có thể kiểm tra nhiều điều kiện
```

**🔑 Key Takeaway:**

| Lookahead | Cú pháp   | Ý nghĩa                              |
| --------- | --------- | ------------------------------------ |
| Positive  | `(?=...)` | Phía trước **phải có** pattern       |
| Negative  | `(?!...)` | Phía trước **không được có** pattern |

- Lookahead **không consume** ký tự → dùng để kiểm tra **nhiều điều kiện** cùng lúc
- Rất hữu ích cho **password validation**, **complex matching**

---

## 16. Mixed Grouping of Characters

Dùng dấu ngoặc `()` để nhóm các ký tự và kết hợp với `|` cho pattern phức tạp.

### Cơ bản: Nhóm + Alternation

```js
// Match "Penguin" hoặc "Pumpkin"
let testRegex = /P(engu|umpk)in/;

testRegex.test("Penguin"); // true  ✓
testRegex.test("Pumpkin"); // true  ✓
testRegex.test("Pippin"); // false ✗
```

**Phân tích:** Thay vì viết `/Penguin|Pumpkin/`, ta nhóm phần **khác nhau** trong `()`:

```
P(engu|umpk)in
│  │     │   │
│  └─OR──┘   │
P─────────────in    ← phần chung đầu & cuối
```

### Bài tập: Validate tên Roosevelt

```js
// Match "Franklin Roosevelt" hoặc "Eleanor Roosevelt"
// Cho phép có middle name (tùy chọn)
let myRegex = /(Franklin|Eleanor) (([A-Z]\.?|[A-Z][a-z]+) )?Roosevelt/;

myRegex.test("Franklin Roosevelt"); // true  ✓
myRegex.test("Eleanor Roosevelt"); // true  ✓
myRegex.test("Franklin D. Roosevelt"); // true  ✓
myRegex.test("Eleanor Anne Roosevelt"); // true  ✓
myRegex.test("Franklin D Roosevelt"); // true  ✓
myRegex.test("Theodore Roosevelt"); // false ✗
```

**Phân tích chi tiết:**

```
(Franklin|Eleanor)                 ← Tên: Franklin HOẶC Eleanor
⎵                                  ← Khoảng trắng
(([A-Z]\.?|[A-Z][a-z]+) )?        ← Middle name (TOÀN BỘ optional):
  [A-Z]\.?                         ←   Viết tắt: "D" hoặc "D."
  |                                ←   HOẶC
  [A-Z][a-z]+                      ←   Tên đầy đủ: "Anne", "Delano"
  ⎵                                ←   Khoảng trắng sau middle name
)?                                 ← Toàn bộ middle name là optional
Roosevelt                          ← Họ
```

**🔑 Key Takeaway:**

- `()` nhóm các phần của pattern → kết hợp với `|` để tạo **sub-pattern**
- Giúp viết regex **ngắn gọn hơn** khi pattern có **phần chung đầu/cuối**
- `(group)?` — toàn bộ nhóm là **optional**
- `()` cũng tạo **capture group** (sẽ học ở section tiếp)

---

## 17. Capture Groups & Backreferences

### Capture Group `(...)` — Bắt & Lưu pattern

Nội dung khớp trong `()` được **lưu tạm** và có thể tham chiếu lại.

```js
let repeatStr = "row row row your boat";

// (\w+) bắt 1+ word characters → lưu vào nhóm 1
// \1 tham chiếu lại nội dung nhóm 1
let repeatRegex = /(\w+) \1 \1/;

repeatRegex.test(repeatStr); // true
repeatStr.match(repeatRegex);
// ["row row row", "row"]
// ↑ full match     ↑ captured group 1
```

### Backreference `\1`, `\2`, ... — Tham chiếu ngược

Số thứ tự = **vị trí dấu `(` mở**, tính từ trái sang phải, bắt đầu từ 1.

```js
// Bắt 2 group
/(abc)(def)\2\1/.test("abcdefdefabc"); // true
//  ↑1   ↑2  ↑2 ↑1
```

### Bài tập: Match số lặp 3 lần

```js
// Khớp chuỗi gồm ĐÚNG 1 số, lặp lại 3 lần, cách nhau bởi khoảng trắng
let reRegex = /^(\d+) \1 \1$/;

reRegex.test("42 42 42"); // true  ✓ — "42" lặp 3 lần
reRegex.test("42 42 42 42"); // false ✗ — lặp 4 lần
reRegex.test("42 42"); // false ✗ — chỉ lặp 2 lần
reRegex.test("101 102 103"); // false ✗ — các số khác nhau
reRegex.test("1 2 3"); // false ✗ — các số khác nhau
reRegex.test("10 10 10"); // true  ✓
```

**Phân tích:**

```
^(\d+) \1 \1$
│  │    │   │ │
│  │    │   │ └─ Anchor cuối chuỗi
│  │    │   └─── Tham chiếu nhóm 1 (lần 3)
│  │    └──────── Tham chiếu nhóm 1 (lần 2)
│  └───────────── Capture group 1: 1+ chữ số
└──────────────── Anchor đầu chuỗi
```

### `.match()` với Capture Groups

Khi **không có flag `g`**, `.match()` trả về mảng gồm:

- Phần tử `[0]`: full match
- Phần tử `[1]`, `[2]`,...: các captured group

```js
"42 42 42".match(/^(\d+) \1 \1$/);
// ["42 42 42", "42"]
//   ↑ [0]       ↑ [1]

"abc def".match(/(\w+) (\w+)/);
// ["abc def", "abc", "def"]
//   ↑ [0]      ↑[1]   ↑[2]
```

**⚠️ Lưu ý:** Khi có flag `g`, `.match()` chỉ trả về các full match, **KHÔNG** trả captured groups. Dùng `.matchAll()` nếu cần cả hai.

**🔑 Key Takeaway:**

- `(\w+)` = **bắt** nội dung khớp vào nhóm
- `\1` = **tham chiếu lại** nội dung nhóm 1 (phải khớp **cùng nội dung**)
- Capture groups được đánh số tự động: `\1`, `\2`, `\3`,...
- Dùng `^...$` để đảm bảo khớp **toàn bộ chuỗi**, không chỉ một phần

---

## 18. Search and Replace với Capture Groups

### `.replace()` — Tìm và thay thế

```js
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue");
// "The sky is blue."
```

### Capture Groups trong replacement: `$1`, `$2`,...

Trong chuỗi replacement, dùng `$1`, `$2`,... để tham chiếu các captured group.

```js
// Đổi chỗ 2 từ
"Code Camp".replace(/(\w+)\s(\w+)/, "$2 $1");
// "Camp Code"
//   $1="Code", $2="Camp" → replacement: "$2 $1" = "Camp Code"
```

### Bài tập: Đảo thứ tự 3 từ

```js
let str = "one two three";
let fixRegex = /(\w+)\s(\w+)\s(\w+)/;
let replaceText = "$3 $2 $1";
let result = str.replace(fixRegex, replaceText);
// "three two one"
```

**Phân tích:**

```
Regex:    (\w+)  \s  (\w+)  \s  (\w+)
Match:    "one"  " " "two"  " " "three"
Groups:    $1          $2          $3

Replace:  "$3 $2 $1" → "three two one"
```

### So sánh `\1` vs `$1`

| Ngữ cảnh                        | Cú pháp    | Ví dụ                                 |
| ------------------------------- | ---------- | ------------------------------------- |
| **Trong regex** (backreference) | `\1`, `\2` | `/(\w+) \1/` — match từ lặp           |
| **Trong replacement**           | `$1`, `$2` | `.replace(/(\w+)/, '$1!')` — thay thế |

### Ứng dụng thực tế

```js
// Đổi format ngày: MM/DD/YYYY → DD-MM-YYYY
"12/25/2024".replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2-$1-$3");
// "25-12-2024"

// Ẩn số điện thoại: 0901234567 → 090***4567
"0901234567".replace(/(\d{3})\d{3}(\d{4})/, "$1***$2");
// "090***4567"

// Wrap từ bằng tag HTML
"hello".replace(/(\w+)/, "<strong>$1</strong>");
// "<strong>hello</strong>"
```

**🔑 Key Takeaway:**

- `.replace(regex, replacement)` — tìm pattern, thay bằng string mới
- Dùng `$1`, `$2`,... trong replacement để **tham chiếu captured groups**
- `\1` dùng **trong regex**, `$1` dùng **trong replacement string**
- Kết hợp capture groups + replace = **công cụ rất mạnh** cho text transformation

---

## 19. Thực hành: Remove Whitespace

Bài tập tổng hợp: Xóa khoảng trắng đầu/cuối chuỗi bằng regex (không dùng `.trim()`).

```js
let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g;
let result = hello.replace(wsRegex, "");
// "Hello, World!"
```

### Phân tích chi tiết

```
/^\s+|\s+$/g
  │     │
  │     └─── \s+$ : 1+ whitespace ở CUỐI chuỗi
  └───────── ^\s+ : 1+ whitespace ở ĐẦU chuỗi
  │         │
  └────|────┘     : OR — khớp một trong hai
              g   : Global — tìm TẤT CẢ match (cả đầu lẫn cuối)
```

### Tại sao cần flag `g`?

```js
// Không có /g → chỉ xóa match ĐẦU TIÊN (khoảng trắng đầu)
"   Hello, World!  ".replace(/^\s+|\s+$/, "");
// "Hello, World!  " — vẫn còn khoảng trắng cuối!

// Có /g → xóa TẤT CẢ match (cả đầu lẫn cuối)
"   Hello, World!  ".replace(/^\s+|\s+$/g, "");
// "Hello, World!" ✓
```

### Cách khác: Dùng Capture Group

```js
// Bắt phần giữa (không phải whitespace đầu/cuối)
let hello = "   Hello, World!  ";
let wsRegex = /^\s+(.*\S)\s*$/;
let result = hello.replace(wsRegex, "$1");
// "Hello, World!"
```

**🔑 Key Takeaway:**

- Bài này kết hợp: **Anchors** `^$` + **Shorthand** `\s` + **Quantifier** `+` + **Alternation** `|` + **Flag** `g` + **`.replace()`**
- Pattern `/^\s+|\s+$/g` là kỹ thuật **trim whitespace** cổ điển bằng regex
- Trong thực tế, dùng `String.prototype.trim()` cho đơn giản, nhưng **hiểu regex** giúp xử lý các case phức tạp hơn

---

## 20. Bảng tổng hợp nhanh — Regex Cheat Sheet

### Cú pháp cơ bản

| Cú pháp  | Ý nghĩa                     | Ví dụ                 |
| -------- | --------------------------- | --------------------- |
| `/abc/`  | Literal match               | Khớp chính xác "abc"  |
| `.`      | Any character (trừ newline) | `/a.c/` → "abc","a1c" |
| `\|`     | OR                          | `/cat\|dog/`          |
| `[abc]`  | Character class             | Một trong a, b, c     |
| `[a-z]`  | Range                       | a đến z               |
| `[^abc]` | Negated class               | KHÔNG phải a, b, c    |

### Quantifiers

| Cú pháp    | Ý nghĩa                 | Ví dụ                 |
| ---------- | ----------------------- | --------------------- |
| `+`        | 1 hoặc nhiều lần `{1,}` | `/a+/` → "a","aaa"    |
| `*`        | 0 hoặc nhiều lần `{0,}` | `/a*/` → "","a","aaa" |
| `?`        | 0 hoặc 1 lần `{0,1}`    | `/colou?r/`           |
| `{n}`      | Chính xác n lần         | `/a{3}/` → "aaa"      |
| `{n,m}`    | Từ n đến m lần          | `/a{3,5}/`            |
| `{n,}`     | Ít nhất n lần           | `/a{3,}/`             |
| `*?`, `+?` | Lazy (ít nhất có thể)   | `/<.*?>/` → `"<h1>"`  |

### Anchors & Lookaheads

| Cú pháp   | Ý nghĩa            | Ví dụ                            |
| --------- | ------------------ | -------------------------------- |
| `^`       | Đầu chuỗi          | `/^Hello/`                       |
| `$`       | Cuối chuỗi         | `/world$/`                       |
| `(?=...)` | Positive lookahead | `/q(?=u)/` — "q" trước "u"       |
| `(?!...)` | Negative lookahead | `/q(?!u)/` — "q" không trước "u" |

### Grouping & Capturing

| Cú pháp    | Ý nghĩa                         | Ví dụ                      |
| ---------- | ------------------------------- | -------------------------- |
| `(abc)`    | Capture group                   | `/(\w+)/` → bắt & lưu      |
| `\1`, `\2` | Backreference (trong regex)     | `/(\w+) \1/` → từ lặp      |
| `$1`, `$2` | Capture ref (trong replacement) | `.replace(/(\w+)/, '$1!')` |
| `(a\|b)`   | Alternation trong group         | `/(cat\|dog)/`             |
| `(...)?`   | Optional group                  | `/(middle )?name/`         |

### Shorthand Character Classes

| Shorthand | Tương đương     | Khớp               | Đối lập |
| --------- | --------------- | ------------------ | ------- |
| `\w`      | `[A-Za-z0-9_]`  | Chữ, số, gạch dưới | `\W`    |
| `\d`      | `[0-9]`         | Chữ số             | `\D`    |
| `\s`      | `[\r\t\f\n\v ]` | Khoảng trắng       | `\S`    |

### Flags

| Flag | Ý nghĩa             |
| ---- | ------------------- |
| `i`  | Case-insensitive    |
| `g`  | Global (tìm tất cả) |
| `m`  | Multiline           |

### Methods

| Method        | Cú pháp                       | Trả về           |
| ------------- | ----------------------------- | ---------------- |
| `.test()`     | `regex.test(string)`          | `true` / `false` |
| `.match()`    | `string.match(regex)`         | `array` / `null` |
| `.replace()`  | `string.replace(regex, repl)` | `string` mới     |
| `.matchAll()` | `string.matchAll(regex)`      | `iterator`       |

---

## 21. Câu hỏi phỏng vấn thường gặp

### Q1: `.test()` khác `.match()` như thế nào?

→ `.test()` trả `boolean`, gọi trên **regex**. `.match()` trả **array/null**, gọi trên **string**. Dùng `.test()` khi chỉ cần kiểm tra tồn tại, `.match()` khi cần lấy giá trị.

### Q2: Greedy vs Lazy matching?

→ **Greedy** (mặc định) khớp dài nhất có thể. **Lazy** (thêm `?`) khớp ngắn nhất. Ví dụ: `/<.*>/` vs `/<.*?>/` với `"<h1>text</h1>"`.

### Q3: `^` có bao nhiêu nghĩa trong regex?

→ **2 nghĩa**: Trong `[^...]` là phủ định (negation). Ngoài `[]` như `^Hello` là anchor đầu chuỗi.

### Q4: `\w` bao gồm những gì?

→ `[A-Za-z0-9_]` — chữ cái, số, và dấu gạch dưới. **Chú ý** `_` cũng được bao gồm — đây là điểm hay bị quên.

### Q5: Sự khác nhau giữa `/[catdog]/` và `/cat|dog/`?

→ `/[catdog]/` khớp **một ký tự** bất kỳ trong tập {c, a, t, d, o, g}. `/cat|dog/` khớp **chuỗi** "cat" hoặc "dog".

### Q6: Làm sao validate username chỉ chứa alphanumeric, số ở cuối, ít nhất 2 ký tự?

→ `/^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i` — kết hợp anchors, character classes, quantifiers. Xem [Section 12](#12-thực-hành-restrict-possible-usernames).

### Q7: `{3,5}` khác gì `{3}` và `{3,}`?

→ `{3,5}` khớp từ **3 đến 5 lần**, `{3}` khớp **chính xác 3 lần**, `{3,}` khớp **ít nhất 3 lần** (không giới hạn trên). Chú ý: **không được có khoảng trắng** trong `{}`.

### Q8: `\s` bao gồm những ký tự nào?

→ `[\r\t\f\n\v ]` — space, carriage return, tab, form feed, newline, vertical tab. Viết hoa `\S` là ngược lại (non-whitespace).

### Q9: Quantifier `+`, `*`, `?` tương đương với `{}` nào?

→ `+` = `{1,}`, `*` = `{0,}`, `?` = `{0,1}`. Đây là shorthand giúp viết ngắn gọn hơn.

### Q10: `?` có bao nhiêu vai trò trong regex?

→ **3 vai trò**: (1) `colou?r` — optional (0 hoặc 1 lần). (2) `*?`, `+?` — lazy quantifier. (3) `(?=...)`, `(?!...)` — lookahead. Phân biệt bằng **ngữ cảnh** nó xuất hiện.

### Q11: Lookahead là gì? Cho ví dụ thực tế.

→ Lookahead **kiểm tra** pattern phía trước mà **không consume** ký tự. Positive `(?=...)` yêu cầu pattern tồn tại, Negative `(?!...)` yêu cầu pattern không tồn tại. Ứng dụng: validate password phải có ≥6 ký tự VÀ 2 số liên tiếp → `/(?=\w{6})(?=\w*\d{2})/`.

### Q12: Capture Group `\1` khác gì `$1`?

→ `\1` dùng **trong regex** (backreference — tham chiếu pattern đã bắt). `$1` dùng **trong replacement string** của `.replace()`. Ví dụ: `/(\w+) \1/` match từ lặp, `.replace(/(\w+)/, '$1!')` thêm `!` sau từ.

### Q13: Cách trim whitespace bằng regex?

→ `/^\s+|\s+$/g` kết hợp `.replace()`: `str.replace(/^\s+|\s+$/g, '')`. Cần flag `g` để xóa **cả đầu lẫn cuối**. Trong thực tế dùng `.trim()`, nhưng regex giúp xử lý case phức tạp hơn (ví dụ: chỉ trim đầu, hoặc trim ký tự cụ thể).

### Q14: Khi nào nên dùng Grouping `()` thay vì Character Class `[]`?

→ `[]` khớp **một ký tự** trong tập. `()` nhóm **chuỗi ký tự** để áp dụng quantifier hoặc alternation. Ví dụ: `[abc]` → một ký tự a/b/c. `(abc)` → chuỗi "abc". `(cat|dog)` → "cat" hoặc "dog".
