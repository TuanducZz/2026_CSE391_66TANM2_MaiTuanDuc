// Tạo một mảng rỗng để lưu danh sách sinh viên
let students = [];

// Lấy các phần tử từ HTML sang JS để thao tác
let nameInput = document.getElementById('nameInput');
let scoreInput = document.getElementById('scoreInput');
let addBtn = document.getElementById('addBtn');
let studentBody = document.getElementById('studentBody');
let totalCount = document.getElementById('totalCount');
let avgScore = document.getElementById('avgScore');

// 1. Hàm tính xếp loại
function getRank(score) {
    if (score >= 8.5) {
        return 'Giỏi';
    } else if (score >= 7.0) {
        return 'Khá';
    } else if (score >= 5.0) {
        return 'Trung bình';
    } else {
        return 'Yếu';
    }
}

// 2. Hàm vẽ lại bảng (hiển thị dữ liệu từ mảng ra màn hình)
function renderTable() {
    // Xóa trắng bảng cũ trước khi vẽ lại
    studentBody.innerHTML = ''; 
    let totalScore = 0;

    // Duyệt qua từng sinh viên trong mảng
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        totalScore = totalScore + student.score; // Cộng dồn điểm để tính trung bình

        // Tạo một thẻ <tr> (hàng)
        let tr = document.createElement('tr');
        
        // Nếu điểm dưới 5 thì thêm class tô nền vàng
        if (student.score < 5.0) {
            tr.classList.add('bg-yellow');
        }

        // Tạo nội dung HTML cho hàng đó
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${getRank(student.score)}</td>
            <td><button class="btn-delete" onclick="deleteStudent(${i})">Xóa</button></td>
        `;
        
        // Nhét hàng vừa tạo vào trong bảng
        studentBody.appendChild(tr);
    }

    // Cập nhật phần thống kê bên dưới
    totalCount.textContent = students.length;
    
    if (students.length > 0) {
        let avg = totalScore / students.length;
        avgScore.textContent = avg.toFixed(1); // Làm tròn 1 chữ số thập phân
    } else {
        avgScore.textContent = "0.0";
    }
}

// 3. Hàm xử lý khi bấm nút "Thêm sinh viên"
function addStudent() {
    let nameValue = nameInput.value;
    let scoreValue = parseFloat(scoreInput.value); // Ép kiểu chữ sang số thực

    // Kiểm tra dữ liệu đầu vào (Validation cơ bản)
    if (nameValue === '') {
        alert('Vui lòng nhập họ tên!');
        return; // Dừng hàm lại, không chạy tiếp
    }
    
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 10) {
        alert('Điểm không hợp lệ! Vui lòng nhập số từ 0 đến 10.');
        return;
    }

    // Tạo một object sinh viên mới và nhét vào mảng
    let newStudent = {
        name: nameValue,
        score: scoreValue
    };
    students.push(newStudent);

    // Xóa trắng ô nhập liệu để nhập người tiếp theo
    nameInput.value = '';
    scoreInput.value = '';
    
    // Gọi hàm vẽ lại bảng
    renderTable();
}

// 4. Hàm xóa sinh viên (được gọi khi bấm nút Xóa ở từng hàng)
function deleteStudent(index) {
    // Hàm splice dùng để xóa phần tử trong mảng tại vị trí 'index'
    students.splice(index, 1);
    
    // Xóa xong thì phải vẽ lại bảng để cập nhật giao diện
    renderTable();
}

// 5. Gắn sự kiện click cho nút "Thêm"
addBtn.addEventListener('click', addStudent);

// (Nâng cao chút) Cho phép ấn phím Enter ở ô Điểm để thêm luôn
scoreInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addStudent();
    }
});