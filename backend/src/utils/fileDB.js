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

//helper for last points saving json

const findAndUpdate = (file, key, value, newData) => {
    const data = readData(file);

    const index = data.findIndex((item) => item[key] === value);

    if (index !== -1) {
        data[index] = { ...data[index], ...newData };
    } else {
        data.push({ [key]: value, ...newData });
    }

    writeData(file, data);
    return data;
};

module.exports = { readData, writeData, findAndUpdate };

// module.exports = { readData, writeData };