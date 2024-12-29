class ParkingLot {
    constructor() {
        this.vehicles = new Map();
    }

    isValidTime(time) {
        const regex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        return regex.test(time);
    }

    in(time, plate) {
        if (!this.isValidTime(time)) {
            console.error(`Invalid time format: ${time}`);
            return 0;
        }

        if (this.vehicles.has(plate)) {
            console.warn(`Vehicle with plate ${plate} is already in the parking lot.`);
            return 0;
        }
        this.vehicles.set(plate, time);
        console.log(`Vehicle with plate ${plate} entered at ${time}`);
        return 1;
    }

    out(time, plate) {
        if (!this.isValidTime(time)) {
            console.error(`Invalid time format: ${time}`);
            return 0;
        }

        if (!this.vehicles.has(plate)) {
            console.warn(`Vehicle with plate ${plate} is not found in the parking lot.`);
            return 0;
        }
        this.vehicles.delete(plate);
        console.log(`Vehicle with plate ${plate} left at ${time}`);
        return 1;
    }

    list() {
        return Array.from(this.vehicles.entries()).map(
            ([plate, time]) => ({ plate, time })
        );
    }
}

const parkingLot = new ParkingLot();

console.log(parkingLot.in("10:00:02", "31K1-123.45")); 
console.log(parkingLot.in("11:30:24", "xxxx-000.01"));
console.log(parkingLot.in("10:00:02", "31K1-123.45")); 

console.log(parkingLot.list());

console.log(parkingLot.out("12:00:00", "31K1-123.45"));
console.log(parkingLot.out("13:00:00", "31K1-123.45"));

const vehicles2 = new ParkingLot();
console.log(vehicles2.in("10:00:02", "31K1-123.45"));
console.log(vehicles2.in("11:00:00", "31K1-123.45")); 
console.log(vehicles2.out("12:00:00", "31K1-123.45"));
console.log(vehicles2.out("13:00:00", "31K1-123.45"));
