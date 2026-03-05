// =========================
// LẤY PHẦN TỬ DOM
// =========================

const statusEl = document.getElementById("status");
const btnHello = document.getElementById("btnHello");


// =========================
// NÚT CHÀO
// =========================

btnHello.addEventListener("click", function () {

  statusEl.textContent = "Xin chào! Đây là nội dung được thay đổi bằng JavaScript.";

});


// =========================
// NÚT ĐỔI MÀU NỀN
// =========================

const btnRed = document.getElementById("btnRed");

btnRed.addEventListener("click", function () {

  document.body.style.backgroundColor = "red";

});


// =========================
// INPUT TÊN
// =========================

const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");


nameInput.addEventListener("input", function () {

  const value = nameInput.value;

  greeting.textContent = "Xin chào, " + value + "!";

});