// --- 1. LẤY CÁC PHẦN TỬ HTML ---
let form = document.getElementById('orderForm');
let productSelect = document.getElementById('product');
let qtyInput = document.getElementById('qty');
let totalPriceText = document.getElementById('totalPrice');
let deliveryDate = document.getElementById('deliveryDate');
let notes = document.getElementById('notes');
let charCount = document.getElementById('charCount');
let confirmBox = document.getElementById('confirmBox');

// Danh sách giá tiền tương ứng với các value trong thẻ <select>
let prices = {
    "ao": 150000,
    "quan": 200000
};

// --- 2. HÀM TÍNH TỔNG TIỀN TỰ ĐỘNG ---
function calculateTotal() {
    let productValue = productSelect.value;
    let qtyValue = parseInt(qtyInput.value);

    // Nếu có chọn sản phẩm và số lượng hợp lệ (từ 1 đến 99)
    if (productValue !== "" && qtyValue >= 1 && qtyValue <= 99) {
        let price = prices[productValue]; // Lấy giá từ object ở trên
        let total = price * qtyValue;     // Nhân với số lượng
        
        // toLocaleString("vi-VN") để nó hiện dấu phẩy cho đẹp (VD: 300,000)
        totalPriceText.textContent = total.toLocaleString("vi-VN") + " VNĐ";
    } else {
        totalPriceText.textContent = "0 VNĐ";
    }
}

// Bắt sự kiện: Cứ thay đổi sản phẩm hoặc số lượng là tính lại tiền
productSelect.addEventListener('change', calculateTotal);
qtyInput.addEventListener('input', calculateTotal);


// --- 3. HÀM ĐẾM KÝ TỰ (REAL-TIME) ---
notes.addEventListener('input', function() {
    let currentLength = notes.value.length; // Độ dài đoạn chữ vừa nhập
    charCount.textContent = currentLength + "/200";

    // Nếu vượt quá 200 chữ thì đổi màu đỏ
    if (currentLength > 200) {
        charCount.classList.add('text-red');
    } else {
        charCount.classList.remove('text-red');
    }
});


// --- 4. HÀM KIỂM TRA NGÀY GIAO HÀNG ---
function validateDate() {
    let dateErr = document.getElementById('dateErr');
    let selectedDateStr = deliveryDate.value;

    // Nếu chưa chọn ngày
    if (selectedDateStr === "") {
        dateErr.style.display = 'block';
        return false;
    }

    // Chuyển ngày người dùng chọn và ngày hôm nay thành dạng số (milliseconds) để so sánh
    let selectedTime = new Date(selectedDateStr).getTime();
    
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Reset giờ phút giây về 0 để đỡ bị lỗi so sánh lắt nhắt
    let todayTime = today.getTime();

    // Tính thời gian của 30 ngày sau (30 ngày * 24h * 60ph * 60s * 1000ms)
    let thirtyDaysLater = todayTime + (30 * 24 * 60 * 60 * 1000);

    // Nếu ngày chọn nhỏ hơn hôm nay (quá khứ) HOẶC lớn hơn 30 ngày sau
    if (selectedTime < todayTime || selectedTime > thirtyDaysLater) {
        dateErr.style.display = 'block';
        deliveryDate.classList.add('input-error');
        return false;
    } else {
        dateErr.style.display = 'none';
        deliveryDate.classList.remove('input-error');
        return true;
    }
}


// --- 5. XỬ LÝ KHI BẤM NÚT "TIẾN HÀNH ĐẶT HÀNG" ---
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Chặn load lại trang

    // Kiểm tra Sản phẩm
    let isProductOk = false;
    if (productSelect.value !== "") {
        isProductOk = true;
        document.getElementById('productErr').style.display = 'none';
    } else {
        document.getElementById('productErr').style.display = 'block';
    }

    // Kiểm tra Số lượng
    let isQtyOk = false;
    let qtyValue = parseInt(qtyInput.value);
    if (qtyValue >= 1 && qtyValue <= 99) {
        isQtyOk = true;
        document.getElementById('qtyErr').style.display = 'none';
    } else {
        document.getElementById('qtyErr').style.display = 'block';
    }

    // Kiểm tra Ngày giao và Ghi chú
    let isDateOk = validateDate();
    let isNotesOk = (notes.value.length <= 200); // Trả về true nếu <= 200

    // NẾU TẤT CẢ ĐỀU ĐÚNG
    if (isProductOk && isQtyOk && isDateOk && isNotesOk) {
        // Lấy tên sản phẩm đang được chọn
        let productName = productSelect.options[productSelect.selectedIndex].text;
        
        // Viết tóm tắt đơn hàng
        document.getElementById('summaryText').innerHTML = 
            "Sản phẩm: <b>" + productName + "</b><br>" +
            "Số lượng: <b>" + qtyInput.value + "</b><br>" +
            "Tổng tiền: <b>" + totalPriceText.textContent + "</b><br>" +
            "Ngày giao: <b>" + deliveryDate.value + "</b>";

        // Ẩn form đi, hiện hộp xác nhận lên
        form.style.display = 'none';
        confirmBox.style.display = 'block';
    }
});


// --- 6. XỬ LÝ 2 NÚT BÊN TRONG HỘP XÁC NHẬN ---
let btnCancel = document.getElementById('btnCancel');
let btnConfirm = document.getElementById('btnConfirm');

// Bấm Hủy -> Quay lại form
btnCancel.addEventListener('click', function() {
    confirmBox.style.display = 'none';
    form.style.display = 'block';
});

// Bấm Xác nhận -> Báo thành công và reset trang
btnConfirm.addEventListener('click', function() {
    alert("Tuyệt vời! Đơn hàng đã được đặt thành công.");
    // location.reload() là lệnh load lại trang web từ đầu
    location.reload(); 
});