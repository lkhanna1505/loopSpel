const fs = require("fs");
const path = require("path");

const getFilePath = (file) =>
    path.join(__dirname, "../../data", file);

// Read JSON
const readData = (file) => {
    const data = fs.readFileSync(getFilePath(file), "utf-8");
    return JSON.parse(data || "[]");
};

// Write JSON
const writeData = (file, data) => {
    fs.writeFileSync(getFilePath(file), JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };