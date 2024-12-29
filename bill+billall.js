class ParkingLot {
    constructor() {
        this.motorbikes = [];
        this.motocount = 0;  // đếm xe máy
        this.bikecount = 0; // đếm xe đạp
    }


    // in danh sách xe trong bãi
    list() {
        return this.motorbikes.map(moto => moto.plate);
    }


    // tìm xe sử dụng biển số
    find(plate) {
        return this.motorbikes.some(moto => moto.plate === plate) ? 1 : -1;
    }


    // cho xe vào bãi
    in(time, plate) {
        if (this.find(plate) === 1) {
            return 0; //
        }
        this.motorbikes.push({ time, plate });
       
        // cập nhật đếm xe
        if (/^xxxx-\d{3}\.\d{2}$/.test(plate)) {
            this.bikecount++; // xe đạp
        } else if (/^[A-Z0-9]{4}-\d{3}\.\d{2}$/.test(plate)) {
            this.motocount++;   // xe máy
        }
       
        return 1; // thành công cho xe vào bãi
    }


    // cho xe ra khỏi bãi
    out(time, plate) {
        const index = this.motorbikes.findIndex(moto => moto.plate === plate);
        if (index === -1) {
            return 0; // xe không ở trong bãi
        }
       
        // lại cập nhật đếm xe
        const remove = this.motorbikes[index].plate;
        this.motorbikes.splice(index, 1);
       
        if (/^xxxx-\d{3}\.\d{2}$/.test(remove)) {
            this.bikecount--; // xe đạp
        } else if (/^[A-Z0-9]{4}-\d{3}\.\d{2}$/.test(remove)) {
            this.motocount--;   // xe đạp
        }
       
        return 1; // thành công
    }


    cntMoto() {
        return this.motocount;
    }


    cntbike() {
        return this.bikecount;
    }
}
const parkingLot = new ParkingLot();
// đặt input
function processInput(input) {
    const commands = input.trim().split('\n');
    for (const command of commands) {
        const parts = command.trim().split(' ');
       
        if (parts.length === 0) continue;
       
        if (parts.length === 2 && !isNaN(Date.parse(`1970-01-01T${parts[0]}`))) {
            parkingLot.in(parts[0], parts[1]);
            continue;
        }


        if (parts[0] === 'list') {
            const listResult = parkingLot.list();
            console.log(listResult.join('\n'));
        } else if (parts[0] === 'find') {
            const result = parkingLot.find(parts[1]);
            console.log(result);
        } else if (parts[0] === 'in') {
            const result = parkingLot.in(parts[1], parts[2]);
            console.log(result);
        } else if (parts[0] === 'out') {
            const result = parkingLot.out(parts[1], parts[2]);
            console.log(result);
        } else if (parts[0] === 'cnt-moto') {
            const count = parkingLot.cntMoto();
            console.log(count);
        } else if (parts[0] === 'cnt-bike') {
            const count = parkingLot.cntbike();
            console.log(count);
        }
    }
}


const inputCase = `
//insert case ở đây nhé
04:30:24 31K1-123.45
11:30:24 xxxx-000.01
*
list
in 11:32:00 29C1-324.32
list
cnt-moto
find xxxx-000.03
find 31K1-123.45
`;


processInput(inputCase);



