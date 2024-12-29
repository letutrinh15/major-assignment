const fs = require('fs');
const readline = require('readline');

// Lớp Xe dùng để lưu trữ thông tin xe
class Xe {
    constructor(benSo, thoiGian) {
        this.benSo = benSo; // Biển số xe
        this.thoiGian = thoiGian; // Thời gian xe vào bãi
    }
}

// Lớp BaiGuiXe quản lý các xe trong bãi
class BaiGuiXe {
    constructor() {
        this.danhSachXe = []; // Mảng lưu danh sách xe trong bãi
    }

    // Hàm đọc dữ liệu từ tệp JSON
    loadDataFromFile(filePath) {
        try {
            // Đọc dữ liệu từ tệp JSON
            const data = fs.readFileSync(filePath, 'utf8'); 
            const jsonData = JSON.parse(data); // Chuyển đổi dữ liệu từ JSON sang đối tượng JavaScript
            this.danhSachXe = jsonData.map(entry => new Xe(entry.plate, entry.time_in)); // Tạo đối tượng Xe từ dữ liệu JSON
            console.log('Dữ liệu đã được tải vào bãi.');
        } catch (err) {
            console.error('Không thể đọc tệp:', err.message); // In lỗi nếu không thể đọc tệp
        }
    }

    // Hàm list để in ra biển số xe
    list() {
        if (this.danhSachXe.length === 0) {
            console.log('Không có xe trong bãi.');
        } else {
            this.danhSachXe.forEach(xe => {
                console.log(xe.benSo); // Chỉ in ra biển số xe
            });
        }
    }

    // Hàm find để tìm xe theo biển số và trả về chỉ số của xe trong danh sách
    find(benSo) {
        const index = this.danhSachXe.findIndex(xe => xe.benSo === benSo); // Tìm chỉ số của xe theo biển số
        return index === -1 ? -1 : index + 1; // Trả về chỉ số (tính từ 1), nếu không tìm thấy trả về -1
    }
}

// Tạo một đối tượng quản lý bãi xe
const baiGuiXe = new BaiGuiXe();

// Đọc dữ liệu từ tệp data.json
baiGuiXe.loadDataFromFile('./data.json');

// Tạo một giao diện nhập lệnh từ người dùng
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Hàm xử lý các lệnh
function handleCommand(command) {
    const parts = command.split(' ');
    const action = parts[0]; // Lấy hành động (ví dụ: find, list)

    if (action === 'list') {
        baiGuiXe.list(); // In danh sách xe
    } else if (action === 'find') {
        const benSo = parts.slice(1).join(' '); // Các phần còn lại là biển số
        const result = baiGuiXe.find(benSo); // Tìm xe theo biển số
        if (result === -1) {
            console.log(-1); // Trả về -1 nếu không tìm thấy
        } else {
            console.log(result); // Trả về chỉ số nếu tìm thấy
        }
    } else {
        console.log('Lệnh không hợp lệ');
    }
}

// Yêu cầu người dùng nhập lệnh
function promptCommand() {
    rl.question('Nhập lệnh: ', (command) => {
        handleCommand(command); // Xử lý lệnh
        promptCommand(); // Tiếp tục yêu cầu nhập lệnh
    });
}

// Bắt đầu nhập lệnh
promptCommand();
