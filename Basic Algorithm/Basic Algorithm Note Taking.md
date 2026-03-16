# Ghi chú chi tiết: Basic Algorithm Scripting (freeCodeCamp)

Tài liệu này là bản mở rộng để ôn nhanh 16 bài đầu tiên của phần Basic Algorithm.
Mỗi bài gồm: mục tiêu, ý tưởng cốt lõi, cách làm, lưu ý thường sai và độ phức tạp.

---

## 1) Convert Celsius to Fahrenheit

**Mục tiêu:** Đổi độ C sang độ F.

**Công thức:**

- `F = C * (9 / 5) + 32`

**Cách làm nhanh:**

- Nhận `celsius`.
- Tính và gán vào biến `fahrenheit`.

**Lỗi hay gặp:**

- Viết nhầm `5/9` (đây là công thức ngược F -> C).

**Độ phức tạp:** `O(1)`.

---

## 2) Reverse a String

**Mục tiêu:** Đảo ngược chuỗi.

**Ý tưởng cốt lõi:**

- Biến chuỗi thành mảng ký tự -> đảo mảng -> nối lại thành chuỗi.

**Các bước:**

1. `split('')`
2. `reverse()`
3. `join('')`

**Lỗi hay gặp:**

- Quên `join('')`, dẫn tới kết quả là mảng thay vì chuỗi.

**Độ phức tạp:** `O(n)`.

---

## 3) Factorialize a Number

**Mục tiêu:** Tính `n!` với `n >= 0`.

**Ý tưởng:**

- Nhân dồn từ 1 đến `n`.

**Edge case quan trọng:**

- `0! = 1`.

**2 cách phổ biến:**

- Vòng lặp `for`.
- Đệ quy (phải có điều kiện dừng).

**Độ phức tạp:** `O(n)`.

---

## 4) Find the Longest Word in a String

**Mục tiêu:** Trả về độ dài của từ dài nhất trong câu.

**Ý tưởng:**

- Tách câu thành các từ bằng `split(' ')`.
- Duyệt và giữ `maxLength`.

**Lỗi hay gặp:**

- Trả về từ dài nhất thay vì **độ dài**.

**Độ phức tạp:** `O(n)` (theo tổng số ký tự).

---

## 5) Return Largest Numbers in Arrays

**Mục tiêu:** Mỗi mảng con lấy 1 số lớn nhất, trả về mảng mới gồm các số lớn nhất đó.

**Ý tưởng:**

- Dùng `map()` trên mảng 2 chiều.
- Mỗi phần tử con dùng `Math.max(...subArr)`.

**Lỗi hay gặp:**

- Dùng `sort()` rồi lấy cuối mảng (không sai nhưng chậm hơn và có thể làm thay đổi dữ liệu nếu không clone).

**Độ phức tạp:** `O(total elements)`.

---

## 6) Confirm the Ending

**Mục tiêu:** Kiểm tra chuỗi `str` có kết thúc bằng `target` hay không (không dùng `endsWith`).

**Ý tưởng:**

- Cắt phần đuôi của `str` có độ dài bằng `target.length`.
- So sánh bằng `===`.

**Mẫu tư duy:**

- `str.slice(-target.length) === target`

**Độ phức tạp:** `O(m)` với `m = target.length`.

---

## 7) Repeat a String Repeat a String

**Mục tiêu:** Lặp chuỗi `str` đúng `num` lần, không dùng `repeat()`.

**Ý tưởng:**

- Nếu `num <= 0` trả về chuỗi rỗng.
- Dùng vòng lặp cộng dồn vào `result`.

**Lỗi hay gặp:**

- Không xử lý `num` âm.

**Độ phức tạp:** xấp xỉ `O(n * num)` theo chiều dài chuỗi.

---

## 8) Truncate a String

**Mục tiêu:** Nếu chuỗi dài hơn giới hạn `num`, cắt và thêm `...`.

**Ý tưởng:**

- Kiểm tra `str.length > num`.
- Nếu đúng: `str.slice(0, num) + '...'`.
- Nếu sai: trả về `str`.

**Lưu ý:**

- Bài này thường chỉ yêu cầu logic cắt cơ bản, không yêu cầu tối ưu hiển thị UI.

**Độ phức tạp:** `O(num)` khi cần cắt.

---

## 9) Finders Keepers

**Mục tiêu:** Tìm phần tử đầu tiên trong mảng thỏa hàm kiểm tra `func`.

**Ý tưởng:**

- Dùng `find(func)`.
- Nếu không có phần tử hợp lệ, JS tự trả `undefined`.

**Lỗi hay gặp:**

- Dùng `filter()` rồi lấy phần tử đầu; vẫn đúng nhưng tốn thêm bộ nhớ.

**Độ phức tạp:** tốt nhất `O(1)`, xấu nhất `O(n)`.

---

## 10) Boo Who

**Mục tiêu:** Kiểm tra giá trị có phải boolean primitive (`true`/`false`) hay không.

**Ý tưởng:**

- `typeof val === 'boolean'`.

**Lỗi hay gặp:**

- Nhầm với truthy/falsy (ví dụ `1`, `"hello"` là truthy nhưng **không** phải boolean).

**Độ phức tạp:** `O(1)`.

---

## 11) Title Case a Sentence

**Mục tiêu:** Viết hoa chữ cái đầu mỗi từ, phần còn lại viết thường.

**Ý tưởng:**

1. Chuyển cả câu về lowercase.
2. Tách từ bằng khoảng trắng.
3. Với từng từ: viết hoa ký tự đầu + nối phần còn lại.
4. Nối lại câu.

**Lỗi hay gặp:**

- Chỉ viết hoa ký tự đầu nhưng quên lower-case phần còn lại.

**Độ phức tạp:** `O(n)`.

---

## 12) Slice and Splice

**Mục tiêu:** Chèn phần tử của mảng 1 vào mảng 2 tại vị trí `n`, và không mutate input.

**Ý tưởng chuẩn:**

- Clone mảng 2 bằng `slice()`.
- Dùng `splice(n, 0, ...arr1)` để chèn.

**Lỗi hay gặp:**

- Chèn trực tiếp vào `arr2` làm thay đổi dữ liệu gốc (sai yêu cầu).

**Độ phức tạp:** `O(n + m)`.

---

## 13) Falsy Bouncer

**Mục tiêu:** Loại toàn bộ falsy values khỏi mảng.

**Falsy trong JS:**

- `false`, `null`, `0`, `""`, `undefined`, `NaN`.

**Ý tưởng gọn nhất:**

- `arr.filter(Boolean)`.

**Vì sao chạy đúng:**

- `Boolean(value)` ép mỗi phần tử về `true/false`; `filter` giữ lại những phần tử có kết quả `true`.

**Độ phức tạp:** `O(n)`.

---

## 14) Where do I Belong

**Mục tiêu:** Trả về index thấp nhất mà `num` nên được chèn vào sau khi mảng đã sort tăng dần.

**Ý tưởng an toàn (không mutate):**

- Tạo bản sao mảng: `const sorted = [...arr].sort((a, b) => a - b)`.
- Duyệt từ trái sang phải, gặp phần tử đầu tiên `>= num` thì trả index đó.
- Nếu không gặp, trả `sorted.length`.

**Lỗi hay gặp:**

- Dùng `sort()` trực tiếp trên `arr` làm đổi mảng gốc.

**Độ phức tạp:** `O(n log n)` do bước sort.

---

## 15) Mutations

**Mục tiêu:** Kiểm tra chuỗi thứ nhất có chứa đủ mọi ký tự của chuỗi thứ hai (không phân biệt hoa thường).

**Ý tưởng:**

- Lowercase cả 2 chuỗi.
- Duyệt từng ký tự của chuỗi thứ hai.
- Nếu ký tự nào không có trong chuỗi thứ nhất -> `false`; ngược lại hết vòng -> `true`.

**Lưu ý logic:**

- Bài này kiểm tra “ký tự xuất hiện”, không yêu cầu so số lần xuất hiện nâng cao.

**Độ phức tạp:** khoảng `O(a * b)` nếu dùng `includes` lặp.

---

## 16) Chunky Monkey

**Mục tiêu:** Chia mảng thành các mảng con có độ dài `size`.

**Ý tưởng:**

- Duyệt với bước nhảy `size`.
- Mỗi lần cắt `arr.slice(i, i + size)` và push vào kết quả.

**Ví dụ nhanh:**

- `([1,2,3,4,5], 2)` -> `[[1,2],[3,4],[5]]`.

**Độ phức tạp:** `O(n)`.

---

## Mẹo học nhanh phần Basic Algorithm

- Luôn đọc kỹ yêu cầu về mutate/non-mutate trước khi code.
- Ưu tiên lời giải rõ ràng trước, tối ưu sau.
- Viết test nhỏ cho edge case: chuỗi rỗng, mảng rỗng, số âm, `0`, `null`, `undefined`.
- Sau khi AC, thử viết lại bài theo cách khác (loop -> method, method -> recursion) để nhớ sâu.

---

## Bảng tóm tắt Methods thường dùng

### Array

- `map()`: biến đổi từng phần tử, trả mảng mới.
- `filter()`: lọc theo điều kiện, trả mảng mới.
- `find()`: trả phần tử đầu tiên thỏa điều kiện.
- `reduce()`: gom mảng thành một giá trị.
- `slice()`: cắt / clone mảng, không mutate.
- `splice()`: chèn/xóa trong mảng, có mutate.
- `reverse()`: đảo mảng, có mutate.

### String

- `split()`: tách chuỗi thành mảng.
- `join()`: nối mảng thành chuỗi.
- `slice()`: cắt chuỗi con.
- `toLowerCase()`, `toUpperCase()`: chuẩn hóa chữ hoa/thường.
- `includes()`, `indexOf()`: kiểm tra chuỗi con hoặc ký tự.

### Khác

- `Math.max(...arr)`: lấy giá trị lớn nhất.
- `...` (spread): clone nhanh mảng và truyền danh sách đối số.
