const { port } = require("./config/vars");
const app = require("./config/express");
const connectDB = require("./config/mongoose");

// server
const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on PORT ${port}...`));
  } catch (error) {
    console.log("🚀 ~ file: app.js:27 ~ start ~ error:", error);
  }
};

start();
