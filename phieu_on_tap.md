# PHIẾU ÔN TẬP -- KIỂM TRA KIẾN THỨC CẦN ĐẠT

## Chương 5: Những kiến thức nền tảng về JavaScript (5.1 → 5.4)

**Họ và tên:** Mai Tuấn Đức\
**Mã sinh viên:** 2451271091\
**Lớp:** 66ANM2\
**Thời gian làm:** \_\_\_\_ phút\
**Hình thức:** Cá nhân

------------------------------------------------------------------------

# B. PHẦN 5.1 -- GIỚI THIỆU VỀ JAVASCRIPT

### 1) JavaScript là gì?

JavaScript là một ngôn ngữ lập trình dùng để tạo các chức năng tương tác
và xử lý logic trên trang web. Nó thường chạy trong trình duyệt và làm
cho trang web trở nên động.

### 2) JavaScript có thể chạy ở đâu?

-   Trong trình duyệt web (Chrome, Firefox, Edge...)\
-   Trong môi trường server như Node.js

### 3) Vai trò HTML -- CSS -- JavaScript

-   **HTML:** tạo cấu trúc nội dung của trang web.\
-   **CSS:** dùng để định dạng và tạo giao diện (màu sắc, bố cục).\
-   **JavaScript:** xử lý logic và tương tác của trang web.

### Đúng/Sai

-   JavaScript chỉ chạy được trong trình duyệt → **Sai**\
-   JavaScript dùng để xử lý tương tác trang web → **Đúng**

------------------------------------------------------------------------

# C. PHẦN 5.2 -- CÚ PHÁP JAVASCRIPT & KIỂU DỮ LIỆU

### Khai báo biến

-   `let` có phạm vi **block**\
-   `var` có phạm vi **function**\
-   `const` **không cho phép gán lại biến**

### Ví dụ

``` js
const arr = [1,2,3];
arr.push(4); // chạy được
arr = [5,6]; // lỗi
```

### Kiểu dữ liệu

-   Number\
-   String\
-   Boolean\
-   Null\
-   Undefined\
-   Object

### typeof

``` js
typeof 10        // "number"
typeof "10"      // "string"
typeof true      // "boolean"
typeof null      // "object"
typeof {a:1}     // "object"
```

### Toán tử

``` js
"5" + 1  // "51"
"5" - 1  // 4
```

### So sánh

-   `==` so sánh giá trị (có ép kiểu)\
-   `===` so sánh cả giá trị và kiểu dữ liệu

------------------------------------------------------------------------

# D. PHẦN 5.3 -- ĐIỀU KHIỂN & HÀM

### if / else

``` js
let score = 6;

if (score >= 5) {
  console.log("Pass");
} else {
  console.log("Fail");
}
```

### Vòng lặp for

``` js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### Vòng lặp while

``` js
let n = 5;
let i = 1;
let sum = 0;

while (i <= n) {
  sum += i;
  i++;
}

console.log(sum);
```

### Hàm sum

``` js
function sum(a, b) {
  return a + b;
}
```

### Parameter vs Argument

-   **Parameter:** biến trong định nghĩa hàm\
-   **Argument:** giá trị truyền vào khi gọi hàm

``` js
function sum(a,b) {}
sum(2,3);
```

### Hàm kiểm tra số chẵn

``` js
function isEven(n) {
  return n % 2 === 0;
}
```

------------------------------------------------------------------------

# E. PHẦN 5.4 -- OOP TRONG JAVASCRIPT

### Object

``` js
const student = {
  name: "Duc",
  id: "2451271091",
  gpa: 3.5,

  introduce() {
    console.log("Hello, my name is " + this.name);
  }
};
```

### Truy cập thuộc tính

``` js
student.name
student["name"]
```

### Class

``` js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hello, I'm " + this.name);
  }
}

const p1 = new Person("Linh", 20);
p1.greet();
```

**Constructor:** dùng để khởi tạo giá trị ban đầu cho object khi tạo
instance.

### Prototype

Prototype là cơ chế cho phép object kế thừa thuộc tính và phương thức từ
object khác.

``` js
const personPrototype = {
  greet() { console.log("hello!"); }
};

const carl = Object.create(personPrototype);
carl.greet();
```

`Object.create(personPrototype)` tạo object mới và gán prototype cho nó.

------------------------------------------------------------------------

# F. TỰ ĐÁNH GIÁ

-   5.1 Giới thiệu JS: **Khá rõ**\
-   5.2 Cú pháp & kiểu DL: **Khá rõ**\
-   5.3 Điều khiển & hàm: **Khá rõ**\
-   5.4 OOP JS: **Tạm ổn**

### Điều muốn hỏi thêm

1.  Khác nhau giữa var, let, const trong thực tế\
2.  Prototype hoạt động chi tiết thế nào\
3.  Khi nào nên dùng class trong JavaScript
