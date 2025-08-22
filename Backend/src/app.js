const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");

dotenv.config();


app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

connectDB()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });