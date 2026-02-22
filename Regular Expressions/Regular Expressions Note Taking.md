# Regular Expressions — Tổng hợp kiến thức & Interview Notes

> Phần tổng hợp từ 21 bài học **Regular Expressions** của freeCodeCamp.  
> Hệ thống hóa: Key Takeaway, Code mẫu, Lỗi thường gặp & Câu hỏi phỏng vấn.

---

## Mục lục

| #     | Chủ đề                                                                    | Nhóm             |
| ----- | ------------------------------------------------------------------------- | ---------------- |
| 1-2   | [Phương thức cơ bản: test() & match()](#1-phương-thức-cơ-bản-test--match) | Cơ bản           |
| 3-4   | [Flags: i, g](#2-flags---cờ-regex)                                        | Cơ bản           |
| 5     | [Alternation (OR)](#3-alternation--toán-tử-or)                            | Pattern matching |
| 6     | [Wildcard Period (.)](#4-wildcard-period--dấu-chấm)                       | Pattern matching |
| 7-10  | [Character Classes & Ranges](#5-character-classes--ranges)                | Pattern matching |
| 11    | [Negated Character Sets](#6-negated-character-sets--tập-ký-tự-phủ-định)   | Pattern matching |
| 12-13 | [Quantifiers: + và \*](#7-quantifiers--bộ-định-lượng)                     | Quantifiers      |
| 14    | [Greedy vs Lazy Matching](#8-greedy-vs-lazy-matching)                     | Quantifiers      |
| 15    | [Thực hành: Find Criminals](#9-thực-hành-find-criminals)                  | Thực hành        |
| 16-17 | [Anchors: ^ và $](#10-anchors--neo-vị-trí)                                | Position         |
| 18-21 | [Shorthand Character Classes](#11-shorthand-character-classes)            | Shorthand        |

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

## 12. Bảng tổng hợp nhanh — Regex Cheat Sheet

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

| Cú pháp | Ý nghĩa          | Ví dụ                 |
| ------- | ---------------- | --------------------- |
| `+`     | 1 hoặc nhiều lần | `/a+/` → "a","aaa"    |
| `*`     | 0 hoặc nhiều lần | `/a*/` → "","a","aaa" |
| `?`     | Lazy modifier    | `/*?/`, `/+?/`        |

### Anchors

| Cú pháp | Ý nghĩa    | Ví dụ      |
| ------- | ---------- | ---------- |
| `^`     | Đầu chuỗi  | `/^Hello/` |
| `$`     | Cuối chuỗi | `/world$/` |

### Flags

| Flag | Ý nghĩa             |
| ---- | ------------------- |
| `i`  | Case-insensitive    |
| `g`  | Global (tìm tất cả) |
| `m`  | Multiline           |

### Methods

| Method       | Cú pháp                    | Trả về           |
| ------------ | -------------------------- | ---------------- |
| `.test()`    | `regex.test(string)`       | `true` / `false` |
| `.match()`   | `string.match(regex)`      | `array` / `null` |
| `.replace()` | `string.replace(regex, x)` | `string` mới     |

---

## 13. Câu hỏi phỏng vấn thường gặp

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

→ `/^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i` — Đây là bài Restrict Possible Usernames, kết hợp anchors, character classes, và quantifiers.
