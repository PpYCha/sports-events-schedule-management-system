const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./route/userRoute");
const pool = require("./database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use the note routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the database connection when the app is terminated
process.on("SIGINT", () => {
  pool.end();
  process.exit();
});
