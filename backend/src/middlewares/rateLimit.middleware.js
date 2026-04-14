const requests = {};

const RATE_LIMIT = 100; // requests
const WINDOW = 60 * 1000; // 1 minute

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requests[ip]) {
        requests[ip] = [];
    }

    requests[ip] = requests[ip].filter((t) => now - t < WINDOW);

    if (requests[ip].length >= RATE_LIMIT) {
        return res.status(429).json({
            message: "Too many requests",
        });
    }

    requests[ip].push(now);
    next();
};

module.exports = rateLimiter;