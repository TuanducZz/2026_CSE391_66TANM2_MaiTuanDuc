// Tạo sẵn một mảng danh sách sinh viên mẫu
let students = [
    { name: "Nguyễn Văn An", score: 8.5 },
    { name: "Lê Thị Bình", score: 6.0 },
    { name: "Trần Văn Cường", score: 4.5 },
    { name: "Phạm Thu Dung", score: 9.0 }
];

let sortDirection = 'none'; // Biến lưu trạng thái sắp xếp ('asc', 'desc', 'none')

let studentBody = document.getElementById('studentBody');
let searchInput = document.getElementById('searchInput');
let rankFilter = document.getElementById('rankFilter');
let scoreHeader = document.getElementById('scoreHeader');

// Hàm tính xếp loại
function getRank(score) {
    if (score >= 8.5) return 'Giỏi';
    if (score >= 7.0) return 'Khá';
    if (score >= 5.0) return 'Trung bình';
    return 'Yếu';
}

// 1. Hàm hiển thị dữ liệu ra bảng (nhận vào một mảng bất kỳ)
function renderTable(dataArray) {
    studentBody.innerHTML = ''; // Xóa bảng cũ

    if (dataArray.length === 0) {
        studentBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Không tìm thấy sinh viên nào</td></tr>';
        return;
    }

    for (let i = 0; i < dataArray.length; i++) {
        let student = dataArray[i];
        let tr = document.createElement('tr');
        
        if (student.score < 5.0) {
            tr.classList.add('bg-yellow');
        }

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${getRank(student.score)}</td>
        `;
        studentBody.appendChild(tr);
    }
}

// 2. Hàm lọc và sắp xếp (Hàm quan trọng nhất)
function applyFilters() {
    // Lấy giá trị ô tìm kiếm (chuyển hết về chữ thường để dễ so sánh)
    let keyword = searchInput.value.toLowerCase();
    let selectedRank = rankFilter.value;

    // Tạo một mảng rỗng để chứa kết quả thỏa mãn điều kiện
    let filteredStudents = [];

    // BƯỚC A: Lọc dữ liệu bằng vòng lặp for
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        
        // Kiểm tra xem tên có chứa từ khóa không
        let matchName = student.name.toLowerCase().includes(keyword);
        
        // Kiểm tra xem xếp loại có khớp với ô Select không
        let matchRank = false;
        if (selectedRank === 'all' || getRank(student.score) === selectedRank) {
            matchRank = true;
        }

        // Nếu thỏa mãn cả 2 điều kiện thì nhét vào mảng kết quả
        if (matchName === true && matchRank === true) {
            filteredStudents.push(student);
        }
    }

    // BƯỚC B: Sắp xếp dữ liệu (Hàm sort mặc định của JS)
    if (sortDirection === 'asc') {
        filteredStudents.sort(function(a, b) { return a.score - b.score; }); // Tăng dần
        scoreHeader.textContent = "Điểm ▲";
    } else if (sortDirection === 'desc') {
        filteredStudents.sort(function(a, b) { return b.score - a.score; }); // Giảm dần
        scoreHeader.textContent = "Điểm ▼";
    } else {
        scoreHeader.textContent = "Điểm ↕ (Bấm để sắp xếp)";
    }

    // Vẽ lại bảng với mảng đã được lọc và sắp xếp
    renderTable(filteredStudents);
}

// 3. Lắng nghe các sự kiện tương tác của người dùng
searchInput.addEventListener('input', applyFilters);  // Khi gõ phím
rankFilter.addEventListener('change', applyFilters);  // Khi đổi option

scoreHeader.addEventListener('click', function() {    // Khi bấm vào cột Điểm
    if (sortDirection === 'none' || sortDirection === 'desc') {
        sortDirection = 'asc';
    } else {
        sortDirection = 'desc';
    }
    applyFilters(); // Đổi hướng xong thì gọi lại hàm lọc để cập nhật giao diện
});

// 4. Chạy hàm lần đầu tiên khi vừa mở trang web lên
applyFilters();