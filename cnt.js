const fs = require('fs');

class ParkingLot {
    constructor() {
        this.vehicles = [];
    }

    loadDataFromFile(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(`Không tìm thấy file: ${filePath}`);
            return;
        }
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            this.vehicles = JSON.parse(data).map(entry => ({
                plate: entry.plate,
                time_in: entry.time_in
            }));
            console.log('Dữ liệu đã được tải vào bãi.');
        } catch (error) {
            console.error('Lỗi đọc file JSON:', error.message);
        }
    }

    countBicycles() {
        const count = this.vehicles.filter(vehicle => vehicle.plate.startsWith('xxxx-')).length;
        console.log(`Tổng số xe đạp trong bãi: ${count}`);
    }

    countMotorcycles() {
        const count = this.vehicles.filter(vehicle => !vehicle.plate.startsWith('xxxx-')).length;
        console.log(`Tổng số xe máy trong bãi: ${count}`);
    }
}

// Đọc các tham số từ dòng lệnh và thực thi
const action = process.argv[2];  // Tham số thứ 1 (lệnh: cnt-xedap hoặc cnt-moto)
const DATA_FILE = 'data.json';  // Đường dẫn đến file dữ liệu

const parkingLot = new ParkingLot();
parkingLot.loadDataFromFile(DATA_FILE);

switch (action) {
    case 'cnt-xedap':
        parkingLot.countBicycles();
        break;
    case 'cnt-moto':
        parkingLot.countMotorcycles();
        break;
    default:
        console.log('Lệnh không hợp lệ. Vui lòng sử dụng: cnt-xedap hoặc cnt-moto');
}
