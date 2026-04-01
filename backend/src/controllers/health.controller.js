const healthCheck = (req, res) => {
    const banner = [
        "================================",
        "   🟢 SERVER STATUS: ACTIVE     ",
        "================================"
    ];

    res.status(200).json({
        status: "OK",
        banner: banner, // Sending as an array looks very clean in JSON
        timestamp: new Date().toLocaleString(),
    });
};

module.exports = { healthCheck };