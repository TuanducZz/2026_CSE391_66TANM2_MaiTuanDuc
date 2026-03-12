// Lấy các phần tử form
let form = document.getElementById('regForm');
let fullname = document.getElementById('fullname');
let email = document.getElementById('email');

// Lấy các thẻ span dùng để báo lỗi
let nameErr = document.getElementById('nameErr');
let emailErr = document.getElementById('emailErr');

// Hàm tiện ích: Hiện lỗi (Tái sử dụng cho đỡ phải viết đi viết lại)
function showError(inputElement, errorSpan) {
    errorSpan.style.display = 'block';     // Hiện chữ đỏ
    inputElement.classList.add('input-error'); // Tô viền đỏ ô input
}

// Hàm tiện ích: Xóa lỗi
function clearError(inputElement, errorSpan) {
    errorSpan.style.display = 'none';         // Giấu chữ đỏ
    inputElement.classList.remove('input-error'); // Bỏ viền đỏ
}

// 1. Hàm kiểm tra Tên
function validateName() {
    let text = fullname.value.trim(); // Cắt khoảng trắng 2 đầu
    let regex = /^[a-zA-ZÀ-ỹ\s]+$/;   // Biểu thức kiểm tra chỉ có chữ cái

    if (text.length < 3 || regex.test(text) === false) {
        showError(fullname, nameErr);
        return false; // Sai thì trả về false
    } else {
        clearError(fullname, nameErr);
        return true;  // Đúng thì trả về true
    }
}

// 2. Hàm kiểm tra Email
function validateEmail() {
    let text = email.value.trim();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(text) === false) {
        showError(email, emailErr);
        return false;
    } else {
        clearError(email, emailErr);
        return true;
    }
}

// --- GẮN SỰ KIỆN ---

// Sự kiện 'blur': Xảy ra khi con trỏ chuột bấm ra khỏi ô nhập liệu
fullname.addEventListener('blur', validateName);
email.addEventListener('blur', validateEmail);

// Sự kiện 'input': Xảy ra mỗi khi gõ một phím bất kỳ (Dùng để xóa lỗi ngay lập tức)
fullname.addEventListener('input', function() {
    clearError(fullname, nameErr);
});
email.addEventListener('input', function() {
    clearError(email, emailErr);
});

// Sự kiện 'submit': Xảy ra khi bấm nút "Đăng ký"
form.addEventListener('submit', function(event) {
    // event.preventDefault() bắt buộc phải có để trang không bị load lại
    event.preventDefault();

    // Chạy các hàm kiểm tra
    let isNameOk = validateName();
    let isEmailOk = validateEmail();

    // Nếu tất cả đều đúng
    if (isNameOk === true && isEmailOk === true) {
        form.style.display = 'none'; // Giấu nguyên cái form đi
        document.getElementById('successMsg').style.display = 'block'; // Trưng cái bảng thành công lên
    }
});