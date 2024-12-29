const fs = require('fs');

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
}

// Tạo một đối tượng quản lý bãi xe
const baiGuiXe = new BaiGuiXe(); 

// Đọc dữ liệu từ tệp data.json
baiGuiXe.loadDataFromFile('./data.json'); 

// In danh sách xe trong bãi
baiGuiXe.list();
