const { readData, writeData } = require("../utils/fileDB");

const logCapture = (geohash, fromUser, toUser) => {
    const captures = readData("captures.json");

    captures.push({
        geohash,
        from: fromUser || null,
        to: toUser,
        timestamp: new Date(),
    });

    writeData("captures.json", captures);
};

module.exports = { logCapture };