const fs = require("fs");

function randomPlate(isBicycle) {
  if (isBicycle) {
    const ticketNumber = Math.floor(Math.random() * 900 + 100); // Số vé từ 100 đến 999
    return `xxxx-000.${ticketNumber}`;
  } else {
    return `${Math.floor(Math.random() * 90 + 10)}${["X", "H", "K", "B", "P"][Math.floor(Math.random() * 5)]}1-${Math.floor(Math.random() * 900 + 100)}.${Math.floor(Math.random() * 90 + 10)}`;
  }
}

function randomTime() {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function generateData(numEntries) {
  const data = [];
  for (let i = 0; i < numEntries; i++) {
    const isBicycle = Math.random() > 0.5;
    const plate = randomPlate(isBicycle);
    const timeIn = randomTime();
    data.push({
      plate,
      time_in: timeIn
    });
  }
  return data;
}

const numEntries = 20;
const data = generateData(numEntries);

fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error("Lỗi khi ghi tệp JSON:", err);
  } else {
    console.log(`Dữ liệu đã được ghi vào tệp data.json với ${numEntries} bản ghi.`);
  }
});
