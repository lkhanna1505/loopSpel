const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./config/env");

const startServer = async () => {
    // Remove this when connecting to mongoDB database
    // await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`You can check it out the health on http://localhost:${PORT}/api/health`);
    });
};

startServer();