require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const gameRoutes = require("./routes/gameRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/game", gameRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});