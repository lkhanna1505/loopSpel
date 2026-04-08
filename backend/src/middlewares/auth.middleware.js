// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/env");

// const protect = (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             token = req.headers.authorization.split(" ")[1];

//             const decoded = jwt.verify(token, JWT_SECRET);
//             req.user = decoded.userId;

//             next();
//         } catch (error) {
//             return res.status(401).json({ message: "Not authorized" });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//     }
// };

// module.exports = protect;

// =========================================
// ============for skipping auth============
// =========================================
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const protect = (req, res, next) => {
    // ✅ DEV BYPASS
    // if (process.env.DEV_MODE === "true") {
    //     req.user = "dev-user-id-123"; // fake user id
    //     return next();
    // }
    if (process.env.DEV_MODE === "true") {
        req.user = "660000000000000000000001"; // dummy ObjectId format
        return next();
    }

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded.userId;

            return next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized" });
        }
    }

    return res.status(401).json({ message: "No token provided" });
};

module.exports = protect;